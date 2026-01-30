'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Opportunity {
  id: number;
  name: string;
  description?: string;
  value: string;
  currency: string;
  probability?: number;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  stage: string;
  status: string;
  lostReason?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lead: {
    id: number;
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  products: Array<{
    id: number;
    quantity: string;
    unitPrice: string;
    discount: string;
    product: {
      id: number;
      name: string;
      sku: string;
    };
  }>;
  activities: any[];
  invoices: any[];
}

const stages = ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
const statuses = ['OPEN', 'WON', 'LOST', 'ABANDONED'];

const stageColors: Record<string, string> = {
  QUALIFICATION: 'bg-gray-100 text-gray-800',
  NEEDS_ANALYSIS: 'bg-blue-100 text-blue-800',
  PROPOSAL: 'bg-purple-100 text-purple-800',
  NEGOTIATION: 'bg-yellow-100 text-yellow-800',
  CLOSED_WON: 'bg-emerald-100 text-emerald-800',
  CLOSED_LOST: 'bg-red-100 text-red-800',
};

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const opportunityId = params.id as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Opportunity>>({});

  useEffect(() => {
    fetchOpportunity();
  }, [opportunityId]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/opportunities/${opportunityId}`);
      const data = await response.json();

      if (response.ok) {
        setOpportunity(data);
        setFormData(data);
      } else {
        setError(data.error || 'Failed to fetch opportunity');
      }
    } catch (err) {
      setError('Failed to fetch opportunity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError('');

      const response = await fetch(`/api/opportunities/${opportunityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          value: formData.value ? parseFloat(formData.value.toString()) : undefined,
          probability: formData.probability ? parseInt(formData.probability.toString()) : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOpportunity(data);
        setFormData(data);
        setEditing(false);
      } else {
        setError(data.error || 'Failed to update opportunity');
      }
    } catch (err) {
      setError('Failed to update opportunity');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this opportunity? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/opportunities/${opportunityId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/opportunities');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete opportunity');
      }
    } catch (err) {
      setError('Failed to delete opportunity');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (value: string, currency: string = 'INR') => {
    const num = parseFloat(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/opportunities" className="text-blue-600 hover:underline">
            ← Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  if (!opportunity) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{opportunity.name}</h1>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${stageColors[opportunity.stage]}`}>
                  {opportunity.stage.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Lead: {opportunity.lead.name} {opportunity.lead.company ? `(${opportunity.lead.company})` : ''}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">
                  Value: {formatCurrency(opportunity.value, opportunity.currency)}
                </span>
                <span className="text-sm text-gray-600">Probability: {opportunity.probability || 0}%</span>
                <span className="text-sm text-gray-600">Created: {formatDate(opportunity.createdAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/opportunities"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ← Back
              </Link>
              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData(opportunity);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Opportunity Details */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Opportunity Details</h2>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                      <input
                        type="number"
                        name="value"
                        value={formData.value || ''}
                        onChange={handleChange}
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        name="currency"
                        value={formData.currency || 'INR'}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Probability: {formData.probability || 0}%
                    </label>
                    <input
                      type="range"
                      name="probability"
                      value={formData.probability || 0}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="5"
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900">{opportunity.description || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">{opportunity.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Expected Close Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(opportunity.expectedCloseDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="mt-1 text-sm text-gray-900">{opportunity.assignedTo || 'Unassigned'}</dd>
                  </div>
                </dl>
              )}
            </div>

            {/* Lead Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.lead.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.lead.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.lead.company || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.lead.phone || 'N/A'}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <Link
                  href={`/admin/leads/${opportunity.lead.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Lead Details →
                </Link>
              </div>
            </div>

            {/* Products */}
            {opportunity.products.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Products</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {opportunity.products.map((item) => {
                        const total = (parseFloat(item.quantity) * parseFloat(item.unitPrice)) - parseFloat(item.discount);
                        return (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.product.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{item.product.sku}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">₹{parseFloat(item.unitPrice).toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">₹{parseFloat(item.discount).toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">₹{total.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activities */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <span className="text-sm text-gray-500">{opportunity.activities.length} total</span>
              </div>
              {opportunity.activities.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No activities yet</p>
              ) : (
                <div className="space-y-3">
                  {opportunity.activities.slice(0, 5).map((activity: any) => (
                    <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">{activity.type}</span>
                        <span className="text-sm text-gray-500">{formatDate(activity.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.subject}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stage & Status Management */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stage & Status</h2>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      name="stage"
                      value={formData.stage || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
                    <input
                      type="date"
                      name="expectedCloseDate"
                      value={formData.expectedCloseDate?.split('T')[0] || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Stage</dt>
                    <dd className="mt-1 text-sm text-gray-900">{opportunity.stage.replace('_', ' ')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">{opportunity.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(opportunity.updatedAt)}</dd>
                  </div>
                </dl>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
              {editing ? (
                <textarea
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Add notes about this opportunity..."
                />
              ) : (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {opportunity.notes || 'No notes yet'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
