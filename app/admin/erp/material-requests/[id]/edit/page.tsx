'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface ItemRow {
  id?: number;
  productId: number | null;
  productName: string;
  requestedQuantity: number;
  approvedQuantity: number;
}

export default function EditMaterialRequestPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('PRODUCTION');
  const [productionOrderId, setProductionOrderId] = useState<number | null>(null);
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [requiredDate, setRequiredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ItemRow[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productionOrders, setProductionOrders] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [mrNumber, setMrNumber] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()).then(data => setProducts(Array.isArray(data) ? data : data.products || [])),
      fetch('/api/production-orders').then(r => r.json()).then(data => setProductionOrders(Array.isArray(data) ? data : data.productionOrders || [])),
      fetch(`/api/material-requests/${params.id}`).then(r => r.json()).then(data => {
        setType(data.type);
        setProductionOrderId(data.productionOrderId);
        setDepartment(data.department || '');
        setPriority(data.priority);
        setRequiredDate(data.requiredDate ? new Date(data.requiredDate).toISOString().split('T')[0] : '');
        setNotes(data.notes || '');
        setMrNumber(data.mrNumber);
        setItems(data.items?.map((i: any) => ({
          id: i.id,
          productId: i.productId,
          productName: i.productName,
          requestedQuantity: i.requestedQuantity,
          approvedQuantity: i.approvedQuantity || 0,
        })) || [{ productId: null, productName: '', requestedQuantity: 1, approvedQuantity: 0 }]);
      }),
    ]).finally(() => setLoading(false));
  }, [params.id]);

  function handleItemChange(index: number, field: string, value: any) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }

  function handleProductSelect(index: number, productId: string) {
    const product = products.find(p => p.id === parseInt(productId));
    setItems(prev => prev.map((item, i) => i === index ? {
      ...item,
      productId: product ? product.id : null,
      productName: product ? product.name : '',
    } : item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/material-requests/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          productionOrderId: productionOrderId || undefined,
          department: department || undefined,
          priority,
          requiredDate: requiredDate || undefined,
          notes: notes || undefined,
          items: items.filter(i => i.productId).map(i => ({
            productId: i.productId,
            productName: i.productName,
            requestedQuantity: i.requestedQuantity,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update');
      }
      router.push(`/admin/erp/material-requests/${params.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Material Request</h1>
        <p className="text-gray-600 font-inter font-light">Update {mrNumber}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="admin-alert admin-alert-error mb-6">{error}</div>}

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Request Details</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Type *</label>
              <select value={type} onChange={e => setType(e.target.value)} className="admin-form-input" required>
                <option value="PRODUCTION">Production</option>
                <option value="WAREHOUSE">Warehouse</option>
                <option value="GENERAL">General</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="admin-form-input">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Production Order</label>
              <select value={productionOrderId || ''} onChange={e => setProductionOrderId(e.target.value ? parseInt(e.target.value) : null)} className="admin-form-input">
                <option value="">None</option>
                {productionOrders.map((po: any) => (
                  <option key={po.id} value={po.id}>{po.prodNumber} - {po.productName}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Department</label>
              <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="admin-form-input" placeholder="e.g. Production, Maintenance" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Required Date</label>
              <input type="date" value={requiredDate} onChange={e => setRequiredDate(e.target.value)} className="admin-form-input" />
            </div>
          </div>
        </div>

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Items</h3>
          <table className="admin-line-items-table">
            <thead>
              <tr><th>Product</th><th>Requested Qty</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <select value={item.productId || ''} onChange={e => handleProductSelect(index, e.target.value)} className="admin-line-item-input">
                      <option value="">Select Product</option>
                      {products.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" min="1" value={item.requestedQuantity} onChange={e => handleItemChange(index, 'requestedQuantity', parseInt(e.target.value) || 1)} className="admin-line-item-input" />
                  </td>
                  <td>
                    {items.length > 1 && (
                      <button type="button" onClick={() => setItems(prev => prev.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => setItems(prev => [...prev, { productId: null, productName: '', requestedQuantity: 1, approvedQuantity: 0 }])} className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
            + Add Item
          </button>
        </div>

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Notes</h3>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="admin-form-textarea" rows={3} placeholder="Additional notes..." />
        </div>

        <div className="admin-form-actions">
          <button type="button" onClick={() => router.back()} className="admin-btn admin-btn-secondary">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="admin-btn admin-btn-primary">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
