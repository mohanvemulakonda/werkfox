import VendorForm from '../VendorForm';
import Link from 'next/link';

export default function CreateVendorPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Add Vendor</h1>
          <p className="text-gray-600 font-inter font-light">Create a new vendor in your system</p>
        </div>
        <Link
          href="/admin/erp/vendors"
          className="admin-btn admin-btn-secondary"
        >
          Back to Vendors
        </Link>
      </div>
      <VendorForm />
    </div>
  );
}
