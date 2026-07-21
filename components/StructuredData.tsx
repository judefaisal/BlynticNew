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
}

export interface FAQData {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  pageType: 'home' | 'blogIndex' | 'blogPost' | 'service' | 'contact' | 'faq' | 'generic';
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
  const domain = 'https://blyntic.co.nz';
  const logoUrl = 'https://cdn.prod.website-files.com/69059456676850507afd94d2/690795a7d8a87712ab44e663_Logo%20Icon.svg';
  const companyName = 'Blyntic';
  const companyPhone = '(+64) 223 037 330';
  const companyEmail = 'jude@blyntic.co.nz';
  const sameAsSocials = [
    'https://www.linkedin.com/in/jude-al-attraqchi/',
    'https://www.instagram.com/blyntic_ai/',
    'https://www.facebook.com/profile.php?id=61571983379077'
  ];

  // Base Organization Schema (represented on almost all pages as publisher or provider)
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${domain}/#organization`,
    'name': companyName,
    'url': domain,
    'logo': {
      '@type': 'ImageObject',
      '@id': `${domain}/#logo`,
      'url': logoUrl,
      'caption': 'Blyntic Logo'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': companyPhone,
      'contactType': 'sales',
      'email': companyEmail,
      'areaServed': 'NZ',
      'availableLanguage': 'English'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Auckland',
      'addressCountry': 'NZ'
    },
    'sameAs': sameAsSocials
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    'url': domain,
    'name': companyName,
    'description': 'Less Work More Growth AI. Blyntic builds AI voice agents, chatbots, and custom workflow automations.',
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

  let schema: any = null;

  switch (pageType) {
    case 'home': {
      // Home page is the core of organization and website
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          websiteSchema,
          {
            '@type': 'WebPage',
            '@id': `${domain}/#webpage`,
            'url': domain,
            'name': 'Blyntic - AI Automation Agency New Zealand',
            'isPartOf': {
              '@id': `${domain}/#website`
            },
            'about': {
              '@id': `${domain}/#organization`
            },
            'description': 'Leading AI Automation Agency in New Zealand. We build custom AI voice assistants, conversational chatbots, and automated n8n/Make.com workflows for businesses.'
          }
        ]
      };
      break;
    }

    case 'blogIndex': {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          {
            '@type': 'CollectionPage',
            '@id': `${domain}/#/blog#webpage`,
            'url': `${domain}/#/blog`,
            'name': 'Blyntic AI Insights & Guides Blog',
            'isPartOf': {
              '@id': `${domain}/#website`
            },
            'about': {
              '@id': `${domain}/#organization`
            },
            'description': 'Explore Blyntic\'s latest guides on AI Basics, Tech Explained, Business Insights, Prompt Engineering, and Career & Trust.'
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

        schema = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${postUrl}#post`,
          'isPartOf': {
            '@type': 'WebPage',
            '@id': `${postUrl}#webpage`,
            'url': postUrl,
            'name': blogPostData.title
          },
          'headline': blogPostData.title,
          'image': [blogPostData.imageUrl],
          'datePublished': new Date(blogPostData.date).toISOString().split('T')[0] || '2026-07-20',
          'dateModified': new Date(blogPostData.date).toISOString().split('T')[0] || '2026-07-20',
          'author': {
            '@type': 'Organization',
            'name': 'Blyntic Team',
            'url': domain
          },
          'publisher': organizationSchema,
          'description': descriptionSnippet,
          'articleBody': plainTextContent,
          'articleSection': blogPostData.category || 'AI Automation'
        };
      }
      break;
    }

    case 'service': {
      if (serviceData) {
        schema = {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
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
          organizationSchema,
          {
            '@type': 'ContactPage',
            '@id': `${domain}/#/contact#webpage`,
            'url': `${domain}/#/contact`,
            'name': 'Contact Blyntic AI Team',
            'description': 'Get in touch with Blyntic AI Automation Agency for custom voice assistants, chatbot integrations, and custom CRM API workflows in New Zealand.'
          }
        ]
      };
      break;
    }

    case 'faq': {
      if (faqDataList && faqDataList.length > 0) {
        schema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqDataList.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        };
      }
      break;
    }

    default: {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [organizationSchema]
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
