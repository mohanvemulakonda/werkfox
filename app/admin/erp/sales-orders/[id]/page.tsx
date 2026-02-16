import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import SalesOrderActions from './SalesOrderActions';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  CONFIRMED: 'admin-badge admin-badge-confirmed',
  IN_PROGRESS: 'admin-badge admin-badge-in-progress',
  COMPLETED: 'admin-badge admin-badge-completed',
  CANCELLED: 'admin-badge admin-badge-cancelled',
  ON_HOLD: 'admin-badge admin-badge-on-hold',
};

const paymentBadgeClass: Record<string, string> = {
  UNPAID: 'admin-badge admin-badge-unpaid',
  PARTIAL: 'admin-badge admin-badge-partial',
  PAID: 'admin-badge admin-badge-paid',
  OVERDUE: 'admin-badge admin-badge-overdue',
  REFUNDED: 'admin-badge admin-badge-cancelled',
};

const timelineSteps = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'];

function getStepState(currentStatus: string, step: string) {
  if (currentStatus === 'CANCELLED' || currentStatus === 'ON_HOLD') {
    const idx = timelineSteps.indexOf(step);
    // Show completed for steps before the last active step
    return idx === 0 ? 'completed' : '';
  }
  const currentIdx = timelineSteps.indexOf(currentStatus);
  const stepIdx = timelineSteps.indexOf(step);
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return '';
}

async function getSalesOrder(id: number) {
  return prisma.sales_orders.findUnique({
    where: { id },
    include: {
      customer: true,
      quotation: { select: { id: true, quoteNumber: true } },
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });
}

export default async function SalesOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const soId = parseInt(id);

  if (isNaN(soId)) {
    notFound();
  }

  const salesOrder = await getSalesOrder(soId);

  if (!salesOrder) {
    notFound();
  }

  const soData = {
    ...salesOrder,
    subtotal: Number(salesOrder.subtotal),
    taxAmount: Number(salesOrder.taxAmount),
    discount: Number(salesOrder.discount),
    total: Number(salesOrder.total),
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{salesOrder.soNumber}</h1>
            <span className={statusBadgeClass[salesOrder.status] || 'admin-badge'}>
              {salesOrder.status.replace('_', ' ')}
            </span>
            <span className={paymentBadgeClass[salesOrder.paymentStatus] || 'admin-badge'}>
              {salesOrder.paymentStatus}
            </span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            Created on {salesOrder.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/erp/sales-orders"
          className="admin-btn admin-btn-secondary"
        >
          Back to Sales Orders
        </Link>
      </div>

      {/* Status Timeline */}
      <div className="admin-detail-section mb-6">
        <div className="admin-status-timeline">
          {timelineSteps.map((step, index) => (
            <div key={step} className="flex items-center">
              {index > 0 && (
                <div className={`connector ${getStepState(salesOrder.status, step) === 'completed' || getStepState(salesOrder.status, step) === 'current' ? 'completed' : ''}`} />
              )}
              <div className={`step ${getStepState(salesOrder.status, step)}`}>
                <div className="dot" />
                <span className="label">{step.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
        {(salesOrder.status === 'CANCELLED' || salesOrder.status === 'ON_HOLD') && (
          <div className="mt-3 text-center">
            <span className={statusBadgeClass[salesOrder.status] || 'admin-badge'}>
              Currently: {salesOrder.status.replace('_', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <SalesOrderActions salesOrderId={salesOrder.id} status={salesOrder.status} />

      {/* Source Document */}
      {salesOrder.quotation && (
        <div className="admin-detail-section mb-6">
          <h3 className="admin-form-section-title">Source Document</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Created from Quotation:</span>
            <Link href={`/admin/erp/quotes/${salesOrder.quotation.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {salesOrder.quotation.quoteNumber}
            </Link>
          </div>
        </div>
      )}

      {/* Customer Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Customer Details</h3>
        <div className="admin-detail-grid">
          <div>
            <span className="admin-detail-label">Customer Name</span>
            <span className="admin-detail-value">{salesOrder.customerName}</span>
          </div>
          <div>
            <span className="admin-detail-label">Email</span>
            <span className="admin-detail-value">{salesOrder.customerEmail || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">GST Number</span>
            <span className="admin-detail-value">{salesOrder.customerGst || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">State</span>
            <span className="admin-detail-value">{salesOrder.customerState || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">Customer PO Number</span>
            <span className="admin-detail-value">{salesOrder.customerPoNumber || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">Delivery Date</span>
            <span className="admin-detail-value">
              {salesOrder.deliveryDate
                ? salesOrder.deliveryDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
                : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="admin-table-container mt-6">
        <h3 className="admin-form-section-title px-6 pt-4">Order Items</h3>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Delivered</th>
                <th>Unit Price</th>
                <th>Tax Rate</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {salesOrder.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="font-medium text-gray-900">{item.productName}</td>
                  <td className="text-gray-500">{item.productSku}</td>
                  <td>{item.quantity}</td>
                  <td>{item.deliveredQty}</td>
                  <td>₹{Number(item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>{Number(item.taxRate)}%</td>
                  <td>₹{Number(item.discount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="font-medium text-gray-900">₹{Number(item.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="admin-detail-section mt-6">
        <h3 className="admin-form-section-title">Order Summary</h3>
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">₹{soData.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-900">₹{soData.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            {soData.discount > 0 && (
              <div className="flex justify-between text-sm font-inter">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-red-600">-₹{soData.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-base font-inter">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">₹{soData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Notes */}
      {(salesOrder.terms || salesOrder.notes) && (
        <div className="admin-detail-section mt-6">
          <h3 className="admin-form-section-title">Additional Information</h3>
          <div className="admin-detail-grid">
            {salesOrder.terms && (
              <div>
                <span className="admin-detail-label">Terms & Conditions</span>
                <span className="admin-detail-value whitespace-pre-wrap">{salesOrder.terms}</span>
              </div>
            )}
            {salesOrder.notes && (
              <div>
                <span className="admin-detail-label">Notes</span>
                <span className="admin-detail-value whitespace-pre-wrap">{salesOrder.notes}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
