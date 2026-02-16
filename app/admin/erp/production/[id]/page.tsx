import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductionActions from './ProductionActions';

const prodStatusFlow = ['PLANNED', 'MATERIAL_REQUESTED', 'IN_PROGRESS', 'QC', 'COMPLETED'];

const statusBadgeColors: Record<string, string> = {
  PLANNED: 'bg-blue-100 text-blue-800 border-blue-300',
  MATERIAL_REQUESTED: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  QC: 'bg-purple-100 text-purple-800 border-purple-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
};

const priorityColors: Record<string, string> = {
  LOW: 'text-gray-500',
  MEDIUM: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600',
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
  const currentIdx = prodStatusFlow.indexOf(currentStatus);
  const stepIdx = prodStatusFlow.indexOf(step);

  if (currentIdx === -1 || stepIdx === -1) return '';
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return '';
}

async function getProductionOrder(id: number) {
  return prisma.production_orders.findUnique({
    where: { id },
    include: {
      product: { select: { id: true, name: true, sku: true } },
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
      materialRequests: {
        select: { id: true, mrNumber: true, status: true, type: true, createdAt: true },
      },
    },
  });
}

export default async function ProductionOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prodId = parseInt(id);

  if (isNaN(prodId)) {
    notFound();
  }

  const order = await getProductionOrder(prodId);

  if (!order) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {order.prodNumber}
            </h1>
            <span className={`px-2.5 py-1 text-xs font-medium rounded border ${statusBadgeColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {order.status.replace(/_/g, ' ')}
            </span>
            <span className={`text-sm font-medium ${priorityColors[order.priority] || 'text-gray-600'}`}>
              {order.priority}
            </span>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Created on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link
            href="/admin/erp/production"
            className="admin-btn admin-btn-secondary"
          >
            Back to List
          </Link>
          <ProductionActions productionOrderId={order.id} status={order.status} hasItems={order.items.length > 0} />
        </div>
      </div>

      {/* Status Timeline */}
      <div className="admin-detail-section">
        <div className="admin-status-timeline">
          {prodStatusFlow.map((step, index) => {
            const timelineStatus = getTimelineStatus(order.status, step);
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
                  <div className="label">{step.replace(/_/g, ' ')}</div>
                </div>
                {index < prodStatusFlow.length - 1 && (
                  <div className={`connector ${timelineStatus === 'completed' ? 'completed' : ''}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Production Details</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Product</div>
            <div className="admin-detail-value">{order.product?.name || order.productName}</div>
          </div>
          <div>
            <div className="admin-detail-label">SKU</div>
            <div className="admin-detail-value">{order.product?.sku || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Planned Quantity</div>
            <div className="admin-detail-value">{order.plannedQuantity}</div>
          </div>
          <div>
            <div className="admin-detail-label">Completed Quantity</div>
            <div className="admin-detail-value" style={{ color: order.completedQuantity >= order.plannedQuantity ? '#065f46' : 'inherit' }}>
              {order.completedQuantity}
            </div>
          </div>
          <div>
            <div className="admin-detail-label">Rejected Quantity</div>
            <div className="admin-detail-value" style={{ color: order.rejectedQuantity > 0 ? '#991b1b' : 'inherit' }}>
              {order.rejectedQuantity}
            </div>
          </div>
          <div>
            <div className="admin-detail-label">Sales Order ID</div>
            <div className="admin-detail-value">{order.salesOrderId || '-'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Planned Start Date</div>
            <div className="admin-detail-value">{formatDate(order.plannedStartDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Planned End Date</div>
            <div className="admin-detail-value">{formatDate(order.plannedEndDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Actual Start Date</div>
            <div className="admin-detail-value">{formatDate(order.actualStartDate)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Actual End Date</div>
            <div className="admin-detail-value">{formatDate(order.actualEndDate)}</div>
          </div>
        </div>
      </div>

      {/* BOM Items Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <span className="admin-table-title">Bill of Materials ({order.items.length})</span>
        </div>
        {order.items.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            No BOM items added to this production order.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Material</th>
                <th>SKU</th>
                <th>Required Qty</th>
                <th>Issued Qty</th>
                <th>Wasted Qty</th>
                <th>Unit Cost</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="primary">{item.productName}</td>
                  <td>{item.product?.sku || '-'}</td>
                  <td>{Number(item.requiredQuantity)}</td>
                  <td>{Number(item.issuedQuantity)}</td>
                  <td style={{ color: Number(item.wastedQuantity) > 0 ? '#991b1b' : 'inherit' }}>
                    {Number(item.wastedQuantity)}
                  </td>
                  <td>{formatCurrency(item.unitCost)}</td>
                  <td className="primary">{formatCurrency(Number(item.requiredQuantity) * Number(item.unitCost))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BOM Totals */}
      {order.items.length > 0 && (
        <div className="admin-detail-section" style={{ marginTop: '1.5rem' }}>
          <div style={{ maxWidth: '320px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid rgba(0,0,0,0.08)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>Total BOM Cost</span>
              <span>{formatCurrency(order.items.reduce((sum, item) => sum + Number(item.requiredQuantity) * Number(item.unitCost), 0))}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="admin-detail-section">
          <h3 className="admin-form-section-title">Notes</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
            {order.notes}
          </p>
        </div>
      )}

      {/* Linked Material Requests */}
      {order.materialRequests.length > 0 && (
        <div className="admin-table-container" style={{ marginTop: '1.5rem' }}>
          <div className="admin-table-header">
            <span className="admin-table-title">Material Requests ({order.materialRequests.length})</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>MR Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.materialRequests.map((mr) => {
                const mrStatusColors: Record<string, string> = {
                  DRAFT: 'bg-gray-100 text-gray-800 border-gray-300',
                  SUBMITTED: 'bg-blue-100 text-blue-800 border-blue-300',
                  APPROVED: 'bg-green-100 text-green-800 border-green-300',
                  PO_CREATED: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                  FULFILLED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                };
                return (
                  <tr key={mr.id}>
                    <td className="primary">{mr.mrNumber}</td>
                    <td>{mr.type}</td>
                    <td>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded border ${mrStatusColors[mr.status] || 'bg-gray-100 text-gray-800'}`}>
                        {mr.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>{formatDate(mr.createdAt)}</td>
                    <td>
                      <Link
                        href={`/admin/erp/material-requests/${mr.id}`}
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
