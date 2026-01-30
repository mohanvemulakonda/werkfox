import Link from 'next/link';

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
    basePrice: 450,
    gstRate: 18,
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
    basePrice: 12500,
    gstRate: 18,
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
    basePrice: 280,
    gstRate: 18,
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
    basePrice: 8500,
    gstRate: 18,
    stockQuantity: 0,
    unit: 'Pcs',
    isActive: false,
  },
];

export default function ProductsPage() {
  const products = demoProducts;

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    categories: [...new Set(products.map(p => p.category))].length,
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Product Catalog</h1>
          <p className="text-gray-600 font-inter font-light">Manage your products and services with HSN codes and GST rates</p>
        </div>
        <Link
          href="/admin/erp/products/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ Add Product</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Active Products</p>
          <p className="text-3xl font-bold text-green-600 font-open-sans">{stats.active}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Categories</p>
          <p className="text-3xl font-bold text-blue-600 font-open-sans">{stats.categories}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No products yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Add your first product to get started</p>
            <Link
              href="/admin/erp/products/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Add Product</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    HSN Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    GST Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-500 font-inter truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {product.category || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {product.hsnCode || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {product.currency} {product.basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {product.gstRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {product.stockQuantity || 0} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-900 font-inter ${
                        product.isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/erp/products/${product.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter mr-4"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
