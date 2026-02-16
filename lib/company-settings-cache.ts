import prisma from './prisma';

interface CompanySettings {
  id: number;
  companyName: string;
  companyAddress: string | null;
  companyCity: string | null;
  companyState: string | null;
  companyPincode: string | null;
  companyCountry: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  companyWebsite: string | null;
  companyGstNumber: string | null;
  companyPanNumber: string | null;
  logoUrl: string | null;
  defaultCurrency: string;
  defaultPaymentTerms: string | null;
  defaultCreditDays: number | null;
  defaultTermsConditions: string | null;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankIfscCode: string | null;
  bankBranch: string | null;
  invoicePrefix: string | null;
  quotePrefix: string | null;
  proformaPrefix: string | null;
  poPrefix: string | null;
  soPrefix: string | null;
  grnPrefix: string | null;
}

let cachedSettings: CompanySettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCompanySettings(): Promise<CompanySettings> {
  const now = Date.now();

  if (cachedSettings && now - cacheTimestamp < CACHE_TTL) {
    return cachedSettings;
  }

  const settings = await prisma.company_settings.findFirst();

  if (!settings) {
    // Return defaults
    const defaults: CompanySettings = {
      id: 0,
      companyName: 'My Company',
      companyAddress: null,
      companyCity: null,
      companyState: null,
      companyPincode: null,
      companyCountry: 'India',
      companyPhone: null,
      companyEmail: null,
      companyWebsite: null,
      companyGstNumber: null,
      companyPanNumber: null,
      logoUrl: null,
      defaultCurrency: 'INR',
      defaultPaymentTerms: null,
      defaultCreditDays: 0,
      defaultTermsConditions: null,
      bankName: null,
      bankAccountNumber: null,
      bankIfscCode: null,
      bankBranch: null,
      invoicePrefix: 'INV',
      quotePrefix: 'QT',
      proformaPrefix: 'PI',
      poPrefix: 'PO',
      soPrefix: 'SO',
      grnPrefix: 'GRN',
    };
    return defaults;
  }

  cachedSettings = settings as CompanySettings;
  cacheTimestamp = now;
  return cachedSettings;
}

/** Invalidate cache so next call fetches fresh from DB */
export function invalidateCompanySettingsCache() {
  cachedSettings = null;
  cacheTimestamp = 0;
}
