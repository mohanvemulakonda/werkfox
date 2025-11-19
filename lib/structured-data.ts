// Structured Data (JSON-LD) utilities for SEO

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    email: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

export interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  brand: {
    '@type': string;
    name: string;
  };
  offers?: {
    '@type': string;
    priceCurrency: string;
    price?: string;
    availability: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

// Organization Schema - Main company info
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Livato Solutions LLP',
  url: 'https://livatosolutions.com',
  logo: 'https://livatosolutions.com/Livato Logo.png',
  description: 'Leading provider of custom labeling solutions in India, specializing in pharmaceutical labels, barcode printers, thermal ribbons, and complete labeling systems.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 123, Industrial Area',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500001',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'Customer Service',
    email: 'info@livatosolutions.com',
    availableLanguage: ['en', 'hi', 'te'],
  },
  sameAs: [
    'https://www.linkedin.com/company/livato-solutions',
    'https://twitter.com/livatosolutions',
  ],
};

// Helper function to create product schema
export function createProductSchema(product: {
  name: string;
  description: string;
  price?: number;
  currency?: string;
}): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Livato Solutions',
    },
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: product.currency || 'INR',
        price: product.price.toString(),
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

// Helper function to create breadcrumb schema
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://livatosolutions.com${item.url}`,
    })),
  };
}

// Helper function to create FAQ schema
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Helper function to inject structured data into page
export function injectStructuredData(schema: object): string {
  return JSON.stringify(schema);
}
