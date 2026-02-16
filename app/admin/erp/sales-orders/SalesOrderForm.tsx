'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomerLookup from '@/components/CustomerLookup';

interface LineItem {
  productId: number | null;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  total: number;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  basePrice: number;
  gstRate: number;
}

interface SalesOrderFormProps {
  salesOrder?: any;
}

export default function SalesOrderForm({ salesOrder }: SalesOrderFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('quoteId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  // Customer fields
  const [customerId, setCustomerId] = useState<number | null>(salesOrder?.customerId || null);
  const [customerName, setCustomerName] = useState(salesOrder?.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(salesOrder?.customerEmail || '');
  const [customerGst, setCustomerGst] = useState(salesOrder?.customerGst || '');
  const [customerState, setCustomerState] = useState(salesOrder?.customerState || '');
  const [customerPoNumber, setCustomerPoNumber] = useState(salesOrder?.customerPoNumber || '');

  // Order fields
  const [deliveryDate, setDeliveryDate] = useState(
    salesOrder?.deliveryDate
      ? new Date(salesOrder.deliveryDate).toISOString().split('T')[0]
      : ''
  );
  const [terms, setTerms] = useState(salesOrder?.terms || '');
  const [notes, setNotes] = useState(salesOrder?.notes || '');

  // Line items
  const [items, setItems] = useState<LineItem[]>(
    salesOrder?.items?.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      productSku: item.productSku,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      taxRate: Number(item.taxRate),
      discount: Number(item.discount),
      total: Number(item.total),
    })) || [
      { productId: null, productName: '', productSku: '', quantity: 1, unitPrice: 0, taxRate: 0, discount: 0, total: 0 },
    ]
  );

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch quote data if quoteId is present
  useEffect(() => {
    if (quoteId && !salesOrder) {
      fetchQuoteData(quoteId);
    }
  }, [quoteId]);

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

  const fetchQuoteData = async (id: string) => {
    try {
      const res = await fetch(`/api/quotations/${id}`);
      if (res.ok) {
        const quote = await res.json();
        setCustomerId(quote.customerId);
        setCustomerName(quote.customerName || '');
        setCustomerEmail(quote.customerEmail || '');
        setCustomerGst(quote.customerGst || '');
        setCustomerState(quote.customerState || '');
        setTerms(quote.terms || '');
        setNotes(quote.notes || '');

        if (quote.items && quote.items.length > 0) {
          setItems(
            quote.items.map((item: any) => ({
              productId: item.productId,
              productName: item.productName,
              productSku: item.productSku,
              quantity: item.quantity,
              unitPrice: Number(item.unitPrice),
              taxRate: Number(item.taxRate),
              discount: Number(item.discount),
              total: Number(item.total),
            }))
          );
        }
      }
    } catch (err) {
      console.error('Error fetching quote data:', err);
    }
  };

  const handleCustomerSelect = (customer: any) => {
    if (customer) {
      setCustomerId(customer.id);
      setCustomerName(customer.displayName || customer.companyName || '');
      setCustomerEmail(customer.email || '');
      setCustomerGst(customer.gstNumber || '');
      setCustomerState(customer.billingState || '');
    } else {
      setCustomerId(null);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerGst('');
      setCustomerState('');
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      const updated = [...items];
      updated[index] = {
        ...updated[index],
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        unitPrice: Number(product.basePrice),
        taxRate: Number(product.gstRate),
      };
      updated[index].total = calculateLineTotal(updated[index]);
      setItems(updated);
    }
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    updated[index].total = calculateLineTotal(updated[index]);
    setItems(updated);
  };

  const calculateLineTotal = (item: LineItem): number => {
    return item.quantity * item.unitPrice - item.discount;
  };

  const addItem = () => {
    setItems([
      ...items,
      { productId: null, productName: '', productSku: '', quantity: 1, unitPrice: 0, taxRate: 0, discount: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = items.reduce((sum, item) => sum + item.total * (item.taxRate / 100), 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const total = subtotal + taxAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!customerId || !customerName || !customerState) {
      setError('Please select a customer with a valid state.');
      setIsSubmitting(false);
      return;
    }

    const validItems = items.filter(item => item.productId && item.quantity > 0);
    if (validItems.length === 0) {
      setError('Please add at least one product line item.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      customerId,
      customerName,
      customerEmail,
      customerGst,
      customerState,
      customerPoNumber,
      deliveryDate: deliveryDate || null,
      terms,
      notes,
      items: validItems,
    };

    try {
      const url = salesOrder
        ? `/api/sales-orders/${salesOrder.id}`
        : '/api/sales-orders';
      const method = salesOrder ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save sales order');
      }

      router.push('/admin/erp/sales-orders');
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

      {/* Customer Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Customer Details</h3>
        <div className="mb-4">
          <CustomerLookup
            onSelect={handleCustomerSelect}
            selectedCustomer={
              customerId
                ? { id: customerId, displayName: customerName, companyName: null, contactPerson: null, email: customerEmail, phone: null, gstNumber: customerGst, billingAddress: null, billingCity: null, billingState: customerState, billingPincode: null, shippingAddress: null }
                : null
            }
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">GST Number</label>
            <input
              type="text"
              value={customerGst}
              onChange={(e) => setCustomerGst(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">State *</label>
            <input
              type="text"
              value={customerState}
              onChange={(e) => setCustomerState(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Order Details</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Customer PO Number</label>
            <input
              type="text"
              value={customerPoNumber}
              onChange={(e) => setCustomerPoNumber(e.target.value)}
              className="admin-form-input"
              placeholder="Customer's purchase order reference"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Delivery Date</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Line Items Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Line Items</h3>
        <table className="admin-line-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Tax Rate (%)</th>
              <th>Discount</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="admin-line-item-row">
                <td>
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
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
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
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.taxRate}
                    onChange={(e) => handleItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                    className="admin-line-item-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                    className="admin-line-item-input"
                  />
                </td>
                <td className="font-medium text-gray-900 font-inter text-sm whitespace-nowrap">
                  ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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

      {/* Summary */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Summary</h3>
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-900">₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-red-600">-₹{totalDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-inter">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Additional Information</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Terms & Conditions</label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="admin-form-textarea"
              rows={3}
              placeholder="Payment terms, delivery conditions, etc."
            />
          </div>
          <div className="admin-form-group">
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
            : salesOrder
            ? 'Update Sales Order'
            : 'Create Sales Order'}
        </button>
      </div>
    </form>
  );
}
