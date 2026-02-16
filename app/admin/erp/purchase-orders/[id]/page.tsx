import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import StatusActions from './StatusActions';

const poStatusFlow = ['DRAFT', 'SENT', 'CONFIRMED', 'RECEIVED'];

const statusBadgeClass: Record<string, string> = {
  DRAFT: 'admin-badge admin-badge-draft',
  SENT: 'admin-badge admin-badge-sent',
  CONFIRMED: 'admin-badge admin-badge-confirmed',
  PARTIAL_RECEIVED: 'admin-badge admin-badge-partial',
  RECEIVED: 'admin-badge admin-badge-received',
  CANCELLED: 'admin-badge admin-badge-cancelled',
};

const paymentBadgeClass: Record<string, string> = {
  UNPAID: 'admin-badge admin-badge-unpaid',
  PARTIAL: 'admin-badge admin-badge-partial',
  PAID: 'admin-badge admin-badge-paid',
  OVERDUE: 'admin-badge admin-badge-overdue',
  REFUNDED: 'admin-badge admin-badge-cancelled',
};

function formatCurrency(value: any): string {
  return Number(value).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getTimelineStatus(currentStatus: string, step: string): 'completed' | 'current' | '' {
  const currentIdx = poStatusFlow.indexOf(currentStatus);
  const stepIdx = poStatusFlow.indexOf(step);

  // Handle special statuses not in the flow
  if (currentStatus === 'CANCELLED') {
    return '';
  }
  if (currentStatus === 'PARTIAL_RECEIVED') {
    // PARTIAL_RECEIVED is between CONFIRMED and RECEIVED
    if (stepIdx <= 2) return 'completed';
    if (step === 'RECEIVED') return 'current';
    return '';
  }

  if (currentIdx === -1 || stepIdx === -1) return '';
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return '';
}

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
      goodsReceiptNotes: {
        select: { id: true, grnNumber: true, status: true, receivedDate: true },
      },
    },
  });
}

export default async function PurchaseOrderDetailPage({
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

  const isCancelled = po.status === 'CANCELLED';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {po.poNumber}
            </h1>
            <span className={statusBadgeClass[po.status] || 'admin-badge'}>
              {po.status.replace('_', ' ')}
            </span>
            <span className={paymentBadgeClass[po.paymentStatus] || 'admin-badge'}>
              {po.paymentStatus}
            </span>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Created on {formatDate(po.createdAt)}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link
            href="/admin/erp/purchase-orders"
            className="admin-btn admin-btn-secondary"
          >
            Back to List
          </Link>
          <StatusActions poId={po.id} status={po.status} />
        </div>
      </div>

      {/* Status Timeline */}
      {!isCancelled && (
        <div className="admin-detail-section">
          <div className="admin-status-timeline">
            {poStatusFlow.map((step, index) => {
              const timelineStatus = getTimelineStatus(po.status, step);
              return (
                <div key={step} style={{ display: 'contents' }}>
                  <div className={`step ${timelineStatus}`}>
                    <div className="dot">
                      {timelineStatus === 'completed' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="label">{step.replace('_', ' ')}</div>
                  </div>
                  {index < poStatusFlow.length - 1 && (
                    <div className={`connector ${timelineStatus === 'completed' ? 'completed' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="admin-detail-section" style={{ borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.03)' }}>
          <p style={{ color: '#991b1b', fontWeight: 500, fontSize: '0.9375rem' }}>
            This purchase order has been cancelled.
          </p>
        </div>
      )}

      {/* Vendor Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Vendor Information</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Vendor Name</div>
            <div className="admin-detail-value">{po.vendorName}</div>
          </div>
          <div>
            <div className="admin-detail-label">Vendor Code</div>
            <div className="admin-detail-value">{po.vendor.code || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Email</div>
            <div className="admin-detail-value">{po.vendorEmail || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">GST Number</div>
            <div className="admin-detail-value">{po.vendorGst || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">State</div>
            <div className="admin-detail-value">{po.vendorState || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Contact Person</div>
            <div className="admin-detail-value">{po.vendor.contactPerson || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Phone</div>
            <div className="admin-detail-value">{po.vendor.phone || '-'}</div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Order Details</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Location</div>
            <div className="admin-detail-value">{po.location.name}</div>
          </div>
          <div>
            <div className="admin-detail-label">Order Date</div>
            <div className="admin-detail-value">{formatDate(po.orderDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Expected Date</div>
            <div className="admin-detail-value">{formatDate(po.expectedDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Received Date</div>
            <div className="admin-detail-value">{formatDate(po.receivedDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Payment Terms</div>
            <div className="admin-detail-value">{po.paymentTerms || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Currency</div>
            <div className="admin-detail-value">{po.currency}</div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <span className="admin-table-title">Order Items ({po.items.length})</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>SKU</th>
              <th>Ordered Qty</th>
              <th>Received Qty</th>
              <th>Unit Cost</th>
              <th>Tax Rate</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {po.items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="primary">{item.productName}</td>
                <td>{item.productSku}</td>
                <td>{item.orderedQuantity}</td>
                <td>
                  <span style={{ color: item.receivedQuantity >= item.orderedQuantity ? '#065f46' : item.receivedQuantity > 0 ? '#92400e' : 'inherit' }}>
                    {item.receivedQuantity}
                  </span>
                </td>
                <td>{formatCurrency(item.unitCost)}</td>
                <td>{Number(item.taxRate)}%</td>
                <td className="primary">{formatCurrency(item.totalCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="admin-detail-section" style={{ marginTop: '1.5rem' }}>
        <div style={{ maxWidth: '320px', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(po.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            <span>Tax Amount</span>
            <span>{formatCurrency(po.taxAmount)}</span>
          </div>
          {Number(po.shippingCost) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>{formatCurrency(po.shippingCost)}</span>
            </div>
          )}
          {Number(po.discount) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <span>Discount</span>
              <span>-{formatCurrency(po.discount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid rgba(0,0,0,0.08)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span>Total</span>
            <span>{formatCurrency(po.total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {po.notes && (
        <div className="admin-detail-section">
          <h3 className="admin-form-section-title">Notes</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
            {po.notes}
          </p>
        </div>
      )}

      {/* Linked GRNs */}
      {po.goodsReceiptNotes.length > 0 && (
        <div className="admin-table-container" style={{ marginTop: '1.5rem' }}>
          <div className="admin-table-header">
            <span className="admin-table-title">Goods Receipt Notes ({po.goodsReceiptNotes.length})</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>GRN Number</th>
                <th>Status</th>
                <th>Received Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {po.goodsReceiptNotes.map((grn) => {
                const grnBadgeClass = `admin-badge admin-badge-${grn.status.toLowerCase().replace('_', '-')}`;
                return (
                  <tr key={grn.id}>
                    <td className="primary">{grn.grnNumber}</td>
                    <td>
                      <span className={grnBadgeClass}>
                        {grn.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{formatDate(grn.receivedDate)}</td>
                    <td>
                      <Link
                        href={`/admin/erp/grn/${grn.id}`}
                        className="admin-table-link"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
