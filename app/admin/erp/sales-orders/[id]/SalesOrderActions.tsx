'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SalesOrderActionsProps {
  salesOrderId: number;
  status: string;
}

export default function SalesOrderActions({ salesOrderId, status }: SalesOrderActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/sales-orders/${salesOrderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToInvoice = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/sales-orders/${salesOrderId}/convert-to-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to convert to invoice');
      }

      const invoice = await res.json();
      router.push(`/admin/erp/invoices/${invoice.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {error && (
        <div className="admin-alert admin-alert-error mb-4">
          {error}
        </div>
      )}

      <div className="admin-page-actions">
        {/* PENDING actions */}
        {status === 'PENDING' && (
          <>
            <Link
              href={`/admin/erp/sales-orders/${salesOrderId}/edit`}
              className="admin-btn admin-btn-secondary"
            >
              Edit
            </Link>
            <button
              onClick={() => handleStatusChange('CONFIRMED')}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
            <button
              onClick={() => handleStatusChange('ON_HOLD')}
              disabled={isLoading}
              className="admin-btn admin-btn-secondary"
            >
              Put On Hold
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={isLoading}
              className="admin-btn admin-btn-ghost"
              style={{ color: '#dc2626' }}
            >
              Cancel
            </button>
          </>
        )}

        {/* CONFIRMED actions */}
        {status === 'CONFIRMED' && (
          <>
            <button
              onClick={() => handleStatusChange('IN_PROGRESS')}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
            >
              {isLoading ? 'Processing...' : 'Start Processing'}
            </button>
            <button
              onClick={handleConvertToInvoice}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
              style={{ backgroundColor: '#059669' }}
            >
              {isLoading ? 'Converting...' : 'Convert to Invoice'}
            </button>
            <button
              onClick={() => handleStatusChange('ON_HOLD')}
              disabled={isLoading}
              className="admin-btn admin-btn-secondary"
            >
              Put On Hold
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={isLoading}
              className="admin-btn admin-btn-ghost"
              style={{ color: '#dc2626' }}
            >
              Cancel
            </button>
          </>
        )}

        {/* IN_PROGRESS actions */}
        {status === 'IN_PROGRESS' && (
          <>
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
            >
              {isLoading ? 'Processing...' : 'Complete'}
            </button>
            <button
              onClick={handleConvertToInvoice}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
              style={{ backgroundColor: '#059669' }}
            >
              {isLoading ? 'Converting...' : 'Convert to Invoice'}
            </button>
            <button
              onClick={() => handleStatusChange('ON_HOLD')}
              disabled={isLoading}
              className="admin-btn admin-btn-secondary"
            >
              Put On Hold
            </button>
          </>
        )}

        {/* ON_HOLD actions */}
        {status === 'ON_HOLD' && (
          <>
            <button
              onClick={() => handleStatusChange('PENDING')}
              disabled={isLoading}
              className="admin-btn admin-btn-secondary"
            >
              {isLoading ? 'Processing...' : 'Move to Pending'}
            </button>
            <button
              onClick={() => handleStatusChange('CONFIRMED')}
              disabled={isLoading}
              className="admin-btn admin-btn-primary"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={isLoading}
              className="admin-btn admin-btn-ghost"
              style={{ color: '#dc2626' }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
