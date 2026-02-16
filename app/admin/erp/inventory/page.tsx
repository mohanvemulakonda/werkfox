'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';

interface InventoryItem {
  id: number;
  quantity: number;
  reservedQuantity: number;
  product: {
    name: string;
    sku: string;
    reorderLevel: number;
    costPrice: string;
    unit: string;
    categoryRef?: { name: string };
  };
  location?: { name: string };
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('list');

  useEffect(() => {
    fetchInventory();
  }, [searchQuery]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventory');
      const data = await response.json();

      if (response.ok) {
        let filtered = data.inventory || [];
        if (searchQuery) {
          filtered = filtered.filter((i: InventoryItem) =>
            i.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.product.sku.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setInventory(filtered);
      } else {
        setError(data.error || 'Failed to fetch inventory');
      }
    } catch (err) {
      setError('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return { label: 'OUT OF STOCK', color: '#EF4444' };
    if (reorderLevel > 0 && quantity <= reorderLevel) return { label: 'LOW STOCK', color: '#F59E0B' };
    return { label: 'IN STOCK', color: '#10B981' };
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <FilterBar
        onSearch={setSearchQuery}
        filters={searchQuery ? [{ id: 'search', label: 'Search', value: searchQuery }] : []}
        onRemoveFilter={() => setSearchQuery('')}
        view={view}
        onViewChange={setView}
        actions={
          <div className="flex gap-2">
            <Link
              href="/admin/erp/inventory/adjust"
              className="admin-btn admin-btn-secondary"
            >
              Stock Adjust
            </Link>
            <Link
              href="/admin/erp/purchase-orders/create"
              className="admin-btn admin-btn-primary"
            >
              + Reorder
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : inventory.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No inventory records found.</div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">On Hand</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Total Value</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.map((item) => {
                  const status = getStockStatus(item.quantity, item.product.reorderLevel);
                  const value = item.quantity * parseFloat(item.product.costPrice || '0');
                  return (
                    <tr key={item.id} className="hover:bg-[#fbfbfb] transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.product.sku}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{item.product.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-black">{item.product.categoryRef?.name || 'Uncategorized'}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.location?.name || 'Main Warehouse'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm font-bold text-gray-900">{item.quantity} {item.product.unit}</div>
                        {item.reservedQuantity > 0 && <div className="text-[10px] text-amber-600 font-bold">Reserved: {item.reservedQuantity}</div>}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">{formatCurrency(value.toString())}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded text-[10px] font-black text-white" style={{ backgroundColor: status.color }}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
