import Link from 'next/link';
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

async function getPayments() {
  return prisma.payments.findMany({
    include: {
      customer: { select: { name: true } },
      vendor: { select: { name: true } },
      _count: { select: { allocations: true } },
    },
    orderBy: { paymentDate: 'desc' },
  });
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Payments</h1>
          <p className="text-gray-600 font-inter font-light">Track all accounts receivable and accounts payable payments</p>
        </div>
        <Link href="/admin/erp/payments/create" className="admin-btn admin-btn-primary">
          Record Payment
        </Link>
      </div>

      <div className="admin-table-container">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Type</th>
                <th>Customer / Vendor</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">No payments found</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <Link href={`/admin/erp/payments/${payment.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        {payment.paymentNumber}
                      </Link>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${typeBadge[payment.type] || ''}`}>
                        {payment.type}
                      </span>
                    </td>
                    <td>{payment.customer?.name || payment.vendor?.name || '-'}</td>
                    <td className="font-medium text-gray-900">
                      {payment.currency} {Number(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td>{payment.paymentMethod?.replace('_', ' ') || '-'}</td>
                    <td className="text-gray-500">{payment.referenceNumber || '-'}</td>
                    <td>{new Date(payment.paymentDate).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className={statusBadgeClass[payment.status] || 'admin-badge'}>{payment.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
