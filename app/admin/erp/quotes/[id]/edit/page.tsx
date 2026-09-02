import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import QuotationForm from '../../QuotationForm';
import { auth } from '@/lib/auth';

async function getQuotation(id: number, orgId: number) {
  const quotation = await prisma.quotations.findFirst({
    where: { id, organizationId: orgId },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  });

  return quotation;
}

export default async function EditQuotationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect('/sign-in');
  if (!session.currentOrg) redirect('/admin/organizations/select');
  const orgId = session.currentOrg.id;

  const { id } = await params;
  const quotationId = parseInt(id);

  if (isNaN(quotationId)) {
    notFound();
  }

  const quotation = await getQuotation(quotationId, orgId);

  if (!quotation) {
    notFound();
  }

  // Only allow editing DRAFT quotations
  if (quotation.status !== 'DRAFT') {
    redirect(`/admin/erp/quotes/${quotation.id}`);
  }

  // Serialize the quotation data for the client component
  const quotationData = JSON.parse(JSON.stringify(quotation));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
          Edit Quotation - {quotation.quoteNumber}
        </h1>
        <p className="text-gray-600 font-inter font-light">
          Modify this draft quotation. Only DRAFT quotations can be edited.
        </p>
      </div>

      <QuotationForm quotation={quotationData} />
    </div>
  );
}
