// LabelHub Integration Utilities

const LABELHUB_URL = process.env.NEXT_PUBLIC_LABELHUB_URL || 'https://labels-hub.com';

// Product mapping: Livato product names → LabelHub product slugs
export const productMapping: Record<string, string> = {
  'thermal-labels': 'thermal-labels',
  'thermal-paper': 'thermal-paper-labels',
  'polyester-labels': 'polyester-labels',
  'polypropylene-labels': 'polypropylene-labels',
  'vinyl-labels': 'vinyl-labels',
  'barcode-labels': 'barcode-labels',
  'pharmaceutical-labels': 'pharmaceutical-labels',
  'custom-labels': 'custom-labels',
  // Add more mappings as needed
};

/**
 * Get LabelHub product URL
 * @param productSlug - Product slug (use Livato slug, will be mapped)
 * @param source - Traffic source for tracking
 */
export function getLabelHubProductUrl(
  productSlug: string,
  source: string = 'livato'
): string {
  const mappedSlug = productMapping[productSlug] || productSlug;
  return `${LABELHUB_URL}/products/${mappedSlug}?source=${source}`;
}

/**
 * Get LabelHub category URL
 */
export function getLabelHubCategoriesUrl(source: string = 'livato'): string {
  return `${LABELHUB_URL}/categories?source=${source}`;
}

/**
 * Get LabelHub homepage URL
 */
export function getLabelHubHomeUrl(source: string = 'livato'): string {
  return `${LABELHUB_URL}?source=${source}`;
}

/**
 * Get LabelHub URL with Label Finder parameters
 */
export function getLabelHubWithFinderParams(
  recommendation: any,
  source: string = 'label-finder'
): string {
  const { material, application, industry } = recommendation;

  // Map recommendation to product slug
  let productSlug = 'thermal-labels'; // default

  if (material?.toLowerCase().includes('polyester')) {
    productSlug = 'polyester-labels';
  } else if (material?.toLowerCase().includes('polypropylene')) {
    productSlug = 'polypropylene-labels';
  } else if (material?.toLowerCase().includes('vinyl')) {
    productSlug = 'vinyl-labels';
  }

  return getLabelHubProductUrl(productSlug, source);
}
