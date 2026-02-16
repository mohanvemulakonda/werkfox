'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VendorLookup from '@/components/VendorLookup';

interface LineItem {
  productId: number;
  productName: string;
  productSku: string;
  orderedQuantity: number;
  unitCost: number;
  taxRate: number;
  totalCost: number;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  costPrice: number | null;
  gstRate: number;
}

interface Location {
  id: number;
  name: string;
  code: string;
}

interface PurchaseOrderFormProps {
  po?: any;
}

export default function PurchaseOrderForm({ po }: PurchaseOrderFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = !!po;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Vendor fields
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorGst, setVendorGst] = useState('');
  const [vendorState, setVendorState] = useState('');

  // Order fields
  const [locationId, setLocationId] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [notes, setNotes] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { productId: 0, productName: '', productSku: '', orderedQuantity: 1, unitCost: 0, taxRate: 0, totalCost: 0 },
  ]);

  // Fetch products and locations on mount
  useEffect(() => {
    fetchProducts();
    fetchLocations();
  }, []);

  // Pre-populate from PO data (edit mode)
  useEffect(() => {
    if (po) {
      setSelectedVendor(po.vendor ? { id: po.vendorId, name: po.vendor.name || po.vendorName } : null);
      setVendorName(po.vendorName || '');
      setVendorEmail(po.vendorEmail || '');
      setVendorGst(po.vendorGst || '');
      setVendorState(po.vendorState || '');
      setLocationId(po.locationId?.toString() || '');
      setExpectedDate(po.expectedDate ? new Date(po.expectedDate).toISOString().split('T')[0] : '');
      setPaymentTerms(po.paymentTerms || '');
      setNotes(po.notes || '');
      setShippingCost(Number(po.shippingCost) || 0);
      setDiscount(Number(po.discount) || 0);

      if (po.items && po.items.length > 0) {
        setItems(
          po.items.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            productSku: item.productSku,
            orderedQuantity: item.orderedQuantity,
            unitCost: Number(item.unitCost),
            taxRate: Number(item.taxRate),
            totalCost: Number(item.totalCost),
          }))
        );
      }
    }
  }, [po]);

  // Pre-select vendor from URL search params
  useEffect(() => {
    const vendorIdParam = searchParams.get('vendorId');
    if (vendorIdParam && !isEdit) {
      fetchVendorById(vendorIdParam);
    }
  }, [searchParams, isEdit]);

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

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (response.ok) {
        const data = await response.json();
        setLocations(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const fetchVendorById = async (vendorId: string) => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`);
      if (response.ok) {
        const vendor = await response.json();
        handleVendorSelect(vendor);
      }
    } catch (err) {
      console.error('Error fetching vendor:', err);
    }
  };

  const handleVendorSelect = (vendor: any) => {
    if (vendor) {
      setSelectedVendor(vendor);
      setVendorName(vendor.name || '');
      setVendorEmail(vendor.email || '');
      setVendorGst(vendor.gstNumber || '');
      setVendorState(vendor.state || '');
    } else {
      setSelectedVendor(null);
      setVendorName('');
      setVendorEmail('');
      setVendorGst('');
      setVendorState('');
    }
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // If changing product, auto-fill product details
      if (field === 'productId') {
        const product = products.find((p) => p.id === parseInt(value));
        if (product) {
          updated[index].productId = product.id;
          updated[index].productName = product.name;
          updated[index].productSku = product.sku;
          updated[index].unitCost = Number(product.costPrice) || 0;
          updated[index].taxRate = Number(product.gstRate) || 0;
        }
      }

      // Recalculate totalCost
      updated[index].totalCost =
        updated[index].orderedQuantity * updated[index].unitCost;

      return updated;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: 0, productName: '', productSku: '', orderedQuantity: 1, unitCost: 0, taxRate: 0, totalCost: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.totalCost, 0);
  const taxAmount = items.reduce(
    (sum, item) => sum + item.totalCost * (item.taxRate / 100),
    0
  );
  const total = subtotal + taxAmount + shippingCost - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (!selectedVendor) {
      setError('Please select a vendor');
      setLoading(false);
      return;
    }

    if (!locationId) {
      setError('Please select a location');
      setLoading(false);
      return;
    }

    const validItems = items.filter((item) => item.productId > 0 && item.orderedQuantity > 0);
    if (validItems.length === 0) {
      setError('Please add at least one valid line item');
      setLoading(false);
      return;
    }

    const payload = {
      vendorId: selectedVendor.id,
      locationId: parseInt(locationId),
      vendorName,
      vendorEmail,
      vendorGst,
      vendorState,
      expectedDate: expectedDate || null,
      paymentTerms,
      notes,
      shippingCost,
      discount,
      items: validItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productSku: item.productSku,
        orderedQuantity: item.orderedQuantity,
        unitCost: item.unitCost,
        taxRate: item.taxRate,
      })),
    };

    try {
      const url = isEdit
        ? `/api/purchase-orders/${po.id}`
        : '/api/purchase-orders';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/erp/purchase-orders');
      } else {
        setError(data.error || 'Failed to save purchase order');
      }
    } catch (err) {
      setError('Failed to save purchase order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="admin-form-section" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>{error}</p>
        </div>
      )}

      {/* Vendor Selection */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Vendor Details</h3>
        <div className="admin-form-row">
          <div>
            <VendorLookup
              onSelect={handleVendorSelect}
              selectedVendor={selectedVendor}
            />
          </div>
          <div>
            <label className="admin-form-label">Vendor Name</label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="admin-form-input"
              readOnly
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Vendor Email</label>
            <input
              type="email"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
              className="admin-form-input"
              readOnly
            />
          </div>
          <div>
            <label className="admin-form-label">Vendor GST</label>
            <input
              type="text"
              value={vendorGst}
              onChange={(e) => setVendorGst(e.target.value)}
              className="admin-form-input"
              readOnly
            />
          </div>
          <div>
            <label className="admin-form-label">Vendor State</label>
            <input
              type="text"
              value={vendorState}
              onChange={(e) => setVendorState(e.target.value)}
              className="admin-form-input"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Order Details</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Location *</label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="admin-form-input admin-form-select"
              required
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="admin-form-label">Expected Delivery Date</label>
            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div>
            <label className="admin-form-label">Payment Terms</label>
            <input
              type="text"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g., Net 30"
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="admin-form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="admin-form-section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            Line Items
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="admin-btn admin-btn-secondary"
          >
            + Add Item
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-line-items-table">
            <thead>
              <tr>
                <th style={{ minWidth: '200px' }}>Product</th>
                <th style={{ width: '100px' }}>Quantity</th>
                <th style={{ width: '120px' }}>Unit Cost</th>
                <th style={{ width: '100px' }}>Tax Rate %</th>
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
                      value={item.orderedQuantity}
                      onChange={(e) =>
                        handleItemChange(index, 'orderedQuantity', parseInt(e.target.value) || 0)
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
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.taxRate}
                      onChange={(e) =>
                        handleItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)
                      }
                      className="admin-line-item-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.totalCost.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      className="admin-line-item-input"
                      readOnly
                    />
                  </td>
                  <td>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="admin-btn admin-btn-ghost"
                        style={{ padding: '0.375rem', color: '#991b1b' }}
                      >
                        X
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Summary</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Shipping Cost</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={shippingCost}
              onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
              className="admin-form-input"
            />
          </div>
          <div>
            <label className="admin-form-label">Discount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Subtotal: {subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Tax Amount: {taxAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </div>
          {shippingCost > 0 && (
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Shipping: {shippingCost.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </div>
          )}
          {discount > 0 && (
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Discount: -{discount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </div>
          )}
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            Total: {total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Notes</h3>
        <div>
          <label className="admin-form-label">Notes (visible to vendor)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="admin-form-input admin-form-textarea"
            placeholder="Add any notes for this purchase order..."
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
              ? 'Update Purchase Order'
              : 'Create Purchase Order'}
        </button>
        <Link
          href="/admin/erp/purchase-orders"
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
