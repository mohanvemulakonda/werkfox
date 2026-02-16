import Link from 'next/link';
import ProductionOrderForm from '../ProductionOrderForm';

export default function CreateProductionOrderPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            New Production Order
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Create a new production order for manufacturing
          </p>
        </div>
        <Link
          href="/admin/erp/production"
          className="admin-btn admin-btn-secondary"
        >
          Back to Production Orders
        </Link>
      </div>

      <ProductionOrderForm />
    </div>
  );
}
