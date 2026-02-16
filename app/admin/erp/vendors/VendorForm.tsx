'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const gstTypes = ['REGISTERED', 'UNREGISTERED', 'COMPOSITION', 'SEZ', 'EXPORT'];

interface VendorFormProps {
  vendor?: any;
}

export default function VendorForm({ vendor }: VendorFormProps) {
  const router = useRouter();
  const isEditing = !!vendor;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: vendor?.name || '',
    displayName: vendor?.displayName || '',
    code: vendor?.code || '',
    email: vendor?.email || '',
    phone: vendor?.phone || '',
    website: vendor?.website || '',
    contactPerson: vendor?.contactPerson || '',
    contactPhone: vendor?.contactPhone || '',
    contactEmail: vendor?.contactEmail || '',
    address: vendor?.address || '',
    city: vendor?.city || '',
    state: vendor?.state || '',
    pincode: vendor?.pincode || '',
    country: vendor?.country || 'India',
    gstNumber: vendor?.gstNumber || '',
    gstType: vendor?.gstType || 'UNREGISTERED',
    panNumber: vendor?.panNumber || '',
    paymentTerms: vendor?.paymentTerms || '',
    creditLimit: vendor?.creditLimit ? String(vendor.creditLimit) : '',
    creditDays: vendor?.creditDays ? String(vendor.creditDays) : '',
    openingBalance: vendor?.openingBalance ? String(vendor.openingBalance) : '',
    notes: vendor?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/vendors/${vendor.id}` : '/api/vendors';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          creditLimit: formData.creditLimit || null,
          creditDays: formData.creditDays || null,
          openingBalance: formData.openingBalance || null,
          code: formData.code || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/erp/vendors');
      } else {
        setError(data.error || `Failed to ${isEditing ? 'update' : 'create'} vendor`);
      }
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} vendor`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}

      {/* Section 1: Basic Info */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Basic Information</h3>
        <div className="admin-form-row cols-3">
          <div className="admin-form-group">
            <label className="admin-form-label">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="admin-form-input"
              placeholder="Vendor name"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Display Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Display name"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Auto-generated if empty"
            />
          </div>
        </div>
        <div className="admin-form-row cols-3">
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="vendor@example.com"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Phone number"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Person */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Contact Person</h3>
        <div className="admin-form-row cols-3">
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Contact person name"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Contact phone"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="contact@example.com"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Address */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Address</h3>
        <div className="admin-form-row" style={{ gridTemplateColumns: '1fr' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="admin-form-input admin-form-textarea"
              placeholder="Full address"
            />
          </div>
        </div>
        <div className="admin-form-row cols-4">
          <div className="admin-form-group">
            <label className="admin-form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="City"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="State"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Pincode"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Tax Info */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Tax Information</h3>
        <div className="admin-form-row cols-3">
          <div className="admin-form-group">
            <label className="admin-form-label">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="e.g. 29ABCDE1234F1Z5"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">GST Type</label>
            <select
              name="gstType"
              value={formData.gstType}
              onChange={handleChange}
              className="admin-form-input admin-form-select"
            >
              {gstTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="e.g. ABCDE1234F"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Payment Terms */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Payment Terms</h3>
        <div className="admin-form-row cols-4">
          <div className="admin-form-group">
            <label className="admin-form-label">Payment Terms</label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="e.g. Net 30"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Credit Limit</label>
            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Credit Days</label>
            <input
              type="number"
              name="creditDays"
              value={formData.creditDays}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="0"
              min="0"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Opening Balance</label>
            <input
              type="number"
              name="openingBalance"
              value={formData.openingBalance}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Section 6: Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Notes</h3>
        <div className="admin-form-row" style={{ gridTemplateColumns: '1fr' }}>
          <div className="admin-form-group">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="admin-form-input admin-form-textarea"
              placeholder="Additional notes about this vendor..."
            />
          </div>
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
            ? (isEditing ? 'Updating...' : 'Creating...')
            : (isEditing ? 'Update Vendor' : 'Create Vendor')}
        </button>
        <Link
          href="/admin/erp/vendors"
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
