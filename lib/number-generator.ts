import prisma from './prisma';

type DocumentType = 'PO' | 'SO' | 'GRN' | 'QT' | 'INV';

const fieldMap: Record<DocumentType, { prefixField: string; counterField: string; defaultPrefix: string }> = {
  PO: { prefixField: 'poPrefix', counterField: 'nextPONumber', defaultPrefix: 'PO' },
  SO: { prefixField: 'soPrefix', counterField: 'nextSONumber', defaultPrefix: 'SO' },
  GRN: { prefixField: 'grnPrefix', counterField: 'nextGRNNumber', defaultPrefix: 'GRN' },
  QT: { prefixField: 'quotePrefix', counterField: 'nextQuoteNumber', defaultPrefix: 'QT' },
  INV: { prefixField: 'invoicePrefix', counterField: 'nextInvoiceNumber', defaultPrefix: 'INV' },
};

export async function generateDocumentNumber(type: DocumentType): Promise<string> {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');

  const config = fieldMap[type];

  const settings = await prisma.company_settings.findFirst();
  if (!settings) {
    return `${config.defaultPrefix}-${year}${month}-0001`;
  }

  const prefix = (settings as any)[config.prefixField] || config.defaultPrefix;
  const nextNumber = (settings as any)[config.counterField] || 1;

  // Atomically increment
  await prisma.company_settings.update({
    where: { id: settings.id },
    data: { [config.counterField]: nextNumber + 1 },
  });

  const formattedNumber = nextNumber.toString().padStart(4, '0');
  return `${prefix}-${year}${month}-${formattedNumber}`;
}
