import SubNav from '../components/SubNav';

const erpNavItems = [
  { name: 'Overview', href: '/admin/erp' },
  { name: 'Products', href: '/admin/erp/products' },
  { name: 'Stock', href: '/admin/erp/inventory' },
  { name: 'Warehouses', href: '/admin/erp/warehouses' },
  { name: 'Quotes', href: '/admin/erp/quotes' },
  { name: 'Sales Orders', href: '/admin/erp/sales-orders' },
  { name: 'Invoices', href: '/admin/erp/invoices' },
  { name: 'Vendors', href: '/admin/erp/vendors' },
  { name: 'Purchase Orders', href: '/admin/erp/purchase-orders' },
  { name: 'GRN', href: '/admin/erp/grn' },
  { name: 'Material Requests', href: '/admin/erp/material-requests' },
  { name: 'Production', href: '/admin/erp/production' },
  { name: 'Work Orders', href: '/admin/erp/work-orders' },
  { name: 'Dispatch', href: '/admin/erp/dispatch' },
  { name: 'Payments', href: '/admin/erp/payments' },
];

export default function ERPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav items={erpNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
