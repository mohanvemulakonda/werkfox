/**
 * Module Toggle System
 *
 * Central definitions for feature modules and package types.
 * Used to determine which navigation items and features are
 * available based on the organization's selected package.
 */

// All available module identifiers
export type ModuleId =
  | 'dashboard'
  | 'leads'
  | 'opportunities'
  | 'activities'
  | 'contacts'
  | 'customers'
  | 'products'
  | 'invoices'
  | 'subscribers'
  | 'downloads'
  | 'team'
  | 'settings';

// Package types matching Prisma enum
export type PackageType = 'CRM_ONLY' | 'ERP_ONLY' | 'FULL_SUITE';

// Mapping of modules to which packages include them
export const MODULE_PACKAGES: Record<ModuleId, PackageType[]> = {
  // Main - available in all packages
  dashboard: ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'],

  // CRM & Sales - CRM and Full Suite only
  leads: ['CRM_ONLY', 'FULL_SUITE'],
  opportunities: ['CRM_ONLY', 'FULL_SUITE'],
  activities: ['CRM_ONLY', 'FULL_SUITE'],

  // Business
  contacts: ['CRM_ONLY', 'FULL_SUITE'], // CRM only
  customers: ['ERP_ONLY', 'FULL_SUITE'], // ERP only
  products: ['ERP_ONLY', 'FULL_SUITE'], // ERP only
  invoices: ['ERP_ONLY', 'FULL_SUITE'], // ERP only

  // Marketing - available in all packages
  subscribers: ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'],
  downloads: ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'],

  // Administration - available in all packages
  team: ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'],
  settings: ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'],
};

/**
 * Get all enabled modules for a given package type
 */
export function getEnabledModules(packageType: PackageType): ModuleId[] {
  return (Object.keys(MODULE_PACKAGES) as ModuleId[]).filter((moduleId) =>
    MODULE_PACKAGES[moduleId].includes(packageType)
  );
}

/**
 * Check if a specific module is enabled for a package type
 */
export function isModuleEnabled(
  moduleId: ModuleId,
  packageType: PackageType
): boolean {
  return MODULE_PACKAGES[moduleId]?.includes(packageType) ?? false;
}

/**
 * Display information for each package type
 */
export const PACKAGE_INFO: Record<
  PackageType,
  {
    name: string;
    description: string;
    features: string[];
  }
> = {
  CRM_ONLY: {
    name: 'CRM',
    description: 'Customer Relationship Management focused on sales pipeline',
    features: [
      'Lead Management',
      'Opportunity Tracking',
      'Activity Logging',
      'Contact Management',
      'Marketing Tools',
    ],
  },
  ERP_ONLY: {
    name: 'ERP',
    description: 'Enterprise Resource Planning for business operations',
    features: [
      'Customer Accounts',
      'Product Catalog',
      'Invoicing & Quotes',
      'Marketing Tools',
    ],
  },
  FULL_SUITE: {
    name: 'Full Suite',
    description: 'Complete CRM + ERP solution for end-to-end business management',
    features: [
      'All CRM Features',
      'All ERP Features',
      'Unified Dashboard',
      'Complete Business Workflow',
    ],
  },
};
