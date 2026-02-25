'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '../../../components/StatusBar';
import Sheet from '../../../components/Sheet';
import Chatter from '../../../components/Chatter';

interface InvoiceItem {
  id: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: string;
  taxRate: string;
  total: string;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  customerEmail?: string;
  customerGst?: string;
  invoiceDate: string;
  dueDate?: string;
  status: string;
  currency: string;
  subtotal: string;
  taxAmount: string;
  total: string;
  notes?: string;
  items: InvoiceItem[];
  activities: any[];
}

const STAGES = ['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED'];

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invoices/${invoiceId}`);
      const data = await response.json();
      if (response.ok) {
        setInvoice(data.invoice || data);
      } else {
        setError(data.error || 'Failed to fetch invoice');
      }
    } catch (err) {
      setError('Failed to fetch invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchInvoice();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const statusSteps = useMemo(() => {
    const currentIdx = STAGES.indexOf(invoice?.status.toUpperCase() || '');
    return STAGES.filter(s => s !== 'CANCELLED' && s !== 'OVERDUE').map(stage => ({
      id: stage,
      label: stage,
      status: invoice?.status.toUpperCase() === stage ? 'current' as const :
        currentIdx > STAGES.indexOf(stage) ? 'completed' as const : 'pending' as const
    }));
  }, [invoice?.status]);

  const chatterActivities = useMemo(() => {
    return (invoice?.activities || []).map((a: any) => ({
      id: a.id.toString(),
      author: a.user?.name || 'System',
      initials: (a.user?.name || 'SY').split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2),
      time: new Date(a.createdAt).toLocaleString(),
      text: a.subject || a.description || 'Invoice activity logged',
      type: 'system' as const
    })).reverse();
  }, [invoice?.activities]);

  const formatCurrency = (value: string, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(parseFloat(value));
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>;
  if (!invoice) return <div className="p-8 text-center text-red-600">{error || 'Invoice not found'}</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <StatusBar
        actions={
          <div className="flex gap-2">
            {invoice.status.toUpperCase() === 'DRAFT' && (
              <button
                onClick={() => handleStatusUpdate('SENT')}
                disabled={updating}
                className="admin-btn admin-btn-primary"
              >
                Mark as Sent
              </button>
            )}
            {['SENT', 'OVERDUE'].includes(invoice.status.toUpperCase()) && (
              <button
                onClick={() => handleStatusUpdate('PAID')}
                className="admin-btn admin-btn-primary"
              >
                Record Payment
              </button>
            )}
            <button
              onClick={() => window.open(`/api/invoices/${invoice.id}/pdf`, '_blank')}
              className="admin-btn admin-btn-secondary"
            >
              Preview PDF
            </button>
            <button
              onClick={async () => {
                const res = await fetch(`/api/invoices/${invoice.id}/pdf`);
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="admin-btn admin-btn-secondary"
            >
              Download PDF
            </button>
            <Link href="/admin/erp/invoices" className="admin-btn admin-btn-ghost">← Invoices</Link>
          </div>
        }
        steps={statusSteps}
      />

      <div className="flex-1 overflow-auto py-8 px-4">
        <Sheet>
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="text-[10px] font-bold text-[#E03B12] uppercase tracking-[0.2em] mb-1">Tax Invoice</div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight mb-2">{invoice.invoiceNumber}</h1>
              <div className="text-xl font-bold text-gray-500">{invoice.customerName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount Due</div>
              <div className="text-5xl font-black text-[#E03B12]">
                {invoice.status.toUpperCase() === 'PAID' ? '₹0.00' : formatCurrency(invoice.total, invoice.currency)}
              </div>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded text-xs font-black uppercase ${invoice.status.toUpperCase() === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Billing Details</label>
                <div className="text-sm font-semibold text-gray-900">{invoice.customerName}</div>
                <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                {invoice.customerGst && <div className="text-xs font-mono font-bold text-gray-400 mt-2">GSTIN: {invoice.customerGst}</div>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Invoice Date</label>
                <div className="text-sm font-bold">{new Date(invoice.invoiceDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Due Date</label>
                <div className="text-sm font-bold text-red-600">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'Due on Receipt'}</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Payment Method</label>
                <div className="text-sm font-semibold">Bank Transfer / UPI</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <table className="min-w-full">
              <thead className="border-b-2 border-gray-100">
                <tr>
                  <th className="py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty</th>
                  <th className="py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate</th>
                  <th className="py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-5">
                      <div className="text-sm font-bold text-gray-900">{item.productName}</div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-tighter">{item.productSku}</div>
                    </td>
                    <td className="py-5 text-right text-sm font-medium text-gray-600">{item.quantity}</td>
                    <td className="py-5 text-right text-sm text-gray-600">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                    <td className="py-5 text-right text-sm font-black text-gray-900">{formatCurrency(item.total, invoice.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-10 border-t-2 border-gray-100">
            <div className="w-72 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                <span>Untaxed Amount</span>
                <span className="text-gray-900">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                <span>Taxes (GST)</span>
                <span className="text-gray-900">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-20 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Terms & Notes</label>
              <p className="text-sm text-gray-600 leading-relaxed italic">"{invoice.notes}"</p>
            </div>
          )}
        </Sheet>

        <Chatter activities={chatterActivities} />
      </div>
    </div>
  );
}
