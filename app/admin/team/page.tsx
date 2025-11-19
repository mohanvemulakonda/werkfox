'use client';

import { useEffect, useState } from 'react';
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

const roles = [
  'SUPER_ADMIN',
  'ADMIN',
  'SALES_MANAGER',
  'SALES_REP',
  'MARKETING_MANAGER',
  'MARKETING_REP',
  'ACCOUNTANT',
  'VIEWER'
];

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

const roleDescriptions: Record<string, string> = {
  SUPER_ADMIN: 'Full system access',
  ADMIN: 'Administrative access',
  SALES_MANAGER: 'Sales team management',
  SALES_REP: 'Sales operations',
  MARKETING_MANAGER: 'Marketing team lead',
  MARKETING_REP: 'Marketing operations',
  ACCOUNTANT: 'Financial management',
  VIEWER: 'Read-only access',
};

export default function TeamPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filterRole, filterActive, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterRole) params.append('role', filterRole);
      if (filterActive) params.append('isActive', filterActive);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/admin-users?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPermissionCount = (user: AdminUser) => {
    const permissions = [
      user.canApproveInvoices,
      user.canCreateInvoices,
      user.canCreateLeads,
      user.canDeleteLeads,
      user.canEditLeads,
      user.canViewAllLeads,
    ];
    return permissions.filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage admin users, roles, and permissions
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Back to Dashboard
              </Link>
              <Link
                href="/admin/team/create"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                + Add Team Member
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Total Users</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{users.length}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Active Users</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {users.filter(u => u.isActive).length}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Sales Team</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {users.filter(u => u.role === 'SALES_MANAGER' || u.role === 'SALES_REP').length}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Admins</div>
            <div className="mt-2 text-3xl font-bold text-purple-600">
              {users.filter(u => u.role === 'SUPER_ADMIN' || u.role === 'ADMIN').length}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading team members...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500">No users found</p>
            <Link
              href="/admin/team/create"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add First Team Member
            </Link>
          </div>
        ) : (
          /* Users Table */
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.phone && (
                            <div className="text-xs text-gray-400">{user.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[user.role]}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {roleDescriptions[user.role]}
                      </div>
                      {user.department && (
                        <div className="text-xs text-gray-400 mt-1">
                          {user.department} {user.designation ? `• ${user.designation}` : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-gray-900">
                          {getPermissionCount(user)} / 6 permissions
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.canCreateLeads && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                              Create Leads
                            </span>
                          )}
                          {user.canCreateInvoices && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              Create Invoices
                            </span>
                          )}
                          {user.canApproveInvoices && (
                            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                              Approve Invoices
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <Link
                        href={`/admin/team/${user.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/team/${user.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
