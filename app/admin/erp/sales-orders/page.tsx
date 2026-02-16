'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';
import KanbanBoard from '../../components/KanbanBoard';
import KanbanCard from '../../components/KanbanCard';

interface SalesOrder {
  id: number;
  soNumber: string;
  orderDate: string;
  deliveryDate?: string;
  total: string;
  status: string;
  paymentStatus: string;
  customer: {
    name: string;
    customerCode: string;
  };
}

const STAGES = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('list');

  useEffect(() => {
    fetchOrders();
  }, [searchQuery]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sales-orders');
      const data = await response.json();

      if (response.ok) {
        let filtered = data.salesOrders || [];
        if (searchQuery) {
          filtered = filtered.filter((o: SalesOrder) =>
            o.soNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setOrders(filtered);
      } else {
        setError(data.error || 'Failed to fetch sales orders');
      }
    } catch (err) {
      setError('Failed to fetch sales orders');
    } finally {
      setLoading(false);
    }
  };

  const ordersByStatus = useMemo(() => {
    const grouped: Record<string, SalesOrder[]> = {};
    STAGES.forEach(status => grouped[status] = []);
    orders.forEach(order => {
      if (grouped[order.status]) {
        grouped[order.status].push(order);
      } else {
        if (!grouped['PENDING']) grouped['PENDING'] = [];
        grouped['PENDING'].push(order);
      }
    });
    return grouped;
  }, [orders]);

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  const kanbanColumns = STAGES.map(status => {
    const stageOrders = ordersByStatus[status] || [];
    const totalValue = stageOrders.reduce((sum, o) => sum + parseFloat(o.total), 0);
    return {
      id: status,
      title: status.replace('_', ' '),
      count: stageOrders.length,
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
            href="/admin/erp/sales-orders/create"
            className="admin-btn admin-btn-primary"
          >
            + Create New Order
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
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No sales orders found.</div>
        ) : view === 'kanban' ? (
          <KanbanBoard columns={kanbanColumns}>
            {STAGES.map(status => (
              <div key={status} className="flex flex-col gap-2">
                {ordersByStatus[status]?.map(order => (
                  <Link href={`/admin/erp/sales-orders/${order.id}`} key={order.id} className="no-underline">
                    <KanbanCard
                      title={order.soNumber}
                      subtitle={order.customer.name}
                      amount={formatCurrency(order.total)}
                      initials={order.customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      priority={order.paymentStatus === 'OVERDUE' ? 3 : 0}
                      tags={[
                        { label: order.paymentStatus, color: order.paymentStatus === 'PAID' ? '#10B981' : order.paymentStatus === 'OVERDUE' ? '#EF4444' : '#F59E0B' }
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4 text-sm font-bold">
                      <Link href={`/admin/erp/sales-orders/${order.id}`} className="text-[#E03B12] hover:underline">
                        {order.soNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{order.customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                          order.status === 'CANCELLED' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
                        }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${order.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' :
                          order.paymentStatus === 'OVERDUE' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                        {order.paymentStatus}
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
