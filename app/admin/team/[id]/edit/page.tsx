'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const roles = [
  { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Full system access and control' },
  { value: 'ADMIN', label: 'Admin', description: 'Administrative privileges' },
  { value: 'SALES_MANAGER', label: 'Sales Manager', description: 'Manage sales team and operations' },
  { value: 'SALES_REP', label: 'Sales Representative', description: 'Handle sales activities' },
  { value: 'MARKETING_MANAGER', label: 'Marketing Manager', description: 'Manage marketing campaigns' },
  { value: 'MARKETING_REP', label: 'Marketing Representative', description: 'Execute marketing tasks' },
  { value: 'ACCOUNTANT', label: 'Accountant', description: 'Financial operations and invoicing' },
  { value: 'VIEWER', label: 'Viewer', description: 'Read-only access' },
];

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: 'SALES_REP',
    department: '',
    designation: '',
    phone: '',
    isActive: true,
    canApproveInvoices: false,
    canCreateInvoices: false,
    canCreateLeads: false,
    canDeleteLeads: false,
    canEditLeads: false,
    canViewAllLeads: false,
    monthlySalesTarget: '',
    quarterlySalesTarget: '',
    password: '', // Optional - only if changing password
    confirmPassword: '',
  });

  useEffect(() => {
    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin-users/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: data.name,
          role: data.role,
          department: data.department || '',
          designation: data.designation || '',
          phone: data.phone || '',
          isActive: data.isActive,
          canApproveInvoices: data.canApproveInvoices,
          canCreateInvoices: data.canCreateInvoices,
          canCreateLeads: data.canCreateLeads,
          canDeleteLeads: data.canDeleteLeads,
          canEditLeads: data.canEditLeads,
          canViewAllLeads: data.canViewAllLeads,
          monthlySalesTarget: data.monthlySalesTarget || '',
          quarterlySalesTarget: data.quarterlySalesTarget || '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setError(data.error || 'Failed to fetch user');
      }
    } catch (err) {
      setError('Failed to fetch user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match if changing password
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
    }

    try {
      setSaving(true);

      const updateData: any = {
        name: formData.name,
        role: formData.role,
        department: formData.department || null,
        designation: formData.designation || null,
        phone: formData.phone || null,
        isActive: formData.isActive,
        canApproveInvoices: formData.canApproveInvoices,
        canCreateInvoices: formData.canCreateInvoices,
        canCreateLeads: formData.canCreateLeads,
        canDeleteLeads: formData.canDeleteLeads,
        canEditLeads: formData.canEditLeads,
        canViewAllLeads: formData.canViewAllLeads,
        monthlySalesTarget: formData.monthlySalesTarget || null,
        quarterlySalesTarget: formData.quarterlySalesTarget || null,
      };

      // Only include password if it's being changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`/api/admin-users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/admin/team/${params.id}`);
      } else {
        setError(data.error || 'Failed to update user');
      }
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Team Member</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update user account details and permissions
              </p>
            </div>
            <Link
              href={`/admin/team/${params.id}`}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Account Active
                </label>
              </div>
            </div>
          </div>

          {/* Change Password (Optional) */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
            <p className="text-sm text-gray-500 mb-4">Leave blank to keep current password</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min. 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter password"
                />
              </div>
            </div>
          </div>

          {/* Role & Organization */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Role & Organization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sales, Marketing, Finance, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Senior Manager, Executive, etc."
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Permissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canCreateLeads"
                    checked={formData.canCreateLeads}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">Create Leads</label>
                  <p className="text-sm text-gray-500">Can create new lead records</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canEditLeads"
                    checked={formData.canEditLeads}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">Edit Leads</label>
                  <p className="text-sm text-gray-500">Can modify existing leads</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canDeleteLeads"
                    checked={formData.canDeleteLeads}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">Delete Leads</label>
                  <p className="text-sm text-gray-500">Can remove lead records</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canViewAllLeads"
                    checked={formData.canViewAllLeads}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">View All Leads</label>
                  <p className="text-sm text-gray-500">Access to all leads, not just assigned</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canCreateInvoices"
                    checked={formData.canCreateInvoices}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">Create Invoices</label>
                  <p className="text-sm text-gray-500">Can create invoices and quotes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="canApproveInvoices"
                    checked={formData.canApproveInvoices}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">Approve Invoices</label>
                  <p className="text-sm text-gray-500">Can approve and finalize invoices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Targets (conditional - only for sales roles) */}
          {(formData.role === 'SALES_MANAGER' || formData.role === 'SALES_REP') && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Targets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Sales Target (₹)
                  </label>
                  <input
                    type="number"
                    name="monthlySalesTarget"
                    value={formData.monthlySalesTarget}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quarterly Sales Target (₹)
                  </label>
                  <input
                    type="number"
                    name="quarterlySalesTarget"
                    value={formData.quarterlySalesTarget}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1500000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              href={`/admin/team/${params.id}`}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
