import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusBadgeClass: Record<string, string> = {
  DRAFT: 'admin-badge admin-badge-draft',
  SUBMITTED: 'admin-badge admin-badge-pending',
  APPROVED: 'admin-badge admin-badge-completed',
  PO_CREATED: 'admin-badge admin-badge-confirmed',
  FULFILLED: 'admin-badge admin-badge-in-progress',
};

const priorityBadge: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

async function getMaterialRequests() {
  return prisma.material_requests.findMany({
    include: {
      productionOrder: { select: { prodNumber: true } },
      _count: { select: { items: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function MaterialRequestsPage() {
  const materialRequests = await getMaterialRequests();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Material Requests</h1>
          <p className="text-gray-600 font-inter font-light">Manage material requisitions for production and warehousing</p>
        </div>
        <Link href="/admin/erp/material-requests/create" className="admin-btn admin-btn-primary">
          New Material Request
        </Link>
      </div>

      <div className="admin-table-container">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>MR Number</th>
                <th>Type</th>
                <th>Production Order</th>
                <th>Department</th>
                <th>Items</th>
                <th>Priority</th>
                <th>Required Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {materialRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No material requests found
                  </td>
                </tr>
              ) : (
                materialRequests.map((mr) => (
                  <tr key={mr.id}>
                    <td>
                      <Link href={`/admin/erp/material-requests/${mr.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        {mr.mrNumber}
                      </Link>
                    </td>
                    <td>{mr.type}</td>
                    <td>{mr.productionOrder?.prodNumber || '-'}</td>
                    <td>{mr.department || '-'}</td>
                    <td>{mr._count.items}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${priorityBadge[mr.priority] || ''}`}>
                        {mr.priority}
                      </span>
                    </td>
                    <td>{mr.requiredDate ? new Date(mr.requiredDate).toLocaleDateString('en-IN') : '-'}</td>
                    <td>
                      <span className={statusBadgeClass[mr.status] || 'admin-badge'}>
                        {mr.status.replace('_', ' ')}
                      </span>
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
