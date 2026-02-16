import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/company-settings — fetch (auto-create if none)
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let settings = await prisma.company_settings.findFirst();

    if (!settings) {
      settings = await prisma.company_settings.create({
        data: {
          companyName: 'My Company',
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching company settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company settings' },
      { status: 500 }
    );
  }
}

// PUT /api/company-settings — update all fields
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Ensure a row exists
    let settings = await prisma.company_settings.findFirst();

    if (!settings) {
      settings = await prisma.company_settings.create({
        data: {
          companyName: body.companyName || 'My Company',
          updatedAt: new Date(),
        },
      });
    }

    const updated = await prisma.company_settings.update({
      where: { id: settings.id },
      data: {
        companyName: body.companyName ?? settings.companyName,
        companyAddress: body.companyAddress ?? settings.companyAddress,
        companyCity: body.companyCity ?? settings.companyCity,
        companyState: body.companyState ?? settings.companyState,
        companyPincode: body.companyPincode ?? settings.companyPincode,
        companyCountry: body.companyCountry ?? settings.companyCountry,
        companyPhone: body.companyPhone ?? settings.companyPhone,
        companyEmail: body.companyEmail ?? settings.companyEmail,
        companyWebsite: body.companyWebsite ?? settings.companyWebsite,
        companyGstNumber: body.companyGstNumber ?? settings.companyGstNumber,
        companyPanNumber: body.companyPanNumber ?? settings.companyPanNumber,
        defaultCurrency: body.defaultCurrency ?? settings.defaultCurrency,
        defaultPaymentTerms: body.defaultPaymentTerms ?? settings.defaultPaymentTerms,
        defaultCreditDays: body.defaultCreditDays !== undefined ? parseInt(body.defaultCreditDays) : settings.defaultCreditDays,
        defaultTermsConditions: body.defaultTermsConditions ?? settings.defaultTermsConditions,
        bankName: body.bankName ?? settings.bankName,
        bankAccountNumber: body.bankAccountNumber ?? settings.bankAccountNumber,
        bankIfscCode: body.bankIfscCode ?? settings.bankIfscCode,
        bankBranch: body.bankBranch ?? settings.bankBranch,
        invoicePrefix: body.invoicePrefix ?? settings.invoicePrefix,
        quotePrefix: body.quotePrefix ?? settings.quotePrefix,
        proformaPrefix: body.proformaPrefix ?? settings.proformaPrefix,
        poPrefix: body.poPrefix ?? settings.poPrefix,
        soPrefix: body.soPrefix ?? settings.soPrefix,
        grnPrefix: body.grnPrefix ?? settings.grnPrefix,
        nextInvoiceNumber: body.nextInvoiceNumber !== undefined ? parseInt(body.nextInvoiceNumber) : settings.nextInvoiceNumber,
        nextQuoteNumber: body.nextQuoteNumber !== undefined ? parseInt(body.nextQuoteNumber) : settings.nextQuoteNumber,
        nextPONumber: body.nextPONumber !== undefined ? parseInt(body.nextPONumber) : settings.nextPONumber,
        nextSONumber: body.nextSONumber !== undefined ? parseInt(body.nextSONumber) : settings.nextSONumber,
        nextGRNNumber: body.nextGRNNumber !== undefined ? parseInt(body.nextGRNNumber) : settings.nextGRNNumber,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating company settings:', error);
    return NextResponse.json(
      { error: 'Failed to update company settings' },
      { status: 500 }
    );
  }
}
