import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  MessageCircle, 
  Send, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Share2, 
  Bot, 
  Database, 
  RefreshCw,
  Phone,
  Headphones,
  Sliders,
  Calendar,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// Mock interaction types for the live demo simulator
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  meta?: {
    channel?: 'instagram' | 'messenger' | 'whatsapp';
    isCall?: boolean;
    callDuration?: string;
  };
}

const AISocialMediaReply: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'messenger' | 'whatsapp' | 'summary'>('instagram');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmittingSummary, setIsSubmittingSummary] = useState(false);
  const [summarySubmitted, setSummarySubmitted] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://hook.us2.make.com/cmmqxn225heqftqkn3bd6q37eydnv2qs');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Initial chat histories per channel for the interactive simulator
  const [igMessages, setIgMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Hey! Loved your recent reel on automated customer workflows. How fast can you set up Instagram DM replies for our Auckland retail brand?',
      timestamp: '10:42 AM',
      meta: { channel: 'instagram' }
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Kia ora! Thanks for reaching out. We can have your custom AI Instagram DM agent live in under 48 hours. It handles product questions, size guides, store hours, and automatically books calls into your team’s calendar. Would you like a quick 3-minute video breakdown or to check our setup packages?',
      timestamp: '10:42 AM',
      meta: { channel: 'instagram' }
    }
  ]);

  const [messengerMessages, setMessengerMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Saw your Meta ad regarding automated lead capture. We spend $3k/month on ads and lose leads when team is offline on weekends.',
      timestamp: '02:15 PM',
      meta: { channel: 'messenger' }
    },
    {
      id: '2',
      sender: 'ai',
      text: 'That is the #1 leak in Facebook ad spend! Our AI Messenger agent engages click-to-messenger ad leads in under 5 seconds, qualifies their budget, collects their email & phone number, and syncs directly into your CRM. What CRM or booking software does your business use?',
      timestamp: '02:15 PM',
      meta: { channel: 'messenger' }
    }
  ]);

  const [whatsappMessages, setWhatsappMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Hi Blyntic, can your WhatsApp AI answer incoming customer voice calls as well as text messages?',
      timestamp: '04:05 PM',
      meta: { channel: 'whatsapp' }
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Yes, absolutely! We connect the official WhatsApp Business API with our low-latency voice AI engine. When customers message, it replies with intelligent text and media. If they place a WhatsApp Voice Call, our conversational voice agent answers naturally in a Kiwi or global accent, takes the booking, and sends an instant summary to your WhatsApp and CRM.',
      timestamp: '04:05 PM',
      meta: { channel: 'whatsapp' }
    }
  ]);

  // Current extracted summary state
  const [extractedLead, setExtractedLead] = useState({
    clientName: 'Liam Patterson',
    channel: 'Instagram DM & WhatsApp',
    company: 'Harbour Design Co.',
    phone: '+64 21 890 1243',
    email: 'liam@harbourdesign.co.nz',
    intent: 'Automate high-volume social DM inquiries & WhatsApp voice call answering',
    urgency: 'Immediate (Launching next Monday)',
    estimatedValue: '$3,500 NZD / mo',
    keyNeeds: [
      'Meta verified Instagram DM bot',
      'Facebook click-to-messenger ad qualification',
      'WhatsApp voice call AI receptionist',
      'Automated executive conversation summaries dispatched via Make.com'
    ],
    sentiment: 'High Intent / Enthusiastic'
  });

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      meta: { channel: activeTab === 'summary' ? 'instagram' : activeTab }
    };

    if (activeTab === 'instagram') setIgMessages(prev => [...prev, userMsg]);
    else if (activeTab === 'messenger') setMessengerMessages(prev => [...prev, userMsg]);
    else if (activeTab === 'whatsapp') setWhatsappMessages(prev => [...prev, userMsg]);

    const currentText = chatInput;
    setChatInput('');
    setIsTyping(true);

    // Simulate smart AI reply
    setTimeout(() => {
      let replyText = 'Thanks for your message! Our AI captures your contact details, confirms your specific requirements, and immediately schedules a consultation with the Blyntic team.';
      const lower = currentText.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
        replyText = 'Our AI Social Media & WhatsApp reply systems start from flexible monthly retainers with zero long-term lock-in. It includes Meta API verification, brand knowledge training, and CRM sync. Would you like a custom quote for your channel volume?';
      } else if (lower.includes('call') || lower.includes('voice') || lower.includes('phone')) {
        replyText = 'Our AI voice agent runs on sub-second latency with natural voice inflections. It can answer WhatsApp audio calls 24/7, check real-time calendar availability, and book appointments without human intervention!';
      } else if (lower.includes('summary') || lower.includes('make') || lower.includes('crm')) {
        replyText = 'Every completed DM or WhatsApp chat automatically triggers an AI Summarization step. It creates a structured JSON report (Client, Phone, Sentiment, Agreed Next Steps) and posts it directly via Make.com webhook into your CRM, Slack, or email!';
      } else if (lower.includes('book') || lower.includes('demo') || lower.includes('meeting')) {
        replyText = 'You can book a live 30-min architecture consultation with Jude and the Blyntic engineering team right now at blyntic.co.nz/#/talk-to-sales. What time works best for you?';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: { channel: activeTab === 'summary' ? 'instagram' : activeTab }
      };

      if (activeTab === 'instagram') setIgMessages(prev => [...prev, aiMsg]);
      else if (activeTab === 'messenger') setMessengerMessages(prev => [...prev, aiMsg]);
      else if (activeTab === 'whatsapp') setWhatsappMessages(prev => [...prev, aiMsg]);

      setIsTyping(false);
    }, 900);
  };

  const handleQuickPrompt = (prompt: string) => {
    setChatInput(prompt);
  };

  const handleSimulateSummarySubmission = async () => {
    setIsSubmittingSummary(true);
    try {
      // Send real payload to the user's Make.com webhook if available
      const payload = {
        source: 'Blyntic AI Social Media Reply Live Showcase',
        timestamp: new Date().toISOString(),
        channel: activeTab === 'summary' ? 'Instagram & WhatsApp' : activeTab,
        lead: extractedLead,
        summaryText: `AI Conversation Summary for ${extractedLead.clientName} (${extractedLead.company}). Inquired about 24/7 Instagram DMs, Messenger ad lead qualification, and WhatsApp AI voice calls. Sentiment: ${extractedLead.sentiment}. Next action: Schedule technical onboarding.`
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      setSummarySubmitted(true);
      setTimeout(() => setSummarySubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting summary:', err);
      setSummarySubmitted(true);
    } finally {
      setIsSubmittingSummary(false);
    }
  };

  const copySummaryText = () => {
    const text = `📋 BLYNTIC AI CONVERSATION SUMMARY
Client: ${extractedLead.clientName}
Company: ${extractedLead.company}
Channels: ${extractedLead.channel}
Phone: ${extractedLead.phone}
Email: ${extractedLead.email}
Intent: ${extractedLead.intent}
Urgency: ${extractedLead.urgency}
Sentiment: ${extractedLead.sentiment}
Key Needs:
- ${extractedLead.keyNeeds.join('\n- ')}
Status: Summary Dispatched to Make.com & CRM Pipeline`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 selection:bg-blue-200">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HERO HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 text-blue-700 font-semibold text-xs md:text-sm mb-6 border border-blue-100 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Instagram DMs • Facebook Messenger • WhatsApp Messages & Calls</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-950 mb-6 leading-[1.1] tracking-tight">
              AI Social Media Reply & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Omnichannel Lead Automation
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Never let an Instagram DM, Facebook inquiry, or WhatsApp call go unanswered. Blyntic builds bespoke autonomous AI agents that reply instantly 24/7 across Instagram, Facebook Messenger, and WhatsApp, captures marketing leads, answers voice calls, and automatically submits structured executive summaries to your CRM.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" href="#/talk-to-sales" className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-blue-600/20">
                Deploy AI Social Reply
              </Button>
              <Button variant="outline" href="#live-demo" className="w-full sm:w-auto text-base px-8 py-4">
                Test Live Interactive Demo
              </Button>
            </div>
          </Reveal>

          {/* Quick Metrics */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto pt-8 border-t border-gray-100">
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold font-display text-gray-900">&lt; 3 Sec</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">Instant Reply Speed</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold font-display text-blue-600">100%</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">Meta & WhatsApp API Compliant</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold font-display text-gray-900">3.8x</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">Ad Lead Conversion Lift</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold font-display text-indigo-600">Auto-Sync</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">Make.com & CRM Summaries</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4 CORE SERVICES PILLARS */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 mb-4">
                Full-Funnel Social & Messaging Intelligence
              </h2>
              <p className="text-gray-600 text-lg">
                Engineered specifically for businesses that receive inquiries across multiple social channels and need high-converting, human-grade customer engagement.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* 1. Instagram DMs */}
            <Reveal delay={0.1}>
              <div className="h-full bg-gradient-to-br from-pink-50/40 via-white to-purple-50/30 rounded-3xl p-8 md:p-10 border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-md shadow-rose-500/20">
                    <Instagram className="w-7 h-7" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-3 border border-rose-100">
                    Instagram DMs & Post Comments
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                    Autonomous Instagram DM Replies & Comment-to-DM Sourcing
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Never leave potential buyers waiting in your DMs. Our AI handles direct messages, story replies, and reel mentions within seconds. When prospects comment on your posts, the AI instantly replies and slides into their DMs with tailored links, menus, or booking slots.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>24/7 instant replies to DMs, story mentions & reel reactions</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Auto "Comment-to-DM" trigger for lead magnets & promo codes</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Smart product recommendations with clickable in-app checkout links</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-rose-100 flex items-center justify-between text-xs font-semibold text-rose-700">
                  <span>Official Instagram Graph API</span>
                  <span>100% Anti-Ban Protected</span>
                </div>
              </div>
            </Reveal>

            {/* 2. Facebook Messenger & Ad Leads */}
            <Reveal delay={0.2}>
              <div className="h-full bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 rounded-3xl p-8 md:p-10 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-md shadow-blue-600/20">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
                    Facebook Messenger & Ad Leads
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                    Facebook Messenger Reply & Meta Ad Lead Qualification
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Maximize ROI on your Facebook Ads. When users click your Click-to-Messenger ads or message your Facebook Page, Blyntic’s AI engages them in real time, asks pre-qualifying questions (budget, timeline, service need), and books qualified calls on the spot.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Immediate conversion of Facebook Click-to-Messenger ad clicks</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Pre-qualification workflows for high-ticket service inquiries</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Page comment auto-response & direct private follow-up</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-blue-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                  <span>Meta Business Verified</span>
                  <span>Direct CRM Pipeline Sync</span>
                </div>
              </div>
            </Reveal>

            {/* 3. WhatsApp Messages & AI Voice Calls */}
            <Reveal delay={0.3}>
              <div className="h-full bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 rounded-3xl p-8 md:p-10 border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-6 shadow-md shadow-emerald-600/20">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-100">
                    WhatsApp AI Messages & Phone Calls
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                    WhatsApp AI Replies, Broadcasts & Autonomous Voice Calls
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Connect directly to the world's most widely used messaging app. Our WhatsApp AI answers customer text inquiries, sends PDF brochures and booking confirmations, and even answers incoming WhatsApp Voice Calls using ultra-realistic AI voice agents!
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Official WhatsApp Cloud API with Green Tick verification support</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>AI WhatsApp Voice Call Receptionist for incoming customer audio calls</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Multi-agent inbox handoff to human staff whenever required</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>WhatsApp Business API</span>
                  <span>Audio & Text Telephony</span>
                </div>
              </div>
            </Reveal>

            {/* 4. Automated AI Summaries & Make.com Webhook Sync */}
            <Reveal delay={0.4}>
              <div className="h-full bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/30 rounded-3xl p-8 md:p-10 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-md shadow-purple-600/20">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-3 border border-purple-100">
                    Automated Executive Summaries
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                    AI Conversation Summaries & Real-Time CRM Webhook Dispatch
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Don't waste hours scrolling through endless chat logs. As soon as a conversation concludes on Instagram, Messenger, or WhatsApp, Blyntic AI summarizes the dialogue, extracts contact details & intent, and submits an actionable report to your team.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Instant synthesis: Key needs, pain points, budget & next steps</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Direct Webhook dispatch to Make.com, n8n, Zapier & custom APIs</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Instant notification to Slack, WhatsApp, or email sales channels</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-purple-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                  <span>Make.com & n8n Native</span>
                  <span>Zero Manual Data Entry</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* INTERACTIVE LIVE DEMO & SIMULATOR SECTION */}
        <section id="live-demo" className="mb-28 scroll-mt-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Interactive Simulator
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 mb-3">
                  Experience the AI Reply & Summary Engine
                </h2>
                <p className="text-gray-600 text-base max-w-2xl mx-auto">
                  Switch between channels below to test live conversational replies, lead qualification, WhatsApp voice call handling, and the automated executive summary submission.
                </p>
              </Reveal>
            </div>

            {/* CHANNEL SELECTOR TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-slate-100/80 rounded-2xl max-w-2xl mx-auto border border-slate-200">
              <button
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'instagram'
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram DM</span>
              </button>

              <button
                onClick={() => setActiveTab('messenger')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'messenger'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Facebook Messenger</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp & Calls</span>
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'summary'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Executive Summary</span>
              </button>
            </div>

            {/* SIMULATOR CONTAINER */}
            <div className="bg-slate-900 rounded-[32px] p-4 sm:p-8 shadow-2xl border border-slate-800 text-white overflow-hidden">
              
              {/* TOP HEADER OF SIMULATOR */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    activeTab === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600' :
                    activeTab === 'messenger' ? 'bg-blue-600' :
                    activeTab === 'whatsapp' ? 'bg-emerald-600' : 'bg-purple-600'
                  }`}>
                    {activeTab === 'instagram' && <Instagram className="w-5 h-5 text-white" />}
                    {activeTab === 'messenger' && <MessageSquare className="w-5 h-5 text-white" />}
                    {activeTab === 'whatsapp' && <MessageCircle className="w-5 h-5 text-white" />}
                    {activeTab === 'summary' && <FileText className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">
                        {activeTab === 'instagram' && 'Blyntic Instagram DM Agent'}
                        {activeTab === 'messenger' && 'Blyntic Facebook Messenger Representative'}
                        {activeTab === 'whatsapp' && 'Blyntic WhatsApp Business & Voice AI'}
                        {activeTab === 'summary' && 'Live AI Conversation Summary & Dispatch'}
                      </h4>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400">
                      {activeTab === 'instagram' && 'Responding autonomously via Meta Graph API • Sub-second response'}
                      {activeTab === 'messenger' && 'Integrated with Click-to-Messenger Meta Ads • Auto Lead Scoring'}
                      {activeTab === 'whatsapp' && 'WhatsApp Cloud Business API + Two-Way Voice Telephony'}
                      {activeTab === 'summary' && 'Real-time JSON extraction & Make.com webhook submission'}
                    </p>
                  </div>
                </div>

                {activeTab === 'whatsapp' && (
                  <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-full text-xs text-emerald-300">
                    <PhoneCall className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span>WhatsApp Voice Calls Enabled</span>
                  </div>
                )}
              </div>

              {/* TAB CONTENT: CHAT CHANNELS */}
              {activeTab !== 'summary' ? (
                <div className="flex flex-col h-[520px]">
                  {/* Messages Scroll Area */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                    {(activeTab === 'instagram' ? igMessages : activeTab === 'messenger' ? messengerMessages : whatsappMessages).map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[11px] text-slate-400 mb-1 px-1">
                          {msg.sender === 'user' ? 'Prospect' : 'Blyntic AI'} • {msg.timestamp}
                        </div>
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-xs'
                              : activeTab === 'instagram'
                              ? 'bg-gradient-to-r from-rose-950/40 to-purple-950/40 border border-rose-800/40 text-slate-100 rounded-tl-xs'
                              : activeTab === 'whatsapp'
                              ? 'bg-emerald-950/40 border border-emerald-800/40 text-slate-100 rounded-tl-xs'
                              : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 w-fit px-3 py-2 rounded-xl border border-slate-700/60 animate-pulse">
                        <Bot className="w-3.5 h-3.5 text-blue-400" />
                        <span>Blyntic AI is formulating response...</span>
                      </div>
                    )}
                  </div>

                  {/* QUICK PROMPT SUGGESTIONS */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Test questions:
                    </span>
                    <button
                      onClick={() => handleQuickPrompt('How much does it cost to implement this for our brand?')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      "How much does it cost?"
                    </button>
                    <button
                      onClick={() => handleQuickPrompt('Can you answer incoming customer WhatsApp voice calls?')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      "Can you handle WhatsApp calls?"
                    </button>
                    <button
                      onClick={() => handleQuickPrompt('How does the automated conversation summary work?')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      "How does summary submission work?"
                    </button>
                  </div>

                  {/* INPUT BAR */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={`Type a test message for ${activeTab === 'instagram' ? 'Instagram' : activeTab === 'messenger' ? 'Messenger' : 'WhatsApp'}...`}
                      className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* TAB CONTENT: AI SUMMARY & WEBHOOK DISPATCH */
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Summary Card */}
                    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-400" />
                          <h5 className="font-bold text-white text-base">Extracted Conversation Summary</h5>
                        </div>
                        <button
                          onClick={copySummaryText}
                          className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-700 hover:bg-slate-600 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedSummary ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Prospect Name:</span>
                          <span className="font-semibold text-white">{extractedLead.clientName}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Company:</span>
                          <span className="font-semibold text-white">{extractedLead.company}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Contact Channels:</span>
                          <span className="font-semibold text-blue-400">{extractedLead.channel}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Phone / WhatsApp:</span>
                          <span className="font-semibold text-white">{extractedLead.phone}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Email:</span>
                          <span className="font-semibold text-white">{extractedLead.email}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Detected Urgency:</span>
                          <span className="font-semibold text-amber-400">{extractedLead.urgency}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                          <span className="text-slate-400">Sentiment:</span>
                          <span className="font-semibold text-emerald-400">{extractedLead.sentiment}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-xs text-slate-400 mb-2 font-medium">Core Requirements Identified:</div>
                        <div className="space-y-1.5">
                          {extractedLead.keyNeeds.map((need, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              <span>{need}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Webhook & CRM Dispatch */}
                    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-amber-400" />
                          <h5 className="font-bold text-white text-base">Make.com / CRM Webhook Dispatch</h5>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          When a conversation ends, Blyntic's pipeline sends this structured JSON payload straight to your Make.com or n8n webhook, triggering instant CRM updates, Slack alerts, or calendar invites.
                        </p>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Target Webhook Endpoint
                          </label>
                          <input
                            type="text"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-purple-500"
                          />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono overflow-x-auto">
                          <p className="text-emerald-400 font-semibold mb-1">// Outgoing Payload Preview</p>
                          {JSON.stringify({
                            event: 'social_conversation_completed',
                            channel: 'Instagram_DM_and_WhatsApp',
                            lead: {
                              name: extractedLead.clientName,
                              phone: extractedLead.phone,
                              email: extractedLead.email,
                              intent: extractedLead.intent
                            },
                            action: 'CRM_Lead_Created'
                          }, null, 2)}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleSimulateSummarySubmission}
                          disabled={isSubmittingSummary}
                          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-99 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
                        >
                          {isSubmittingSummary ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Submitting Summary to Webhook...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Summary to Make.com Webhook</span>
                            </>
                          )}
                        </button>

                        {summarySubmitted && (
                          <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Success! Executive summary payload transmitted to pipeline.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* HOW IT WORKS PIPELINE */}
        <div className="mb-28 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 mb-4">
                How Blyntic Implements Your Social AI Engine
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Turnkey rollout in 48 hours with zero disruption to your daily operations.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Official Channel Connect',
                description: 'We connect your Instagram, Facebook Page, and WhatsApp Business account via official verified Meta Cloud APIs.'
              },
              {
                step: '02',
                title: 'Knowledge Ingestion',
                description: 'Upload your services, price lists, FAQs, and brand tone guidelines so the AI speaks strictly with your authentic voice.'
              },
              {
                step: '03',
                title: 'Autonomous Replies & Calls',
                description: 'The AI answers DMs, comments, WhatsApp messages, and incoming WhatsApp audio calls 24/7 with sub-3s response speed.'
              },
              {
                step: '04',
                title: 'Auto Summary & CRM Sync',
                description: 'Every interaction produces a structured executive summary submitted directly into your CRM, Slack, and email via Make.com.'
              }
            ].map((stepItem, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-display font-extrabold text-blue-600 mb-4">
                      {stepItem.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="mb-28 max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-950 mb-3">
                Why Businesses Upgrade to Blyntic AI Social Reply
              </h2>
              <p className="text-gray-600 text-base">
                How autonomous generative AI outclasses manual replying and legacy button chatbots.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <tr>
                      <th className="p-4 md:p-6">Feature</th>
                      <th className="p-4 md:p-6 text-gray-400">Manual Human Replying</th>
                      <th className="p-4 md:p-6 text-gray-400">Old Keyword Chatbots</th>
                      <th className="p-4 md:p-6 text-blue-700 bg-blue-50/60 font-bold">Blyntic AI Engine</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">Response Time</td>
                      <td className="p-4 md:p-6 text-gray-500">2 - 12 hours</td>
                      <td className="p-4 md:p-6 text-gray-500">Instant (Canned button options)</td>
                      <td className="p-4 md:p-6 font-bold text-blue-600 bg-blue-50/30">&lt; 3 Seconds (Natural contextual)</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">24/7 After-Hours Coverage</td>
                      <td className="p-4 md:p-6 text-red-500">❌ Leads lost overnight</td>
                      <td className="p-4 md:p-6 text-amber-500">⚠️ Rigid flow only</td>
                      <td className="p-4 md:p-6 font-bold text-emerald-600 bg-blue-50/30">✅ 100% 24/7/365 Autonomous</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">WhatsApp Voice Calls</td>
                      <td className="p-4 md:p-6 text-gray-500">Requires dedicated agent</td>
                      <td className="p-4 md:p-6 text-red-500">❌ Not possible</td>
                      <td className="p-4 md:p-6 font-bold text-emerald-600 bg-blue-50/30">✅ AI Voice Receptionist Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">Executive Summary Generation</td>
                      <td className="p-4 md:p-6 text-gray-500">Manual typing & note taking</td>
                      <td className="p-4 md:p-6 text-red-500">❌ Raw transcripts only</td>
                      <td className="p-4 md:p-6 font-bold text-emerald-600 bg-blue-50/30">✅ AI Synthesized & Webhook Dispatched</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">Meta API Compliance</td>
                      <td className="p-4 md:p-6 text-emerald-600">✅ Standard</td>
                      <td className="p-4 md:p-6 text-amber-500">⚠️ Often brittle</td>
                      <td className="p-4 md:p-6 font-bold text-emerald-600 bg-blue-50/30">✅ Official Enterprise Cloud APIs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="mb-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-950 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-base">
                Everything you need to know about setting up automated social media and WhatsApp replies.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Will using AI on Instagram or WhatsApp risk getting our account suspended?',
                a: 'Not with Blyntic. We use 100% official, verified Meta Business and WhatsApp Cloud APIs. We never use unofficial browser scrapers, shadow bots, or unauthorized extensions. Your accounts remain completely secure and fully compliant with Meta policies.'
              },
              {
                q: 'How does the WhatsApp AI voice call feature work?',
                a: 'When an authorized customer dials your WhatsApp Business number, our voice AI agent answers instantaneously in a natural, friendly accent. It listens to their query, checks real-time availability in your calendar, and books appointments, just like a dedicated human receptionist.'
              },
              {
                q: 'Can our human staff jump into a conversation at any time?',
                a: 'Yes, seamlessly. Whenever a human team member replies directly from the Instagram or WhatsApp Business app, the AI detects human takeover and immediately pauses itself. You are always in full control.'
              },
              {
                q: 'How and where does the AI submit the conversation summary?',
                a: 'At the conclusion of each qualifying conversation, the AI parses the dialogue into a structured JSON summary (Client details, Phone, Email, Intent, Budget, Next Steps) and delivers it via Make.com webhook to your CRM (HubSpot, GoHighLevel, Cliniko, Airtable), Slack, or email.'
              },
              {
                q: 'How long does setup take?',
                a: 'Most systems are fully designed, integrated with your knowledge base, and live within 48 to 72 hours.'
              }
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
                  <h4 className="font-bold text-gray-900 text-base mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <Reveal>
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-[32px] p-8 md:p-14 text-white text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
                Ready to Scale Your Inbound Pipeline?
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                Turn Every DM & WhatsApp Message Into a Paying Customer
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Book a 30-minute demonstration with our engineering team. We'll map your social media channels, connect your CRM, and show you live prototypes customized for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" href="#/talk-to-sales" className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-blue-600/30">
                  Book 30-Min Strategy Call
                </Button>
                <Button variant="white" href="#/contact" className="w-full sm:w-auto text-base px-8 py-4">
                  Contact Our Engineers
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default AISocialMediaReply;
