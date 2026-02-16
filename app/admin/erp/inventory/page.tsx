import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  ok: { bg: 'bg-green-100', text: 'text-green-800', label: 'In Stock' },
  low: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Low Stock' },
  critical: { bg: 'bg-red-100', text: 'text-red-800', label: 'Critical' },
  out_of_stock: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Out of Stock' },
};

function getStockStatus(quantity: number, reorderLevel: number): string {
  if (quantity === 0) return 'out_of_stock';
  if (reorderLevel > 0 && quantity <= reorderLevel * 0.25) return 'critical';
  if (reorderLevel > 0 && quantity <= reorderLevel) return 'low';
  return 'ok';
}

async function getInventory() {
  const inventory = await prisma.inventory.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      product: { select: { name: true, sku: true, reorderLevel: true, costPrice: true, category: { select: { name: true } } } },
      location: { select: { name: true } },
    },
  });

  const totalProducts = inventory.length;
  const totalValue = inventory.reduce((sum, i) => sum + (i.quantity * Number(i.product.costPrice || 0)), 0);
  const lowStock = inventory.filter(i => {
    const status = getStockStatus(i.quantity, i.product.reorderLevel || 0);
    return status === 'low' || status === 'critical';
  }).length;
  const outOfStock = inventory.filter(i => i.quantity === 0).length;

  return { inventory, stats: { totalProducts, totalValue, lowStock, outOfStock } };
}

async function getRecentMovements() {
  return prisma.stock_movements.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      product: { select: { name: true } },
    },
  });
}

export default async function InventoryPage() {
  const [{ inventory, stats }, movements] = await Promise.all([getInventory(), getRecentMovements()]);

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
          <p className="text-3xl font-bold text-green-600 font-open-sans">₹{stats.totalValue > 0 ? (stats.totalValue / 100000).toFixed(1) + 'L' : '0'}</p>
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

      {/* Inventory Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {inventory.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No inventory records yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Inventory will be tracked when products are received via purchase orders</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">On Hand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => {
                  const available = item.quantity - item.reservedQuantity;
                  const reorderLevel = item.product.reorderLevel || 0;
                  const status = getStockStatus(item.quantity, reorderLevel);
                  const style = statusStyles[status];
                  const itemValue = item.quantity * Number(item.product.costPrice || 0);

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter font-mono">{item.product.sku}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 font-inter">{item.product.name}</div>
                        <div className="text-xs text-gray-500 font-inter">{item.product.category?.name || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{item.location?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                        {item.quantity}
                        {item.reservedQuantity > 0 && <span className="text-xs text-gray-400 ml-1">({item.reservedQuantity} reserved)</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">{available}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{reorderLevel}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">₹{itemValue.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded ${style.bg} ${style.text}`}>{style.label}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                        <Link href={`/admin/erp/inventory/${item.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter">History</Link>
                        {(status === 'low' || status === 'critical' || status === 'out_of_stock') && (
                          <Link href={`/admin/erp/purchase-orders/create?productId=${item.productId}`} className="text-green-600 hover:text-green-700 font-medium font-inter">Reorder</Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stock Movement Log */}
      {movements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Recent Stock Movements</h2>
          <div className="bg-white shadow-sm border border-gray-100 p-4">
            <div className="space-y-3">
              {movements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      movement.movementType === 'IN' ? 'bg-green-100 text-green-600' :
                      movement.movementType === 'OUT' ? 'bg-red-100 text-red-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {movement.movementType === 'IN' ? '+' : movement.movementType === 'OUT' ? '-' : '~'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-inter">{movement.product.name}</p>
                      <p className="text-xs text-gray-500 font-inter">{movement.reason || ''}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold font-inter ${
                      movement.movementType === 'IN' ? 'text-green-600' :
                      movement.movementType === 'OUT' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>
                      {movement.movementType === 'IN' ? '+' : ''}{movement.quantity} units
                    </p>
                    <p className="text-xs text-gray-400 font-inter">{movement.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
