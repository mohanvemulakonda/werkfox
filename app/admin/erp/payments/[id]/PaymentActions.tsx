'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  paymentId: number;
  status: string;
}

export default function PaymentActions({ paymentId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    if (loading) return;
    if (newStatus === 'CANCELLED' && !confirm('Are you sure you want to cancel this payment?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/payments/${paymentId}`, {
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
        {status === 'DRAFT' && (
          <>
            <button onClick={() => handleStatusChange('CONFIRMED')} className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Payment'}
            </button>
            <button onClick={() => handleStatusChange('CANCELLED')} className="admin-btn admin-btn-ghost" style={{ color: '#dc2626' }} disabled={loading}>
              Cancel
            </button>
          </>
        )}
        {status === 'CONFIRMED' && (
          <>
            <button onClick={() => handleStatusChange('BOUNCED')} className="admin-btn admin-btn-secondary" disabled={loading}>
              Mark as Bounced
            </button>
            <button onClick={() => handleStatusChange('CANCELLED')} className="admin-btn admin-btn-ghost" style={{ color: '#dc2626' }} disabled={loading}>
              Cancel
            </button>
          </>
        )}
        {status === 'BOUNCED' && (
          <button onClick={() => handleStatusChange('CONFIRMED')} className="admin-btn admin-btn-primary" disabled={loading}>
            Re-confirm Payment
          </button>
        )}
        {loading && <span className="text-sm text-gray-500 self-center">Processing...</span>}
      </div>
    </div>
  );
}
