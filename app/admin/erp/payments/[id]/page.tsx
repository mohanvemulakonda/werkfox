import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

const statusBadgeClass: Record<string, string> = {
  DRAFT: 'admin-badge admin-badge-draft',
  CONFIRMED: 'admin-badge admin-badge-completed',
  CANCELLED: 'admin-badge admin-badge-cancelled',
  BOUNCED: 'admin-badge admin-badge-on-hold',
};

const typeBadge: Record<string, string> = {
  RECEIVED: 'bg-green-100 text-green-800',
  MADE: 'bg-red-100 text-red-800',
  REFUND: 'bg-orange-100 text-orange-800',
  ADVANCE: 'bg-blue-100 text-blue-800',
};

async function getPayment(id: number) {
  return prisma.payments.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, customerCode: true } },
      vendor: { select: { id: true, name: true, code: true } },
      allocations: true,
    },
  });
}

export default async function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paymentId = parseInt(id);
  if (isNaN(paymentId)) notFound();

  const payment = await getPayment(paymentId);
  if (!payment) notFound();

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{payment.paymentNumber}</h1>
            <span className={statusBadgeClass[payment.status] || 'admin-badge'}>{payment.status}</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${typeBadge[payment.type] || ''}`}>{payment.type}</span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            {new Date(payment.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/erp/payments" className="admin-btn admin-btn-secondary">Back to Payments</Link>
      </div>

      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Payment Details</h3>
        <div className="admin-detail-grid">
          <div><span className="admin-detail-label">Amount</span><span className="admin-detail-value text-2xl font-bold">{payment.currency} {Number(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
          <div><span className="admin-detail-label">Payment Method</span><span className="admin-detail-value">{payment.paymentMethod?.replace('_', ' ') || '-'}</span></div>
          <div><span className="admin-detail-label">Reference Number</span><span className="admin-detail-value">{payment.referenceNumber || '-'}</span></div>
          <div><span className="admin-detail-label">Bank Name</span><span className="admin-detail-value">{payment.bankName || '-'}</span></div>
          {payment.customer && (
            <div><span className="admin-detail-label">Customer</span>
              <Link href={`/admin/customers`} className="text-blue-600 hover:text-blue-800 text-sm">{payment.customer.name} {payment.customer.customerCode ? `(${payment.customer.customerCode})` : ''}</Link>
            </div>
          )}
          {payment.vendor && (
            <div><span className="admin-detail-label">Vendor</span>
              <Link href={`/admin/erp/vendors/${payment.vendor.id}`} className="text-blue-600 hover:text-blue-800 text-sm">{payment.vendor.name} {payment.vendor.code ? `(${payment.vendor.code})` : ''}</Link>
            </div>
          )}
        </div>
      </div>

      {payment.allocations.length > 0 && (
        <div className="admin-table-container mt-6">
          <h3 className="admin-form-section-title px-6 pt-4">Allocations</h3>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice / PO</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payment.allocations.map((alloc, index) => (
                  <tr key={alloc.id}>
                    <td>{index + 1}</td>
                    <td>
                      {alloc.invoiceId ? (
                        <Link href={`/admin/erp/invoices/${alloc.invoiceId}`} className="text-blue-600 hover:text-blue-800">Invoice #{alloc.invoiceId}</Link>
                      ) : alloc.purchaseOrderId ? (
                        <Link href={`/admin/erp/purchase-orders/${alloc.purchaseOrderId}`} className="text-blue-600 hover:text-blue-800">PO #{alloc.purchaseOrderId}</Link>
                      ) : 'Unallocated'}
                    </td>
                    <td className="font-medium">{payment.currency} {Number(alloc.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {payment.notes && (
        <div className="admin-detail-section mt-6">
          <h3 className="admin-form-section-title">Notes</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{payment.notes}</p>
        </div>
      )}
    </div>
  );
}
