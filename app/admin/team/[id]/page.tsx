'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  department?: string;
  designation?: string;
  phone?: string;
  isActive: boolean;
  canApproveInvoices: boolean;
  canCreateInvoices: boolean;
  canCreateLeads: boolean;
  canDeleteLeads: boolean;
  canEditLeads: boolean;
  canViewAllLeads: boolean;
  monthlySalesTarget?: string;
  quarterlySalesTarget?: string;
  managerId?: number;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

const roleColors: Record<string, string> = {
  SUPER_ADMIN: 'bg-purple-100 text-purple-800',
  ADMIN: 'bg-blue-100 text-blue-800',
  SALES_MANAGER: 'bg-green-100 text-green-800',
  SALES_REP: 'bg-teal-100 text-teal-800',
  MARKETING_MANAGER: 'bg-pink-100 text-pink-800',
  MARKETING_REP: 'bg-rose-100 text-rose-800',
  ACCOUNTANT: 'bg-yellow-100 text-yellow-800',
  VIEWER: 'bg-gray-100 text-gray-800',
};

export default function TeamMemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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
        setUser(data);
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

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      const response = await fetch(`/api/admin-users/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/team');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete user');
        setDeleteConfirm(false);
      }
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
      setDeleteConfirm(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (value?: string) => {
    if (!value) return 'Not set';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
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

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'User not found'}</p>
          <Link
            href="/admin/team"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/team"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Back to Team
              </Link>
              <Link
                href={`/admin/team/${user.id}/edit`}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Edit User
              </Link>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  deleteConfirm ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deleteConfirm ? 'Confirm Delete?' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="mt-1 text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="mt-1 text-gray-900">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <p className="mt-1 text-gray-900">{user.department || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Designation</label>
                  <p className="mt-1 text-gray-900">{user.designation || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1">
                    {user.isActive ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Permissions & Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canCreateLeads ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">Create Leads</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canEditLeads ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">Edit Leads</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canDeleteLeads ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">Delete Leads</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canViewAllLeads ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">View All Leads</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canCreateInvoices ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">Create Invoices</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${user.canApproveInvoices ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-3 text-gray-900">Approve Invoices</span>
                </div>
              </div>
            </div>

            {/* Sales Targets */}
            {(user.monthlySalesTarget || user.quarterlySalesTarget) && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Targets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Monthly Target</label>
                    <p className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(user.monthlySalesTarget)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Quarterly Target</label>
                    <p className="mt-1 text-2xl font-bold text-blue-600">
                      {formatCurrency(user.quarterlySalesTarget)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Timeline */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Last Login</p>
                    <p className="text-sm text-gray-500">{formatDate(user.lastLogin)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Account Created</p>
                    <p className="text-sm text-gray-500">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-sm text-gray-500">{formatDate(user.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Role</h3>
              <span className={`px-3 py-2 inline-flex text-sm font-semibold rounded-full ${roleColors[user.role]}`}>
                {user.role.replace('_', ' ')}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Permissions Enabled</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {[
                      user.canCreateLeads,
                      user.canEditLeads,
                      user.canDeleteLeads,
                      user.canViewAllLeads,
                      user.canCreateInvoices,
                      user.canApproveInvoices,
                    ].filter(Boolean).length} / 6
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.isActive ? '✓ Active' : '✗ Inactive'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <Link
                  href={`/admin/team/${user.id}/edit`}
                  className="block w-full px-4 py-2 text-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit Profile
                </Link>
                <button
                  className="block w-full px-4 py-2 text-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled
                >
                  Reset Password
                </button>
                <button
                  onClick={handleDelete}
                  className={`block w-full px-4 py-2 text-center border border-transparent rounded-md text-sm font-medium text-white ${
                    deleteConfirm ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {deleteConfirm ? 'Confirm Delete?' : 'Delete User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
