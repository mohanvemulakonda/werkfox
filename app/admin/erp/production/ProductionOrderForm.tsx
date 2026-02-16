'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BOMItem {
  productId: number;
  productName: string;
  requiredQuantity: number;
  unitCost: number;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  costPrice: number | null;
  basePrice: number;
}

interface ProductionOrderFormProps {
  po?: any;
}

export default function ProductionOrderForm({ po }: ProductionOrderFormProps) {
  const router = useRouter();
  const isEdit = !!po;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  // Order fields
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [plannedQuantity, setPlannedQuantity] = useState(1);
  const [salesOrderId, setSalesOrderId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [plannedStartDate, setPlannedStartDate] = useState('');
  const [plannedEndDate, setPlannedEndDate] = useState('');
  const [notes, setNotes] = useState('');

  // BOM Items
  const [items, setItems] = useState<BOMItem[]>([]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Pre-populate from existing data (edit mode)
  useEffect(() => {
    if (po) {
      setProductId(po.productId?.toString() || '');
      setProductName(po.productName || '');
      setPlannedQuantity(po.plannedQuantity || 1);
      setSalesOrderId(po.salesOrderId?.toString() || '');
      setPriority(po.priority || 'MEDIUM');
      setPlannedStartDate(po.plannedStartDate ? new Date(po.plannedStartDate).toISOString().split('T')[0] : '');
      setPlannedEndDate(po.plannedEndDate ? new Date(po.plannedEndDate).toISOString().split('T')[0] : '');
      setNotes(po.notes || '');

      if (po.items && po.items.length > 0) {
        setItems(
          po.items.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            requiredQuantity: Number(item.requiredQuantity),
            unitCost: Number(item.unitCost),
          }))
        );
      }
    }
  }, [po]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?isActive=true');
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleProductSelect = (value: string) => {
    setProductId(value);
    const product = products.find((p) => p.id === parseInt(value));
    if (product) {
      setProductName(product.name);
    }
  };

  const handleItemChange = (index: number, field: keyof BOMItem, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // If changing product, auto-fill product details
      if (field === 'productId') {
        const product = products.find((p) => p.id === parseInt(value));
        if (product) {
          updated[index].productId = product.id;
          updated[index].productName = product.name;
          updated[index].unitCost = Number(product.costPrice) || 0;
        }
      }

      return updated;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: 0, productName: '', requiredQuantity: 1, unitCost: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (!productId) {
      setError('Please select a product');
      setLoading(false);
      return;
    }

    if (plannedQuantity < 1) {
      setError('Planned quantity must be at least 1');
      setLoading(false);
      return;
    }

    const validItems = items.filter((item) => item.productId > 0 && item.requiredQuantity > 0);

    const payload = {
      productId: parseInt(productId),
      productName,
      plannedQuantity,
      salesOrderId: salesOrderId || null,
      priority,
      plannedStartDate: plannedStartDate || null,
      plannedEndDate: plannedEndDate || null,
      notes,
      items: validItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        requiredQuantity: item.requiredQuantity,
        unitCost: item.unitCost,
      })),
    };

    try {
      const url = isEdit
        ? `/api/production-orders/${po.id}`
        : '/api/production-orders';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/erp/production');
      } else {
        setError(data.error || 'Failed to save production order');
      }
    } catch (err) {
      setError('Failed to save production order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate BOM total cost
  const totalBOMCost = items.reduce((sum, item) => sum + (item.requiredQuantity * item.unitCost), 0);

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="admin-form-section" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>{error}</p>
        </div>
      )}

      {/* Product Selection */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Production Details</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Product to Produce *</label>
            <select
              value={productId}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="admin-form-input admin-form-select"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="admin-form-label">Planned Quantity *</label>
            <input
              type="number"
              min="1"
              value={plannedQuantity}
              onChange={(e) => setPlannedQuantity(parseInt(e.target.value) || 0)}
              className="admin-form-input"
              required
            />
          </div>
          <div>
            <label className="admin-form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="admin-form-input admin-form-select"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Sales Order ID (Optional)</label>
            <input
              type="text"
              value={salesOrderId}
              onChange={(e) => setSalesOrderId(e.target.value)}
              placeholder="e.g., 123"
              className="admin-form-input"
            />
          </div>
          <div>
            <label className="admin-form-label">Planned Start Date</label>
            <input
              type="date"
              value={plannedStartDate}
              onChange={(e) => setPlannedStartDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div>
            <label className="admin-form-label">Planned End Date</label>
            <input
              type="date"
              value={plannedEndDate}
              onChange={(e) => setPlannedEndDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* BOM Items */}
      <div className="admin-form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="admin-form-section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            Bill of Materials (BOM)
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="admin-btn admin-btn-secondary"
          >
            + Add Material
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
            No BOM items added. Click &quot;Add Material&quot; to add raw materials required for production.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-line-items-table">
              <thead>
                <tr>
                  <th style={{ minWidth: '200px' }}>Material / Product</th>
                  <th style={{ width: '120px' }}>Required Qty</th>
                  <th style={{ width: '120px' }}>Unit Cost</th>
                  <th style={{ width: '120px' }}>Total</th>
                  <th style={{ width: '60px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="admin-line-item-row">
                    <td>
                      <select
                        value={item.productId || ''}
                        onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                        className="admin-line-item-input"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} ({product.sku})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={item.requiredQuantity}
                        onChange={(e) =>
                          handleItemChange(index, 'requiredQuantity', parseFloat(e.target.value) || 0)
                        }
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) =>
                          handleItemChange(index, 'unitCost', parseFloat(e.target.value) || 0)
                        }
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={(item.requiredQuantity * item.unitCost).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        className="admin-line-item-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="admin-btn admin-btn-ghost"
                        style={{ padding: '0.375rem', color: '#991b1b' }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {items.length > 0 && (
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Total BOM Cost: {totalBOMCost.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Notes</h3>
        <div>
          <label className="admin-form-label">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="admin-form-input admin-form-textarea"
            placeholder="Add any notes for this production order..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="admin-form-actions">
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading
            ? isEdit
              ? 'Updating...'
              : 'Creating...'
            : isEdit
              ? 'Update Production Order'
              : 'Create Production Order'}
        </button>
        <Link
          href="/admin/erp/production"
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
