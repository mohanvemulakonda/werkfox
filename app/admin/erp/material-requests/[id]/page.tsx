import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import MaterialRequestActions from './MaterialRequestActions';

const statusBadgeClass: Record<string, string> = {
  DRAFT: 'admin-badge admin-badge-draft',
  SUBMITTED: 'admin-badge admin-badge-pending',
  APPROVED: 'admin-badge admin-badge-completed',
  PO_CREATED: 'admin-badge admin-badge-confirmed',
  FULFILLED: 'admin-badge admin-badge-in-progress',
};

async function getMaterialRequest(id: number) {
  return prisma.material_requests.findUnique({
    where: { id },
    include: {
      productionOrder: { select: { id: true, prodNumber: true, productName: true } },
      items: {
        include: { product: { select: { name: true, sku: true } } },
      },
    },
  });
}

export default async function MaterialRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mrId = parseInt(id);
  if (isNaN(mrId)) notFound();

  const mr = await getMaterialRequest(mrId);
  if (!mr) notFound();

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{mr.mrNumber}</h1>
            <span className={statusBadgeClass[mr.status] || 'admin-badge'}>{mr.status.replace('_', ' ')}</span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            {mr.type} request — Created {mr.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/erp/material-requests" className="admin-btn admin-btn-secondary">Back to Material Requests</Link>
      </div>

      <MaterialRequestActions materialRequestId={mr.id} status={mr.status} />

      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Request Details</h3>
        <div className="admin-detail-grid">
          <div><span className="admin-detail-label">Type</span><span className="admin-detail-value">{mr.type}</span></div>
          <div><span className="admin-detail-label">Priority</span><span className="admin-detail-value">{mr.priority}</span></div>
          <div><span className="admin-detail-label">Department</span><span className="admin-detail-value">{mr.department || '-'}</span></div>
          <div><span className="admin-detail-label">Requested By</span><span className="admin-detail-value">{mr.requestedBy || '-'}</span></div>
          <div><span className="admin-detail-label">Required Date</span><span className="admin-detail-value">{mr.requiredDate ? new Date(mr.requiredDate).toLocaleDateString('en-IN') : '-'}</span></div>
          <div><span className="admin-detail-label">Approved By</span><span className="admin-detail-value">{mr.approvedBy || '-'}</span></div>
          {mr.productionOrder && (
            <div>
              <span className="admin-detail-label">Production Order</span>
              <Link href={`/admin/erp/production/${mr.productionOrder.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                {mr.productionOrder.prodNumber} — {mr.productionOrder.productName}
              </Link>
            </div>
          )}
          {mr.purchaseOrderId && (
            <div>
              <span className="admin-detail-label">Purchase Order</span>
              <Link href={`/admin/erp/purchase-orders/${mr.purchaseOrderId}`} className="text-blue-600 hover:text-blue-800 text-sm">
                View PO
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="admin-table-container mt-6">
        <h3 className="admin-form-section-title px-6 pt-4">Items</h3>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Requested Qty</th>
                <th>Approved Qty</th>
                <th>Issued Qty</th>
              </tr>
            </thead>
            <tbody>
              {mr.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="font-medium text-gray-900">{item.product?.name || item.productName}</td>
                  <td className="text-gray-500">{item.product?.sku || '-'}</td>
                  <td>{Number(item.requestedQuantity)}</td>
                  <td>{Number(item.approvedQuantity)}</td>
                  <td>{Number(item.issuedQuantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mr.notes && (
        <div className="admin-detail-section mt-6">
          <h3 className="admin-form-section-title">Notes</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{mr.notes}</p>
        </div>
      )}
    </div>
  );
}
