'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  sku: string;
}

interface Location {
  id: number;
  name: string;
  code: string;
}

export default function StockAdjustmentPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [productId, setProductId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'ADD' | 'SUBTRACT' | 'SET'>('ADD');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [currentStock, setCurrentStock] = useState<number | null>(null);
  const [loadingStock, setLoadingStock] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?isActive=true');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchProducts();
  }, []);

  // Fetch locations
  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('/api/locations');
        if (res.ok) {
          const data = await res.json();
          setLocations(data.locations || data);
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    }
    fetchLocations();
  }, []);

  // Fetch current stock when product and location are selected
  useEffect(() => {
    if (!productId || !locationId) {
      setCurrentStock(null);
      return;
    }

    async function fetchStock() {
      setLoadingStock(true);
      try {
        const res = await fetch(`/api/inventory?productId=${productId}&locationId=${locationId}`);
        if (res.ok) {
          const data = await res.json();
          // Handle both array and single record responses
          if (Array.isArray(data)) {
            const record = data.find(
              (i: any) => i.productId === parseInt(productId) && i.locationId === parseInt(locationId)
            );
            setCurrentStock(record?.quantity ?? 0);
          } else if (data.inventory) {
            const records = Array.isArray(data.inventory) ? data.inventory : [data.inventory];
            const record = records.find(
              (i: any) => i.productId === parseInt(productId) && i.locationId === parseInt(locationId)
            );
            setCurrentStock(record?.quantity ?? 0);
          } else {
            setCurrentStock(data.quantity ?? 0);
          }
        } else {
          setCurrentStock(0);
        }
      } catch (err) {
        setCurrentStock(0);
      } finally {
        setLoadingStock(false);
      }
    }
    fetchStock();
  }, [productId, locationId]);

  function getProjectedStock(): number | null {
    if (currentStock === null || !quantity) return null;
    const qty = parseInt(quantity) || 0;
    switch (adjustmentType) {
      case 'ADD':
        return currentStock + qty;
      case 'SUBTRACT':
        return Math.max(0, currentStock - qty);
      case 'SET':
        return qty;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!productId || !locationId || !quantity || !reason) {
      setError('All fields are required');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: parseInt(productId),
          locationId: parseInt(locationId),
          adjustmentType,
          quantity: parseInt(quantity),
          reason,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to adjust stock');
        return;
      }

      router.push('/admin/erp/inventory');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  const projectedStock = getProjectedStock();
  const selectedProduct = products.find((p) => p.id === parseInt(productId));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Stock Adjustment</h1>
        <p className="text-gray-600 font-inter font-light">Manually adjust inventory quantities</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-inter">
            {error}
          </div>
        )}

        {/* Product & Location Selection */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Select Product & Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 font-inter">
                Product *
              </label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="admin-line-item-input"
                style={{ width: '100%' }}
                required
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 font-inter">
                Location *
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="admin-line-item-input"
                style={{ width: '100%' }}
                required
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Stock Display */}
          {productId && locationId && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Current Stock</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">
                    {loadingStock ? '...' : (currentStock ?? 0)} units
                  </p>
                </div>
                {selectedProduct && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Product</p>
                    <p className="text-sm font-medium text-gray-900 font-inter">{selectedProduct.name}</p>
                    <p className="text-xs text-gray-500 font-inter font-mono">{selectedProduct.sku}</p>
                  </div>
                )}
                {projectedStock !== null && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">After Adjustment</p>
                    <p className={`text-2xl font-bold font-open-sans ${projectedStock > (currentStock ?? 0) ? 'text-green-600' : projectedStock < (currentStock ?? 0) ? 'text-red-600' : 'text-gray-900'}`}>
                      {projectedStock} units
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Adjustment Details */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Adjustment Details</h3>

          {/* Adjustment Type */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 font-inter">
              Adjustment Type *
            </label>
            <div className="flex gap-4">
              {[
                { value: 'ADD' as const, label: 'Add', desc: 'Increase stock' },
                { value: 'SUBTRACT' as const, label: 'Subtract', desc: 'Decrease stock' },
                { value: 'SET' as const, label: 'Set To', desc: 'Set exact quantity' },
              ].map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                    adjustmentType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="adjustmentType"
                    value={type.value}
                    checked={adjustmentType === type.value}
                    onChange={(e) => setAdjustmentType(e.target.value as 'ADD' | 'SUBTRACT' | 'SET')}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-inter">{type.label}</p>
                    <p className="text-xs text-gray-500 font-inter">{type.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 font-inter">
              Quantity *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="admin-line-item-input"
              style={{ width: '200px' }}
              min={0}
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 font-inter">
              Reason *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="admin-line-item-input"
              style={{ width: '100%' }}
              rows={3}
              placeholder="Provide a reason for this adjustment (e.g., physical count correction, damage, theft, etc.)"
              required
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/erp/inventory')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium font-inter hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !productId || !locationId || !quantity || !reason}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white overflow-hidden font-inter disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 text-sm tracking-wide">
              {submitting ? 'Adjusting...' : 'Apply Adjustment'}
            </span>
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </form>
    </div>
  );
}
