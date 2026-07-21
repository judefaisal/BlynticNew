import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import Solutions from './components/Solutions';
import Features from './components/Features';
import Stats from './components/Stats';
import WhyChoose from './components/WhyChoose';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import VoiceflowWidget from './components/VoiceflowWidget';
import { StructuredData } from './components/StructuredData';

// Lazy load heavy page routes for optimal speed and SEO/AEO indexability
const TalkToSales = lazy(() => import('./components/TalkToSales'));
const Blog = lazy(() => import('./components/Blog'));
const BlogDetails = lazy(() => import('./components/BlogDetails'));
const AICustomerService = lazy(() => import('./components/AICustomerService'));
const AIChatbots = lazy(() => import('./components/AIChatbots'));
const SmartWebsite = lazy(() => import('./components/SmartWebsite'));
const FullAISolution = lazy(() => import('./components/FullAISolution'));
const AIMarketing = lazy(() => import('./components/AIMarketing'));
const Contact = lazy(() => import('./components/ui/travel-connect-signin-1'));
const FAQPage = lazy(() => import('./components/FAQPage'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-xs font-semibold text-slate-400 font-mono tracking-widest animate-pulse uppercase">Loading Blyntic...</p>
    </div>
  </div>
);

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentHash === '#/talk-to-sales' || currentHash === '#/ai-customer-service' || currentHash === '#/ai-chatbots' || currentHash === '#/smart-website' || currentHash === '#/full-ai-solution' || currentHash === '#/ai-marketing' || currentHash === '#/contact' || currentHash === '#/faq') {
      window.scrollTo(0, 0);
    }
  }, [currentHash]);

  const isTalkToSalesPage = currentHash === '#/talk-to-sales';
  const isBlogPage = currentHash === '#/blog';
  const isBlogDetailPage = currentHash.startsWith('#/blog/');
  const isAICustomerServicePage = currentHash === '#/ai-customer-service';
  const isAIChatbotsPage = currentHash === '#/ai-chatbots';
  const isSmartWebsitePage = currentHash === '#/smart-website';
  const isFullAISolutionPage = currentHash === '#/full-ai-solution';
  const isAIMarketingPage = currentHash === '#/ai-marketing';
  const isContactPage = currentHash === '#/contact';
  const isFAQPage = currentHash === '#/faq';

  return (
    <main className="font-sans text-brand-black bg-white selection:bg-blue-200 selection:text-black">
      <Navbar isTalkToSalesPage={isTalkToSalesPage || isAICustomerServicePage || isAIChatbotsPage || isSmartWebsitePage || isFullAISolutionPage || isAIMarketingPage || isContactPage || isFAQPage} />
      
      <Suspense fallback={<LoadingSpinner />}>
        {isTalkToSalesPage ? (
          <>
            <StructuredData pageType="contact" />
            <TalkToSales />
          </>
        ) : isAICustomerServicePage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'AI Customer Support & Service Automation',
                description: 'Deploy autonomous AI agents that handle phone calls, text chat, and email tickets 24/7. Fully integrated with your helpdesk, CRM and scheduling databases.',
                category: 'AI Support Automation',
                url: '#/ai-customer-service'
              }} 
            />
            <AICustomerService />
          </>
        ) : isAIChatbotsPage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'Conversational AI Chatbots Integration',
                description: 'Deploy bespoke, brand-tuned 24/7 AI-powered conversational chatbots to capture, engage, and qualify leads on your website automatically.',
                category: 'Conversational AI',
                url: '#/ai-chatbots'
              }} 
            />
            <AIChatbots />
          </>
        ) : isSmartWebsitePage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'Smart Website AI Integration',
                description: 'Connect modern large language model interfaces, search capabilities, and responsive interactive widget tools seamlessly into your existing corporate web pages.',
                category: 'AI Web Integration',
                url: '#/smart-website'
              }} 
            />
            <SmartWebsite />
          </>
        ) : isFullAISolutionPage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'Full Custom AI Solutions & CRM Workflows',
                description: 'End-to-end proprietary enterprise-level AI automation pipelines, customized n8n/Make systems, and custom database integrations tailored strictly to your operations.',
                category: 'Enterprise AI Automation',
                url: '#/full-ai-solution'
              }} 
            />
            <FullAISolution />
          </>
        ) : isAIMarketingPage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'AI Marketing & Automated Campaigns',
                description: 'Leverage generative AI content production platforms, automated newsletter systems, tracking metrics, and dynamic analytics to accelerate your New Zealand client base.',
                category: 'AI Marketing & Growth',
                url: '#/ai-marketing'
              }} 
            />
            <AIMarketing />
          </>
        ) : isContactPage ? (
          <>
            <StructuredData pageType="contact" />
            <Contact />
          </>
        ) : isFAQPage ? (
          <FAQPage />
        ) : isBlogPage ? (
          <Blog />
        ) : isBlogDetailPage ? (
          <BlogDetails />
        ) : (
          <>
            <StructuredData pageType="home" />
            <Hero />
            <LogoTicker />
            <Solutions />
            <Features />
            <Stats />
            <HowItWorks />
            <WhyChoose />
            <VoiceflowWidget />
          </>
        )}
      </Suspense>
      
      <Footer />
    </main>
  );
}

export default App;