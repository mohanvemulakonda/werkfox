import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductionOrderForm from '../../ProductionOrderForm';
import { auth } from '@/lib/auth';

async function getProductionOrder(id: number, orgId: number) {
  return prisma.production_orders.findFirst({
    where: { id, organizationId: orgId },
    include: {
      product: { select: { id: true, name: true, sku: true } },
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });
}

export default async function EditProductionOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect('/sign-in');
  if (!session.currentOrg) redirect('/admin/organizations/select');
  const orgId = session.currentOrg.id;

  const { id } = await params;
  const prodId = parseInt(id);

  if (isNaN(prodId)) {
    notFound();
  }

  const order = await getProductionOrder(prodId, orgId);

  if (!order) {
    notFound();
  }

  // Only allow editing PLANNED production orders
  if (order.status !== 'PLANNED') {
    redirect(`/admin/erp/production/${order.id}`);
  }

  // Serialize dates for client component
  const serializedOrder = JSON.parse(JSON.stringify(order));

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Edit Production Order
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Editing {order.prodNumber}
          </p>
        </div>
        <Link
          href={`/admin/erp/production/${order.id}`}
          className="admin-btn admin-btn-secondary"
        >
          Back to Details
        </Link>
      </div>

      <ProductionOrderForm po={serializedOrder} />
    </div>
  );
}
