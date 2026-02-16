'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LineItem {
  type: string;
  productId: number | null;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  basePrice: number;
}

interface Customer {
  id: number;
  name: string;
  customerCode: string | null;
}

interface SalesOrder {
  id: number;
  soNumber: string;
}

interface WorkOrderFormProps {
  workOrder?: any;
}

export default function WorkOrderForm({ workOrder }: WorkOrderFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);

  // Work order fields
  const [type, setType] = useState(workOrder?.type || 'SERVICE');
  const [customerId, setCustomerId] = useState<number | null>(workOrder?.customerId || null);
  const [salesOrderId, setSalesOrderId] = useState<number | null>(workOrder?.salesOrderId || null);
  const [title, setTitle] = useState(workOrder?.title || '');
  const [description, setDescription] = useState(workOrder?.description || '');
  const [priority, setPriority] = useState(workOrder?.priority || 'MEDIUM');
  const [assignedTo, setAssignedTo] = useState(workOrder?.assignedTo || '');
  const [scheduledDate, setScheduledDate] = useState(
    workOrder?.scheduledDate
      ? new Date(workOrder.scheduledDate).toISOString().split('T')[0]
      : ''
  );
  const [estimatedHours, setEstimatedHours] = useState(
    workOrder?.estimatedHours ? Number(workOrder.estimatedHours) : ''
  );
  const [notes, setNotes] = useState(workOrder?.notes || '');

  // Line items
  const [items, setItems] = useState<LineItem[]>(
    workOrder?.items?.map((item: any) => ({
      type: item.type || 'MATERIAL',
      productId: item.productId,
      description: item.description || '',
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      total: Number(item.total),
    })) || [
      { type: 'MATERIAL', productId: null, description: '', quantity: 1, unitPrice: 0, total: 0 },
    ]
  );

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchSalesOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(Array.isArray(data) ? data : data.customers || []);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchSalesOrders = async () => {
    try {
      const res = await fetch('/api/sales-orders');
      if (res.ok) {
        const data = await res.json();
        setSalesOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching sales orders:', err);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      const updated = [...items];
      updated[index] = {
        ...updated[index],
        productId: product.id,
        description: product.name,
        unitPrice: Number(product.basePrice),
      };
      updated[index].total = calculateLineTotal(updated[index]);
      setItems(updated);
    }
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    // If changing type away from MATERIAL, clear productId
    if (field === 'type' && value !== 'MATERIAL') {
      updated[index].productId = null;
    }
    updated[index].total = calculateLineTotal(updated[index]);
    setItems(updated);
  };

  const calculateLineTotal = (item: LineItem): number => {
    return item.quantity * item.unitPrice;
  };

  const addItem = () => {
    setItems([
      ...items,
      { type: 'MATERIAL', productId: null, description: '', quantity: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const laborCost = items
    .filter(item => item.type === 'LABOR')
    .reduce((sum, item) => sum + item.total, 0);
  const materialCost = items
    .filter(item => item.type === 'MATERIAL')
    .reduce((sum, item) => sum + item.total, 0);
  const expenseCost = items
    .filter(item => item.type === 'EXPENSE')
    .reduce((sum, item) => sum + item.total, 0);
  const totalCost = laborCost + materialCost + expenseCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!customerId) {
      setError('Please select a customer.');
      setIsSubmitting(false);
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title.');
      setIsSubmitting(false);
      return;
    }

    const validItems = items.filter(item => item.description.trim() && item.quantity > 0);

    const payload = {
      customerId,
      salesOrderId: salesOrderId || null,
      title,
      type,
      description,
      priority,
      assignedTo: assignedTo || null,
      scheduledDate: scheduledDate || null,
      estimatedHours: estimatedHours || null,
      notes,
      items: validItems,
    };

    try {
      const url = workOrder
        ? `/api/work-orders/${workOrder.id}`
        : '/api/work-orders';
      const method = workOrder ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save work order');
      }

      const result = await res.json();
      router.push(`/admin/erp/work-orders/${result.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="admin-alert admin-alert-error mb-6">
          {error}
        </div>
      )}

      {/* Work Order Details */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Work Order Details</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="admin-form-input"
              required
            >
              <option value="SERVICE">Service</option>
              <option value="REPAIR">Repair</option>
              <option value="INSTALLATION">Installation</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="admin-form-input"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Customer *</label>
            <select
              value={customerId || ''}
              onChange={(e) => setCustomerId(e.target.value ? parseInt(e.target.value) : null)}
              className="admin-form-input"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.customerCode ? `(${c.customerCode})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Sales Order (Optional)</label>
            <select
              value={salesOrderId || ''}
              onChange={(e) => setSalesOrderId(e.target.value ? parseInt(e.target.value) : null)}
              className="admin-form-input"
            >
              <option value="">None</option>
              {salesOrders.map((so) => (
                <option key={so.id} value={so.id}>
                  {so.soNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-form-label">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-form-input"
              placeholder="Brief description of the work to be done"
              required
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-form-textarea"
              rows={3}
              placeholder="Detailed description of the work order"
            />
          </div>
        </div>
      </div>

      {/* Scheduling & Assignment */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Scheduling & Assignment</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="admin-form-input"
              placeholder="Technician or team name"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Scheduled Date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Estimated Hours</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value ? parseFloat(e.target.value) : '')}
              className="admin-form-input"
              placeholder="e.g. 4.5"
            />
          </div>
        </div>
      </div>

      {/* Line Items Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Work Order Items</h3>
        <table className="admin-line-items-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Product</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="admin-line-item-row">
                <td>
                  <select
                    value={item.type}
                    onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                    className="admin-line-item-input"
                  >
                    <option value="MATERIAL">Material</option>
                    <option value="LABOR">Labor</option>
                    <option value="EXPENSE">Expense</option>
                  </select>
                </td>
                <td>
                  {item.type === 'MATERIAL' ? (
                    <select
                      value={item.productId || ''}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="admin-line-item-input"
                    >
                      <option value="">Select Product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs text-gray-400 font-inter">N/A</span>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="admin-line-item-input"
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="admin-line-item-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="admin-line-item-input"
                  />
                </td>
                <td className="font-medium text-gray-900 font-inter text-sm whitespace-nowrap">
                  {'\u20B9'}{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addItem}
          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium font-inter"
        >
          + Add Line Item
        </button>
      </div>

      {/* Cost Summary */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Cost Summary</h3>
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Labor Cost</span>
              <span className="font-medium text-gray-900">{'\u20B9'}{laborCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Material Cost</span>
              <span className="font-medium text-gray-900">{'\u20B9'}{materialCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            {expenseCost > 0 && (
              <div className="flex justify-between text-sm font-inter">
                <span className="text-gray-600">Expenses</span>
                <span className="font-medium text-gray-900">{'\u20B9'}{expenseCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-base font-inter">
              <span className="font-semibold text-gray-900">Total Cost</span>
              <span className="font-bold text-gray-900">{'\u20B9'}{totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Additional Information</h3>
        <div className="admin-form-row">
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-form-label">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="admin-form-textarea"
              rows={3}
              placeholder="Notes for internal reference"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="admin-btn admin-btn-primary"
        >
          {isSubmitting
            ? 'Saving...'
            : workOrder
            ? 'Update Work Order'
            : 'Create Work Order'}
        </button>
      </div>
    </form>
  );
}
