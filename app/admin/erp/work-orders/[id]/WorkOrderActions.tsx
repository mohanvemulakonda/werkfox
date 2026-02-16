'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  workOrderId: number;
  status: string;
}

export default function WorkOrderActions({ workOrderId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${workOrderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to update status');
        return;
      }
      router.refresh();
    } catch {
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleConvertToInvoice() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${workOrderId}/convert-to-invoice`, {
        method: 'POST',
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to convert to invoice');
        return;
      }
      const invoice = await res.json();
      router.push(`/admin/erp/invoices/${invoice.id}`);
    } catch {
      alert('Failed to convert to invoice');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-detail-section mb-6">
      <div className="flex flex-wrap gap-3">
        {status === 'PENDING' && (
          <>
            <button
              onClick={() => router.push(`/admin/erp/work-orders/${workOrderId}/edit`)}
              className="admin-btn admin-btn-secondary"
              disabled={loading}
            >
              Edit
            </button>
            <button
              onClick={() => handleStatusChange('ASSIGNED')}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Assign
            </button>
            <button
              onClick={() => handleStatusChange('IN_PROGRESS')}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Start Work
            </button>
          </>
        )}

        {status === 'ASSIGNED' && (
          <>
            <button
              onClick={() => handleStatusChange('IN_PROGRESS')}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Start Work
            </button>
            <button
              onClick={() => handleStatusChange('ON_HOLD')}
              className="admin-btn admin-btn-secondary"
              disabled={loading}
            >
              Put On Hold
            </button>
          </>
        )}

        {status === 'IN_PROGRESS' && (
          <>
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Mark Complete
            </button>
            <button
              onClick={() => handleStatusChange('ON_HOLD')}
              className="admin-btn admin-btn-secondary"
              disabled={loading}
            >
              Put On Hold
            </button>
          </>
        )}

        {status === 'ON_HOLD' && (
          <>
            <button
              onClick={() => handleStatusChange('IN_PROGRESS')}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Resume Work
            </button>
          </>
        )}

        {status === 'COMPLETED' && (
          <>
            <button
              onClick={handleConvertToInvoice}
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              Convert to Invoice
            </button>
          </>
        )}

        {loading && (
          <span className="text-sm text-gray-500 self-center">Processing...</span>
        )}
      </div>
    </div>
  );
}
