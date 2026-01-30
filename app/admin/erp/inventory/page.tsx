import Link from 'next/link';

// Demo inventory data
const demoInventory = [
  {
    id: '1',
    sku: 'SKU-001',
    productName: 'Industrial Labels 4x6',
    category: 'Labels & Stickers',
    location: 'Main Warehouse',
    quantity: 45,
    reservedQuantity: 10,
    reorderLevel: 100,
    unitCost: 125,
    totalValue: 5625,
    lastUpdate: new Date('2026-01-25'),
    status: 'low',
  },
  {
    id: '2',
    sku: 'SKU-002',
    productName: 'Thermal Ribbon Black 110mm',
    category: 'Printing Supplies',
    location: 'Main Warehouse',
    quantity: 250,
    reservedQuantity: 30,
    reorderLevel: 50,
    unitCost: 450,
    totalValue: 112500,
    lastUpdate: new Date('2026-01-24'),
    status: 'ok',
  },
  {
    id: '3',
    sku: 'SKU-003',
    productName: 'Barcode Printer TP-400',
    category: 'Equipment',
    location: 'Main Warehouse',
    quantity: 3,
    reservedQuantity: 1,
    reorderLevel: 10,
    unitCost: 35000,
    totalValue: 105000,
    lastUpdate: new Date('2026-01-20'),
    status: 'critical',
  },
  {
    id: '4',
    sku: 'SKU-004',
    productName: 'Paper Roll 80mm x 50m',
    category: 'Paper Products',
    location: 'Main Warehouse',
    quantity: 500,
    reservedQuantity: 75,
    reorderLevel: 200,
    unitCost: 85,
    totalValue: 42500,
    lastUpdate: new Date('2026-01-28'),
    status: 'ok',
  },
  {
    id: '5',
    sku: 'SKU-005',
    productName: 'Ink Cartridge C540',
    category: 'Printing Supplies',
    location: 'Branch - Delhi',
    quantity: 12,
    reservedQuantity: 0,
    reorderLevel: 25,
    unitCost: 1200,
    totalValue: 14400,
    lastUpdate: new Date('2026-01-22'),
    status: 'low',
  },
  {
    id: '6',
    sku: 'SKU-006',
    productName: 'Steel Storage Rack',
    category: 'Equipment',
    location: 'Main Warehouse',
    quantity: 0,
    reservedQuantity: 0,
    reorderLevel: 5,
    unitCost: 8500,
    totalValue: 0,
    lastUpdate: new Date('2026-01-15'),
    status: 'out_of_stock',
  },
];

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  ok: { bg: 'bg-green-100', text: 'text-green-800', label: 'In Stock' },
  low: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Low Stock' },
  critical: { bg: 'bg-red-100', text: 'text-red-800', label: 'Critical' },
  out_of_stock: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Out of Stock' },
};

export default function InventoryPage() {
  const inventory = demoInventory;

  const stats = {
    totalProducts: inventory.length,
    totalValue: inventory.reduce((sum, i) => sum + i.totalValue, 0),
    lowStock: inventory.filter(i => i.status === 'low' || i.status === 'critical').length,
    outOfStock: inventory.filter(i => i.status === 'out_of_stock').length,
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Inventory / Stock Levels</h1>
          <p className="text-gray-600 font-inter font-light">Monitor stock levels, track inventory value, and manage reorders</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/erp/inventory/adjust"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium font-inter hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Stock Adjustment
          </Link>
          <Link
            href="/admin/erp/purchase-orders/create"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white overflow-hidden font-inter"
          >
            <span className="relative z-10 text-sm tracking-wide">Create Purchase Order</span>
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total SKUs</p>
          <p className="text-3xl font-bold text-gray-900 font-open-sans">{stats.totalProducts}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Inventory Value</p>
          <p className="text-3xl font-bold text-green-600 font-open-sans">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Low Stock Items</p>
          <p className="text-3xl font-bold text-amber-600 font-open-sans">{stats.lowStock}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600 font-open-sans">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white font-inter">All</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 font-inter">Low Stock ({stats.lowStock})</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 font-inter">Out of Stock ({stats.outOfStock})</button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  On Hand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Value
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
              {inventory.map((item) => {
                const available = item.quantity - item.reservedQuantity;
                const statusStyle = statusStyles[item.status];

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter font-mono">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{item.productName}</div>
                      <div className="text-xs text-gray-500 font-inter">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {item.quantity}
                      {item.reservedQuantity > 0 && (
                        <span className="text-xs text-gray-400 ml-1">({item.reservedQuantity} reserved)</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {available}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {item.reorderLevel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      ₹{item.totalValue.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link
                        href={`/admin/erp/inventory/${item.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter"
                      >
                        History
                      </Link>
                      {(item.status === 'low' || item.status === 'critical' || item.status === 'out_of_stock') && (
                        <Link
                          href={`/admin/erp/purchase-orders/create?productId=${item.id}`}
                          className="text-green-600 hover:text-green-700 font-medium font-inter"
                        >
                          Reorder
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Movement Log */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Recent Stock Movements</h2>
        <div className="bg-white shadow-sm border border-gray-100 p-4">
          <div className="space-y-3">
            {[
              { type: 'in', product: 'Paper Roll 80mm x 50m', qty: 100, reason: 'PO-2026-0011 Received', date: '28 Jan 2026', user: 'Rajesh K.' },
              { type: 'out', product: 'Industrial Labels 4x6', qty: 25, reason: 'Sales Order SO-0045', date: '27 Jan 2026', user: 'System' },
              { type: 'adjust', product: 'Thermal Ribbon Black 110mm', qty: -5, reason: 'Damaged inventory', date: '26 Jan 2026', user: 'Amit S.' },
              { type: 'in', product: 'Ink Cartridge C540', qty: 20, reason: 'PO-2026-0010 Received', date: '25 Jan 2026', user: 'Rajesh K.' },
            ].map((movement, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    movement.type === 'in' ? 'bg-green-100 text-green-600' :
                    movement.type === 'out' ? 'bg-red-100 text-red-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : '~'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-inter">{movement.product}</p>
                    <p className="text-xs text-gray-500 font-inter">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold font-inter ${
                    movement.type === 'in' ? 'text-green-600' :
                    movement.type === 'out' ? 'text-red-600' :
                    'text-amber-600'
                  }`}>
                    {movement.type === 'in' ? '+' : ''}{movement.qty} units
                  </p>
                  <p className="text-xs text-gray-400 font-inter">{movement.date} by {movement.user}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/erp/inventory/movements" className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium font-inter">
            View All Movements →
          </Link>
        </div>
      </div>
    </div>
  );
}
