'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';
import KanbanBoard from '../../components/KanbanBoard';
import KanbanCard from '../../components/KanbanCard';

interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  productType?: string;
  hsnCode?: string;
  basePrice: string;
  currency: string;
  unit: string;
  gstRate: string;
  stockQuantity: number;
  isActive: boolean;
  categoryRef?: { name: string };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('kanban');

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products'); // Note: Assuming standard API endpoint
      const data = await response.json();

      if (response.ok) {
        let filtered = Array.isArray(data) ? data : data.products || [];
        if (searchQuery) {
          filtered = filtered.filter((p: Product) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(filtered);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => {
      const cat = p.productType || p.categoryRef?.name || 'Uncategorized';
      cats.add(cat);
    });
    return Array.from(cats).sort();
  }, [products]);

  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    categories.forEach(cat => grouped[cat] = []);
    products.forEach(p => {
      const cat = p.productType || p.categoryRef?.name || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });
    return grouped;
  }, [products, categories]);

  const kanbanColumns = categories.map(cat => ({
    id: cat,
    title: cat,
    count: productsByCategory[cat]?.length || 0,
    aggregate: '' // Dynamic aggregates (e.g., total stock value) could be added
  }));

  const formatCurrency = (value: string, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
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
          <Link
            href="/admin/erp/products/create"
            className="admin-btn admin-btn-primary"
          >
            + Add Product
          </Link>
        }
      />

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No products found.</div>
        ) : view === 'kanban' ? (
          <KanbanBoard columns={kanbanColumns}>
            {categories.map(cat => (
              <div key={cat} className="flex flex-col gap-2">
                {productsByCategory[cat]?.map(product => (
                  <Link href={`/admin/erp/products/${product.id}`} key={product.id} className="no-underline">
                    <KanbanCard
                      title={product.name}
                      subtitle={product.sku}
                      amount={formatCurrency(product.basePrice, product.currency)}
                      initials={product.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      priority={product.stockQuantity < 10 ? 3 : 0} // High priority if low stock
                      tags={[
                        { label: `${product.stockQuantity} ${product.unit}`, color: product.stockQuantity < 10 ? '#EF4444' : '#6B7280' },
                        { label: `${product.gstRate}% GST`, color: '#3B82F6' }
                      ]}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </KanbanBoard>
        ) : (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">GST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/erp/products/${product.id}`} className="text-sm font-bold text-[#E03B12] hover:underline">
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {product.productType || product.categoryRef?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {formatCurrency(product.basePrice, product.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${product.stockQuantity < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                          {product.stockQuantity} {product.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.gstRate}%</td>
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
