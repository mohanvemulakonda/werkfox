'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactsTable({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = contacts.filter((contact) => {
    const matchesStatus = filterStatus === 'ALL' || contact.status === filterStatus;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

    return matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Message', 'Source', 'Status', 'Date'];
    const rows = filtered.map(c => [
      c.name,
      c.email,
      c.phone || '',
      c.company || '',
      c.message,
      c.source,
      c.status,
      new Date(c.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_SENT', 'CONVERTED', 'LOST'];

  return (
    <div className="bg-white shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />

          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors font-inter overflow-hidden ${
                  filterStatus === status
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="relative z-10">{status}</span>
                {filterStatus !== status && (
                  <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={exportToCSV}
            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium overflow-hidden font-inter"
          >
            <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative z-10">Export CSV</span>
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4 font-inter">
          Showing {filtered.length} of {contacts.length} contacts
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Email & Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 font-inter">{contact.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-inter">{contact.email}</div>
                  {contact.phone && (
                    <div className="text-sm text-gray-500 font-inter">{contact.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                  {contact.company || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-900 border border-gray-900 font-inter">
                    {contact.source}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-900 border border-gray-900 font-inter">
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                  {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/contacts/${contact.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium font-inter"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
