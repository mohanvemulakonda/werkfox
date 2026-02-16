import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import GRNStatusActions from './GRNStatusActions';

async function getGRN(id: number) {
  return prisma.goods_receipt_notes.findUnique({
    where: { id },
    include: {
      purchaseOrder: {
        select: { id: true, poNumber: true, vendorName: true, status: true },
      },
      location: true,
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });
}

const statusSteps = [
  { key: 'PENDING', label: 'Pending' },
  { key: 'QC_PENDING', label: 'QC Pending' },
  { key: 'QC_PASSED', label: 'QC Passed' },
  { key: 'COMPLETED', label: 'Completed' },
];

function getStepState(currentStatus: string, stepKey: string) {
  const statusOrder = ['PENDING', 'QC_PENDING', 'QC_PASSED', 'COMPLETED'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepKey);

  // Special case: QC_FAILED branches off
  if (currentStatus === 'QC_FAILED') {
    if (stepIndex <= 1) return 'completed';
    return 'pending';
  }

  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'current';
  return 'pending';
}

function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'admin-badge admin-badge-pending',
    QC_PENDING: 'admin-badge admin-badge-qc-pending',
    QC_PASSED: 'admin-badge admin-badge-qc-passed',
    QC_FAILED: 'admin-badge admin-badge-qc-failed',
    COMPLETED: 'admin-badge admin-badge-completed',
  };
  return map[status] || 'admin-badge';
}

export default async function GRNDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const grnId = parseInt(id);

  if (isNaN(grnId)) {
    notFound();
  }

  const grn = await getGRN(grnId);

  if (!grn) {
    notFound();
  }

  const totalReceivedValue = grn.items.reduce(
    (sum, item) => sum + item.receivedQuantity * Number(item.unitCost),
    0
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{grn.grnNumber}</h1>
            <span className={getStatusBadgeClass(grn.status)}>
              {grn.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            Goods received on {grn.receivedDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/erp/grn"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium font-inter hover:bg-gray-50 transition-colors"
        >
          Back to GRNs
        </Link>
      </div>

      {/* Status Timeline */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">QC Status Flow</h3>
        {grn.status === 'QC_FAILED' ? (
          <div className="flex items-center gap-3">
            <span className="admin-badge admin-badge-qc-failed">QC FAILED</span>
            <span className="text-sm text-gray-500 font-inter">Quality check did not pass for this receipt</span>
          </div>
        ) : (
          <div className="admin-status-timeline">
            {statusSteps.map((step, index) => {
              const state = getStepState(grn.status, step.key);
              return (
                <div key={step.key} className="contents">
                  <div className={`step ${state}`}>
                    <div className="dot">
                      {state === 'completed' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className="label">{step.label}</span>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`connector ${state === 'completed' ? 'completed' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* QC Action Buttons */}
        <GRNStatusActions grnId={grn.id} currentStatus={grn.status} />
      </div>

      {/* GRN Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Receipt Details</h3>
        <div className="admin-detail-grid">
          <div>
            <p className="admin-detail-label">GRN Number</p>
            <p className="admin-detail-value">{grn.grnNumber}</p>
          </div>
          <div>
            <p className="admin-detail-label">Purchase Order</p>
            <p className="admin-detail-value">
              <Link href={`/admin/erp/purchase-orders/${grn.purchaseOrder.id}`} className="text-blue-600 hover:underline">
                {grn.purchaseOrder.poNumber}
              </Link>
            </p>
          </div>
          <div>
            <p className="admin-detail-label">Vendor</p>
            <p className="admin-detail-value">{grn.vendorName}</p>
          </div>
          <div>
            <p className="admin-detail-label">Location</p>
            <p className="admin-detail-value">{grn.location?.name || '-'}</p>
          </div>
          <div>
            <p className="admin-detail-label">Received Date</p>
            <p className="admin-detail-value">
              {grn.receivedDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="admin-detail-label">PO Status</p>
            <p className="admin-detail-value">{grn.purchaseOrder.status.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <p className="admin-detail-label">Total Items</p>
            <p className="admin-detail-value">{grn.items.length}</p>
          </div>
          <div>
            <p className="admin-detail-label">Received Value</p>
            <p className="admin-detail-value">₹{totalReceivedValue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        {grn.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="admin-detail-label">Notes</p>
            <p className="text-sm text-gray-700 font-inter">{grn.notes}</p>
          </div>
        )}
        {grn.verifiedAt && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="admin-detail-label">Verified At</p>
            <p className="text-sm text-gray-700 font-inter">
              {grn.verifiedAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Received Items</h3>
        <div className="overflow-x-auto">
          <table className="admin-line-items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Ordered Qty</th>
                <th>Received Qty</th>
                <th>Accepted Qty</th>
                <th>Rejected Qty</th>
                <th>Batch #</th>
                <th>Expiry</th>
                <th>Unit Cost</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {grn.items.map((item) => (
                <tr key={item.id} className="admin-line-item-row">
                  <td>
                    <span className="text-sm font-medium text-gray-900 font-inter">{item.productName}</span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600 font-inter font-mono">{item.productSku}</span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600 font-inter">{item.orderedQuantity}</span>
                  </td>
                  <td>
                    <span className="text-sm font-medium text-gray-900 font-inter">{item.receivedQuantity}</span>
                  </td>
                  <td>
                    <span className={`text-sm font-medium font-inter ${item.acceptedQuantity > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {item.acceptedQuantity}
                    </span>
                  </td>
                  <td>
                    <span className={`text-sm font-medium font-inter ${item.rejectedQuantity > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {item.rejectedQuantity}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600 font-inter">{item.batchNumber || '-'}</span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600 font-inter">
                      {item.expiryDate
                        ? new Date(item.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '-'}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600 font-inter">₹{Number(item.unitCost).toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    <span className="text-sm font-medium text-gray-900 font-inter">
                      ₹{(item.receivedQuantity * Number(item.unitCost)).toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
