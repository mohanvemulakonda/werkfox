'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FilterBar from '../components/FilterBar';

interface Customer {
  id: number;
  name: string;
  customerCode: string;
  contactPerson?: string;
  phone?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  currentBalance: string;
  creditLimit: string;
  isActive: boolean;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('list');

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // NOTE: Using a hypothetical search param if supported by API, 
      // otherwise we filter client-side for this demo.
      const response = await fetch('/api/customers');
      const data = await response.json();

      if (response.ok) {
        let filtered = data.customers || data || [];
        if (searchQuery && Array.isArray(filtered)) {
          filtered = filtered.filter((c: Customer) =>
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.customerCode?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setCustomers(Array.isArray(filtered) ? filtered : []);
      } else {
        setError(data.error || 'Failed to fetch customers');
      }
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <FilterBar
        onSearch={setSearchQuery}
        filters={searchQuery ? [{ id: 'search', label: 'Search', value: searchQuery }] : []}
        onRemoveFilter={() => setSearchQuery('')}
        view={view}
        onViewChange={setView}
        actions={
          <Link
            href="/admin/customers/create"
            className="admin-btn admin-btn-primary"
          >
            + Add Customer
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No customers found.</div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{customer.customerCode}</td>
                    <td className="px-6 py-4 text-sm font-bold">
                      <Link href={`/admin/customers/${customer.id}`} className="text-[#E03B12] hover:underline">
                        {customer.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.phone || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{[customer.city, customer.state].filter(Boolean).join(', ') || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(customer.currentBalance)}</div>
                      <div className="text-[10px] text-gray-400">Limit: {formatCurrency(customer.creditLimit)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${customer.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                        }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
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
