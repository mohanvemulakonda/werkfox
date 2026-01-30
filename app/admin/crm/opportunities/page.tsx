'use client';

import { useEffect, useState } from 'react';
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
  createdAt: string;
  lead: {
    id: number;
    name: string;
    email: string;
    company?: string;
  };
  products: any[];
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

const statusColors: Record<string, string> = {
  OPEN: 'bg-blue-100 text-blue-800',
  WON: 'bg-green-100 text-green-800',
  LOST: 'bg-red-100 text-red-800',
  ABANDONED: 'bg-gray-100 text-gray-800',
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOpportunities();
  }, [filterStage, filterStatus, searchQuery]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStage) params.append('stage', filterStage);
      if (filterStatus) params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/opportunities?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setOpportunities(data.opportunities);
      } else {
        setError(data.error || 'Failed to fetch opportunities');
      }
    } catch (err) {
      setError('Failed to fetch opportunities');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  const calculateTotalValue = () => {
    return opportunities
      .filter(opp => opp.status === 'OPEN')
      .reduce((sum, opp) => sum + parseFloat(opp.value), 0);
  };

  const calculateWeightedValue = () => {
    return opportunities
      .filter(opp => opp.status === 'OPEN')
      .reduce((sum, opp) => sum + (parseFloat(opp.value) * (opp.probability || 0)) / 100, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Opportunities Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track and manage your sales pipeline
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
                href="/admin/opportunities/create"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                + Create New Opportunity
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
                placeholder="Search by name or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage
              </label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Stages</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Total Opportunities</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{opportunities.length}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Open Pipeline</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {opportunities.filter(o => o.status === 'OPEN').length}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Total Value</div>
            <div className="mt-2 text-2xl font-bold text-green-600">
              {formatCurrency(calculateTotalValue().toString())}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Weighted Value</div>
            <div className="mt-2 text-2xl font-bold text-purple-600">
              {formatCurrency(calculateWeightedValue().toString())}
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
            <p className="mt-4 text-gray-500">Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500">No opportunities found</p>
            <Link
              href="/admin/opportunities/create"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Your First Opportunity
            </Link>
          </div>
        ) : (
          /* Opportunities Table */
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead/Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Probability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Close
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{opp.name}</div>
                      <div className="text-sm text-gray-500">
                        {opp.description ? opp.description.substring(0, 50) + '...' : 'No description'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{opp.lead.name}</div>
                      <div className="text-sm text-gray-500">{opp.lead.company || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(opp.value, opp.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stageColors[opp.stage]}`}>
                        {opp.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[opp.status]}`}>
                        {opp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {opp.probability || 0}%
                        </div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${opp.probability || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(opp.expectedCloseDate)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <Link
                        href={`/admin/opportunities/${opp.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
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
