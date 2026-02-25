'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuotationActionsProps {
  quotation: any;
}

export default function QuotationActions({ quotation }: QuotationActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    setError('');

    try {
      const response = await fetch(`/api/quotations/${quotation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update status');
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const convertToSalesOrder = async () => {
    setIsConverting(true);
    setError('');

    try {
      const response = await fetch(
        `/api/quotations/${quotation.id}/convert-to-so`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to convert to Sales Order');
      }

      const data = await response.json();
      router.push(`/admin/erp/sales-orders/${data.id}`);
    } catch (err: any) {
      setError(err.message);
      setIsConverting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-red-50 border border-red-200 text-red-700 font-inter shadow-lg max-w-md">
          {error}
          <button
            onClick={() => setError('')}
            className="ml-2 text-red-500 hover:text-red-700 font-bold"
          >
            X
          </button>
        </div>
      )}

      {/* PDF actions — always visible */}
      <button
        onClick={() => window.open(`/api/quotations/${quotation.id}/pdf`, '_blank')}
        className="admin-btn admin-btn-secondary"
      >
        Preview PDF
      </button>
      <button
        disabled={isDownloading}
        onClick={async () => {
          setIsDownloading(true);
          try {
            const res = await fetch(`/api/quotations/${quotation.id}/pdf`);
            if (!res.ok) throw new Error('Failed to download');
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Quote-${quotation.quoteNumber}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (err: any) {
            setError(err.message || 'Failed to download PDF');
          } finally {
            setIsDownloading(false);
          }
        }}
        className="admin-btn admin-btn-secondary"
        style={{ opacity: isDownloading ? 0.5 : 1 }}
      >
        {isDownloading ? 'Downloading...' : 'Download PDF'}
      </button>

      {/* DRAFT actions */}
      {quotation.status === 'DRAFT' && (
        <>
          <Link
            href={`/admin/erp/quotes/${quotation.id}/edit`}
            className="admin-btn admin-btn-secondary"
          >
            Edit
          </Link>
          <button
            onClick={() => updateStatus('SENT')}
            disabled={isUpdating}
            className="admin-btn admin-btn-primary"
            style={{ opacity: isUpdating ? 0.5 : 1 }}
          >
            {isUpdating ? 'Sending...' : 'Send to Customer'}
          </button>
        </>
      )}

      {/* SENT / VIEWED actions */}
      {(quotation.status === 'SENT' || quotation.status === 'VIEWED') && (
        <>
          <button
            onClick={() => updateStatus('ACCEPTED')}
            disabled={isUpdating}
            className="admin-btn"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#065f46',
              opacity: isUpdating ? 0.5 : 1,
            }}
          >
            Mark Accepted
          </button>
          <button
            onClick={() => updateStatus('REJECTED')}
            disabled={isUpdating}
            className="admin-btn"
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#991b1b',
              opacity: isUpdating ? 0.5 : 1,
            }}
          >
            Mark Rejected
          </button>
        </>
      )}

      {/* ACCEPTED actions */}
      {quotation.status === 'ACCEPTED' && (
        <button
          onClick={convertToSalesOrder}
          disabled={isConverting}
          className="admin-btn admin-btn-primary"
          style={{ opacity: isConverting ? 0.5 : 1 }}
        >
          {isConverting ? 'Converting...' : 'Convert to Sales Order'}
        </button>
      )}
    </>
  );
}
