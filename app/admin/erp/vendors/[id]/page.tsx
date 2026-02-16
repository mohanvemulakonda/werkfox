import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getVendor(id: number) {
  const vendor = await prisma.vendors.findUnique({
    where: { id },
    include: {
      purchaseOrders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          poNumber: true,
          status: true,
          total: true,
          orderDate: true,
        },
      },
    },
  });
  return vendor;
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(value: any) {
  const num = Number(value || 0);
  return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendorId = parseInt(id);

  if (isNaN(vendorId)) {
    notFound();
  }

  const vendor = await getVendor(vendorId);

  if (!vendor) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">{vendor.name}</h1>
            <span className={`admin-badge ${vendor.isActive ? 'admin-badge-success' : 'admin-badge-error'}`}>
              {vendor.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {vendor.code && (
            <p className="text-gray-600 font-inter font-light">{vendor.code}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/erp/vendors"
            className="admin-btn admin-btn-secondary"
          >
            Back to Vendors
          </Link>
          <Link
            href={`/admin/erp/vendors/${vendor.id}/edit`}
            className="admin-btn admin-btn-primary"
          >
            Edit Vendor
          </Link>
          <Link
            href={`/admin/erp/purchase-orders/create?vendorId=${vendor.id}`}
            className="admin-btn admin-btn-secondary"
          >
            Create PO
          </Link>
        </div>
      </div>

      {/* Basic Information */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Basic Information</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Name</div>
            <div className="admin-detail-value">{vendor.name}</div>
          </div>
          <div>
            <div className="admin-detail-label">Display Name</div>
            <div className="admin-detail-value">{vendor.displayName || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Code</div>
            <div className="admin-detail-value">{vendor.code || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Email</div>
            <div className="admin-detail-value">{vendor.email || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Phone</div>
            <div className="admin-detail-value">{vendor.phone || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Website</div>
            <div className="admin-detail-value">
              {vendor.website ? (
                <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {vendor.website}
                </a>
              ) : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Person */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Contact Person</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Contact Person</div>
            <div className="admin-detail-value">{vendor.contactPerson || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Contact Phone</div>
            <div className="admin-detail-value">{vendor.contactPhone || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Contact Email</div>
            <div className="admin-detail-value">{vendor.contactEmail || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Address</h3>
        <div className="admin-detail-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="admin-detail-label">Address</div>
            <div className="admin-detail-value">{vendor.address || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">City</div>
            <div className="admin-detail-value">{vendor.city || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">State</div>
            <div className="admin-detail-value">{vendor.state || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Pincode</div>
            <div className="admin-detail-value">{vendor.pincode || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Country</div>
            <div className="admin-detail-value">{vendor.country || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Tax Information</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">GST Number</div>
            <div className="admin-detail-value font-mono">{vendor.gstNumber || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">GST Type</div>
            <div className="admin-detail-value">{vendor.gstType || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">PAN Number</div>
            <div className="admin-detail-value font-mono">{vendor.panNumber || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Payment Terms</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Payment Terms</div>
            <div className="admin-detail-value">{vendor.paymentTerms || 'N/A'}</div>
          </div>
          <div>
            <div className="admin-detail-label">Credit Limit</div>
            <div className="admin-detail-value">{`\u20B9${formatCurrency(vendor.creditLimit)}`}</div>
          </div>
          <div>
            <div className="admin-detail-label">Credit Days</div>
            <div className="admin-detail-value">{vendor.creditDays ?? 0} days</div>
          </div>
          <div>
            <div className="admin-detail-label">Opening Balance</div>
            <div className="admin-detail-value">{`\u20B9${formatCurrency(vendor.openingBalance)}`}</div>
          </div>
          <div>
            <div className="admin-detail-label">Current Balance</div>
            <div className="admin-detail-value">{`\u20B9${formatCurrency(vendor.currentBalance)}`}</div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {vendor.notes && (
        <div className="admin-detail-section">
          <h3 className="admin-form-section-title">Notes</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{vendor.notes}</p>
        </div>
      )}

      {/* Timestamps */}
      <div className="admin-detail-section">
        <h3 className="admin-form-section-title">Record Info</h3>
        <div className="admin-detail-grid">
          <div>
            <div className="admin-detail-label">Created At</div>
            <div className="admin-detail-value">{formatDate(vendor.createdAt)}</div>
          </div>
          <div>
            <div className="admin-detail-label">Updated At</div>
            <div className="admin-detail-value">{formatDate(vendor.updatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Recent Purchase Orders */}
      {vendor.purchaseOrders.length > 0 && (
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">Recent Purchase Orders</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendor.purchaseOrders.map((po: any) => (
                <tr key={po.id}>
                  <td className="primary">{po.poNumber}</td>
                  <td>{formatDate(po.orderDate)}</td>
                  <td>
                    <span className={`admin-badge ${
                      po.status === 'RECEIVED' ? 'admin-badge-success' :
                      po.status === 'CANCELLED' ? 'admin-badge-error' :
                      po.status === 'DRAFT' ? 'admin-badge-warning' :
                      'admin-badge-info'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td>{`\u20B9${formatCurrency(po.total)}`}</td>
                  <td>
                    <Link
                      href={`/admin/erp/purchase-orders/${po.id}`}
                      className="admin-table-link"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
