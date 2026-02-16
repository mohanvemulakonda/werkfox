'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';
import KanbanBoard from '../../components/KanbanBoard';
import KanbanCard from '../../components/KanbanCard';

interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  total: string;
  currency: string;
  status: string;
  createdAt: string;
  customer?: { email: string };
}

const STAGES = ['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED'];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('list');

  useEffect(() => {
    fetchInvoices();
  }, [searchQuery]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/invoices');
      const data = await response.json();

      if (response.ok) {
        let filtered = data.invoices || [];
        if (searchQuery) {
          filtered = filtered.filter((i: Invoice) =>
            i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.customerName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setInvoices(filtered);
      } else {
        setError(data.error || 'Failed to fetch invoices');
      }
    } catch (err) {
      setError('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const invoicesByStatus = useMemo(() => {
    const grouped: Record<string, Invoice[]> = {};
    STAGES.forEach(status => grouped[status] = []);
    invoices.forEach(invoice => {
      const status = invoice.status.toUpperCase();
      if (grouped[status]) {
        grouped[status].push(invoice);
      } else {
        if (!grouped['DRAFT']) grouped['DRAFT'] = [];
        grouped['DRAFT'].push(invoice);
      }
    });
    return grouped;
  }, [invoices]);

  const formatCurrency = (value: string, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  const kanbanColumns = STAGES.map(status => {
    const stageInvoices = invoicesByStatus[status] || [];
    const totalValue = stageInvoices.reduce((sum, i) => sum + parseFloat(i.total), 0);
    return {
      id: status,
      title: status,
      count: stageInvoices.length,
      aggregate: totalValue > 0 ? formatCurrency(totalValue.toString()) : ''
    };
  });

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
            href="/admin/erp/invoices/create"
            className="admin-btn admin-btn-primary"
          >
            + Create Invoice
          </Link>
        }
      />

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No invoices found.</div>
        ) : view === 'kanban' ? (
          <KanbanBoard columns={kanbanColumns}>
            {STAGES.map(status => (
              <div key={status} className="flex flex-col gap-2">
                {invoicesByStatus[status]?.map(invoice => (
                  <Link href={`/admin/erp/invoices/${invoice.id}`} key={invoice.id} className="no-underline">
                    <KanbanCard
                      title={invoice.invoiceNumber}
                      subtitle={invoice.customerName}
                      amount={formatCurrency(invoice.total, invoice.currency)}
                      initials={invoice.customerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      priority={invoice.status === 'OVERDUE' ? 3 : 0}
                      tags={[
                        { label: invoice.status, color: invoice.status === 'PAID' ? '#10B981' : invoice.status === 'OVERDUE' ? '#EF4444' : '#6B7280' }
                      ]}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </KanbanBoard>
        ) : (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4 text-sm font-bold">
                      <Link href={`/admin/erp/invoices/${invoice.id}`} className="text-[#E03B12] hover:underline">
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{invoice.customerName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${invoice.status === 'PAID' ? 'bg-green-50 text-green-700' :
                          invoice.status === 'OVERDUE' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
                        }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                      {new Date(invoice.createdAt).toLocaleDateString()}
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
