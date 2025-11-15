// Centralized brochure configuration
// Add new brochures here - they'll automatically appear on the downloads page

export interface Brochure {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  pdfFile: string; // Path in /public/downloads/
  category: 'comprehensive' | 'application' | 'industry' | 'material';
  featured?: boolean;
  color?: 'red' | 'blue' | 'green' | 'purple' | 'orange';
  pageCount?: number;
  fileSize?: string;
}

export const brochures: Brochure[] = [
  // Main Featured Brochure
  {
    id: 'labeling-portfolio',
    title: 'Complete Labeling Solutions Portfolio',
    description: 'Our comprehensive 12-page brochure covering all labeling solutions - from pharmaceutical to automotive, food & beverage to logistics.',
    highlights: [
      'Complete material specifications & applications',
      'Industry-wide applications & use cases',
      'Thermal transfer ribbons & printing solutions',
      'Marking & coding systems overview',
    ],
    pdfFile: 'Livato-Solutions-Labeling-Portfolio.pdf',
    category: 'comprehensive',
    featured: true,
    color: 'red',
    pageCount: 12,
    fileSize: '3.9 MB',
  },

  // Example: Application-Specific Brochures (Add your PDFs here)
  {
    id: 'pharmaceutical-labels',
    title: 'Pharmaceutical Labeling Solutions',
    description: 'Complete guide to pharmaceutical labels - FDA compliant, serialization ready, tamper-evident solutions.',
    highlights: [
      'FDA & GMP compliant materials',
      'Serialization & track-and-trace',
      'Tamper-evident security features',
      'Temperature & chemical resistant',
    ],
    pdfFile: 'pharmaceutical-labels-brochure.pdf',
    category: 'industry',
    color: 'blue',
    pageCount: 8,
    fileSize: '2.5 MB',
  },

  {
    id: 'retail-labels',
    title: 'Retail Labeling Solutions',
    description: 'Price tags, shelf labels, promotional labels, and POS solutions for retail environments.',
    highlights: [
      'Thermal price tag solutions',
      'Shelf label systems',
      'Promotional & marketing labels',
      'Electronic shelf label integration',
    ],
    pdfFile: 'retail-labels-brochure.pdf',
    category: 'industry',
    color: 'green',
    pageCount: 6,
    fileSize: '2.1 MB',
  },

  {
    id: 'serialization-labels',
    title: 'Pharmaceutical Serialization Labels',
    description: 'DSCSA compliant serialization labels with 2D barcodes and unique identifiers.',
    highlights: [
      'DSCSA & EU FMD compliant',
      'GS1-128 & Data Matrix barcodes',
      'Unique identifier printing',
      'Track & trace integration',
    ],
    pdfFile: 'serialization-labels-flyer.pdf',
    category: 'application',
    color: 'purple',
    pageCount: 2,
    fileSize: '1.8 MB',
  },

  {
    id: 'barcode-labels',
    title: 'Barcode Label Solutions',
    description: 'Complete barcode labeling guide - 1D, 2D, QR codes, GS1 standards.',
    highlights: [
      'All barcode types supported',
      'GS1 & industry standards',
      'Verification & validation',
      'High-speed printing solutions',
    ],
    pdfFile: 'barcode-labels-brochure.pdf',
    category: 'application',
    color: 'blue',
    pageCount: 4,
    fileSize: '1.5 MB',
  },

  {
    id: 'food-beverage-labels',
    title: 'Food & Beverage Labels',
    description: 'FDA compliant food contact labels, nutritional labels, and beverage packaging solutions.',
    highlights: [
      'FDA food contact approved',
      'Moisture & refrigeration resistant',
      'Nutritional label templates',
      'Freezer-grade adhesives',
    ],
    pdfFile: 'food-beverage-labels-brochure.pdf',
    category: 'industry',
    color: 'orange',
    pageCount: 6,
    fileSize: '2.3 MB',
  },

  // Add more brochures here...
  // Just copy this template and change the details:
  /*
  {
    id: 'your-brochure-id',
    title: 'Your Brochure Title',
    description: 'Brief description of what this brochure covers.',
    highlights: [
      'Key feature 1',
      'Key feature 2',
      'Key feature 3',
      'Key feature 4',
    ],
    pdfFile: 'your-pdf-filename.pdf', // Place PDF in /public/downloads/
    category: 'application', // or 'industry', 'material', 'comprehensive'
    color: 'blue', // or 'red', 'green', 'purple', 'orange'
    pageCount: 8,
    fileSize: '2.5 MB',
  },
  */
];

// Helper function to get brochure by ID
export function getBrochureById(id: string): Brochure | undefined {
  return brochures.find(b => b.id === id);
}

// Helper function to get featured brochure
export function getFeaturedBrochure(): Brochure | undefined {
  return brochures.find(b => b.featured === true);
}

// Helper function to get brochures by category
export function getBrochuresByCategory(category: Brochure['category']): Brochure[] {
  return brochures.filter(b => b.category === category);
}

// Color mapping for gradients
export const colorGradients = {
  red: 'from-red-600 to-red-800',
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  orange: 'from-orange-600 to-orange-800',
};

export const colorAccents = {
  red: 'text-red-600 border-red-600 hover:bg-red-50',
  blue: 'text-blue-600 border-blue-600 hover:bg-blue-50',
  green: 'text-green-600 border-green-600 hover:bg-green-50',
  purple: 'text-purple-600 border-purple-600 hover:bg-purple-50',
  orange: 'text-orange-600 border-orange-600 hover:bg-orange-50',
};
