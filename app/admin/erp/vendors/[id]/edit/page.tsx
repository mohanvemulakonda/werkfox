import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import VendorForm from '../../VendorForm';

async function getVendor(id: number) {
  const vendor = await prisma.vendors.findUnique({
    where: { id },
  });
  return vendor;
}

export default async function EditVendorPage({
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

  // Serialize Decimal fields to plain numbers for the client component
  const serializedVendor = {
    ...vendor,
    creditLimit: vendor.creditLimit ? Number(vendor.creditLimit) : null,
    openingBalance: vendor.openingBalance ? Number(vendor.openingBalance) : null,
    currentBalance: vendor.currentBalance ? Number(vendor.currentBalance) : null,
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Vendor</h1>
          <p className="text-gray-600 font-inter font-light">
            {vendor.name} {vendor.code ? `(${vendor.code})` : ''}
          </p>
        </div>
        <Link
          href={`/admin/erp/vendors/${vendor.id}`}
          className="admin-btn admin-btn-secondary"
        >
          Back to Vendor
        </Link>
      </div>
      <VendorForm vendor={serializedVendor} />
    </div>
  );
}
