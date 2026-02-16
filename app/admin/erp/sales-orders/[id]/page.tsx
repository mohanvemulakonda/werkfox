'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '../../../components/StatusBar';
import Sheet from '../../../components/Sheet';
import Chatter from '../../../components/Chatter';

interface SalesOrderItem {
  id: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: string;
  taxRate: string;
  discount: string;
  total: string;
}

interface SalesOrder {
  id: number;
  soNumber: string;
  customerName: string;
  customerEmail?: string;
  customerGst?: string;
  customerState?: string;
  customerPoNumber?: string;
  orderDate: string;
  deliveryDate?: string;
  status: string;
  paymentStatus: string;
  subtotal: string;
  taxAmount: string;
  discount: string;
  total: string;
  notes?: string;
  terms?: string;
  items: SalesOrderItem[];
  activities: any[];
}

const STAGES = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export default function SalesOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const soId = params.id as string;

  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [soId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sales-orders/${soId}`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data.salesOrder || data); // Adjust based on API response structure
      } else {
        setError(data.error || 'Failed to fetch sales order');
      }
    } catch (err) {
      setError('Failed to fetch sales order');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setConfirming(true);
    try {
      const response = await fetch(`/api/sales-orders/${soId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrder();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setConfirming(false);
    }
  };

  const statusSteps = useMemo(() => {
    const currentIdx = STAGES.indexOf(order?.status || '');
    return STAGES.filter(s => s !== 'CANCELLED').map(stage => ({
      id: stage,
      label: stage.replace('_', ' '),
      status: order?.status === stage ? 'current' as const :
        currentIdx > STAGES.indexOf(stage) ? 'completed' as const : 'pending' as const
    }));
  }, [order?.status]);

  const chatterActivities = useMemo(() => {
    return (order?.activities || []).map((a: any) => ({
      id: a.id.toString(),
      author: a.user?.name || 'System',
      initials: (a.user?.name || 'SY').split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2),
      time: new Date(a.createdAt).toLocaleString(),
      text: a.subject || a.description || 'Order activity logged',
      type: 'system' as const
    })).reverse();
  }, [order?.activities]);

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(parseFloat(value));
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>;
  if (!order) return <div className="p-8 text-center text-red-600">{error || 'Order not found'}</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <StatusBar
        actions={
          <div className="flex gap-2">
            {order.status === 'PENDING' && (
              <button
                onClick={() => handleStatusUpdate('CONFIRMED')}
                disabled={confirming}
                className="admin-btn admin-btn-primary"
              >
                {confirming ? 'Working...' : 'Confirm Order'}
              </button>
            )}
            {['CONFIRMED', 'IN_PROGRESS'].includes(order.status) && (
              <button
                onClick={() => handleStatusUpdate('COMPLETED')}
                className="admin-btn admin-btn-primary"
              >
                Mark Done
              </button>
            )}
            {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
              <button
                onClick={() => handleStatusUpdate('CANCELLED')}
                className="admin-btn admin-btn-danger"
              >
                Cancel Order
              </button>
            )}
            <Link href="/admin/erp/sales-orders" className="admin-btn admin-btn-ghost">← Orders</Link>
          </div>
        }
        steps={statusSteps}
      />

      <div className="flex-1 overflow-auto py-8 px-4">
        <Sheet>
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{order.soNumber}</h1>
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-[#E03B12]">{order.customerName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${order.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
              <div className="text-4xl font-black text-gray-900">{formatCurrency(order.total)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Order Date</label>
                <span className="text-sm font-semibold">{new Date(order.orderDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Delivery Date</label>
                <span className="text-sm font-semibold">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Customer PO</label>
                <span className="text-sm font-semibold">{order.customerPoNumber || '—'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">GST Number</label>
                <span className="text-sm font-mono font-bold text-gray-900">{order.customerGst || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">State</label>
                <span className="text-sm font-semibold">{order.customerState || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Contact Email</label>
                <span className="text-sm font-semibold text-gray-700">{order.customerEmail || '—'}</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-tighter">Order Line Items</h3>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase">Product</th>
                    <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase">Qty</th>
                    <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase">Unit Price</th>
                    <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <div className="text-sm font-bold text-gray-900">{item.productName}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{item.productSku}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-sm">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>GST ({order.items[0]?.taxRate}%)</span>
                <span>{formatCurrency(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-50">
                <span>TOTAL</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {(order.notes || order.terms) && (
            <div className="mt-12 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Terms & Conditions</label>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{order.terms || 'Standard payment terms apply.'}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Internal Notes</label>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{order.notes || 'No special instructions.'}</p>
              </div>
            </div>
          )}
        </Sheet>

        <Chatter activities={chatterActivities} />
      </div>
    </div>
  );
}
