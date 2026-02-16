'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface StatusActionsProps {
  poId: number;
  status: string;
}

export default function StatusActions({ poId, status }: StatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    const confirmMessages: Record<string, string> = {
      SENT: 'Are you sure you want to mark this PO as sent to the vendor?',
      CONFIRMED: 'Confirm that the vendor has acknowledged this PO?',
      CANCELLED: 'Are you sure you want to cancel this purchase order? This cannot be undone.',
    };

    const message = confirmMessages[newStatus] || `Change status to ${newStatus}?`;
    if (!confirm(message)) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/purchase-orders/${poId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <span className="admin-btn admin-btn-secondary" style={{ opacity: 0.6, cursor: 'wait' }}>
        Updating...
      </span>
    );
  }

  return (
    <>
      {/* DRAFT actions */}
      {status === 'DRAFT' && (
        <>
          <Link
            href={`/admin/erp/purchase-orders/${poId}/edit`}
            className="admin-btn admin-btn-secondary"
          >
            Edit
          </Link>
          <button
            onClick={() => handleStatusChange('SENT')}
            className="admin-btn admin-btn-primary"
          >
            Send to Vendor
          </button>
          <button
            onClick={() => handleStatusChange('CANCELLED')}
            className="admin-btn admin-btn-ghost"
            style={{ color: '#991b1b' }}
          >
            Cancel PO
          </button>
        </>
      )}

      {/* SENT actions */}
      {status === 'SENT' && (
        <>
          <button
            onClick={() => handleStatusChange('CONFIRMED')}
            className="admin-btn admin-btn-primary"
          >
            Mark Confirmed
          </button>
          <button
            onClick={() => handleStatusChange('CANCELLED')}
            className="admin-btn admin-btn-ghost"
            style={{ color: '#991b1b' }}
          >
            Cancel PO
          </button>
        </>
      )}

      {/* CONFIRMED / PARTIAL_RECEIVED actions */}
      {(status === 'CONFIRMED' || status === 'PARTIAL_RECEIVED') && (
        <>
          <Link
            href={`/admin/erp/grn/create?poId=${poId}`}
            className="admin-btn admin-btn-primary"
          >
            Receive Goods
          </Link>
          {status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              className="admin-btn admin-btn-ghost"
              style={{ color: '#991b1b' }}
            >
              Cancel PO
            </button>
          )}
        </>
      )}
    </>
  );
}
