'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const gstTypes = ['UNREGISTERED', 'REGISTERED', 'COMPOSITION', 'SEZ', 'DEEMED_EXPORT'];

export default function CreateCustomerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    email: '',
    phone: '',
    website: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    gstNumber: '',
    gstType: 'UNREGISTERED',
    panNumber: '',
    paymentTerms: '',
    creditLimit: '',
    creditDays: '',
    openingBalance: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/customers');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create customer');
      }
    } catch (err) {
      setError('Failed to create customer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/customers" className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter">
          ← Back to Customers
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Add Customer</h1>
        <p className="text-gray-600 font-inter font-light">Create a new customer account</p>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Basic Information</h2>
          <div className="admin-form-row cols-3">
            <div className="admin-form-group">
              <label className="admin-form-label">Customer Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Display Name</label>
              <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Website</label>
              <input type="text" name="website" value={formData.website} onChange={handleChange} className="admin-form-input" />
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Contact Person</h2>
          <div className="admin-form-row cols-3">
            <div className="admin-form-group">
              <label className="admin-form-label">Contact Person</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Contact Phone</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="admin-form-input" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Address</h2>
          <div className="admin-form-row">
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="admin-form-label">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="admin-form-textarea" />
            </div>
          </div>
          <div className="admin-form-row cols-4">
            <div className="admin-form-group">
              <label className="admin-form-label">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="admin-form-input" />
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Tax Information</h2>
          <div className="admin-form-row cols-3">
            <div className="admin-form-group">
              <label className="admin-form-label">GST Number</label>
              <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">GST Type</label>
              <select name="gstType" value={formData.gstType} onChange={handleChange} className="admin-form-select">
                {gstTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">PAN Number</label>
              <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="admin-form-input" />
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Payment Terms</h2>
          <div className="admin-form-row cols-4">
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Terms</label>
              <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} placeholder="e.g. Net 30" className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Credit Limit (₹)</label>
              <input type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Credit Days</label>
              <input type="number" name="creditDays" value={formData.creditDays} onChange={handleChange} className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Opening Balance (₹)</label>
              <input type="number" name="openingBalance" value={formData.openingBalance} onChange={handleChange} className="admin-form-input" />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="admin-form-section">
          <h2 className="admin-form-section-title">Notes</h2>
          <div className="admin-form-row">
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="admin-form-textarea" placeholder="Additional notes about this customer..." />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="admin-form-actions">
          <Link href="/admin/customers" className="admin-btn admin-btn-secondary">Cancel</Link>
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
            {saving ? 'Creating...' : 'Create Customer'}
          </button>
        </div>
      </form>
    </div>
  );
}
