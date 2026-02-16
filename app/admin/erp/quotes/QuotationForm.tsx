'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomerLookup from '@/components/CustomerLookup';

interface Product {
  id: number;
  sku: string;
  name: string;
  basePrice: number;
  gstRate: number;
  hsnCode: string | null;
  unit: string;
}

interface Customer {
  id: number;
  companyName: string | null;
  displayName: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  gstNumber: string | null;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingPincode: string | null;
  shippingAddress: string | null;
}

interface QuotationItem {
  productId: number;
  productName: string;
  productSku: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  total: number;
}

interface QuotationFormProps {
  quotation?: any;
}

export default function QuotationForm({ quotation }: QuotationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const defaultValidUntil = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    customerId: quotation?.customerId || null,
    customerName: quotation?.customerName || '',
    customerEmail: quotation?.customerEmail || '',
    customerGst: quotation?.customerGst || '',
    customerState: quotation?.customerState || '',
    companyState: 'Telangana',
    validUntil: quotation?.validUntil
      ? new Date(quotation.validUntil).toISOString().split('T')[0]
      : defaultValidUntil(),
    terms: quotation?.terms || '',
    notes: quotation?.notes || '',
    currency: quotation?.currency || 'INR',
  });

  const [items, setItems] = useState<QuotationItem[]>(
    quotation?.items?.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      productSku: item.productSku || '',
      description: item.description || '',
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      taxRate: Number(item.taxRate),
      discount: Number(item.discount),
      total: Number(item.total),
    })) || []
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?isActive=true');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData((prev) => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.displayName || customer.contactPerson || '',
        customerEmail: customer.email || '',
        customerGst: customer.gstNumber || '',
        customerState: customer.billingState || '',
      }));
    } else {
      setSelectedCustomer(null);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: 0,
        productName: '',
        productSku: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 18,
        discount: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // If product is selected, populate fields
    if (field === 'productId') {
      const product = products.find((p) => p.id === parseInt(value));
      if (product) {
        newItems[index].productName = product.name;
        newItems[index].productSku = product.sku;
        newItems[index].unitPrice = Number(product.basePrice);
        newItems[index].taxRate = Number(product.gstRate);
      }
    }

    // Calculate item total
    const item = newItems[index];
    const baseAmount = item.quantity * item.unitPrice;
    item.total = baseAmount - item.discount;

    setItems(newItems);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);

    // Determine if same state or different state for GST
    const isSameState =
      formData.customerState &&
      formData.companyState &&
      formData.customerState.toLowerCase() === formData.companyState.toLowerCase();

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    items.forEach((item) => {
      const taxableAmount = item.total;
      const gstAmount = (taxableAmount * item.taxRate) / 100;

      if (isSameState) {
        cgst += gstAmount / 2;
        sgst += gstAmount / 2;
      } else {
        igst += gstAmount;
      }
    });

    const totalTax = cgst + sgst + igst;
    const total = subtotal + totalTax;

    return {
      subtotal,
      totalDiscount,
      cgst,
      sgst,
      igst,
      totalTax,
      total,
      isSameState,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (items.length === 0) {
        throw new Error('Please add at least one item');
      }

      if (!formData.customerId) {
        throw new Error('Please select a customer');
      }

      const totals = calculateTotals();

      const payload = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerGst: formData.customerGst,
        customerState: formData.customerState,
        validUntil: formData.validUntil,
        currency: formData.currency,
        discount: 0,
        terms: formData.terms,
        notes: formData.notes,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productSku: item.productSku,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          discount: item.discount,
        })),
      };

      const url = quotation
        ? `/api/quotations/${quotation.id}`
        : '/api/quotations';
      const method = quotation ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save quotation');
      }

      router.push('/admin/erp/quotes');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-inter">
          {error}
        </div>
      )}

      {/* Customer Details */}
      <div className="admin-form-section mb-6">
        <h3 className="admin-form-section-title mb-4">Customer Details</h3>

        <div className="mb-4">
          <CustomerLookup
            onSelect={handleCustomerSelect}
            selectedCustomer={selectedCustomer}
          />
        </div>

        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              disabled={!!selectedCustomer}
              className="admin-form-input"
            />
          </div>

          <div>
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="admin-form-input"
            />
          </div>
        </div>

        <div className="admin-form-row mt-4">
          <div>
            <label className="admin-form-label">GST Number</label>
            <input
              type="text"
              name="customerGst"
              value={formData.customerGst}
              onChange={handleChange}
              placeholder="e.g., 29ABCDE1234F1Z5"
              className="admin-form-input"
            />
          </div>

          <div>
            <label className="admin-form-label">
              Customer State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerState"
              value={formData.customerState}
              onChange={handleChange}
              required
              placeholder="e.g., Karnataka, Tamil Nadu"
              className="admin-form-input"
            />
            <p className="mt-1 text-xs text-gray-500 font-inter">
              Required for GST calculation
            </p>
          </div>
        </div>
      </div>

      {/* Quotation Settings */}
      <div className="admin-form-section mb-6">
        <h3 className="admin-form-section-title mb-4">Quotation Settings</h3>

        <div className="admin-form-row cols-3">
          <div>
            <label className="admin-form-label">Valid Until</label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleChange}
              className="admin-form-input"
            />
          </div>

          <div>
            <label className="admin-form-label">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="admin-form-input admin-form-select"
            >
              <option value="INR">INR - Indian Rupee</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="admin-form-label">Company State</label>
            <input
              type="text"
              name="companyState"
              value={formData.companyState}
              onChange={handleChange}
              className="admin-form-input"
            />
            <p className="mt-1 text-xs text-gray-500 font-inter">
              Used for GST type (CGST/SGST vs IGST)
            </p>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="admin-form-section mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="admin-form-section-title">Line Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
          >
            + Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8" style={{ background: 'rgba(0,0,0,0.02)' }}>
            <p className="text-gray-500 font-inter">
              No items added yet. Click &quot;+ Add Item&quot; to start.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-line-items-table">
              <thead>
                <tr>
                  <th style={{ minWidth: '200px' }}>Product</th>
                  <th style={{ width: '80px' }}>Qty</th>
                  <th style={{ width: '120px' }}>Unit Price</th>
                  <th style={{ width: '80px' }}>GST %</th>
                  <th style={{ width: '100px' }}>Discount</th>
                  <th style={{ width: '120px' }}>Total</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="admin-line-item-row">
                    <td>
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          updateItem(index, 'productId', e.target.value)
                        }
                        className="admin-line-item-input"
                      >
                        <option value="0">-- Select Product --</option>
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
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'quantity',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min="1"
                        step="1"
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'unitPrice',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min="0"
                        step="0.01"
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.taxRate}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'taxRate',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min="0"
                        step="0.01"
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'discount',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min="0"
                        step="0.01"
                        className="admin-line-item-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.total.toFixed(2)}
                        readOnly
                        className="admin-line-item-input"
                        style={{
                          background: 'rgba(0,0,0,0.04)',
                          fontWeight: 500,
                        }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
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
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div className="admin-form-section mb-6">
          <h3 className="admin-form-section-title mb-4">Summary</h3>
          <div className="space-y-2 font-inter max-w-sm ml-auto">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                {totals.subtotal.toFixed(2)}
              </span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span className="font-medium">
                  -{' '}
                  {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                  {totals.totalDiscount.toFixed(2)}
                </span>
              </div>
            )}
            {totals.isSameState ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">CGST:</span>
                  <span className="font-medium">
                    {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                    {totals.cgst.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SGST:</span>
                  <span className="font-medium">
                    {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                    {totals.sgst.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-600">IGST:</span>
                <span className="font-medium">
                  {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                  {totals.igst.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-300">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="font-bold text-lg">
                {formData.currency === 'INR' ? '\u20B9' : formData.currency}{' '}
                {totals.total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totals.isSameState
                ? `Intra-state (${formData.companyState} -> ${formData.customerState}): CGST + SGST`
                : `Inter-state (${formData.companyState} -> ${formData.customerState}): IGST`}
            </p>
          </div>
        </div>
      )}

      {/* Terms & Notes */}
      <div className="admin-form-section mb-6">
        <h3 className="admin-form-section-title mb-4">Terms & Notes</h3>

        <div className="admin-form-row">
          <div>
            <label className="admin-form-label">Terms & Conditions</label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              rows={4}
              placeholder="1. Goods once sold will not be taken back.&#10;2. Payment terms as agreed.&#10;3. E&OE"
              className="admin-form-input"
            />
          </div>

          <div>
            <label className="admin-form-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Additional notes for the customer..."
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading || items.length === 0}
          className="admin-btn admin-btn-primary"
          style={{ opacity: isLoading || items.length === 0 ? 0.5 : 1 }}
        >
          {isLoading
            ? 'Saving...'
            : quotation
              ? 'Update Quotation'
              : 'Create Quotation'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/erp/quotes')}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
