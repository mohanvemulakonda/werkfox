import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductForm from '../ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.products.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    notFound();
  }

  // Serialize Decimal fields for client component
  const serialized = {
    ...product,
    basePrice: product.basePrice ? Number(product.basePrice) : null,
    costPrice: product.costPrice ? Number(product.costPrice) : null,
    mrp: product.mrp ? Number(product.mrp) : null,
    gstRate: product.gstRate ? Number(product.gstRate) : null,
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/erp/products"
          className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
        >
          &larr; Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Product</h1>
        <p className="text-gray-600 font-inter font-light">Update product details for {product.name}</p>
      </div>

      <ProductForm product={serialized} />
    </div>
  );
}
