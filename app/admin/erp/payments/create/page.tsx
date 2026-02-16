'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePaymentPage() {
  const router = useRouter();
  const [type, setType] = useState('RECEIVED');
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [notes, setNotes] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/customers').then(r => r.json()).then(data => setCustomers(Array.isArray(data) ? data : data.customers || []));
    fetch('/api/vendors').then(r => r.json()).then(data => setVendors(Array.isArray(data) ? data : data.vendors || []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const body: any = {
        type,
        amount: parseFloat(amount),
        paymentMethod,
        paymentDate,
        referenceNumber: referenceNumber || undefined,
        bankName: bankName || undefined,
        notes: notes || undefined,
      };
      if (type === 'RECEIVED' || type === 'REFUND') {
        body.customerId = customerId;
      } else {
        body.vendorId = vendorId;
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create payment');
      }
      const result = await res.json();
      router.push(`/admin/erp/payments/${result.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const showCustomer = type === 'RECEIVED' || type === 'REFUND';
  const showVendor = type === 'MADE' || type === 'ADVANCE';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Record Payment</h1>
        <p className="text-gray-600 font-inter font-light">Record a new payment transaction</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="admin-alert admin-alert-error mb-6">{error}</div>}

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Payment Details</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Type *</label>
              <select value={type} onChange={e => { setType(e.target.value); setCustomerId(null); setVendorId(null); }} className="admin-form-input" required>
                <option value="RECEIVED">Payment Received (AR)</option>
                <option value="MADE">Payment Made (AP)</option>
                <option value="REFUND">Refund</option>
                <option value="ADVANCE">Advance Payment</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Amount *</label>
              <input type="number" step="0.01" min="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="admin-form-input" placeholder="0.00" required />
            </div>
          </div>
          <div className="admin-form-row">
            {showCustomer && (
              <div className="admin-form-group">
                <label className="admin-form-label">Customer *</label>
                <select value={customerId || ''} onChange={e => setCustomerId(e.target.value ? parseInt(e.target.value) : null)} className="admin-form-input" required>
                  <option value="">Select Customer</option>
                  {customers.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name} {c.customerCode ? `(${c.customerCode})` : ''}</option>
                  ))}
                </select>
              </div>
            )}
            {showVendor && (
              <div className="admin-form-group">
                <label className="admin-form-label">Vendor *</label>
                <select value={vendorId || ''} onChange={e => setVendorId(e.target.value ? parseInt(e.target.value) : null)} className="admin-form-input" required>
                  <option value="">Select Vendor</option>
                  {vendors.map((v: any) => (
                    <option key={v.id} value={v.id}>{v.name} {v.code ? `(${v.code})` : ''}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Method *</label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="admin-form-input" required>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="CHEQUE">Cheque</option>
                <option value="CARD">Card</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Date *</label>
              <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="admin-form-input" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Reference Number</label>
              <input type="text" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} className="admin-form-input" placeholder="Cheque No / UTR / Transaction ID" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Bank Name</label>
              <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} className="admin-form-input" placeholder="Bank name" />
            </div>
          </div>
        </div>

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Notes</h3>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="admin-form-textarea" rows={3} placeholder="Payment notes..." />
        </div>

        <div className="admin-form-actions">
          <button type="button" onClick={() => router.back()} className="admin-btn admin-btn-secondary">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="admin-btn admin-btn-primary">
            {isSubmitting ? 'Recording...' : 'Record Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
