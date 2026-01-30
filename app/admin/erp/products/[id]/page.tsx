import Link from 'next/link';
import { notFound } from 'next/navigation';

// Demo products data
const demoProducts = [
  {
    id: 1,
    sku: 'SKU-001',
    name: 'Thermal Barcode Labels (50x25mm)',
    description: 'Premium quality thermal labels for barcode printing',
    category: 'Labels',
    hsnCode: '48211010',
    currency: 'INR',
    basePrice: '450.00',
    gstRate: '18',
    stockQuantity: 5000,
    unit: 'Rolls',
    isActive: true,
  },
  {
    id: 2,
    sku: 'SKU-002',
    name: 'Desktop Barcode Printer',
    description: 'High-speed desktop label printer',
    category: 'Printers',
    hsnCode: '84433210',
    currency: 'INR',
    basePrice: '12500.00',
    gstRate: '18',
    stockQuantity: 25,
    unit: 'Pcs',
    isActive: true,
  },
  {
    id: 3,
    sku: 'SKU-003',
    name: 'Ribbon Wax 110mm x 300m',
    description: 'Wax ribbon for label printers',
    category: 'Ribbons',
    hsnCode: '59119090',
    currency: 'INR',
    basePrice: '280.00',
    gstRate: '18',
    stockQuantity: 1200,
    unit: 'Rolls',
    isActive: true,
  },
  {
    id: 4,
    sku: 'SKU-004',
    name: 'Industrial Handheld Scanner',
    description: 'Rugged barcode scanner for warehouse',
    category: 'Scanners',
    hsnCode: '84716050',
    currency: 'INR',
    basePrice: '8500.00',
    gstRate: '18',
    stockQuantity: 0,
    unit: 'Pcs',
    isActive: false,
  },
];

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = demoProducts.find(p => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/erp/products"
          className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
        >
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Product</h1>
        <p className="text-gray-600 font-inter font-light">Update product details</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">SKU</label>
              <input
                type="text"
                defaultValue={product.sku}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Category</label>
              <input
                type="text"
                defaultValue={product.category}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Product Name</label>
            <input
              type="text"
              defaultValue={product.name}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Description</label>
            <textarea
              defaultValue={product.description}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">HSN Code</label>
              <input
                type="text"
                defaultValue={product.hsnCode}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Base Price (INR)</label>
              <input
                type="number"
                defaultValue={product.basePrice}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">GST Rate (%)</label>
              <input
                type="number"
                defaultValue={product.gstRate}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Stock Quantity</label>
              <input
                type="number"
                defaultValue={product.stockQuantity}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Unit</label>
              <input
                type="text"
                defaultValue={product.unit}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              defaultChecked={product.isActive}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700 font-inter">Active</label>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter"
            >
              Save Changes
            </button>
            <Link
              href="/admin/erp/products"
              className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-inter"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
