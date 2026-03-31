import Link from 'next/link';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getGRNs(orgId: number) {
  const grns = await prisma.goods_receipt_notes.findMany({
    where: { purchaseOrder: { organizationId: orgId } },
    orderBy: { createdAt: 'desc' },
    include: {
      purchaseOrder: { select: { poNumber: true, vendorName: true } },
      location: { select: { name: true } },
      items: { select: { id: true } },
    },
  });

  const total = grns.length;
  const pending = grns.filter(g => ['PENDING', 'QC_PENDING'].includes(g.status)).length;
  const completed = grns.filter(g => g.status === 'COMPLETED').length;

  return { grns, stats: { total, pending, completed } };
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

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ');
}

export default async function GRNListPage() {
  const session = await auth();
  if (!session) redirect('/sign-in');
  if (!session.currentOrg) redirect('/admin/organizations/select');
  const orgId = session.currentOrg.id;

  const { grns, stats } = await getGRNs(orgId);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Goods Receipt Notes</h1>
          <p className="text-gray-600 font-inter font-light">Track goods received against purchase orders</p>
        </div>
        <Link
          href="/admin/erp/grn/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New GRN</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total GRNs</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pending / QC</p>
          <p className="text-2xl font-bold text-amber-600 font-open-sans">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Completed</p>
          <p className="text-2xl font-bold text-green-600 font-open-sans">{stats.completed}</p>
        </div>
      </div>

      {/* GRN Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {grns.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No goods receipts yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Create a GRN when you receive goods from a purchase order</p>
            <Link
              href="/admin/erp/grn/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Create GRN</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">GRN #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">PO #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grns.map((grn) => (
                  <tr key={grn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-inter">
                      <Link href={`/admin/erp/grn/${grn.id}`} className="hover:underline">{grn.grnNumber}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {grn.purchaseOrder.poNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{grn.vendorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {grn.location?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {grn.receivedDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{grn.items.length} items</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadgeClass(grn.status)}>{formatStatus(grn.status)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link href={`/admin/erp/grn/${grn.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
