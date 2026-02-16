import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import WorkOrderActions from './WorkOrderActions';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  ASSIGNED: 'admin-badge admin-badge-confirmed',
  IN_PROGRESS: 'admin-badge admin-badge-in-progress',
  ON_HOLD: 'admin-badge admin-badge-on-hold',
  COMPLETED: 'admin-badge admin-badge-completed',
  INVOICED: 'admin-badge admin-badge-cancelled',
};

const typeBadgeColors: Record<string, string> = {
  SERVICE: 'bg-blue-100 text-blue-800',
  REPAIR: 'bg-red-100 text-red-800',
  INSTALLATION: 'bg-purple-100 text-purple-800',
  MAINTENANCE: 'bg-teal-100 text-teal-800',
};

const priorityBadgeColors: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

const timelineSteps = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'];

function getStepState(currentStatus: string, step: string) {
  if (currentStatus === 'ON_HOLD' || currentStatus === 'INVOICED') {
    // For INVOICED, show all steps as completed
    if (currentStatus === 'INVOICED') return 'completed';
    const idx = timelineSteps.indexOf(step);
    return idx === 0 ? 'completed' : '';
  }
  const currentIdx = timelineSteps.indexOf(currentStatus);
  const stepIdx = timelineSteps.indexOf(step);
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return '';
}

async function getWorkOrder(id: number) {
  return prisma.work_orders.findUnique({
    where: { id },
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

export default async function WorkOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const woId = parseInt(id);

  if (isNaN(woId)) {
    notFound();
  }

  const workOrder = await getWorkOrder(woId);

  if (!workOrder) {
    notFound();
  }

  const laborCost = Number(workOrder.laborCost);
  const materialCost = Number(workOrder.materialCost);
  const totalCost = Number(workOrder.totalCost);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{workOrder.woNumber}</h1>
            <span className={statusBadgeClass[workOrder.status] || 'admin-badge'}>
              {workOrder.status.replace('_', ' ')}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${typeBadgeColors[workOrder.type] || 'bg-gray-100 text-gray-800'}`}>
              {workOrder.type}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${priorityBadgeColors[workOrder.priority] || 'bg-gray-100 text-gray-800'}`}>
              {workOrder.priority}
            </span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            Created on {workOrder.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/erp/work-orders"
          className="admin-btn admin-btn-secondary"
        >
          Back to Work Orders
        </Link>
      </div>

      {/* Status Timeline */}
      <div className="admin-detail-section mb-6">
        <div className="admin-status-timeline">
          {timelineSteps.map((step, index) => (
            <div key={step} className="flex items-center">
              {index > 0 && (
                <div className={`connector ${getStepState(workOrder.status, step) === 'completed' || getStepState(workOrder.status, step) === 'current' ? 'completed' : ''}`} />
              )}
              <div className={`step ${getStepState(workOrder.status, step)}`}>
                <div className="dot" />
                <span className="label">{step.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
        {(workOrder.status === 'ON_HOLD' || workOrder.status === 'INVOICED') && (
          <div className="mt-3 text-center">
            <span className={statusBadgeClass[workOrder.status] || 'admin-badge'}>
              Currently: {workOrder.status.replace('_', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <WorkOrderActions workOrderId={workOrder.id} status={workOrder.status} />

      {/* Work Order Info */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Work Order Details</h3>
        <div className="admin-detail-grid">
          <div>
            <span className="admin-detail-label">Title</span>
            <span className="admin-detail-value">{workOrder.title}</span>
          </div>
          <div>
            <span className="admin-detail-label">Type</span>
            <span className="admin-detail-value">{workOrder.type}</span>
          </div>
          <div>
            <span className="admin-detail-label">Priority</span>
            <span className="admin-detail-value">{workOrder.priority}</span>
          </div>
          <div>
            <span className="admin-detail-label">Assigned To</span>
            <span className="admin-detail-value">{workOrder.assignedTo || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">Scheduled Date</span>
            <span className="admin-detail-value">
              {workOrder.scheduledDate
                ? workOrder.scheduledDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
                : '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Completed Date</span>
            <span className="admin-detail-value">
              {workOrder.completedDate
                ? workOrder.completedDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
                : '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Estimated Hours</span>
            <span className="admin-detail-value">
              {workOrder.estimatedHours ? `${Number(workOrder.estimatedHours)} hrs` : '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Actual Hours</span>
            <span className="admin-detail-value">
              {workOrder.actualHours ? `${Number(workOrder.actualHours)} hrs` : '-'}
            </span>
          </div>
        </div>
        {workOrder.description && (
          <div className="mt-4">
            <span className="admin-detail-label">Description</span>
            <p className="admin-detail-value whitespace-pre-wrap mt-1">{workOrder.description}</p>
          </div>
        )}
      </div>

      {/* Customer Details */}
      <div className="admin-detail-section mt-6">
        <h3 className="admin-form-section-title">Customer Details</h3>
        <div className="admin-detail-grid">
          <div>
            <span className="admin-detail-label">Customer Name</span>
            <span className="admin-detail-value">{workOrder.customer.name}</span>
          </div>
          <div>
            <span className="admin-detail-label">Email</span>
            <span className="admin-detail-value">{workOrder.customer.email || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">Phone</span>
            <span className="admin-detail-value">{workOrder.customer.phone || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">State</span>
            <span className="admin-detail-value">{workOrder.customer.state || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">GST Number</span>
            <span className="admin-detail-value">{workOrder.customer.gstNumber || '-'}</span>
          </div>
          <div>
            <span className="admin-detail-label">Customer Code</span>
            <span className="admin-detail-value">{workOrder.customer.customerCode || '-'}</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="admin-table-container mt-6">
        <h3 className="admin-form-section-title px-6 pt-4">Work Order Items</h3>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Product</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {workOrder.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                      item.type === 'LABOR' ? 'bg-blue-50 text-blue-700' :
                      item.type === 'MATERIAL' ? 'bg-green-50 text-green-700' :
                      'bg-orange-50 text-orange-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {item.product ? `${item.product.name} (${item.product.sku})` : '-'}
                  </td>
                  <td className="font-medium text-gray-900">{item.description}</td>
                  <td>{Number(item.quantity)}</td>
                  <td>{'\u20B9'}{Number(item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="font-medium text-gray-900">{'\u20B9'}{Number(item.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="admin-detail-section mt-6">
        <h3 className="admin-form-section-title">Cost Summary</h3>
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Labor Cost</span>
              <span className="font-medium text-gray-900">{'\u20B9'}{laborCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Material Cost</span>
              <span className="font-medium text-gray-900">{'\u20B9'}{materialCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-inter">
              <span className="font-semibold text-gray-900">Total Cost</span>
              <span className="font-bold text-gray-900">{'\u20B9'}{totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {workOrder.notes && (
        <div className="admin-detail-section mt-6">
          <h3 className="admin-form-section-title">Additional Information</h3>
          <div>
            <span className="admin-detail-label">Notes</span>
            <span className="admin-detail-value whitespace-pre-wrap">{workOrder.notes}</span>
          </div>
        </div>
      )}
    </div>
  );
}
