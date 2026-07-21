import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import Solutions from './components/Solutions';
import Features from './components/Features';
import Stats from './components/Stats';
import WhyChoose from './components/WhyChoose';
import HowItWorks from './components/HowItWorks';
import TalkToSales from './components/TalkToSales';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import AICustomerService from './components/AICustomerService';
import AIChatbots from './components/AIChatbots';
import SmartWebsite from './components/SmartWebsite';
import FullAISolution from './components/FullAISolution';
import AIMarketing from './components/AIMarketing';
import Contact from './components/ui/travel-connect-signin-1';
import FAQPage from './components/FAQPage';
import Footer from './components/Footer';
import VoiceflowWidget from './components/VoiceflowWidget';
import { StructuredData } from './components/StructuredData';

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
      
      <Footer />
    </main>
  );
}

export default App;