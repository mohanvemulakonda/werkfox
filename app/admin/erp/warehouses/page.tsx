'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Location {
  id: number;
  code: string;
  name: string;
  type: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  isDefault: boolean;
  isActive: boolean;
}

export default function WarehousesPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    code: '', name: '', type: 'WAREHOUSE', address: '', city: '', state: '', pincode: '', phone: '', email: '', isDefault: false,
  });

  useEffect(() => { fetchLocations(); }, []);

  async function fetchLocations() {
    try {
      const res = await fetch('/api/locations');
      if (res.ok) {
        const data = await res.json();
        setLocations(Array.isArray(data) ? data : []);
      }
    } catch {
      setError('Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ code: '', name: '', type: 'WAREHOUSE', address: '', city: '', state: '', pincode: '', phone: '', email: '', isDefault: false });
    setEditingId(null);
    setShowForm(false);
    setError('');
  }

  function startEdit(loc: Location) {
    setForm({
      code: loc.code,
      name: loc.name,
      type: loc.type,
      address: loc.address || '',
      city: loc.city || '',
      state: loc.state || '',
      pincode: loc.pincode || '',
      phone: loc.phone || '',
      email: loc.email || '',
      isDefault: loc.isDefault,
    });
    setEditingId(loc.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editingId ? `/api/locations/${editingId}` : '/api/locations';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      resetForm();
      fetchLocations();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const typeBadge: Record<string, string> = {
    WAREHOUSE: 'bg-blue-100 text-blue-800',
    STORE: 'bg-green-100 text-green-800',
    FACTORY: 'bg-purple-100 text-purple-800',
    OFFICE: 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Warehouses & Locations</h1>
          <p className="text-gray-600 font-inter font-light">Manage warehouse locations for inventory and dispatch</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="admin-btn admin-btn-primary">
          Add Location
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error mb-6">{error}</div>}

      {showForm && (
        <div className="admin-form-section mb-6">
          <h3 className="admin-form-section-title">{editingId ? 'Edit Location' : 'New Location'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Code *</label>
                <input type="text" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} className="admin-form-input" placeholder="WH-001" required />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="admin-form-input" placeholder="Main Warehouse" required />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="admin-form-input">
                  <option value="WAREHOUSE">Warehouse</option>
                  <option value="STORE">Store</option>
                  <option value="FACTORY">Factory</option>
                  <option value="OFFICE">Office</option>
                </select>
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Address</label>
                <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="admin-form-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">City</label>
                <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="admin-form-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">State</label>
                <input type="text" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="admin-form-input" />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Pincode</label>
                <input type="text" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} className="admin-form-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Phone</label>
                <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="admin-form-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="admin-form-input" />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} className="rounded border-gray-300" />
                  Set as default location
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-container">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>City</th>
                <th>State</th>
                <th>Phone</th>
                <th>Default</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">No locations found. Add your first warehouse above.</td>
                </tr>
              ) : (
                locations.map(loc => (
                  <tr key={loc.id}>
                    <td className="font-medium text-gray-900">{loc.code}</td>
                    <td>{loc.name}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${typeBadge[loc.type] || 'bg-gray-100 text-gray-800'}`}>
                        {loc.type}
                      </span>
                    </td>
                    <td>{loc.city || '-'}</td>
                    <td>{loc.state || '-'}</td>
                    <td>{loc.phone || '-'}</td>
                    <td>
                      {loc.isDefault && (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Default</span>
                      )}
                    </td>
                    <td>
                      <button onClick={() => startEdit(loc)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
