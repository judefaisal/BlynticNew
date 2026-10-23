import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  FileCode2, 
  Copy, 
  Check, 
  ExternalLink, 
  Calendar, 
  Star, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Smartphone,
  MessageCircle,
  Phone,
  Bot,
  Layout,
  Cpu,
  Megaphone,
  ArrowRight,
  Share2
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { staticBlogs } from '../src/blogData';

const GBPSitemap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solutions' | 'blog' | 'gsc'>('solutions');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const domain = 'https://www.blyntic.co.nz';

  const gscSitemaps = [
    {
      name: 'Solutions & Services Sitemap',
      filename: 'sitemap-solutions.xml',
      fullUrl: `${domain}/sitemap-solutions.xml`,
      description: 'Contains all 7 core solution pages, appointment booking, and Google review collection URLs.',
      count: '12 URLs',
      badge: 'Google Business Profile'
    },
    {
      name: 'Blog & Editorial Knowledge Sitemap',
      filename: 'sitemap-blog.xml',
      fullUrl: `${domain}/sitemap-blog.xml`,
      description: 'Contains all editorial guides, AI tutorials, technical explainers, and thought leadership articles.',
      count: `${staticBlogs.length + 1} URLs`,
      badge: 'Blog & Articles'
    },
    {
      name: 'Complete Master Index Sitemap',
      filename: 'sitemap.xml',
      fullUrl: `${domain}/sitemap.xml`,
      description: 'Full comprehensive sitemap indexing every page across the entire Blyntic platform.',
      count: `${staticBlogs.length + 14} URLs`,
      badge: 'Master Sitemap'
    }
  ];

  const gbpServices = [
    {
      id: 'apps-development',
      title: 'Apps Development (iOS & Android)',
      category: 'Software Company / Mobile App Development',
      url: `${domain}/apps-development`,
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      description: 'Custom iOS and Android mobile app development for businesses. Native Swift, Kotlin, Flutter, cross-platform architecture, offline-first database sync, and App Store submission.'
    },
    {
      id: 'ai-social-media-reply',
      title: 'AI Social Media Reply & Omnichannel Sales',
      category: 'Marketing Agency / Social Media Automation',
      url: `${domain}/ai-social-media-reply`,
      icon: <MessageCircle className="w-5 h-5 text-rose-600" />,
      description: '24/7 autonomous AI replies for Instagram DMs, Facebook Messenger, and WhatsApp messages and calls. Qualifies inbound marketing leads and submits structured executive summaries to your CRM.'
    },
    {
      id: 'ai-customer-service',
      title: 'AI Phone Receptionist & 24/7 Voice Agents',
      category: 'Telecommunications / Answering Service',
      url: `${domain}/ai-customer-service`,
      icon: <Phone className="w-5 h-5 text-emerald-600" />,
      description: '24/7 AI telephone answering in natural Kiwi accents. Books appointments into Google Calendar/Cliniko/Timely, handles customer check-in, issues invoices, and answers FAQs without human delay.'
    },
    {
      id: 'ai-chatbots',
      title: 'Conversational AI Chatbots Integration',
      category: 'Software Application / Customer Service',
      url: `${domain}/ai-chatbots`,
      icon: <Bot className="w-5 h-5 text-indigo-600" />,
      description: 'Deploy bespoke, brand-tuned 24/7 AI-powered conversational chatbots to capture, engage, and qualify leads on your website automatically with live CRM synchronization.'
    },
    {
      id: 'smart-website',
      title: 'Smart Website & Modern AI Integration',
      category: 'Website Designer / Web Development Service',
      url: `${domain}/smart-website`,
      icon: <Layout className="w-5 h-5 text-amber-600" />,
      description: 'High-speed, conversion-engineered modern responsive websites equipped with large language models, smart search capabilities, and automated lead capture widgets.'
    },
    {
      id: 'full-ai-solution',
      title: 'Full Custom AI Solutions & Enterprise CRM Workflows',
      category: 'Business Management Consultant / Automation Service',
      url: `${domain}/full-ai-solution`,
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      description: 'End-to-end proprietary enterprise AI automation pipelines, customized n8n/Make systems, multi-agent workflows, and database integrations tailored strictly to your operations.'
    },
    {
      id: 'ai-marketing',
      title: 'AI Marketing & Automated Campaigns',
      category: 'Internet Marketing Service / Lead Generation',
      url: `${domain}/ai-marketing`,
      icon: <Megaphone className="w-5 h-5 text-cyan-600" />,
      description: 'Automated outbound cold email sequences, programmatic SEO generation, Meta ad lead qualification, and multichannel conversion tracking to scale customer acquisition.'
    }
  ];

  const gbpActionLinks = [
    {
      title: 'Google Business Profile Appointment Link',
      url: `${domain}/talk-to-sales`,
      field: 'Appointment URL',
      icon: <Calendar className="w-4 h-4 text-blue-600" />,
      description: 'Direct 30-minute consultation booking with calendar scheduling.'
    },
    {
      title: 'Google Business Profile Review Collector',
      url: `${domain}/review`,
      field: 'Review / Feedback URL',
      icon: <Star className="w-4 h-4 text-amber-500" />,
      description: 'AI-assisted customer review submission tool integrated with Google Business.'
    },
    {
      title: 'Google Business Profile Primary Website',
      url: `${domain}/`,
      field: 'Website URL',
      icon: <Globe className="w-4 h-4 text-emerald-600" />,
      description: 'Primary landing page and corporate identity.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 selection:bg-blue-200">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs md:text-sm mb-6 border border-blue-100 shadow-xs">
              <FileCode2 className="w-4 h-4" />
              <span>Sitemap & Google Business Profile Hub</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-950 mb-4 tracking-tight">
              Sitemaps for <span className="text-blue-600">Solutions & Blog</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dedicated XML sitemaps for Google Search Console, paired with ready-to-copy service descriptions and URLs formatted specifically for your Google Business Profile (GBP).
            </p>
          </Reveal>

          {/* TAB BUTTONS */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-white rounded-2xl max-w-xl mx-auto border border-gray-200 shadow-xs">
              <button
                onClick={() => setActiveTab('solutions')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'solutions'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Solutions Sitemap</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog Sitemap</span>
              </button>

              <button
                onClick={() => setActiveTab('gsc')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'gsc'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileCode2 className="w-4 h-4" />
                <span>XML Endpoints</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* TAB 1: SOLUTIONS & GBP SERVICES */}
        {activeTab === 'solutions' && (
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Quick Sitemaps Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-blue-300">Google Search Console Sitemap</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display mt-1">Solutions XML Sitemap</h3>
                <p className="text-sm text-blue-100 mt-1 max-w-xl">
                  Submit <code className="bg-white/20 px-2 py-0.5 rounded text-white font-mono text-xs">sitemap-solutions.xml</code> in Google Search Console to index all solution pages and GBP landing targets.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => copyToClipboard('sitemap-solutions.xml', 'gsc-solutions-file')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-950 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                >
                  {copiedKey === 'gsc-solutions-file' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>Copy for Search Console</span>
                </button>
                <a
                  href="/sitemap-solutions.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-blue-800 hover:bg-blue-700 text-white rounded-xl transition-colors"
                  title="View XML"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Core Action Links for Google Business Profile */}
            <div>
              <h3 className="text-xl font-bold font-display text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Primary Google Business Profile Links</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {gbpActionLinks.map((action, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {action.field}
                        </span>
                        {action.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{action.title}</h4>
                      <p className="text-xs text-gray-500 mb-4">{action.description}</p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-blue-600 truncate">{action.url}</span>
                      <button
                        onClick={() => copyToClipboard(action.url, `action-${idx}`)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Copy URL"
                      >
                        {copiedKey === `action-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7 Solutions for Google Business Profile Services Catalog */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Google Business Profile Services Catalog (7 Solutions)</span>
                </h3>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  Click copy to paste directly into GBP "Add Service"
                </span>
              </div>

              <div className="space-y-4">
                {gbpServices.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-blue-300 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">{service.title}</h4>
                          <span className="text-xs font-medium text-slate-500">Recommended Category: {service.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(service.url, `url-${idx}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedKey === `url-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copy URL</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(service.description, `desc-${idx}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedKey === `desc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copy Description</span>
                        </button>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Open Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BLOG SITEMAP & GBP POSTS */}
        {activeTab === 'blog' && (
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Quick Sitemaps Banner */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">Google Search Console Sitemap</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display mt-1">Blog & Editorial XML Sitemap</h3>
                <p className="text-sm text-emerald-100 mt-1 max-w-xl">
                  Submit <code className="bg-white/20 px-2 py-0.5 rounded text-white font-mono text-xs">sitemap-blog.xml</code> in Google Search Console to index all {staticBlogs.length} editorial guides and knowledge articles.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => copyToClipboard('sitemap-blog.xml', 'gsc-blog-file')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white text-emerald-950 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow-sm cursor-pointer"
                >
                  {copiedKey === 'gsc-blog-file' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>Copy for Search Console</span>
                </button>
                <a
                  href="/sitemap-blog.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl transition-colors"
                  title="View XML"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Articles for Google Business Profile Updates */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>Articles Ready to Post as Google Business Profile Updates</span>
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  Posting articles on GBP increases local search visibility
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {staticBlogs.slice(0, 8).map((article, idx) => {
                  const articleUrl = `${domain}/blog/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
                  const cleanExcerpt = article.content.replace(/[#*`\-]/g, '').substring(0, 160).trim() + '...';

                  return (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            {article.category || 'AI Insights'}
                          </span>
                          <span className="text-xs text-gray-400">{article.date}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                          {cleanExcerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">{article.readTime}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(articleUrl, `art-url-${idx}`)}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                          >
                            {copiedKey === `art-url-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>Copy Link</span>
                          </button>
                          <a
                            href={articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-400 hover:text-gray-700"
                            title="Open Article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: XML ENDPOINTS FOR GOOGLE SEARCH CONSOLE */}
        {activeTab === 'gsc' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">
                All Available XML Sitemaps
              </h3>
              <p className="text-sm text-gray-600">
                You can submit either the individual sitemaps or the master sitemap in Google Search Console.
              </p>
            </div>

            <div className="space-y-4">
              {gscSitemaps.map((sitemap, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {sitemap.badge}
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold">{sitemap.count}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{sitemap.name}</h4>
                    <p className="text-xs text-gray-500">{sitemap.description}</p>
                    <code className="inline-block text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded-md mt-1">
                      {sitemap.fullUrl}
                    </code>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => copyToClipboard(sitemap.filename, `file-${idx}`)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      {copiedKey === `file-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy: {sitemap.filename}</span>
                    </button>
                    <a
                      href={`/${sitemap.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 transition-colors"
                      title="Open XML"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Search Console Step-by-Step Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-blue-950">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>How to Submit in Google Search Console</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-blue-900/90 pl-1">
                <li>Log in to <strong className="text-blue-950">Google Search Console</strong> and select your property <code className="bg-white/60 px-1 rounded">blyntic.co.nz</code>.</li>
                <li>In the left menu under <strong>Indexing</strong>, click on <strong className="text-blue-950">Sitemaps</strong>.</li>
                <li>In the <strong>"Add a new sitemap"</strong> box, enter:
                  <ul className="list-disc list-inside pl-4 mt-1 font-mono text-xs text-blue-950 font-semibold space-y-0.5">
                    <li>sitemap-solutions.xml</li>
                    <li>sitemap-blog.xml</li>
                  </ul>
                </li>
                <li>Click <strong className="text-blue-950">Submit</strong>. Google will read and index all URLs under each category.</li>
              </ol>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default GBPSitemap;
