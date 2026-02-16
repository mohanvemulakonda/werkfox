'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  dispatchId: number;
  status: string;
}

export default function DispatchActions({ dispatchId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/dispatch-orders/${dispatchId}`, {
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

  return (
    <div className="admin-detail-section mb-6">
      <div className="flex flex-wrap gap-3">
        {status === 'PENDING' && (
          <>
            <button onClick={() => router.push(`/admin/erp/dispatch/${dispatchId}/edit`)} className="admin-btn admin-btn-secondary" disabled={loading}>Edit</button>
            <button onClick={() => handleStatusChange('PACKED')} className="admin-btn admin-btn-primary" disabled={loading}>Mark as Packed</button>
          </>
        )}
        {status === 'PACKED' && (
          <button onClick={() => handleStatusChange('DISPATCHED')} className="admin-btn admin-btn-primary" disabled={loading}>Dispatch</button>
        )}
        {status === 'DISPATCHED' && (
          <button onClick={() => handleStatusChange('IN_TRANSIT')} className="admin-btn admin-btn-primary" disabled={loading}>In Transit</button>
        )}
        {status === 'IN_TRANSIT' && (
          <button onClick={() => handleStatusChange('DELIVERED')} className="admin-btn admin-btn-primary" disabled={loading}>Mark Delivered</button>
        )}
        {loading && <span className="text-sm text-gray-500 self-center">Processing...</span>}
      </div>
    </div>
  );
}
