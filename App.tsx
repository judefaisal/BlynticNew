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
import { StructuredData } from './components/StructuredData';
import { trackMetaPageView } from './utils/metaPixel';

// Lazy load heavy page routes for optimal speed and SEO/AEO indexability
const TalkToSales = lazy(() => import('./components/TalkToSales'));
const MobileAppDevelopment = lazy(() => import('./components/MobileAppDevelopment'));
const Blog = lazy(() => import('./components/Blog'));
const BlogDetails = lazy(() => import('./components/BlogDetails'));
const AICustomerService = lazy(() => import('./components/AICustomerService'));
const AIChatbots = lazy(() => import('./components/AIChatbots'));
const SmartWebsite = lazy(() => import('./components/SmartWebsite'));
const FullAISolution = lazy(() => import('./components/FullAISolution'));
const AIMarketing = lazy(() => import('./components/AIMarketing'));
const AISocialMediaReply = lazy(() => import('./components/AISocialMediaReply'));
const Contact = lazy(() => import('./components/ui/travel-connect-signin-1'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const ReviewCollector = lazy(() => import('./components/ReviewCollector'));
const GBPSitemap = lazy(() => import('./components/GBPSitemap'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-xs font-semibold text-slate-400 font-mono tracking-widest animate-pulse uppercase">Loading Blyntic...</p>
    </div>
  </div>
);

const getNormalizedRoute = () => {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  if (hash && hash.startsWith('#/')) {
    return hash.replace(/^#/, '');
  }
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (pathname && pathname !== '/') {
    return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  }
  return '/';
};

function App() {
  const [currentRoute, setCurrentRoute] = useState(getNormalizedRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(getNormalizedRoute());
      trackMetaPageView();
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const isAppsDevelopmentPage = currentRoute === '/apps-development' || currentRoute === '/mobile-app-development';
  const isTalkToSalesPage = currentRoute === '/talk-to-sales';
  const isBlogPage = currentRoute === '/blog';
  const isBlogDetailPage = currentRoute.startsWith('/blog/');
  const isAISocialMediaReplyPage = currentRoute === '/ai-social-media-reply';
  const isAICustomerServicePage = currentRoute === '/ai-customer-service';
  const isAIChatbotsPage = currentRoute === '/ai-chatbots';
  const isSmartWebsitePage = currentRoute === '/smart-website';
  const isFullAISolutionPage = currentRoute === '/full-ai-solution';
  const isAIMarketingPage = currentRoute === '/ai-marketing';
  const isContactPage = currentRoute === '/contact';
  const isFAQPage = currentRoute === '/faq';
  const isPrivacyPolicyPage = currentRoute === '/privacy' || currentRoute.startsWith('/privacy');
  const isReviewPage = currentRoute === '/review' || currentRoute === '/reviews' || currentRoute === '/google-review';
  const isSitemapPage = currentRoute === '/sitemap' || currentRoute === '/gbp-sitemap' || currentRoute === '/solutions-sitemap' || currentRoute === '/blog-sitemap';

  return (
    <main className="font-sans text-brand-black bg-white selection:bg-blue-200 selection:text-black">
      <Navbar isTalkToSalesPage={isAppsDevelopmentPage || isTalkToSalesPage || isAISocialMediaReplyPage || isAICustomerServicePage || isAIChatbotsPage || isSmartWebsitePage || isFullAISolutionPage || isAIMarketingPage || isContactPage || isFAQPage || isPrivacyPolicyPage || isBlogPage || isBlogDetailPage || isReviewPage || isSitemapPage} />
      
      <Suspense fallback={<LoadingSpinner />}>
        {isAppsDevelopmentPage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'Custom iOS & Android Mobile App Development',
                description: 'Custom iOS and Android mobile app development for businesses and enterprise clients. Native Swift, Kotlin, Flutter, cross-platform architecture, offline-first sync, on-device AI, and App Store submission.',
                category: 'Mobile Application Development',
                url: '#/apps-development'
              }} 
            />
            <MobileAppDevelopment />
          </>
        ) : isTalkToSalesPage ? (
          <>
            <StructuredData pageType="contact" />
            <TalkToSales />
          </>
        ) : isAICustomerServicePage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'AI Phone Receptionist & Voice Agents',
                description: '24/7 AI phone answering, appointment booking into Google Calendar/Cliniko/Timely, customer check-in, reminder dispatch, and outbound calls built on Retell AI and Vapi. Never miss another customer call.',
                category: 'AI Telephony & Voice Agents',
                url: '#/ai-customer-service',
                pricingInfo: '$0.80 NZD per minute talk time (billed by the second), $899 NZD/mo Growth plan (1,000 mins), or 1-month free software trial with Blyntic.co.nz.'
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
        ) : isAISocialMediaReplyPage ? (
          <>
            <StructuredData 
              pageType="service" 
              serviceData={{
                name: 'AI Social Media Reply & Omnichannel Lead Automation',
                description: 'Autonomous 24/7 AI replies for Instagram DMs, Facebook Messenger, and WhatsApp messages and calls. Qualifies inbound marketing leads and auto-submits structured executive summaries to your CRM and Make.com.',
                category: 'Social Media Automation & Omnichannel AI',
                url: '#/ai-social-media-reply'
              }} 
            />
            <AISocialMediaReply />
          </>
        ) : isContactPage ? (
          <>
            <StructuredData pageType="contact" />
            <Contact />
          </>
        ) : isFAQPage ? (
          <FAQPage />
        ) : isPrivacyPolicyPage ? (
          <PrivacyPolicy />
        ) : isBlogPage ? (
          <Blog />
        ) : isBlogDetailPage ? (
          <BlogDetails />
        ) : isReviewPage ? (
          <>
            <StructuredData 
              pageType="review" 
              serviceData={{
                name: 'Google Business Profile Review Automation',
                description: 'Share your feedback and submit a verified Google Business review for Blyntic AI Automation Agency.',
                category: 'Reputation Management',
                url: '#/review'
              }} 
            />
            <ReviewCollector />
          </>
        ) : isSitemapPage ? (
          <>
            <StructuredData 
              pageType="generic" 
              serviceData={{
                name: 'Google Business Profile & XML Sitemaps Hub',
                description: 'Complete XML sitemaps for Google Search Console and service catalogue URLs formatted for Google Business Profile.',
                category: 'Sitemaps & Directory',
                url: '#/gbp-sitemap'
              }} 
            />
            <GBPSitemap />
          </>
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
          </>
        )}
      </Suspense>
      
      <Footer />
    </main>
  );
}

export default App;