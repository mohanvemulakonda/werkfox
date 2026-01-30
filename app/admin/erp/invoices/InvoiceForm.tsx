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
  creditDays?: number | null;
  paymentTerms?: string | null;
}

interface CustomerContact {
  id: number;
  customerId: number;
  name: string;
  email: string | null;
  phone: string | null;
  designation: string | null;
  department: string | null;
  isPrimary: boolean;
  isBilling: boolean;
  isShipping: boolean;
  isDefault?: boolean;
}

interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}

interface PaymentTerm {
  id: number;
  name: string;
  days: number;
  description: string | null;
}

interface UnitOfMeasure {
  id: number;
  code: string;
  name: string;
}

interface CompanySettings {
  defaultTermsConditions: string | null;
  defaultPaymentTerms: string | null;
  companyState: string | null;
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
  const [customerContacts, setCustomerContacts] = useState<CustomerContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Metadata state - database driven
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [paymentTermsList, setPaymentTermsList] = useState<PaymentTerm[]>([]);
  const [units, setUnits] = useState<UnitOfMeasure[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);

  const [formData, setFormData] = useState({
    type: invoice?.type || 'QUOTE',
    customerId: invoice?.customerId || null,
    customerName: invoice?.customerName || '',
    customerEmail: invoice?.customerEmail || '',
    customerPhone: invoice?.customerPhone || '',
    customerCompany: invoice?.customerCompany || '',
    billingAddress: invoice?.billingAddress || '',
    shippingAddress: invoice?.shippingAddress || '',
    // Separate shipping contact for delivery
    shippingContactName: invoice?.shippingContactName || '',
    shippingContactPhone: invoice?.shippingContactPhone || '',
    sameAsBilling: true, // Toggle for shipping contact
    customerGstNumber: invoice?.customerGstNumber || '',
    customerState: invoice?.customerState || '',
    placeOfSupply: invoice?.placeOfSupply || '',
    companyState: invoice?.companyState || 'Telangana',
    paymentTerms: invoice?.paymentTerms || 'Due on Receipt',
    creditDays: invoice?.creditDays || 0,
    poReference: invoice?.poReference || '',
    currency: invoice?.currency || 'INR',
    notes: invoice?.notes || '',
    termsAndConditions: invoice?.termsAndConditions || '',
  });

  const [items, setItems] = useState<InvoiceItem[]>(invoice?.items || []);

  useEffect(() => {
    fetchProducts();
    fetchMetadata();
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

  const fetchMetadata = async () => {
    try {
      const response = await fetch('/api/metadata');
      if (response.ok) {
        const data = await response.json();
        setCurrencies(data.currencies || []);
        setPaymentTermsList(data.paymentTerms || []);
        setUnits(data.units || []);
        setCompanySettings(data.companySettings);

        // Set default terms from company settings if creating new invoice
        if (!invoice && data.companySettings?.defaultTermsConditions) {
          setFormData(prev => ({
            ...prev,
            termsAndConditions: data.companySettings.defaultTermsConditions,
            companyState: data.companySettings.companyState || 'Telangana',
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  // Fetch contacts for a specific customer
  const fetchCustomerContacts = async (customerId: number) => {
    setLoadingContacts(true);
    try {
      const response = await fetch(`/api/customers/${customerId}/contacts`);
      if (response.ok) {
        const data = await response.json();
        setCustomerContacts(data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching customer contacts:', error);
    }
    setLoadingContacts(false);
    return [];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerSelect = async (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);

      // Fetch contacts for this customer
      const contacts = await fetchCustomerContacts(customer.id);
      setLoadingContacts(false);

      // Find matching payment term based on customer credit days
      let paymentTerm = formData.paymentTerms;
      if (customer.creditDays && customer.creditDays > 0) {
        const matchingTerm = paymentTermsList.find(t => t.days === customer.creditDays);
        if (matchingTerm) {
          paymentTerm = matchingTerm.name;
        } else {
          paymentTerm = `Net ${customer.creditDays}`;
        }
      } else if (customer.paymentTerms) {
        paymentTerm = customer.paymentTerms;
      }

      // Use primary/first contact if available
      const primaryContact = contacts.find((c: CustomerContact) => c.isPrimary) || contacts[0];

      // For billing/invoice purposes: use contact person or fall back to displayName
      const billingContactName = primaryContact?.name || customer.contactPerson || customer.displayName || '';
      const billingContactEmail = primaryContact?.email || customer.email || '';
      const billingContactPhone = primaryContact?.phone || customer.phone || '';

      // For shipping contact: ONLY use actual person names, never company names
      // This is the contact person for delivery guy to call
      const actualPersonName = primaryContact?.name || customer.contactPerson || '';
      const actualPersonPhone = primaryContact?.phone || customer.phone || '';

      setFormData(prev => ({
        ...prev,
        customerId: customer.id,
        customerName: billingContactName,
        customerEmail: billingContactEmail,
        customerPhone: billingContactPhone,
        customerCompany: customer.companyName || '',
        billingAddress: customer.billingAddress || '',
        shippingAddress: customer.shippingAddress || customer.billingAddress || '',
        // Shipping contact: only use real person names, not company names
        shippingContactName: actualPersonName,
        shippingContactPhone: actualPersonPhone,
        sameAsBilling: actualPersonName !== '', // Only same as billing if we have a real contact
        customerGstNumber: customer.gstNumber || '',
        customerState: customer.billingState || '',
        placeOfSupply: customer.billingState || '',
        creditDays: customer.creditDays || 0,
        paymentTerms: paymentTerm,
      }));
      setShowManualEntry(false);
    } else {
      setSelectedCustomer(null);
      setCustomerContacts([]);
    }
  };

  // Handle billing contact selection from dropdown
  const handleBillingContactSelect = (contactId: string) => {
    const contact = customerContacts.find(c => c.id === parseInt(contactId));
    if (contact) {
      setFormData(prev => ({
        ...prev,
        customerName: contact.name,
        customerEmail: contact.email || prev.customerEmail,
        customerPhone: contact.phone || prev.customerPhone,
        // Also update shipping if same as billing
        shippingContactName: prev.sameAsBilling ? contact.name : prev.shippingContactName,
        shippingContactPhone: prev.sameAsBilling ? (contact.phone || prev.customerPhone) : prev.shippingContactPhone,
      }));
    }
  };

  // Handle shipping contact selection from dropdown
  const handleShippingContactSelect = (contactId: string) => {
    const contact = customerContacts.find(c => c.id === parseInt(contactId));
    if (contact) {
      setFormData(prev => ({
        ...prev,
        shippingContactName: contact.name,
        shippingContactPhone: contact.phone || '',
      }));
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

      // Resolve shipping contact based on toggle
      const shippingContactName = formData.sameAsBilling ? formData.customerName : formData.shippingContactName;
      const shippingContactPhone = formData.sameAsBilling ? formData.customerPhone : formData.shippingContactPhone;
      const shippingAddress = formData.sameAsBilling ? formData.billingAddress : formData.shippingAddress;

      const payload = {
        ...formData,
        shippingContactName,
        shippingContactPhone,
        shippingAddress,
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

      {/* Document Type, Payment Terms, Currency, PO Reference */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
            {paymentTermsList.length > 0 ? (
              paymentTermsList.map(term => (
                <option key={term.id} value={term.name}>
                  {term.name} {term.days > 0 ? `(${term.days} days)` : ''}
                </option>
              ))
            ) : (
              <>
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 45">Net 45 Days</option>
                <option value="Net 60">Net 60 Days</option>
                <option value="Net 90">Net 90 Days</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            {currencies.length > 0 ? (
              currencies.map(curr => (
                <option key={curr.id} value={curr.code}>
                  {curr.code} - {curr.name}
                </option>
              ))
            ) : (
              <option value="INR">INR - Indian Rupee</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            PO / Reference No.
          </label>
          <input
            type="text"
            name="poReference"
            value={formData.poReference}
            onChange={handleChange}
            placeholder="e.g., PO-2024-001"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
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
          {/* Billing Contact Lookup - Only show when customer is selected and has contacts */}
          {selectedCustomer && customerContacts.length > 0 && (
            <div className="md:col-span-2 p-3 bg-blue-50 border border-blue-200 rounded">
              <label className="block text-sm font-medium text-blue-800 mb-2 font-inter">
                Select Billing Contact <span className="text-blue-600">(from {selectedCustomer.companyName || selectedCustomer.displayName})</span>
              </label>
              <select
                value={customerContacts.find(c => c.name === formData.customerName)?.id || ''}
                onChange={(e) => handleBillingContactSelect(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              >
                <option value="">-- Select Contact --</option>
                {customerContacts.filter(c => c.isBilling).map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                    {contact.designation ? ` - ${contact.designation}` : ''}
                    {contact.phone ? ` (${contact.phone})` : ''}
                    {contact.isPrimary ? ' ★' : ''}
                  </option>
                ))}
              </select>
              {loadingContacts && <p className="text-xs text-blue-600 mt-1">Loading contacts...</p>}
            </div>
          )}

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
        </div>
      </div>

      {/* Shipping Details - Separate section for delivery contact */}
      <div className="mb-6 p-4 border border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 font-open-sans">Shipping Details</h3>
          <p className="text-xs text-gray-600 font-inter">Contact person for delivery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shipping Contact Lookup - Show when customer is selected and has contacts */}
          {selectedCustomer && customerContacts.length > 0 && (
            <div className="md:col-span-2 p-3 bg-green-50 border border-green-200 rounded">
              <label className="block text-sm font-medium text-green-800 mb-2 font-inter">
                Select Shipping Contact <span className="text-green-600">(from {selectedCustomer.companyName || selectedCustomer.displayName})</span>
              </label>
              <select
                value={customerContacts.find(c => c.name === formData.shippingContactName)?.id || ''}
                onChange={(e) => handleShippingContactSelect(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter"
              >
                <option value="">-- Select Contact --</option>
                {customerContacts.filter(c => c.isShipping).map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                    {contact.designation ? ` - ${contact.designation}` : ''}
                    {contact.phone ? ` (${contact.phone})` : ''}
                    {contact.isPrimary ? ' ★' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Shipping Contact Name <span className="text-blue-600">(for delivery)</span>
            </label>
            <input
              type="text"
              name="shippingContactName"
              value={formData.shippingContactName}
              onChange={handleChange}
              placeholder="Contact person for delivery"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            {!formData.shippingContactName && (
              <p className="text-xs text-orange-600 mt-1">No contact person set for this customer. Please enter manually.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Shipping Contact Phone <span className="text-blue-600">(for delivery guy)</span>
            </label>
            <input
              type="text"
              name="shippingContactPhone"
              value={formData.shippingContactPhone}
              onChange={handleChange}
              placeholder="Phone number for delivery"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              rows={3}
              placeholder="Full shipping address"
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
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Additional notes, delivery instructions, special requests..."
          className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
        />
      </div>

      {/* Terms & Conditions */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Terms & Conditions
        </label>
        <textarea
          name="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={handleChange}
          rows={5}
          placeholder="1. Goods once sold will not be taken back.&#10;2. Payment terms as agreed.&#10;3. E&OE"
          className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
        />
        <p className="mt-1 text-xs text-gray-500 font-inter">
          Default terms are auto-populated from company settings. You can modify as needed.
        </p>
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
