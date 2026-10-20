import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Send, 
  Settings, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  ThumbsUp, 
  Check, 
  RefreshCw, 
  Code2, 
  AlertCircle,
  HelpCircle,
  X,
  MessageSquare
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { trackMetaLead } from '../utils/metaPixel';

const POPULAR_TAGS = [
  "🤖 24/7 AI Phone Receptionist",
  "⚡ Instant Lead Capture & Response",
  "💬 Custom Website AI Chatbot",
  "🔄 n8n & CRM Automated Workflows",
  "💰 High ROI & Cut Operational Costs",
  "📞 Zero Missed Customer Enquiries",
  "🤝 Outstanding Auckland Support",
  "⏱️ Rapid 48-Hour Setup"
];

const SERVICE_OPTIONS = [
  "AI Customer Service & Receptionist",
  "Conversational AI Chatbots",
  "Smart Website AI Integration",
  "Full Custom AI Solution & CRM Automations",
  "AI Marketing & Content Systems",
  "General Consultation & Strategy"
];

// Production n8n Webhook provided by user
const PRODUCTION_N8N_WEBHOOK = "https://n8n.srv1310032.hstgr.cloud/webhook/gbp-review";

// Pre-built n8n workflow JSON ready for import
const N8N_WORKFLOW_TEMPLATE = {
  name: "Blyntic - Google Review & Feedback Automation",
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "gbp-review",
        responseMode: "responseNode",
        options: {}
      },
      name: "Review Webhook Trigger",
      type: "n8n-nodes-base.webhook",
      typeVersion: 1,
      position: [250, 300]
    },
    {
      parameters: {
        conditions: {
          number: [
            {
              value1: "={{ $json.body.rating }}",
              operation: "largerEqual",
              value2: 4
            }
          ]
        }
      },
      name: "Check Positive Review (>=4)",
      type: "n8n-nodes-base.if",
      typeVersion: 1,
      position: [480, 300]
    },
    {
      parameters: {
        text: "=🌟 *New 5-Star Google Review Flow Started!*\n*Reviewer:* {{ $json.body.reviewerName }} ({{ $json.body.reviewerEmail }})\n*Company:* {{ $json.body.companyName || 'N/A' }}\n*Rating:* {{ $json.body.rating }} / 5 ⭐\n*Review:* \"{{ $json.body.reviewText }}\"\n*Tags:* {{ $json.body.tags.join(', ') }}\n*Google Redirect Clicked:* {{ $json.body.isGoogleRedirectTriggered ? 'Yes' : 'Pending' }}"
      },
      name: "Notify Slack Positive Channel",
      type: "n8n-nodes-base.slack",
      typeVersion: 1,
      position: [750, 200]
    },
    {
      parameters: {
        text: "=⚠️ *URGENT: Review Follow-up Needed!*\n*Customer:* {{ $json.body.reviewerName }} ({{ $json.body.reviewerEmail }})\n*Rating:* {{ $json.body.rating }} / 5 ⚠️\n*Feedback:* \"{{ $json.body.reviewText }}\"\n*Action Required:* Contact customer within 24 hours to resolve issue."
      },
      name: "Urgent Slack Alert (Service Recovery)",
      type: "n8n-nodes-base.slack",
      typeVersion: 1,
      position: [750, 420]
    },
    {
      parameters: {
        respondWith: "json",
        responseBody: "={\n  \"success\": true,\n  \"status\": \"processed_by_n8n\",\n  \"rating\": {{ $json.body.rating }}\n}"
      },
      name: "Respond to Webhook",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1,
      position: [1000, 300]
    }
  ],
  connections: {
    "Review Webhook Trigger": {
      main: [[{ node: "Check Positive Review (>=4)", type: "main", index: 0 }]]
    },
    "Check Positive Review (>=4)": {
      main: [
        [{ node: "Notify Slack Positive Channel", type: "main", index: 0 }],
        [{ node: "Urgent Slack Alert (Service Recovery)", type: "main", index: 0 }]
      ]
    },
    "Notify Slack Positive Channel": {
      main: [[{ node: "Respond to Webhook", type: "main", index: 0 }]]
    },
    "Urgent Slack Alert (Service Recovery)": {
      main: [[{ node: "Respond to Webhook", type: "main", index: 0 }]]
    }
  }
};

const ReviewCollector: React.FC = () => {
  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerEmail, setReviewerEmail] = useState<string>('');
  const [reviewerPhone, setReviewerPhone] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [serviceUsed, setServiceUsed] = useState<string>(SERVICE_OPTIONS[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState<string>('');
  const [recommend, setRecommend] = useState<boolean>(true);

  // Settings & Integrations
  const [googleReviewUrl, setGoogleReviewUrl] = useState<string>(() => {
    return localStorage.getItem('blyntic_google_review_url') || 
      'https://search.google.com/local/writereview?placeid=ChIJ-3-BlynticNZ';
  });
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState<string>(() => {
    const stored = localStorage.getItem('blyntic_n8n_webhook_url');
    if (stored && stored.startsWith('http') && !stored.includes('your-n8n-instance')) {
      return stored;
    }
    return PRODUCTION_N8N_WEBHOOK;
  });
  const [serverHasWebhook, setServerHasWebhook] = useState<boolean>(true);
  const [webhookDeliveryInfo, setWebhookDeliveryInfo] = useState<{
    delivered?: boolean;
    status?: number;
    message?: string;
  } | null>(null);

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPolishing, setIsPolishing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedReview, setCopiedReview] = useState<boolean>(false);
  const [copiedWorkflow, setCopiedWorkflow] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [testWebhookStatus, setTestWebhookStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    latency?: number;
  }>({ loading: false });

  // Load server config on mount
  useEffect(() => {
    fetch('/api/reviews/config')
      .then(res => res.json())
      .then(data => {
        if (data.defaultGoogleReviewUrl && !localStorage.getItem('blyntic_google_review_url')) {
          setGoogleReviewUrl(data.defaultGoogleReviewUrl);
        }
        if (data.webhookUrl && (!localStorage.getItem('blyntic_n8n_webhook_url') || localStorage.getItem('blyntic_n8n_webhook_url')?.includes('your-n8n-instance'))) {
          setN8nWebhookUrl(data.webhookUrl);
        }
        setServerHasWebhook(Boolean(data.hasServerWebhookConfigured));
      })
      .catch(() => {});
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCopyReviewText = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedReview(true);
      setTimeout(() => setCopiedReview(false), 4000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedReview(true);
      setTimeout(() => setCopiedReview(false), 4000);
    }
  };

  const handleCopyWorkflowJson = () => {
    navigator.clipboard.writeText(JSON.stringify(N8N_WORKFLOW_TEMPLATE, null, 2));
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 3000);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('blyntic_google_review_url', googleReviewUrl);
    localStorage.setItem('blyntic_n8n_webhook_url', n8nWebhookUrl);
    setShowSettingsModal(false);
  };

  const handleTestWebhook = async () => {
    setTestWebhookStatus({ loading: true });
    try {
      const res = await fetch('/api/reviews/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: n8nWebhookUrl || undefined })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestWebhookStatus({
          loading: false,
          success: true,
          message: `Webhook received payload successfully! HTTP ${data.status} (${data.latencyMs}ms)`,
          latency: data.latencyMs
        });
      } else {
        setTestWebhookStatus({
          loading: false,
          success: false,
          message: data.error || `Failed with HTTP ${data.status}`
        });
      }
    } catch (err: any) {
      setTestWebhookStatus({
        loading: false,
        success: false,
        message: err.message || 'Network error reaching server'
      });
    }
  };

  const handlePolishWithAI = async () => {
    if (!reviewText.trim()) return;
    setIsPolishing(true);
    try {
      const res = await fetch('/api/reviews/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftText: reviewText,
          rating,
          serviceUsed,
          tags: selectedTags
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setReviewText(data.polishedText);
      }
    } catch (err) {
      console.error('Failed to polish review:', err);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerEmail.trim()) {
      return;
    }

    setIsSubmitting(true);
    const activeWebhook = n8nWebhookUrl || PRODUCTION_N8N_WEBHOOK;
    const submissionPayload = {
      rating,
      reviewerName,
      reviewerEmail,
      reviewerPhone,
      companyName,
      serviceUsed,
      tags: selectedTags,
      reviewText,
      recommend,
      customWebhookUrl: activeWebhook,
      metadata: {
        pageUrl: window.location.href,
        referrer: document.referrer || '',
        screenResolution: `${window.innerWidth}x${window.innerHeight}`
      }
    };

    try {
      // Send to backend proxy -> n8n webhook
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload)
      });
      const data = await res.json();
      if (data?.webhook) {
        setWebhookDeliveryInfo({
          delivered: Boolean(data.webhook.delivered),
          status: data.webhook.status,
          message: data.webhook.message || (data.webhook.delivered ? "Delivered to n8n successfully" : "Dispatched to n8n webhook")
        });
      }

      // Track Meta Lead event
      trackMetaLead({
        content_name: 'Google Review Submission',
        currency: 'NZD',
        value: rating >= 4 ? 100 : 20
      });

      // Auto-copy review text to clipboard for 4 or 5 star reviews
      if (rating >= 4 && reviewText.trim()) {
        handleCopyReviewText(reviewText);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Review submission error:', err);
      // Still show success screen to customer so their flow is not broken
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5: return "⭐⭐⭐⭐⭐ Outstanding! Beyond expectations";
      case 4: return "⭐⭐⭐⭐ Very Good! High quality & reliable";
      case 3: return "⭐⭐⭐ Average / Met expectations";
      case 2: return "⭐⭐ Room for improvement";
      case 1: return "⭐ Disappointed with service";
      default: return "";
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Top Header / Badges */}
        <div className="text-center mb-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs mb-4">
              {/* Google G Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-xs font-semibold tracking-wide text-slate-700">Official Google Business Review Portal</span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight mb-3">
              Review Your Experience with <span className="text-blue-600">Blyntic</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Your feedback takes just 60 seconds and helps fellow New Zealand businesses discover autonomous AI phone & automation systems.
            </p>
          </Reveal>
        </div>

        {/* Integration / Admin Config Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/80 backdrop-blur-xs border border-slate-200/70 rounded-2xl p-3 px-4 mb-6 shadow-xs text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-slate-800">Automated Pipeline:</span>
            <span className="font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 font-semibold">
              n8n: /webhook/gbp-review
            </span>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Webhook Settings</span>
          </button>
        </div>

        {/* SUCCESS / COMPLETION STATE */}
        {isSubmitted ? (
          <Reveal>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-xl shadow-slate-200/40 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>

              {rating >= 4 ? (
                /* POSITIVE RATING (4-5 STARS) -> GOOGLE REDIRECT PATH */
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-100/70 text-emerald-800 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                      Thank You, {reviewerName || 'Partner'}!
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">
                      Your 5-Star Experience is Recorded!
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto text-sm md:text-base mb-3">
                      Your feedback has been submitted to our n8n automation pipeline. One final 10-second step will help us tremendously on Google:
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Transmitted to n8n: /webhook/gbp-review</span>
                    </div>
                  </div>

                  {/* Auto-Copied Banner */}
                  {reviewText.trim() && (
                    <div className="bg-blue-50/90 border border-blue-200/80 rounded-2xl p-4 text-left max-w-lg mx-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-700" />
                          Copied to your clipboard
                        </span>
                        <button
                          onClick={() => handleCopyReviewText(reviewText)}
                          className="text-xs font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedReview ? 'Copied!' : 'Copy Again'}
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-slate-700 italic bg-white p-3 rounded-xl border border-blue-100">
                        "{reviewText}"
                      </p>
                    </div>
                  )}

                  {/* Google Redirect Call to Action */}
                  <div className="pt-2 max-w-md mx-auto space-y-4">
                    <a
                      href={googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all group"
                    >
                      <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Post on Google Business Profile ⭐</span>
                      <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-xs text-slate-500 text-left space-y-1">
                      <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Quick Instructions:
                      </div>
                      <ol className="list-decimal list-inside pl-1 space-y-0.5 text-slate-600">
                        <li>Click the blue button above to launch Google Reviews</li>
                        <li>Paste your copied review text (Ctrl+V or tap Paste)</li>
                        <li>Select 5 stars and tap <strong>Post</strong></li>
                      </ol>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-400">
                    <span>Submitted to n8n webhook</span>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setReviewText('');
                        setSelectedTags([]);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Submit another review
                    </button>
                  </div>
                </div>
              ) : (
                /* CONSTRUCTIVE / RECOVERY PATH (1-3 STARS) */
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-inner">
                    <MessageSquare className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                      Priority Service Recovery
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">
                      Thank You for Your Honest Feedback
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                      At Blyntic, we take client satisfaction personally. We have dispatched an urgent alert to Jude Al-Attraqchi and our leadership team via n8n. We will contact you within 24 hours to address this and make things right.
                    </p>
                  </div>

                  <div className="pt-4 max-w-md mx-auto space-y-3">
                    <a
                      href="mailto:jude@blyntic.co.nz"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact Leadership Directly (jude@blyntic.co.nz)</span>
                    </a>

                    <div className="text-xs text-slate-400">
                      Want to post directly to Google?{' '}
                      <a
                        href={googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 underline font-medium"
                      >
                        Click here to leave a public Google review
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ) : (
          /* REVIEW SUBMISSION FORM */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-xl shadow-slate-200/40">
            <form onSubmit={handleSubmitReview} className="space-y-8">
              
              {/* 1. STAR RATING */}
              <div className="text-center pb-6 border-b border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  How would you rate your overall experience with Blyntic?
                </label>
                
                <div className="flex items-center justify-center gap-2 md:gap-3 py-2">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = (hoverRating || rating) >= starValue;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 md:p-2 transition-transform hover:scale-120 active:scale-95 focus:outline-hidden"
                        aria-label={`Rate ${starValue} stars`}
                      >
                        <Star
                          className={`w-9 h-9 md:w-11 md:h-11 transition-all ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                              : 'text-slate-300 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 text-sm font-medium text-slate-700 transition-all h-6">
                  {getRatingLabel(currentDisplayRating)}
                </div>
              </div>

              {/* 2. QUICK TAGS */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  What stood out most? (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs md:text-sm px-3.5 py-2 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. WRITTEN REVIEW TEXTAREA */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Your Review / Testimonial
                  </label>
                  
                  {/* AI Polish Button */}
                  <button
                    type="button"
                    onClick={handlePolishWithAI}
                    disabled={isPolishing || !reviewText.trim()}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      reviewText.trim()
                        ? 'bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:border-blue-300'
                        : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title="Type draft points, then click to polish with AI"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isPolishing ? 'animate-spin' : ''}`} />
                    <span>{isPolishing ? 'Polishing with Gemini...' : '✨ Polish with AI'}</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what problem Blyntic solved, how the AI voice agent or automation performed, and what results your team experienced..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-sm text-slate-800 placeholder:text-slate-400 leading-relaxed"
                  />
                  <div className="absolute bottom-3 right-4 text-[11px] text-slate-400">
                    {reviewText.length} characters
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Tip: A great Google review mentions the service you used and the time or stress saved.
                </p>
              </div>

              {/* 4. CONTACT / BUSINESS DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={reviewerEmail}
                      onChange={(e) => setReviewerEmail(e.target.value)}
                      placeholder="e.g. sarah@company.co.nz"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company / Clinic Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Jenkins Health Ltd"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone / Mobile <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={reviewerPhone}
                      onChange={(e) => setReviewerPhone(e.target.value)}
                      placeholder="e.g. 021 234 5678"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 5. SERVICE USED & RECOMMENDATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Service Received
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden text-sm bg-white"
                  >
                    {SERVICE_OPTIONS.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Would you recommend Blyntic?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRecommend(true)}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        recommend
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Yes, 100%!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommend(false)}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        !recommend
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>Maybe / No</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-black active:scale-99 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Transmitting Review to Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Review & Proceed to Google</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-2.5">
                  Submissions are automatically processed via n8n automation webhook and forwarded to Google Business Profile.
                </p>
              </div>

            </form>
          </div>
        )}

        {/* TRUST BADGE FOOTER */}
        <div className="mt-12 text-center text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified 256-Bit SSL Encrypted Submission • Privacy Protected</span>
          </div>
          <p>© 2026 Blyntic AI Automation Agency (Auckland, New Zealand). All rights reserved.</p>
        </div>

      </div>

      {/* N8N & GOOGLE CONFIGURATION MODAL (ADMIN / DEVELOPER HUB) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">n8n Webhook & Google Business Profile Settings</h3>
                <p className="text-xs text-slate-500">Connect this page directly to your live n8n workflow</p>
              </div>
            </div>

            <div className="space-y-5 mt-6 text-left">
              {/* n8n Webhook URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    n8n Webhook Endpoint URL
                  </label>
                  {serverHasWebhook && (
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      Server default active
                    </span>
                  )}
                </div>
                <input
                  type="url"
                  value={n8nWebhookUrl}
                  onChange={(e) => setN8nWebhookUrl(e.target.value)}
                  placeholder="https://n8n.srv1310032.hstgr.cloud/webhook/gbp-review"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Default: <code>https://n8n.srv1310032.hstgr.cloud/webhook/gbp-review</code>
                </p>
              </div>

              {/* Webhook Test Button */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700">Test Webhook Connectivity</span>
                    <p className="text-[11px] text-slate-500">Sends a live sample review ping to verify your n8n trigger node.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestWebhook}
                    disabled={testWebhookStatus.loading}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className={`w-3.5 h-3.5 ${testWebhookStatus.loading ? 'animate-spin' : ''}`} />
                    <span>{testWebhookStatus.loading ? 'Testing...' : 'Test Webhook'}</span>
                  </button>
                </div>

                {testWebhookStatus.message && (
                  <div className={`mt-3 p-2.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    testWebhookStatus.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {testWebhookStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{testWebhookStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Google Review Redirect Link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Google Business Profile Direct Review Link
                </label>
                <input
                  type="url"
                  value={googleReviewUrl}
                  onChange={(e) => setGoogleReviewUrl(e.target.value)}
                  placeholder="https://g.page/r/your-id/review or https://search.google.com/local/writereview?placeid=..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-mono"
                />
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>How to find this: In Google Search / Maps manager, click <strong>"Ask for reviews"</strong> and copy your short link.</span>
                </div>
              </div>

              {/* Ready-to-use n8n Workflow JSON */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Ready-to-Use n8n Workflow Blueprint
                  </label>
                  <button
                    type="button"
                    onClick={handleCopyWorkflowJson}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedWorkflow ? 'Copied JSON!' : 'Copy Workflow JSON'}</span>
                  </button>
                </div>
                <div className="bg-slate-900 text-slate-200 rounded-xl p-3 text-[11px] font-mono overflow-x-auto max-h-36">
                  <pre>{JSON.stringify(N8N_WORKFLOW_TEMPLATE, null, 2)}</pre>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Simply open your n8n canvas and press <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[10px]">Ctrl+V</kbd> to paste this complete 4-node flow!
                </p>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-semibold transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReviewCollector;
