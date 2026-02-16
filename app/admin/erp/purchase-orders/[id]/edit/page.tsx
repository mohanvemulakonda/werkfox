import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import PurchaseOrderForm from '../../PurchaseOrderForm';

async function getPurchaseOrder(id: number) {
  return prisma.purchase_orders.findUnique({
    where: { id },
    include: {
      vendor: true,
      location: { select: { id: true, name: true, code: true } },
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });
}

export default async function EditPurchaseOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const poId = parseInt(id);

  if (isNaN(poId)) {
    notFound();
  }

  const po = await getPurchaseOrder(poId);

  if (!po) {
    notFound();
  }

  // Only allow editing DRAFT purchase orders
  if (po.status !== 'DRAFT') {
    redirect(`/admin/erp/purchase-orders/${po.id}`);
  }

  // Serialize dates for client component
  const serializedPO = JSON.parse(JSON.stringify(po));

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Edit Purchase Order
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Editing {po.poNumber}
          </p>
        </div>
        <Link
          href={`/admin/erp/purchase-orders/${po.id}`}
          className="admin-btn admin-btn-secondary"
        >
          Back to PO Details
        </Link>
      </div>

      <PurchaseOrderForm po={serializedPO} />
    </div>
  );
}
