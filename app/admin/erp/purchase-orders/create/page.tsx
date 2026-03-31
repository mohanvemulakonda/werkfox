import { Suspense } from 'react';
import Link from 'next/link';
import PurchaseOrderForm from '../PurchaseOrderForm';

export default function CreatePurchaseOrderPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            New Purchase Order
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Create a new purchase order for a vendor
          </p>
        </div>
        <Link
          href="/admin/erp/purchase-orders"
          className="admin-btn admin-btn-secondary"
        >
          Back to Purchase Orders
        </Link>
      </div>

      <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>}>
        <PurchaseOrderForm />
      </Suspense>
    </div>
  );
}
