import React from 'react';

export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  category?: string;
  readTime?: string;
}

export interface ServiceData {
  name: string;
  description: string;
  category: string;
  url: string;
  pricingInfo?: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  pageType: 'home' | 'blogIndex' | 'blogPost' | 'service' | 'contact' | 'faq' | 'privacy' | 'review' | 'generic';
  blogPostData?: BlogPostData;
  serviceData?: ServiceData;
  faqDataList?: FAQData[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  pageType,
  blogPostData,
  serviceData,
  faqDataList,
}) => {
  const domain = 'https://www.blyntic.co.nz';
  const logoUrl = 'https://cdn.prod.website-files.com/69059456676850507afd94d2/690795a7d8a87712ab44e663_Logo%20Icon.svg';
  const companyName = 'Blyntic';
  const companyPhone = '(+64) 223 037 330';
  const companyEmail = 'jude@blyntic.co.nz';
  const sameAsSocials = [
    'https://www.linkedin.com/in/jude-al-attraqchi/',
    'https://www.instagram.com/blyntic_ai/',
    'https://www.facebook.com/profile.php?id=61571983379077'
  ];

  // Base LocalBusiness & ProfessionalService Schema
  const businessSchema = {
    '@type': ['LocalBusiness', 'ProfessionalService', 'Organization'],
    '@id': `${domain}/#organization`,
    'name': companyName,
    'alternateName': 'Blyntic AI Agency',
    'legalName': 'Blyntic',
    'url': domain,
    'logo': {
      '@type': 'ImageObject',
      '@id': `${domain}/#logo`,
      'url': logoUrl,
      'caption': 'Blyntic AI Agency Logo'
    },
    'image': logoUrl,
    'slogan': 'Less Work, More Growth',
    'description': 'Blyntic is an Auckland-based AI automation agency helping NZ businesses answer every call 24/7, automate admin, and follow up leads instantly with AI voice agents, chatbots and workflow automation.',
    'telephone': companyPhone,
    'email': companyEmail,
    'priceRange': '$$ (NZD $99/mo to $2,500/mo; $0.80/min talk time)',
    'currenciesAccepted': 'NZD, AUD, USD',
    'paymentAccepted': 'Credit Card, Direct Debit, Stripe, Invoicing',
    'foundingDate': '2026',
    'founder': {
      '@type': 'Person',
      'name': 'Jude Alattraqchi',
      'jobTitle': 'Founder & AI Systems Architect',
      'sameAs': 'https://www.linkedin.com/in/jude-al-attraqchi/'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Auckland',
      'addressRegion': 'Auckland',
      'postalCode': '1010',
      'addressCountry': 'NZ'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-36.848461',
      'longitude': '174.763336'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59',
        'description': '24/7 AI Voice Phone Receptionist & Automated Client Care'
      }
    ],
    'areaServed': [
      {
        '@type': 'Country',
        'name': 'New Zealand'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Auckland'
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'reviewCount': '24',
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': sameAsSocials,
    'knowsAbout': [
      'AI phone receptionists',
      'AI voice agents',
      'Conversational AI chatbots',
      'Workflow automation',
      'Retell AI',
      'Vapi',
      'Voiceflow',
      'n8n',
      'Make.com',
      'CRM integration',
      'Business process automation'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Blyntic AI Automation Solutions',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AI Phone Receptionist & Voice Agents',
            'serviceType': 'AI Telephony & Call Answering',
            'description': '24/7 AI phone answering, appointment booking into Google Calendar/Cliniko/Timely, customer check-in, reminder dispatch, and outbound calls built on Retell AI and Vapi.',
            'url': `${domain}/#/ai-customer-service`,
            'areaServed': 'New Zealand',
            'offers': {
              '@type': 'Offer',
              'price': '0.80',
              'priceCurrency': 'NZD',
              'description': '$0.80 NZD per minute talk time (billed by the second) or $899 NZD/mo Growth plan; 1-month free software trial available.'
            }
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Conversational AI Chatbots',
            'serviceType': 'Website & Messaging AI',
            'description': 'Website and messaging chatbots built on Voiceflow that answer FAQs, qualify leads, and book appointments 24/7.',
            'url': `${domain}/#/ai-chatbots`,
            'areaServed': 'New Zealand'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Workflow Automation & CRM Integrations',
            'serviceType': 'Business Process Automation',
            'description': 'Business process automation with n8n and Make.com — connecting 2,000+ apps (Xero, HubSpot, Pipedrive, GoHighLevel, Shopify, Gmail) to automate invoices, lead triage, and client onboarding.',
            'url': `${domain}/#/full-ai-solution`,
            'areaServed': 'New Zealand'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Smart Website AI Integration',
            'serviceType': 'AI Web Integration',
            'description': 'Injecting modern large language model interfaces, search capabilities, and responsive interactive widget tools seamlessly into corporate websites.',
            'url': `${domain}/#/smart-website`,
            'areaServed': 'New Zealand'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AI Marketing & Automated Campaigns',
            'serviceType': 'Marketing Automation',
            'description': 'Generative AI content production platforms, automated newsletter systems, tracking metrics, and dynamic analytics to accelerate client acquisition.',
            'url': `${domain}/#/ai-marketing`,
            'areaServed': 'New Zealand'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Google Business Profile Review Automation',
            'serviceType': 'Reputation Management',
            'description': 'Automated review collection funnel connected to n8n webhook, sentiment routing, and verified Google Business Profile review promotion.',
            'url': `${domain}/#/review`,
            'areaServed': 'New Zealand'
          }
        }
      ]
    }
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    'url': domain,
    'name': companyName,
    'alternateName': 'Blyntic AI Automation Agency',
    'description': 'Less Work, More Growth. Blyntic builds AI voice agents, chatbots, and custom workflow automations for New Zealand businesses.',
    'publisher': {
      '@id': `${domain}/#organization`
    },
    'potentialAction': [{
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${domain}/#/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }]
  };

  // Verified FAQ items matching what is visible on the website
  const verifiedCoreFAQs = [
    {
      question: 'How much does an AI receptionist cost?',
      answer: 'In New Zealand, an AI receptionist costs between NZD $99/month to NZD $2,500/month, depending on call volume and software integrations. Pay-as-you-go starts from $0.80 NZD per minute of talk time (billed by the second) with a one-off setup of $495 NZD, or a Growth plan at $899 NZD/mo (including 1,000 minutes). Compared to NZD $55,000 to $75,000+ per year for a full-time human receptionist, businesses save over $45,000 annually.'
    },
    {
      question: 'What do AI receptionists do?',
      answer: 'AI receptionists handle inbound and outbound phone calls on the first ring, automated appointment booking and calendar sync (Google, Outlook, Timely, Cliniko), sending SMS/email reminders, handling customer check-ins, issuing invoices and payment links via Xero/Stripe, and answering FAQs 24/7/365 with zero hold times.'
    },
    {
      question: 'Can AI replace a receptionist?',
      answer: 'Yes you can. For service businesses, tradies, and consultancies, an AI phone receptionist can completely replace the overhead of a dedicated receptionist. For medical clinics and salons where in-person greeting is crucial, AI handles 100% of phone interruptions so front-desk staff can focus entirely on visitors in the room. You have a one-month software trial available with Blyntic.co.nz.'
    },
    {
      question: 'Is an AI receptionist worth it?',
      answer: 'Yes, overwhelmingly worth it. It saves $45,000 to $65,000+ per year, works 24/7 without holidays or sick leave, eliminates missed sales calls, and captures leads instantly before they call competitors.'
    },
    {
      question: 'Is there a free AI phone receptionist available?',
      answer: 'Yes, available for a one-month free software trial with Blyntic.co.nz. Our Auckland team configures your knowledge base, connects your calendar, and sets up live testing risk-free.'
    },
    {
      question: 'What does an AI automation agency do?',
      answer: 'An AI automation agency designs, builds, and maintains AI systems that automate repetitive work like answering calls, replying to enquiries, booking appointments, and moving data between tools like Xero, HubSpot, and Google Calendar.'
    },
    {
      question: 'Can an AI agent answer my business calls 24/7?',
      answer: 'Yes. Blyntic voice agents answer calls 24/7 with under 1-second latency, natural human-sounding voices with New Zealand accent tuning, and handle unlimited simultaneous calls with zero hold time.'
    },
    {
      question: 'How long does it take to set up AI automation for my business?',
      answer: 'Most Blyntic AI projects go live within 1 to 3 weeks, including call flow design, custom tool integrations, and live verification on real phone numbers.'
    },
    {
      question: 'Will AI automation work with the tools I already use?',
      answer: 'Yes. Blyntic builds workflows that connect with over 2,000+ business applications (like Xero, HubSpot, Google Calendar, and GoHighLevel) via n8n and Make.com.'
    },
    {
      question: 'Do I own the automations Blyntic builds?',
      answer: 'Yes. All workflows, prompts, agent configurations, and documentation are built in accounts you control and handed over in full on final payment.'
    },
    {
      question: 'Is my customer data safe with AI automation?',
      answer: 'Yes. Blyntic builds in strict compliance with the New Zealand Privacy Act 2020, with transit encryption, direct storage handoffs, and client-controlled retention policies.'
    }
  ];

  // Verified flagship articles list for ItemList schema
  const flagshipArticlesList = [
    {
      '@type': 'BlogPosting',
      'headline': 'How Much Does an AI Receptionist Cost? Capabilities, ROI & Free Trial (NZ Guide)',
      'url': `${domain}/#/blog/how-much-does-an-ai-receptionist-cost-nz-guide`,
      'datePublished': '2026-10-15',
      'author': { '@type': 'Person', 'name': 'Jude Alattraqchi' },
      'publisher': { '@id': `${domain}/#organization` },
      'description': 'Comprehensive New Zealand guide to AI receptionist pricing (NZD $99/mo to $2,500/mo), capabilities, ROI vs human staff, and 1-month free software trial.'
    },
    {
      '@type': 'BlogPosting',
      'headline': 'What is an AI agent?',
      'url': `${domain}/#/blog/what-is-an-ai-agent`,
      'datePublished': '2026-07-18',
      'author': { '@type': 'Organization', 'name': 'Blyntic Team' },
      'publisher': { '@id': `${domain}/#organization` },
      'description': 'An AI agent is an autonomous software program that uses an LLM as its central brain, maintains memory, and has tool access to execute multi-step objectives.'
    },
    {
      '@type': 'BlogPosting',
      'headline': "What's the difference between AI, machine learning, and deep learning?",
      'url': `${domain}/#/blog/ai-vs-ml-vs-dl`,
      'datePublished': '2026-07-20',
      'author': { '@type': 'Organization', 'name': 'Blyntic Team' },
      'publisher': { '@id': `${domain}/#organization` },
      'description': 'Clear breakdown of artificial intelligence, machine learning, and deep learning neural networks with practical business examples.'
    }
  ];

  let schema: any = null;

  switch (pageType) {
    case 'home': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          websiteSchema,
          {
            '@type': 'WebPage',
            '@id': `${domain}/#webpage`,
            'url': domain,
            'name': 'Blyntic | AI Automation Agency NZ — Voice Agents, Chatbots & Workflows',
            'isPartOf': { '@id': `${domain}/#website` },
            'about': { '@id': `${domain}/#organization` },
            'description': 'Blyntic is an Auckland-based AI automation agency helping NZ businesses answer every call 24/7, automate admin, and follow up leads instantly with AI voice agents, chatbots and workflow automation.'
          },
          {
            '@type': 'FAQPage',
            '@id': `${domain}/#faq`,
            'mainEntity': verifiedCoreFAQs.map(f => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
              }
            }))
          },
          {
            '@type': 'ItemList',
            '@id': `${domain}/#articles`,
            'name': 'Blyntic AI Guides & Articles',
            'itemListElement': flagshipArticlesList.map((item, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'item': item
            }))
          }
        ]
      };
      break;
    }

    case 'blogIndex': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          {
            '@type': 'CollectionPage',
            '@id': `${domain}/#/blog#webpage`,
            'url': `${domain}/#/blog`,
            'name': 'Blyntic AI Insights & Guides Blog',
            'isPartOf': { '@id': `${domain}/#website` },
            'about': { '@id': `${domain}/#organization` },
            'description': 'Explore Blyntic\'s latest guides on AI Receptionists, Voice Agents, Automation ROI, Tech Explained, and Business Insights.'
          },
          {
            '@type': 'ItemList',
            '@id': `${domain}/#/blog#list`,
            'name': 'Published AI Articles & Guides',
            'itemListElement': flagshipArticlesList.map((item, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'item': item
            }))
          }
        ]
      };
      break;
    }

    case 'blogPost': {
      if (blogPostData) {
        const slug = blogPostData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        const postUrl = `${domain}/#/blog/${slug}`;

        // Strip markdown to make a clean description snippet
        const plainTextContent = blogPostData.content
          .replace(/[#*`_-]/g, '')
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          .trim();
        const descriptionSnippet = plainTextContent.length > 160 
          ? `${plainTextContent.substring(0, 157)}...` 
          : plainTextContent;

        // Clean date published
        let publishedIso = '2026-10-15T09:00:00+13:00';
        try {
          const parsed = new Date(blogPostData.date);
          if (!isNaN(parsed.getTime())) {
            publishedIso = parsed.toISOString();
          }
        } catch {
          publishedIso = '2026-10-15T09:00:00+13:00';
        }

        const isFlagshipArticle = blogPostData.title.toLowerCase().includes('receptionist');

        schema = {
          '@context': 'https://schema.org',
          '@graph': [
            businessSchema,
            {
              '@type': 'BlogPosting',
              '@id': `${postUrl}#post`,
              'isPartOf': {
                '@type': 'WebPage',
                '@id': `${postUrl}#webpage`,
                'url': postUrl,
                'name': blogPostData.title
              },
              'mainEntityOfPage': postUrl,
              'headline': blogPostData.title,
              'image': [
                blogPostData.imageUrl.startsWith('http') 
                  ? blogPostData.imageUrl 
                  : `${domain}${blogPostData.imageUrl}`
              ],
              'datePublished': publishedIso,
              'dateModified': publishedIso,
              'inLanguage': 'en-NZ',
              'author': {
                '@type': isFlagshipArticle ? 'Person' : 'Organization',
                'name': isFlagshipArticle ? 'Jude Alattraqchi' : 'Blyntic Team',
                'url': domain
              },
              'publisher': {
                '@id': `${domain}/#organization`
              },
              'description': descriptionSnippet,
              'articleBody': plainTextContent,
              'articleSection': blogPostData.category || 'Business Insights'
            }
          ]
        };
      }
      break;
    }

    case 'service': {
      if (serviceData) {
        schema = {
          '@context': 'https://schema.org',
          '@graph': [
            businessSchema,
            {
              '@type': 'Service',
              '@id': `${domain}/${serviceData.url}#service`,
              'name': serviceData.name,
              'description': serviceData.description,
              'category': serviceData.category,
              'provider': {
                '@id': `${domain}/#organization`
              },
              'areaServed': {
                '@type': 'Country',
                'name': 'New Zealand'
              },
              'offers': {
                '@type': 'Offer',
                'priceCurrency': 'NZD',
                'description': serviceData.pricingInfo || 'Custom business proposal with 1-month free software trial option.'
              }
            }
          ]
        };
      }
      break;
    }

    case 'contact': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          {
            '@type': 'ContactPage',
            '@id': `${domain}/#/contact#webpage`,
            'url': `${domain}/#/contact`,
            'name': 'Contact Blyntic AI Team Auckland',
            'description': 'Get in touch with Blyntic AI Automation Agency for custom voice assistants, chatbot integrations, and custom CRM API workflows in New Zealand.'
          }
        ]
      };
      break;
    }

    case 'faq': {
      const activeFaqs = (faqDataList && faqDataList.length > 0) ? faqDataList : verifiedCoreFAQs;
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          {
            '@type': 'FAQPage',
            '@id': `${domain}/#/faq#content`,
            'mainEntity': activeFaqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          }
        ]
      };
      break;
    }

    case 'review': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          {
            '@type': 'WebPage',
            '@id': `${domain}/#/review#webpage`,
            'url': `${domain}/#/review`,
            'name': 'Review Blyntic on Google Business Profile',
            'description': 'Leave a verified customer review for Blyntic AI Automation Agency. Share your feedback on our AI voice agents, chatbots, and CRM workflows.'
          }
        ]
      };
      break;
    }

    case 'privacy': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          businessSchema,
          {
            '@type': 'WebPage',
            '@id': `${domain}/#/privacy#webpage`,
            'url': `${domain}/#/privacy`,
            'name': 'Privacy Policy | Blyntic AI Agency NZ',
            'description': 'Official Privacy Policy for Blyntic AI Automation Agency, detailing how we collect, process, protect, and respect business and personal data in accordance with the New Zealand Privacy Act 2020 and Google compliance standards.'
          }
        ]
      };
      break;
    }

    default: {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [businessSchema]
      };
    }
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
