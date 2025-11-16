import prisma from '@/lib/prisma';
import ProductForm from '../ProductForm';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });

  if (!product) {
    notFound();
  }

  // Convert Decimal to number for the form
  return {
    ...product,
    basePrice: product.basePrice.toString(),
    gstRate: product.gstRate.toString(),
  };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Product</h1>
        <p className="text-gray-600 font-inter font-light">Update product details</p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
