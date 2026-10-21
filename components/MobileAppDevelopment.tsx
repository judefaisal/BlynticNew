import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Apple, Tablet, Cpu, Layers, 
  ShieldCheck, Zap, Code2, Cloud, Sparkles, 
  CheckCircle2, ArrowRight, Server, Database, 
  Activity, Lock, RefreshCw, Send, Sliders,
  HelpCircle, ChevronDown, ChevronUp, Bell,
  Workflow, Check, DollarSign
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

interface TechStackItem {
  name: string;
  category: string;
  badge: string;
  description: string;
}

const MobileAppDevelopment: React.FC = () => {
  const [activePlatformTab, setActivePlatformTab] = useState<'ios' | 'android' | 'cross' | 'ai'>('ios');
  
  // Interactive App Cost Estimator State
  const [platformChoice, setPlatformChoice] = useState<'both' | 'ios' | 'android'>('both');
  const [appType, setAppType] = useState<'mvp' | 'business' | 'enterprise'>('business');
  const [hasAI, setHasAI] = useState<boolean>(true);
  const [hasOfflineSync, setHasOfflineSync] = useState<boolean>(true);
  const [hasPayments, setHasPayments] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate rough estimate for client preview
  const calculateEstimate = () => {
    let baseWeeks = 6;
    let basePrice = 12000;

    if (platformChoice === 'both') {
      baseWeeks += 4;
      basePrice += 8000;
    } else {
      baseWeeks += 2;
    }

    if (appType === 'business') {
      baseWeeks += 3;
      basePrice += 10000;
    } else if (appType === 'enterprise') {
      baseWeeks += 6;
      basePrice += 22000;
    }

    if (hasAI) {
      baseWeeks += 2;
      basePrice += 6500;
    }
    if (hasOfflineSync) {
      baseWeeks += 1;
      basePrice += 3500;
    }
    if (hasPayments) {
      baseWeeks += 1;
      basePrice += 2500;
    }

    return { weeks: baseWeeks, price: basePrice };
  };

  const estimate = calculateEstimate();

  const faqs = [
    {
      q: "Do you develop for both Apple iOS and Google Android?",
      a: "Yes. We develop native iOS (Swift/SwiftUI) and native Android (Kotlin/Jetpack Compose), as well as enterprise cross-platform solutions (Flutter and React Native). We evaluate your business requirements, timeline, and budget to recommend the optimal architecture."
    },
    {
      q: "How does Blyntic incorporate AI into mobile apps?",
      a: "We embed both edge on-device AI (such as Apple Neural Engine, CoreML, and lightweight on-device models for sub-second, privacy-first processing) and serverless cloud AI pipelines (Gemini, OpenAI, voice agents, real-time transcription, and smart predictive recommendations)."
    },
    {
      q: "Do you manage the Apple App Store and Google Play Store submission?",
      a: "Absolutely. We manage the entire lifecycle from developer account setup, test deployment via TestFlight and Google Play Internal Testing, metadata and screenshot preparation, to navigating Apple's Human Interface Guidelines and Google Play policies until full public store approval."
    },
    {
      q: "Who owns the intellectual property (IP) and source code?",
      a: "You do. 100% of the code, UI/UX assets, repository access, and database schemas belong exclusively to your business once milestones are delivered."
    },
    {
      q: "Can you connect the mobile app to our existing CRM, ERP, and databases?",
      a: "Yes. Our team specializes in connecting mobile apps with legacy backends, SQL/PostgreSQL databases, Firebase, custom GraphQL/REST APIs, and automated n8n/Make pipelines for seamless two-way data sync."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 selection:bg-blue-200">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6 border border-blue-100 shadow-sm">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>iOS & Android App Development</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
              Custom Mobile Apps Built for <br className="hidden sm:inline" />
              <span className="text-blue-600">iOS & Android Excellence</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              We design, engineer, and deploy high-performance custom mobile solutions for our clients. Fusing intuitive UX, native speed, offline-first reliability, and on-device AI workflows.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="black" href="#/talk-to-sales" className="w-full sm:w-auto text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                Talk to our app architects
              </Button>
              <a 
                href="#app-estimator" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors gap-2"
              >
                <Sliders className="w-4 h-4 text-blue-600" />
                Estimate your app budget
              </a>
            </div>
          </Reveal>
        </div>

        {/* Hero Visual Showcase — Generated Image */}
        <Reveal delay={0.35}>
          <div className="relative max-w-5xl mx-auto mb-24 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-slate-950 group">
            <div className="relative aspect-video w-full overflow-hidden">
              <img 
                src="/src/assets/images/mobile_apps_dev_1792621021851.jpg" 
                alt="Custom iOS and Android enterprise mobile app development with intelligent workflows, analytics dashboards, and responsive interfaces"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  <Apple className="w-3.5 h-3.5 text-white" /> iOS Native (SwiftUI)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Android (Jetpack Compose)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-semibold border border-blue-400/30">
                  <Cpu className="w-3.5 h-3.5" /> Edge & On-Device AI
                </span>
              </div>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-wider text-blue-400 font-mono font-semibold mb-1">Production Architecture</p>
                  <h3 className="text-lg sm:text-2xl font-bold font-display leading-snug">Enterprise Cross-Platform & Native Mobile Engineering</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">From real-time field operations to executive companion dashboards, we turn complex client workflows into tactile, polished mobile software.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs text-white font-medium">Ready for App Store & Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Core Pillars Grid */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                What We Build For Our Clients
              </h2>
              <p className="text-gray-600 text-lg">
                Every business has distinct operational bottlenecks. We develop bespoke mobile applications engineered precisely for your team and customers.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Workflow className="w-6 h-6 text-blue-600" />,
                title: "Field Service & Operations Apps",
                desc: "Offline-first mobile tools for dispatchers, technicians, and mobile teams. Built with background GPS, photo signature capture, and instant local SQLite-to-cloud syncing.",
                tag: "High Efficiency"
              },
              {
                icon: <Activity className="w-6 h-6 text-purple-600" />,
                title: "B2B SaaS Companion & Dashboards",
                desc: "Extend your web portal into your client's pocket. Push notification alerts, real-time KPI telemetry, one-tap approvals, and multi-factor biometric authentication.",
                tag: "Executive Polish"
              },
              {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: "Customer Portals & Booking Apps",
                desc: "Frictionless direct-to-consumer portals with Apple Pay and Google Pay integration, live service tracking, appointment scheduling, and customer check-in.",
                tag: "Direct Revenue"
              },
              {
                icon: <Cpu className="w-6 h-6 text-emerald-600" />,
                title: "AI-Augmented Mobile Tools",
                desc: "Embed voice commands, instant document OCR scanning, smart edge vision models, and natural language query interfaces right inside your mobile experience.",
                tag: "Next-Gen Tech"
              },
              {
                icon: <Lock className="w-6 h-6 text-rose-600" />,
                title: "Enterprise Fleet & Internal Tools",
                desc: "Secure private enterprise apps distributed via Apple Business Manager and Android Enterprise MDM. Zero public store exposure with single-sign-on (SSO).",
                tag: "Enterprise Grade"
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-cyan-600" />,
                title: "Modern App Rewrites & Optimization",
                desc: "Got a sluggish legacy codebase or broken hybrid app? We audit, refactor, and migrate existing apps to fluid modern architectures with 60fps animations.",
                tag: "Modernization"
              }
            ].map((pillar, idx) => (
              <Reveal key={idx} delay={0.05 * idx}>
                <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                        {pillar.icon}
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-sm font-semibold text-blue-600 gap-1 group-hover:gap-2 transition-all">
                    <span>Explore architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Platform & Engineering Deep Dive (Interactive Tabs) */}
        <div className="mb-28 bg-slate-900 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Tech Stack & Frameworks</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">
                Tailored for iOS, Android & Hybrid Scale
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We select the right mobile engineering foundation based on your exact app performance, latency, and hardware sensor requirements.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-800/80 backdrop-blur rounded-2xl max-w-2xl mx-auto mb-10 border border-slate-700">
              {[
                { id: 'ios', label: 'Apple iOS', icon: <Apple className="w-4 h-4" /> },
                { id: 'android', label: 'Android OS', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'cross', label: 'Cross-Platform (Flutter / RN)', icon: <Layers className="w-4 h-4" /> },
                { id: 'ai', label: 'AI & Edge Intelligence', icon: <Cpu className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activePlatformTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8">
              {activePlatformTab === 'ios' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-xs font-mono text-slate-300 mb-4">
                      <Apple className="w-3.5 h-3.5 text-white" /> Swift 6 & SwiftUI
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3">Native Apple Ecosystem</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Engineered for iPhone, iPad, Apple Watch, and macOS with buttery 120Hz ProMotion response. Full support for iOS Live Activities, Dynamic Island, Widgets, Apple Pay, FaceID, and Background App Refresh.
                    </p>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>SwiftUI declarative interfaces with native gestures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>CoreData & SwiftData for zero-latency local caching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>TestFlight beta distribution & App Store review readiness</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 font-mono text-xs text-slate-300 space-y-2">
                    <p className="text-slate-500">// Apple iOS Architecture</p>
                    <p className="text-purple-400">struct <span className="text-blue-300">EnterpriseAppView</span>: View &#123;</p>
                    <p className="pl-4 text-slate-300">@StateObject var workflow = WorkflowVM()</p>
                    <p className="pl-4 text-slate-300">var body: some View &#123;</p>
                    <p className="pl-8 text-emerald-400">NavigationStack &#123;</p>
                    <p className="pl-12 text-slate-300">RealtimeDashboard()</p>
                    <p className="pl-16 text-yellow-300">.biometricAuthProtected()</p>
                    <p className="pl-16 text-yellow-300">.offlineSynced()</p>
                    <p className="pl-8 text-emerald-400">&#125;</p>
                    <p className="pl-4 text-slate-300">&#125;</p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                </div>
              )}

              {activePlatformTab === 'android' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-xs font-mono text-slate-300 mb-4">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Kotlin & Jetpack Compose
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3">Modern Native Android</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Built for the diverse Android ecosystem—from Samsung flagship phones to ruggedized Zebra field scanners and tablets. Clean Architecture, Material You theming, and resilient background work managers.
                    </p>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Jetpack Compose for reactive, performant rendering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Room Database & WorkManager for guaranteed offline queuing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Full compliance with Google Play Store target SDK policies</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 font-mono text-xs text-slate-300 space-y-2">
                    <p className="text-slate-500">// Android Kotlin Compose</p>
                    <p className="text-purple-400">@Composable</p>
                    <p className="text-blue-300">fun <span className="text-yellow-300">BlynticAndroidClient</span>(vm: ClientVM) &#123;</p>
                    <p className="pl-4 text-slate-300">val state by vm.uiState.collectAsStateWithLifecycle()</p>
                    <p className="pl-4 text-emerald-400">Scaffold(topBar = &#123; Header() &#125;) &#123; padding -&gt;</p>
                    <p className="pl-8 text-slate-300">WorkforceDispatchList(</p>
                    <p className="pl-12 text-yellow-300">items = state.tasks,</p>
                    <p className="pl-12 text-yellow-300">onSyncAction = &#123; vm.instantPush(it) &#125;</p>
                    <p className="pl-8 text-slate-300">)</p>
                    <p className="pl-4 text-emerald-400">&#125;</p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                </div>
              )}

              {activePlatformTab === 'cross' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-xs font-mono text-slate-300 mb-4">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Flutter / React Native
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3">Single Codebase, Dual Store Presence</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      For fast-growing companies that need to ship to both Apple App Store and Google Play on an accelerated timeline, our cross-platform solutions share up to 90% of business logic while maintaining true native feel.
                    </p>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Accelerated time-to-market with synchronized feature rollouts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Lower long-term maintenance overhead with unified QA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Native bridge modules for hardware sensors & Bluetooth</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Code Reusability</span>
                        <span className="text-cyan-400 font-mono font-bold">~85% - 92%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full w-[90%]"></div>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Time to Dual-Store Launch</span>
                        <span className="text-blue-400 font-mono font-bold">4 - 8 Weeks</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-[75%]"></div>
                      </div>

                      <div className="p-3 bg-slate-800/80 rounded-lg text-xs text-slate-300 border border-slate-700">
                        ⚡ Recommended when launch velocity, dual-platform parity, and budget efficiency are paramount.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePlatformTab === 'ai' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-xs font-mono text-slate-300 mb-4">
                      <Cpu className="w-3.5 h-3.5 text-blue-400" /> Edge Intelligence
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3">On-Device & Hybrid Mobile AI</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Modern mobile apps shouldn't rely solely on heavy internet connections for intelligence. We bring smart assistants, image categorization, speech recognition, and smart summaries onto the device itself.
                    </p>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>Zero-latency inference without server roundtrips</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>Extreme user privacy: sensitive customer data stays on the device</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>Hybrid fallback to Gemini / Cloud LLM when deep reasoning is needed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 text-xs text-slate-300 space-y-3 font-mono">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                      <span className="text-blue-400 font-bold">Edge AI Capability</span>
                      <span className="text-slate-400">Response Speed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Device Audio Transcription</span>
                      <span className="text-emerald-400">&lt; 150ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Camera OCR Document Scanning</span>
                      <span className="text-emerald-400">&lt; 80ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Offline Smart Search & Embeddings</span>
                      <span className="text-emerald-400">&lt; 50ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Serverless Cloud Workflow Sync</span>
                      <span className="text-blue-400">Background</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5-Step App Delivery Pipeline */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <span className="text-xs font-mono tracking-widest text-blue-600 uppercase font-bold">Our Proven Process</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-4">
                From Concept to App Store in 5 Steps
              </h2>
              <p className="text-gray-600">
                We remove guesswork with transparent sprint cycles, weekly interactive builds, and dedicated App Store release management.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "Blueprint & UI/UX",
                desc: "We analyze your workflows and deliver interactive Figma prototypes tested on actual devices within 7 days."
              },
              {
                step: "02",
                title: "Architecture & API",
                desc: "We establish secure backend endpoints, database models, auth flows, and offline sync schemas."
              },
              {
                step: "03",
                title: "Agile Sprints",
                desc: "Bi-weekly builds delivered directly to your phone via TestFlight (iOS) and Google Play Internal."
              },
              {
                step: "04",
                title: "Security & Store Review",
                desc: "Rigorous penetration testing, Apple Human Interface audit, and zero-rejection store submission handling."
              },
              {
                step: "05",
                title: "SLA & Evolution",
                desc: "Continuous OS updates (new iOS & Android releases), crash monitoring, telemetry, and feature scaling."
              }
            ].map((stage, idx) => (
              <Reveal key={idx} delay={0.08 * idx}>
                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-display font-bold text-blue-600/30 mb-4 block">
                      {stage.step}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{stage.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-medium text-emerald-600 gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Sprint milestone</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Interactive App Cost & Timeline Estimator */}
        <div id="app-estimator" className="mb-28 scroll-mt-28">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-700/80 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-medium mb-2 border border-blue-400/30">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> Interactive Estimator
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">Calculate Your Mobile Project</h3>
                <p className="text-slate-400 text-sm mt-1">Select your ideal parameters to see an approximate engineering sprint timeline.</p>
              </div>
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl px-6 py-4 text-center md:text-right">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-mono">Estimated Sprint Duration</span>
                <span className="text-2xl font-bold font-display text-blue-400">{estimate.weeks} - {estimate.weeks + 2} Weeks</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Configuration Controls */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-2 font-semibold">1. Target Platforms</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'both', label: 'iOS & Android' },
                      { id: 'ios', label: 'iOS Only' },
                      { id: 'android', label: 'Android Only' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPlatformChoice(opt.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          platformChoice === opt.id
                            ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-2 font-semibold">2. Solution Scope</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'mvp', label: 'MVP Core' },
                      { id: 'business', label: 'Business App' },
                      { id: 'enterprise', label: 'Enterprise Suite' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAppType(opt.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          appType === opt.id
                            ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-2 font-semibold">3. Capabilities & Integrations</label>
                  <div className="space-y-2.5">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-2.5 text-xs text-slate-200">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        <span>AI Assistant / Voice & Smart Search</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={hasAI} 
                        onChange={(e) => setHasAI(e.target.checked)} 
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-2.5 text-xs text-slate-200">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span>Offline Database & Auto-Sync Engine</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={hasOfflineSync} 
                        onChange={(e) => setHasOfflineSync(e.target.checked)} 
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-2.5 text-xs text-slate-200">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        <span>Apple Pay, Google Pay & Stripe Gateway</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={hasPayments} 
                        onChange={(e) => setHasPayments(e.target.checked)} 
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Output Card */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold font-display text-white mb-2">Estimated Deliverables</h4>
                  <ul className="space-y-2 text-xs text-slate-300 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{platformChoice === 'both' ? 'Dual iOS & Android Store Build' : `${platformChoice.toUpperCase()} Dedicated App`}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Interactive Figma wireframes & device preview link</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>App Store & Google Play Store submission management</span>
                    </li>
                    {hasAI && (
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>Custom Edge / Cloud AI pipeline integration</span>
                      </li>
                    )}
                    {hasOfflineSync && (
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>Offline SQLite storage + conflict-free cloud sync</span>
                      </li>
                    )}
                    {hasPayments && (
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>One-tap native payments (Apple Pay / Google Pay)</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>100% Client Code & IP ownership</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Button 
                    variant="primary" 
                    href="#/talk-to-sales" 
                    className="w-full text-center py-3.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 shadow-lg text-white"
                  >
                    Lock in your app sprint & quote
                  </Button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Free technical discovery call with our lead mobile architects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-28">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm">
                Everything you need to know about custom mobile app development with Blyntic.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-10 md:p-16 text-center max-w-4xl mx-auto overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-medium mb-4 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Start Building Today
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Ready to Build Your Custom iOS or Android App?
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's talk through your app features, technical architecture, and timeline. Get a free proposal and clickable prototype timeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" href="#/talk-to-sales" className="w-full sm:w-auto text-base px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold">
                Talk to our app architects
              </Button>
              <Button variant="outline" href="#/contact" className="w-full sm:w-auto text-base px-8 py-4 border-slate-600 text-white hover:bg-slate-800">
                Send project inquiry
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileAppDevelopment;
