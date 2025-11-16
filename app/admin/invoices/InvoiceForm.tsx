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

interface InvoiceItem {
  productId: number;
  productName: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  gstRate: number;
  amount: number;
}

interface InvoiceFormProps {
  invoice?: any;
}

export default function InvoiceForm({ invoice }: InvoiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);

  const [formData, setFormData] = useState({
    type: invoice?.type || 'QUOTE',
    customerId: invoice?.customerId || null,
    customerName: invoice?.customerName || '',
    customerEmail: invoice?.customerEmail || '',
    customerPhone: invoice?.customerPhone || '',
    billingAddress: invoice?.billingAddress || '',
    shippingAddress: invoice?.shippingAddress || '',
    customerGstNumber: invoice?.customerGstNumber || '',
    customerState: invoice?.customerState || '',
    placeOfSupply: invoice?.placeOfSupply || '',
    companyState: invoice?.companyState || 'Karnataka',
    paymentTerms: invoice?.paymentTerms || 'Due on Receipt',
    notes: invoice?.notes || '',
  });

  const [items, setItems] = useState<InvoiceItem[]>(invoice?.items || []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData(prev => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.displayName,
        customerEmail: customer.email || '',
        customerPhone: customer.phone || '',
        billingAddress: customer.billingAddress || '',
        shippingAddress: customer.shippingAddress || customer.billingAddress || '',
        customerGstNumber: customer.gstNumber || '',
        customerState: customer.billingState || '',
        placeOfSupply: customer.billingState || '',
      }));
      setShowManualEntry(false);
    } else {
      setSelectedCustomer(null);
    }
  };

  const addItem = () => {
    setItems([...items, {
      productId: 0,
      productName: '',
      description: '',
      hsnCode: '',
      quantity: 1,
      unit: 'Nos',
      unitPrice: 0,
      discount: 0,
      gstRate: 18,
      amount: 0,
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // If product is selected, populate fields
    if (field === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        newItems[index].productName = product.name;
        newItems[index].hsnCode = product.hsnCode || '';
        newItems[index].unitPrice = Number(product.basePrice);
        newItems[index].gstRate = Number(product.gstRate);
        newItems[index].unit = product.unit;
      }
    }

    // Calculate amount
    const item = newItems[index];
    const baseAmount = item.quantity * item.unitPrice;
    const discountedAmount = baseAmount - item.discount;
    item.amount = discountedAmount;

    setItems(newItems);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);

    // Determine if same state or different state
    const isSameState = formData.customerState && formData.companyState &&
      formData.customerState.toLowerCase() === formData.companyState.toLowerCase();

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    items.forEach(item => {
      const taxableAmount = item.amount;
      const gstAmount = (taxableAmount * item.gstRate) / 100;

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
      isSameState
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

      const totals = calculateTotals();

      const payload = {
        ...formData,
        items: items.map(item => ({
          productId: item.productId || null,
          itemName: item.productName || 'Unnamed Item',
          description: item.description || '',
          hsnCode: item.hsnCode,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          discount: item.discount,
          gstRate: item.gstRate,
          amount: item.amount,
        })),
        subtotal: totals.subtotal,
        discountAmount: totals.totalDiscount,
        cgstAmount: totals.cgst,
        sgstAmount: totals.sgst,
        igstAmount: totals.igst,
        totalTax: totals.totalTax,
        total: totals.total,
      };

      const url = invoice ? `/api/invoices/${invoice.id}` : '/api/invoices';
      const method = invoice ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save invoice');
      }

      router.push('/admin/invoices');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-100 p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-inter">
          {error}
        </div>
      )}

      {/* Document Type and Payment Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            <option value="QUOTE">Quotation</option>
            <option value="INVOICE">Tax Invoice</option>
            <option value="PROFORMA">Proforma Invoice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Payment Terms <span className="text-red-500">*</span>
          </label>
          <select
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            <option value="Due on Receipt">Due on Receipt</option>
            <option value="Net 15">Net 15 Days</option>
            <option value="Net 30">Net 30 Days</option>
            <option value="Net 45">Net 45 Days</option>
            <option value="Net 60">Net 60 Days</option>
            <option value="Net 90">Net 90 Days</option>
          </select>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 font-open-sans">Customer Details</h3>
          <button
            type="button"
            onClick={() => setShowManualEntry(!showManualEntry)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded font-inter"
          >
            {showManualEntry ? 'Search Customer' : 'Add New Customer'}
          </button>
        </div>

        {!showManualEntry && (
          <div className="mb-6">
            <CustomerLookup onSelect={handleCustomerSelect} selectedCustomer={selectedCustomer} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              disabled={!!selectedCustomer && !showManualEntry}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Phone
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              GST Number
            </label>
            <input
              type="text"
              name="customerGstNumber"
              value={formData.customerGstNumber}
              onChange={handleChange}
              placeholder="e.g., 29ABCDE1234F1Z5"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Customer State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerState"
              value={formData.customerState}
              onChange={handleChange}
              required
              placeholder="e.g., Karnataka, Tamil Nadu"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            <p className="mt-1 text-xs text-gray-500 font-inter">Required for GST calculation</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Place of Supply
            </label>
            <input
              type="text"
              name="placeOfSupply"
              value={formData.placeOfSupply}
              onChange={handleChange}
              placeholder="e.g., Bangalore"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Billing Address
            </label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Shipping Address (if different)
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 font-open-sans">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter text-sm"
          >
            + Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 border border-gray-200">
            <p className="text-gray-500 font-inter">No items added yet. Click "Add Item" to start.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700 font-inter">Item {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-inter"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Product</label>
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(index, 'productId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    >
                      <option value="0">Custom Item</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Description</label>
                    <input
                      type="text"
                      value={item.description || item.productName}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">HSN Code</label>
                    <input
                      type="text"
                      value={item.hsnCode}
                      onChange={(e) => updateItem(index, 'hsnCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Unit</label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateItem(index, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Unit Price</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Discount</label>
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">GST %</label>
                    <input
                      type="number"
                      value={item.gstRate}
                      onChange={(e) => updateItem(index, 'gstRate', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">Amount</label>
                    <input
                      type="text"
                      value={item.amount.toFixed(2)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 font-inter text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals Summary */}
      {items.length > 0 && (
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Summary</h3>
          <div className="space-y-2 font-inter">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹ {totals.subtotal.toFixed(2)}</span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span className="font-medium">- ₹ {totals.totalDiscount.toFixed(2)}</span>
              </div>
            )}
            {totals.isSameState ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">CGST:</span>
                  <span className="font-medium">₹ {totals.cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SGST:</span>
                  <span className="font-medium">₹ {totals.sgst.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-600">IGST:</span>
                <span className="font-medium">₹ {totals.igst.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-300">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="font-bold text-lg">₹ {totals.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totals.isSameState
                ? `Intra-state transaction (${formData.companyState} → ${formData.customerState}): CGST + SGST applicable`
                : `Inter-state transaction (${formData.companyState} → ${formData.customerState}): IGST applicable`
              }
            </p>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Notes / Terms & Conditions
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Payment terms, delivery instructions, etc."
          className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading || items.length === 0}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 text-sm tracking-wide">
            {isLoading ? 'Saving...' : invoice ? `Update ${formData.type}` : `Create ${formData.type}`}
          </span>
          {!isLoading && (
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/invoices')}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">Cancel</span>
          <div className="absolute inset-0 bg-gray-900 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </form>
  );
}
