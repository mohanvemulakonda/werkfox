import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import SalesOrderForm from '../../SalesOrderForm';
import { auth } from '@/lib/auth';

async function getSalesOrder(id: number, orgId: number) {
  return prisma.sales_orders.findFirst({
    where: { id, organizationId: orgId },
    include: {
      customer: true,
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });
}

export default async function EditSalesOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect('/sign-in');
  if (!session.currentOrg) redirect('/admin/organizations/select');
  const orgId = session.currentOrg.id;

  const { id } = await params;
  const soId = parseInt(id);

  if (isNaN(soId)) {
    notFound();
  }

  const salesOrder = await getSalesOrder(soId, orgId);

  if (!salesOrder) {
    notFound();
  }

  // Only PENDING sales orders can be edited
  if (salesOrder.status !== 'PENDING') {
    redirect(`/admin/erp/sales-orders/${salesOrder.id}`);
  }

  // Serialize for client component
  const serialized = {
    ...salesOrder,
    subtotal: Number(salesOrder.subtotal),
    taxAmount: Number(salesOrder.taxAmount),
    discount: Number(salesOrder.discount),
    total: Number(salesOrder.total),
    orderDate: salesOrder.orderDate.toISOString(),
    deliveryDate: salesOrder.deliveryDate?.toISOString() || null,
    createdAt: salesOrder.createdAt.toISOString(),
    updatedAt: salesOrder.updatedAt.toISOString(),
    items: salesOrder.items.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      taxRate: Number(item.taxRate),
      discount: Number(item.discount),
      total: Number(item.total),
      createdAt: item.createdAt.toISOString(),
    })),
    customer: {
      ...salesOrder.customer,
      creditLimit: salesOrder.customer.creditLimit ? Number(salesOrder.customer.creditLimit) : null,
      openingBalance: salesOrder.customer.openingBalance ? Number(salesOrder.customer.openingBalance) : null,
      currentBalance: salesOrder.customer.currentBalance ? Number(salesOrder.customer.currentBalance) : null,
      createdAt: salesOrder.customer.createdAt.toISOString(),
      updatedAt: salesOrder.customer.updatedAt.toISOString(),
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
          Edit Sales Order - {salesOrder.soNumber}
        </h1>
        <p className="text-gray-600 font-inter font-light">Update this sales order's details and line items</p>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>}>
        <SalesOrderForm salesOrder={serialized} />
      </Suspense>
    </div>
  );
}
