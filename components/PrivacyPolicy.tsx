import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  ArrowLeft, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Globe, 
  Cookie, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Layers,
  Printer
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { StructuredData } from './StructuredData';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: Section[] = [
  { id: 'overview', title: '1. Overview & Scope', icon: FileText },
  { id: 'information-collected', title: '2. Information We Collect', icon: Database },
  { id: 'how-we-use', title: '3. How We Use Your Data', icon: Cpu },
  { id: 'google-and-third-parties', title: '4. Google Services & Third Parties', icon: Layers },
  { id: 'cookies-analytics', title: '5. Cookies & Tracking Technologies', icon: Cookie },
  { id: 'ai-training-protections', title: '6. AI Data & Model Training Protections', icon: Sparkles },
  { id: 'data-sharing-disclosure', title: '7. Data Sharing & Non-Sale Policy', icon: ShieldCheck },
  { id: 'storage-retention', title: '8. Data Retention & Storage', icon: Server },
  { id: 'security-measures', title: '9. Security & Encryption Safeguards', icon: Lock },
  { id: 'user-rights', title: '10. Your Privacy Rights & Choices', icon: UserCheck },
  { id: 'international-transfers', title: '11. Cross-Border Transfers', icon: Globe },
  { id: 'children-privacy', title: '12. Children\'s Privacy', icon: AlertCircle },
  { id: 'policy-updates', title: '13. Changes to this Policy', icon: Clock },
  { id: 'contact-officer', title: '14. Contact Our Privacy Officer', icon: Mail }
];

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 text-slate-800">
      {/* Structured Data for SEO & Knowledge Graph */}
      <StructuredData pageType="privacy" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save as PDF
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-xs md:text-sm mb-6 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              New Zealand Privacy Act 2020 & Google Compliance Standard
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-950 mb-4 tracking-tight">
              Blyntic Privacy Policy
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-6">
              This Privacy Policy explains transparently how Blyntic collects, uses, processes, protects, and discloses personal and business information when you visit our website (<a href="https://www.blyntic.co.nz" className="text-blue-600 hover:underline">blyntic.co.nz</a>), communicate with our AI phone and web agents, or engage our custom workflow automation services.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Effective Date: <strong>September 1, 2026</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Jurisdiction: <strong>Auckland, New Zealand</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Compliance: <strong>NZ Privacy Act 2020 & Global Frameworks</strong></span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Executive Summary Cards: "Privacy at Blyntic at a Glance" */}
        <div className="mb-14">
          <div className="text-left mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Privacy at Blyntic at a Glance
            </h2>
            <p className="text-sm text-slate-600">The fundamental privacy commitments we uphold across all client operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">We Never Sell Your Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never sell, rent, or trade personal data or business records to advertisers or third-party data brokers under any circumstances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">No Public AI Training</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your proprietary business information and customer phone recordings are never used to train public foundation artificial intelligence models.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Full Data Ownership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You own 100% of the workflows, phone agent scripts, transcripts, and database configurations we build inside your designated accounts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Retention Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You decide how long voice audio and message transcripts are retained, with options for automated 7-day purging or zero retention.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Document */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Nav Sidebar (Desktop Sticky) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate">{section.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
                <p className="font-semibold text-slate-800 mb-1">Need assistance?</p>
                <p className="mb-3">Contact our privacy team directly for data requests or compliance inquiries.</p>
                <a 
                  href="mailto:jude@blyntic.co.nz" 
                  className="inline-flex items-center gap-1.5 text-blue-600 font-medium hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  jude@blyntic.co.nz
                </a>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-14">

            {/* Section 1 */}
            <section id="overview" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  1. Overview & Scope of this Policy
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Welcome to <strong>Blyntic</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Blyntic is a specialized artificial intelligence automation agency headquartered in Auckland, New Zealand. We design, deploy, and maintain 24/7 AI voice phone agents, conversational web/SMS chatbots, and bespoke workflow automations (using platforms such as Retell AI, Vapi, Voiceflow, n8n, and Make.com) for small, medium, and enterprise businesses across New Zealand and internationally.
                </p>
                <p>
                  This Privacy Policy governs your use of our website (<a href="https://www.blyntic.co.nz" className="text-blue-600 hover:underline">https://www.blyntic.co.nz</a>), client onboarding portals, consultation booking forms, and interactions with automated phone or web agents configured or maintained by Blyntic. It describes:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                  <li>What personal and business information we collect, directly or through automated tools.</li>
                  <li>The lawful basis and specific operational purposes for collecting and processing that data.</li>
                  <li>How Google services, Google Analytics, and third-party AI service providers handle data.</li>
                  <li>Your rights to access, inspect, rectify, or purge your personal records.</li>
                  <li>The strict technical safeguards and encryption standards deployed to safeguard your information.</li>
                </ul>
                <p>
                  By accessing our website, testing our demonstration agents, or engaging our services, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 2 */}
            <section id="information-collected" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  2. Information We Collect
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  We collect information in three primary ways: information you directly provide to us, information collected automatically during your visit, and information captured during phone or chat interactions with automated agents.
                </p>

                <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">A. Information You Provide Directly</h3>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                  <li><strong>Contact Details:</strong> Your full name, business or trading name, professional email address, phone number, and physical business location when you submit an enquiry form or schedule a consultation.</li>
                  <li><strong>Project & Consultation Requirements:</strong> Information regarding your software stack, current CRM, weekly call volumes, workflow pain points, and commercial objectives shared during exploratory calls or form submissions.</li>
                  <li><strong>Billing & Account Information:</strong> Company registration numbers (NZBN where applicable), invoicing contact details, and payment billing addresses. Credit card details are securely handled via certified PCI-DSS compliant payment gateways (e.g., Stripe) and are never stored on Blyntic servers.</li>
                </ul>

                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">B. AI Voice Agent & Conversational Data</h3>
                <p>
                  When you or your callers interact with Blyntic demonstration agents or AI voice agents deployed on behalf of our business:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                  <li><strong>Audio Recordings:</strong> Voice audio captured over telephony networks to enable real-time speech-to-text processing, latency optimization, and quality assurance.</li>
                  <li><strong>Call Transcripts:</strong> Text transcriptions generated in real-time during conversations to extract customer intent, book calendar appointments, and populate CRM fields.</li>
                  <li><strong>Telephony Metadata:</strong> Caller ID, timestamp of the call, duration, geographic routing signals, call disposition, and transfer history.</li>
                </ul>

                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">C. Automatically Collected Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                  <li><strong>Device & Network Identifiers:</strong> Internet Protocol (IP) address, browser type and version, operating system, language preferences, and device characteristics.</li>
                  <li><strong>Usage & Navigation Metrics:</strong> Pages viewed, time spent on each page, referral URLs, navigation pathways, scroll depth, and interaction timestamps.</li>
                  <li><strong>Cookies & Local Storage:</strong> Technical identifiers stored on your device to maintain session states and assist with website performance (see Section 5).</li>
                </ul>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 3 */}
            <section id="how-we-use" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  3. How We Use Your Data
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Blyntic processes personal and business data strictly for legitimate operational purposes under the <strong>New Zealand Privacy Act 2020</strong> (Information Privacy Principles) and applicable international data protection standards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Service Execution & Delivery
                    </h4>
                    <p className="text-xs text-slate-600">
                      Designing, testing, and deploying custom AI voice flows, training conversational knowledge bases, and integrating CRM connections.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Client Communication
                    </h4>
                    <p className="text-xs text-slate-600">
                      Answering consultation inquiries, providing project progress updates, coordinating onboarding sessions, and technical support.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Security & Fraud Prevention
                    </h4>
                    <p className="text-xs text-slate-600">
                      Monitoring system health, preventing denial-of-service attempts, protecting infrastructure integrity, and enforcing acceptable use.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Legal & Accounting Compliance
                    </h4>
                    <p className="text-xs text-slate-600">
                      Satisfying statutory New Zealand tax, corporate recordkeeping, invoicing, and dispute resolution requirements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 4 - Google Services and Third Parties */}
            <section id="google-and-third-parties" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  4. Google Services & Third-Party Platform Disclosures
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  To provide enterprise-grade web performance, analytics, and automation, Blyntic collaborates with trusted industry vendors. In compliance with <strong>Google&apos;s Developer and Webmaster Privacy Policy Guidelines</strong>, we disclose our use of Google services and our third-party ecosystem:
                </p>

                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-blue-950 text-base flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Google Analytics & Google Services Disclosure
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Our website may utilize Google Analytics and related Google Cloud services. Google Analytics collects information such as how often users visit this site, what pages they visit, and what other sites they used prior to coming here. We use the information we get from Google Analytics solely to improve our website and client user experience.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Google&apos;s ability to use and share information collected by Google Analytics about your visits to this site is governed by the <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold underline inline-flex items-center gap-1">Google Analytics Terms of Service <ExternalLink className="w-3 h-3" /></a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold underline inline-flex items-center gap-1">Google Privacy Policy <ExternalLink className="w-3 h-3" /></a>.
                  </p>
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-blue-100">
                    To learn more about how Google collects and processes data when you use partner sites, review Google&apos;s designated notice: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-medium">How Google uses data when you use our partners&apos; sites or apps</a>.
                  </p>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-6 mb-2">Google Workspace & API User Data Policy Compliance</h3>
                <p>
                  If you authorize Blyntic to integrate with your Google Workspace accounts (e.g., Google Calendar for real-time appointment booking or Gmail for notification delivery), our use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Google API Services User Data Policy <ExternalLink className="w-3 h-3" /></a>, including the <strong>Limited Use</strong> requirements:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
                  <li>We access only the explicit Google API scopes necessary to execute your designated automation (e.g., creating calendar reservations).</li>
                  <li>We never transfer your Google user data to external third parties for advertising or commercial surveillance.</li>
                  <li>Human access to your raw Google Workspace data is strictly prohibited unless you have provided affirmative written consent for technical debugging.</li>
                </ul>

                <h3 className="text-base font-bold text-slate-900 mt-6 mb-2">Core AI & Infrastructure Technology Partners</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <p className="font-semibold text-slate-900 text-sm">Voice AI Platforms (Retell AI & Vapi)</p>
                    <p className="text-xs text-slate-600 mt-0.5">Used for low-latency speech synthesis, telephony session routing, and speech-to-text conversion for inbound phone agents.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <p className="font-semibold text-slate-900 text-sm">Large Language Models (OpenAI, Anthropic, Google Gemini)</p>
                    <p className="text-xs text-slate-600 mt-0.5">Used via enterprise API endpoints with zero-data-retention agreements to analyze intent and draft conversational responses without model training.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <p className="font-semibold text-slate-900 text-sm">Workflow & Database Automation (n8n, Make.com, Firebase)</p>
                    <p className="text-xs text-slate-600 mt-0.5">Used to bridge secure webhook payloads between client CRMs (HubSpot, Pipedrive, GoHighLevel, Xero) and telephony tools.</p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 5 - Cookies */}
            <section id="cookies-analytics" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  5. Cookies & Tracking Technologies
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Our website uses cookies and similar tracking technologies (such as local web storage and pixel tags) to provide, protect, and optimize our services. A cookie is a small data file transferred to your device.
                </p>

                <h3 className="text-base font-bold text-slate-900 mt-4 mb-2">Categories of Cookies We Use</h3>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                  <li><strong>Strictly Necessary Cookies:</strong> Essential for you to browse the site, use core features, and access secure account areas. Without these cookies, services like login authentication cannot function.</li>
                  <li><strong>Performance & Analytics Cookies:</strong> Enable us to recognize and count visitors and understand how visitors move around our site (e.g., via Google Analytics). This assists us in optimizing navigation and load times.</li>
                  <li><strong>Advertising & Conversion Tracking (Meta Pixel):</strong> We use the Meta Pixel (Facebook Pixel) provided by Meta Platforms, Inc. to measure conversion events (e.g., booking consultation calls or submitting inquiry forms) and optimize advertising audiences. Meta may associate this activity with your Facebook or Instagram account in accordance with Meta&apos;s Data Policy.</li>
                  <li><strong>Functional Cookies:</strong> Used to recognize you when you return to our website, remember your preferences (such as audio volume or form pre-fills), and personalize your visit.</li>
                </ul>

                <h3 className="text-base font-bold text-slate-900 mt-6 mb-2">How to Manage & Opt Out of Cookies</h3>
                <p>
                  You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Google Analytics Opt-Out:</p>
                    <p className="text-xs text-slate-600 mb-2">
                      To opt out of measurement by Google Analytics, use the official browser add-on.
                    </p>
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Google Analytics Opt-out <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Meta Ad Preferences & Opt-Out:</p>
                    <p className="text-xs text-slate-600 mb-2">
                      To opt out of interest-based ads delivered by Meta, adjust your Meta account preferences or visit the Digital Advertising Alliance.
                    </p>
                    <a 
                      href="https://www.facebook.com/adpreferences" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Meta Ad Preferences <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 6 - AI Protections */}
            <section id="ai-training-protections" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  6. AI Data & Model Training Protections
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  As an artificial intelligence automation agency, we maintain strict contractual and architectural protections regarding generative AI model interactions:
                </p>
                <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Zero Public Model Training Guarantee
                  </h3>
                  <p className="text-sm text-emerald-900 leading-relaxed">
                    Blyntic accesses foundational LLMs (such as OpenAI GPT-4o, Anthropic Claude 3.5, and Google Gemini) exclusively through commercial enterprise API channels. Under enterprise terms of service, customer inputs, system prompts, client knowledge base uploads, and transcribed telephone audio are <strong>never used to train, retrain, or improve public foundation models</strong>.
                  </p>
                </div>
                <p>
                  Furthermore, client knowledge bases and proprietary CRM records are kept in segregated vector databases or client-owned accounts. When our engagement concludes, all client data and credentials remain under your exclusive ownership.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 7 - Data Sharing */}
            <section id="data-sharing-disclosure" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  7. Data Sharing & Non-Sale Policy
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  <strong>Blyntic does not sell, lease, rent, or trade your personal information</strong> to third parties for monetary or other commercial consideration.
                </p>
                <p>
                  We share personal information solely in the following limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                  <li><strong>Authorized Sub-Processors:</strong> Trusted technology providers (cloud hosting, telephony carrier networks, email dispatch, CRM connectors) bound by strict confidentiality and data protection agreements.</li>
                  <li><strong>With Your Direct Consent:</strong> When you instruct us to connect third-party business applications (e.g., linking your Voiceflow agent to your Xero or HubSpot account).</li>
                  <li><strong>Legal & Regulatory Compliance:</strong> If required by valid court order, search warrant, subpoena, or New Zealand statutory body enforcing national legislation.</li>
                  <li><strong>Business Reorganization:</strong> In the event of a merger, acquisition, financing, or sale of company assets, client records may be transferred subject to the terms of this Privacy Policy.</li>
                </ul>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 8 - Storage & Retention */}
            <section id="storage-retention" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Server className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  8. Data Retention & Storage
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  We retain personal information only for the duration necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or statutory legal obligations).
                </p>
                <div className="space-y-3 my-4">
                  <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Client Account & Consultation Records</h4>
                      <p className="text-xs text-slate-600">Retained for the duration of the active commercial relationship plus 7 years for tax and corporate compliance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">AI Voice Recordings & Transcripts</h4>
                      <p className="text-xs text-slate-600">Configured to client retention preferences (default 30 to 90 days for quality assurance, or purged immediately post-session upon request).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Server & Telemetry Logs</h4>
                      <p className="text-xs text-slate-600">Retained for 90 days for cybersecurity anomaly detection and performance diagnostics, after which they are permanently overwritten.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 9 - Security */}
            <section id="security-measures" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  9. Security & Encryption Safeguards
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Blyntic deploys multi-layered technical, physical, and administrative security measures engineered to protect personal information from unauthorized access, loss, misuse, alteration, or destruction:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      Encryption in Transit & At Rest
                    </h4>
                    <p className="text-xs text-slate-600">
                      All network traffic is enforced via modern Transport Layer Security (TLS 1.3 / HTTPS). Stored database assets and backups are encrypted at rest using AES-256 standard encryption.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      Role-Based Access Controls
                    </h4>
                    <p className="text-xs text-slate-600">
                      Strict least-privilege principles are enforced. Only authenticated Blyntic engineers with mandatory multi-factor authentication (MFA) can access production deployments.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-indigo-600" />
                      Enterprise Cloud Infrastructure
                    </h4>
                    <p className="text-xs text-slate-600">
                      Our servers and container clusters are hosted in SOC 2 Type II and ISO 27001 certified Google Cloud and AWS datacenters with automated vulnerability scanning.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      Continuous Patch Management
                    </h4>
                    <p className="text-xs text-slate-600">
                      Regular dependency auditing, static code analysis, and routine penetration testing protect against modern web application attack vectors.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 10 - User Rights */}
            <section id="user-rights" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  10. Your Privacy Rights & Choices
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Depending on your jurisdiction, you hold fundamental rights regarding your personal information under the <strong>New Zealand Privacy Act 2020</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and other applicable global privacy regulations:
                </p>
                <div className="space-y-2.5 my-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">Right to Confirmation & Access</p>
                    <p className="text-xs text-slate-600 mt-0.5">You have the right to obtain confirmation as to whether we hold personal information about you and request a readable copy.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">Right to Correction & Rectification</p>
                    <p className="text-xs text-slate-600 mt-0.5">You have the right to request that inaccurate, incomplete, or out-of-date personal data be corrected promptly.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</p>
                    <p className="text-xs text-slate-600 mt-0.5">You can request the deletion of your personal information, subject to statutory retention obligations.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">Right to Object or Restrict Processing</p>
                    <p className="text-xs text-slate-600 mt-0.5">You may object to or restrict processing of your information for marketing or profiling purposes.</p>
                  </div>
                </div>
                <p>
                  To exercise any of these rights, email our designated privacy team at <a href="mailto:jude@blyntic.co.nz" className="text-blue-600 font-semibold hover:underline">jude@blyntic.co.nz</a>. We respond to all formal requests within 20 working days, in accordance with the New Zealand Privacy Act.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 11 - International Transfers */}
            <section id="international-transfers" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  11. Cross-Border Data Transfers
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Blyntic is located in New Zealand. To deliver international cloud reliability, high-speed telephony routing, and generative AI computing, your information may be transferred to, stored, and processed in cloud datacenters outside of New Zealand (e.g., in Australia, the United States, or the European Union).
                </p>
                <p>
                  When transferring information internationally, Blyntic ensures appropriate safeguards are in place in compliance with <strong>Information Privacy Principle 12 of the NZ Privacy Act 2020</strong> and standard contractual clauses (SCCs), ensuring that overseas recipients provide comparable privacy protections.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 12 - Children's Privacy */}
            <section id="children-privacy" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  12. Children&apos;s Privacy
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Our website and business automation services are intended exclusively for commercial entities and individuals aged 18 and older. We do not knowingly solicit, collect, or process personal data from children under the age of 16. If we become aware that a child has provided us with personal information, we will take immediate steps to delete such data from our databases.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 13 - Changes to Policy */}
            <section id="policy-updates" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  13. Changes to this Privacy Policy
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  We may periodically update this Privacy Policy to reflect changes in our operational practices, new AI features, vendor updates, or applicable statutory laws.
                </p>
                <p>
                  When changes are published, we will revise the &ldquo;Effective Date&rdquo; at the top of this document. For significant updates affecting your rights, we will provide prominent notice on our homepage or via direct email to registered clients before the changes take effect.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 14 - Contact Officer */}
            <section id="contact-officer" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                  14. Contact Our Privacy Officer & NZ Privacy Commissioner
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  If you have questions regarding this Privacy Policy, wish to exercise your statutory privacy rights, or have concerns regarding how your information is handled, please contact our designated Privacy Officer:
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-4 space-y-3">
                  <p className="font-bold text-slate-950 text-base">Blyntic Privacy Officer</p>
                  <p className="text-sm text-slate-700">Attn: Jude Alattraqchi (Founder & Privacy Lead)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 pt-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href="mailto:jude@blyntic.co.nz" className="text-blue-600 hover:underline">jude@blyntic.co.nz</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>(+64) 223 037 330</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Auckland, New Zealand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href="https://www.blyntic.co.nz" className="text-blue-600 hover:underline">www.blyntic.co.nz</a>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-6 mb-2">New Zealand Office of the Privacy Commissioner</h3>
                <p className="text-xs text-slate-600">
                  If you are not satisfied with our response to your privacy request, you have the right under New Zealand law to contact the Office of the Privacy Commissioner (OPC):
                </p>
                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  <p><strong>Website:</strong> <a href="https://www.privacy.org.nz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">privacy.org.nz <ExternalLink className="w-3 h-3" /></a></p>
                  <p><strong>Phone:</strong> 0800 803 909 (NZ toll-free) | (+64) 4 474 7590</p>
                  <p><strong>Enquiries:</strong> enquiries@privacy.org.nz</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom Contact CTA Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-800">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
            Have Questions About How Blyntic Protects Your Data?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Our team is committed to complete transparency in voice AI, conversational bots, and automated business integrations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href="#/contact" className="px-8 py-3.5">
              Contact Our Team
            </Button>
            <Button variant="white" href="mailto:jude@blyntic.co.nz" className="px-8 py-3.5">
              Email Privacy Officer
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
