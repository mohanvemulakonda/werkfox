import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import DispatchActions from './DispatchActions';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  PACKED: 'admin-badge admin-badge-confirmed',
  DISPATCHED: 'admin-badge admin-badge-in-progress',
  IN_TRANSIT: 'admin-badge admin-badge-on-hold',
  DELIVERED: 'admin-badge admin-badge-completed',
};

const timelineSteps = ['PENDING', 'PACKED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED'];

function getStepState(currentStatus: string, step: string) {
  const currentIdx = timelineSteps.indexOf(currentStatus);
  const stepIdx = timelineSteps.indexOf(step);
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return '';
}

async function getDispatchOrder(id: number) {
  return prisma.dispatch_orders.findUnique({
    where: { id },
    include: {
      salesOrder: { select: { id: true, soNumber: true } },
      customer: { select: { id: true, name: true, customerCode: true, phone: true, email: true } },
      location: { select: { name: true, code: true } },
      items: { include: { product: { select: { name: true, sku: true } } } },
    },
  });
}

export default async function DispatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dcId = parseInt(id);
  if (isNaN(dcId)) notFound();

  const dispatch = await getDispatchOrder(dcId);
  if (!dispatch) notFound();

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{dispatch.dispatchNumber}</h1>
            <span className={statusBadgeClass[dispatch.status] || 'admin-badge'}>{dispatch.status.replace('_', ' ')}</span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            Created {dispatch.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/erp/dispatch" className="admin-btn admin-btn-secondary">Back to Dispatch Orders</Link>
      </div>

      {/* Status Timeline */}
      <div className="admin-detail-section mb-6">
        <div className="admin-status-timeline">
          {timelineSteps.map((step, index) => (
            <div key={step} className="flex items-center">
              {index > 0 && <div className={`connector ${getStepState(dispatch.status, step) === 'completed' || getStepState(dispatch.status, step) === 'current' ? 'completed' : ''}`} />}
              <div className={`step ${getStepState(dispatch.status, step)}`}>
                <div className="dot" />
                <span className="label">{step.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DispatchActions dispatchId={dispatch.id} status={dispatch.status} />

      {/* Dispatch Details */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Dispatch Details</h3>
        <div className="admin-detail-grid">
          <div><span className="admin-detail-label">Sales Order</span>
            <Link href={`/admin/erp/sales-orders/${dispatch.salesOrder.id}`} className="text-blue-600 hover:text-blue-800 text-sm">{dispatch.salesOrder.soNumber}</Link>
          </div>
          <div><span className="admin-detail-label">Customer</span><span className="admin-detail-value">{dispatch.customer.name}</span></div>
          <div><span className="admin-detail-label">Shipping Method</span><span className="admin-detail-value">{dispatch.shippingMethod?.replace('_', ' ') || '-'}</span></div>
          <div><span className="admin-detail-label">Carrier</span><span className="admin-detail-value">{dispatch.carrierName || '-'}</span></div>
          <div><span className="admin-detail-label">Tracking Number</span><span className="admin-detail-value">{dispatch.trackingNumber || '-'}</span></div>
          <div><span className="admin-detail-label">Vehicle Number</span><span className="admin-detail-value">{dispatch.vehicleNumber || '-'}</span></div>
          <div><span className="admin-detail-label">Driver</span><span className="admin-detail-value">{dispatch.driverName || '-'} {dispatch.driverPhone ? `(${dispatch.driverPhone})` : ''}</span></div>
          <div><span className="admin-detail-label">Source Warehouse</span><span className="admin-detail-value">{dispatch.location?.name || '-'}</span></div>
          <div><span className="admin-detail-label">Packages</span><span className="admin-detail-value">{dispatch.numberOfPackages || '-'}</span></div>
          <div><span className="admin-detail-label">Est. Weight</span><span className="admin-detail-value">{dispatch.estimatedWeight ? `${Number(dispatch.estimatedWeight)} kg` : '-'}</span></div>
          <div><span className="admin-detail-label">Shipping Cost</span><span className="admin-detail-value">{'\u20B9'}{Number(dispatch.shippingCost).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
          <div><span className="admin-detail-label">Dispatch Date</span><span className="admin-detail-value">{dispatch.dispatchDate ? new Date(dispatch.dispatchDate).toLocaleDateString('en-IN') : '-'}</span></div>
          <div><span className="admin-detail-label">Est. Delivery</span><span className="admin-detail-value">{dispatch.estimatedDelivery ? new Date(dispatch.estimatedDelivery).toLocaleDateString('en-IN') : '-'}</span></div>
          <div><span className="admin-detail-label">Actual Delivery</span><span className="admin-detail-value">{dispatch.actualDelivery ? new Date(dispatch.actualDelivery).toLocaleDateString('en-IN') : '-'}</span></div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="admin-detail-section mt-6">
        <h3 className="admin-form-section-title">Shipping Address</h3>
        <div className="admin-detail-grid">
          <div><span className="admin-detail-label">Contact</span><span className="admin-detail-value">{dispatch.contactName || '-'} {dispatch.contactPhone ? `(${dispatch.contactPhone})` : ''}</span></div>
          <div><span className="admin-detail-label">Address</span><span className="admin-detail-value">{dispatch.shippingAddress || '-'}</span></div>
          <div><span className="admin-detail-label">City</span><span className="admin-detail-value">{dispatch.shippingCity || '-'}</span></div>
          <div><span className="admin-detail-label">State</span><span className="admin-detail-value">{dispatch.shippingState || '-'}</span></div>
          <div><span className="admin-detail-label">Pincode</span><span className="admin-detail-value">{dispatch.shippingPincode || '-'}</span></div>
        </div>
      </div>

      {/* Items */}
      <div className="admin-table-container mt-6">
        <h3 className="admin-form-section-title px-6 pt-4">Dispatch Items</h3>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Ordered Qty</th>
                <th>Dispatched Qty</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {dispatch.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="font-medium text-gray-900">{item.product?.name || item.productName}</td>
                  <td className="text-gray-500">{item.product?.sku || '-'}</td>
                  <td>{item.orderedQuantity}</td>
                  <td>{item.dispatchedQuantity}</td>
                  <td>{item.batchNumber || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dispatch.notes && (
        <div className="admin-detail-section mt-6">
          <h3 className="admin-form-section-title">Notes</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{dispatch.notes}</p>
        </div>
      )}
    </div>
  );
}
