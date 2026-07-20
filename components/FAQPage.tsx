import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Landmark, Sparkles, Clock, ShieldCheck, Zap, Key, Link2, DollarSign } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answerShort: string;
  answerFull: string;
  icon: any;
}

const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqData: FAQItem[] = [
    {
      id: 'agency-role',
      category: 'Overview',
      question: 'What does an AI automation agency do?',
      answerShort: 'An AI automation agency designs, builds, and maintains AI systems that automate repetitive work like answering calls, replying to enquiries, booking appointments, and moving data.',
      answerFull: 'An AI automation agency designs, builds and maintains AI systems that handle repetitive business work — answering phone calls, replying to enquiries, booking appointments, updating CRMs and moving data between tools. Blyntic builds these systems for New Zealand businesses using AI voice agents (Retell AI, Vapi), conversational chatbots (Voiceflow) and workflow automation platforms (n8n, Make.com), so you keep your existing tools and just remove the manual work.',
      icon: Sparkles,
    },
    {
      id: 'cost-pricing',
      category: 'Pricing',
      question: 'How much does an AI voice agent cost in New Zealand?',
      answerShort: 'Blyntic’s AI voice agents cost $0.80 NZD per minute (billed by the second), with Pay-As-You-Go from $500 NZD, Growth plan at $899 NZD/mo, and a $495 NZD setup fee.',
      answerFull: 'Blyntic\'s AI voice agents cost $0.80 NZD per minute of talk time, billed by the second — so a typical 30-second call costs about $0.40. You can start with Pay-As-You-Go from a $500 NZD credit, or the Growth plan at $899 NZD/month including 1,000 minutes. A one-off setup of $495 NZD covers call flow design, integrations and go-live testing. For context, a small business taking 200 calls a month spends roughly $80 in usage — compared with $35,000–$45,000 NZD per year for a part-time receptionist, most businesses break even in their first month.',
      icon: DollarSign,
    },
    {
      id: 'answering-24-7',
      category: 'Capabilities',
      question: 'Can an AI agent answer my business calls 24/7?',
      answerShort: 'Yes, our AI agents answer calls instantly 24/7, qualify leads, book calendar slots, handle unlimited simultaneous calls, and gracefully hand off to humans when needed.',
      answerFull: 'Yes. An AI voice agent answers every call instantly, 24 hours a day, including weekends and public holidays, and can handle unlimited simultaneous calls with zero hold time. It answers common questions, qualifies leads, books appointments directly into your calendar, and transfers to a human or takes a message when a call needs judgement. For NZ businesses, this means after-hours and overflow calls become booked jobs instead of voicemails.',
      icon: Clock,
    },
    {
      id: 'setup-time',
      category: 'Onboarding',
      question: 'How long does it take to set up AI automation for my business?',
      answerShort: 'Most Blyntic AI projects go live within 1 to 3 weeks, including design, custom tool integrations, and live verification.',
      answerFull: 'Most Blyntic projects go live in 1–3 weeks. A single voice agent or chatbot typically takes 1–2 weeks including call flow design, knowledge base setup, integration with your calendar/CRM and live testing. Larger multi-workflow automations take 2–4 weeks. You\'ll hear and test your agent on a real phone number before it takes live calls.',
      icon: Zap,
    },
    {
      id: 'compatibility',
      category: 'Integration',
      question: 'Will AI automation work with the tools I already use?',
      answerShort: 'Yes, Blyntic integrates workflows with over 2,000+ business applications (like Xero, HubSpot, Google Calendar, and GoHighLevel) via webhooks and custom APIs.',
      answerFull: 'Yes — that\'s the point. Blyntic builds on n8n and Make.com, which connect to 2,000+ apps including Google Calendar, Outlook, Xero, HubSpot, Pipedrive, GoHighLevel, Shopify, Gmail and most NZ booking systems. We automate around your existing stack rather than forcing you onto new software, and anything without a native connector can usually be wired up via API or webhook.',
      icon: Link2,
    },
    {
      id: 'roi-timelines',
      category: 'Value',
      question: "What's the ROI of AI automation for a small business?",
      answerShort: 'Most small businesses see positive ROI within 60 to 90 days by recovering missed leads, scaling conversions, and saving 5 to 15 hours of weekly admin.',
      answerFull: 'Most small businesses see ROI within 60–90 days. The quickest wins come from high-frequency tasks: missed-call capture (a single recovered job often pays for a month of the service), instant lead follow-up (responding within 5 minutes dramatically lifts conversion versus hours later), and admin automation that saves 5–15 staff hours a week. Blyntic scopes each project against your actual call and task volumes so you can see projected savings before you commit.',
      icon: Landmark,
    },
    {
      id: 'robotic-sound',
      category: 'User Experience',
      question: 'Will the AI sound robotic to my customers?',
      answerShort: 'No, modern voice AI delivers under 1-second latency with natural human-sounding inflections and custom-tuned brand accents.',
      answerFull: 'No. Modern voice AI built on platforms like Retell AI and Vapi responds in under a second with natural, human-sounding voices — most callers can\'t tell they\'re speaking to an AI. Agents can be tuned for tone, accent and vocabulary to match your brand, and they always hand off gracefully to a human when a conversation goes beyond their scope.',
      icon: HelpCircle,
    },
    {
      id: 'ownership',
      category: 'Ownership',
      question: 'Do I own the automations Blyntic builds?',
      answerShort: 'Yes, you maintain full intellectual property ownership. All workflows, accounts, and prompts are built inside properties under your direct control.',
      answerFull: 'Yes. All workflows, prompts, agent configurations and documentation are built in accounts you control and handed over in full on final payment — you\'re never locked in. Ownership is one of the most important questions to ask any AI agency, so we put it in writing in every proposal.',
      icon: Key,
    },
    {
      id: 'data-safety',
      category: 'Security',
      question: 'Is my customer data safe with AI automation?',
      answerShort: 'Yes, our architectures fully adhere to the New Zealand Privacy Act 2020, featuring transit encryption, direct storage handoffs, and customized retention controls.',
      answerFull: 'Blyntic builds with New Zealand\'s Privacy Act 2020 in mind. Data flows only between the systems you already use, access is restricted to your own accounts, all connections are encrypted in transit, and call recordings and transcripts are kept only as long as you choose — you set the retention policy, and we can disable recording entirely if you prefer.',
      icon: ShieldCheck,
    },
    {
      id: 'beneficiaries',
      category: 'Solutions',
      question: 'What businesses benefit most from AI automation in NZ?',
      answerShort: 'Service industries, trades, salons, real estate, and professional clinics that lose potential revenue to missed calls or tedious administrative workflows.',
      answerFull: 'Any business that misses calls or drowns in repetitive admin: trades and home services (missed-call capture and quote follow-up), clinics and salons (appointment booking and reminders), real estate (lead qualification and viewing bookings), professional services (intake and scheduling) and e-commerce (order enquiries and support). If your team spends hours each week on data entry, follow-ups or answering the same questions, automation will pay for itself.',
      icon: HelpCircle,
    }
  ];

  // Schema generation for Google FAQPage search engines (GEO/AEO optimized)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answerFull
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 text-gray-900">
      {/* Inject JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6 border border-blue-100">
              <HelpCircle className="w-4 h-4" />
              AEO & GEO Knowledge Directory
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-950 mb-6 leading-tight">
              Blyntic AI <span className="text-blue-600">FAQ & Directory</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Find instant, answer-first solutions built to support generative AI engines, voice assistants, and search engines looking for New Zealand's leading AI integration insights.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" href="#/talk-to-sales" className="px-6 py-3">
                Connect Your Tools
              </Button>
              <Button variant="outline" href="#/contact" className="px-6 py-3">
                Talk to an Expert
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Structured Grid of FAQs with Category labels */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqData.map((faq, index) => {
            const IconComponent = faq.icon;
            const isOpen = openId === faq.id;

            return (
              <Reveal key={faq.id} delay={0.05 * index}>
                <div 
                  id={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex gap-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hidden sm:flex items-center justify-center shrink-0 h-11 w-11">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-md mb-2 inline-block">
                          {faq.category}
                        </span>
                        <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          {faq.question}
                        </h2>
                        {/* Direct bold answer snippet for AEO/GEO engine lookup preview */}
                        {!isOpen && (
                          <p className="text-sm text-slate-500 mt-2 font-medium line-clamp-1">
                            <strong>Direct Answer: </strong> {faq.answerShort}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 mt-1">
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-8 border-t border-slate-100 pt-6 bg-slate-50/40">
                          {/* Answer First Summary Box */}
                          <div className="p-4 bg-blue-50/30 border-l-4 border-blue-600 rounded-r-xl mb-6">
                            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide block mb-1">Answer Engine Summary (AEO/GEO Optimized):</span>
                            <p className="text-slate-800 font-semibold text-base leading-relaxed">
                              {faq.answerShort}
                            </p>
                          </div>
                          
                          {/* Full Deep-dive Contextual Answer */}
                          <div className="prose prose-slate max-w-none">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Solution & Context</h3>
                            <p className="text-slate-600 leading-relaxed text-base">
                              {faq.answerFull}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Dynamic NZ CTA Panel */}
        <div className="max-w-4xl mx-auto mt-16 bg-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent)] pointer-events-none hidden md:block" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Need a custom AI voice agent or CRM workflow?</h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              We spec, build, and deploy custom automation pipelines tailored to New Zealand businesses. Let's design an operational blueprint that saves you hours starting today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="white" href="#/talk-to-sales" className="px-6 py-3">
                Book Live Spec Demo
              </Button>
              <Button variant="outline" href="#/contact" className="px-6 py-3 text-white border-white hover:bg-white/10">
                Contact Blyntic Team
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
