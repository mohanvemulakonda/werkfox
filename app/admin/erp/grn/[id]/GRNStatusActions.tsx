'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GRNStatusActionsProps {
  grnId: number;
  currentStatus: string;
}

export default function GRNStatusActions({ grnId, currentStatus }: GRNStatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function updateStatus(newStatus: string) {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/grn/${grnId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update status');
        return;
      }

      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-inter">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        {currentStatus === 'PENDING' && (
          <button
            onClick={() => updateStatus('QC_PENDING')}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500 text-white font-medium font-inter hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Start QC'}
          </button>
        )}

        {currentStatus === 'QC_PENDING' && (
          <>
            <button
              onClick={() => updateStatus('QC_PASSED')}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium font-inter hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Pass QC'}
            </button>
            <button
              onClick={() => updateStatus('QC_FAILED')}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-medium font-inter hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Fail QC'}
            </button>
          </>
        )}

        {currentStatus === 'QC_PASSED' && (
          <button
            onClick={() => updateStatus('COMPLETED')}
            disabled={loading}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white overflow-hidden font-inter disabled:opacity-50"
          >
            <span className="relative z-10 text-sm tracking-wide">
              {loading ? 'Completing...' : 'Complete GRN'}
            </span>
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        )}

        {currentStatus === 'COMPLETED' && (
          <span className="text-sm text-green-600 font-medium font-inter">
            This GRN has been completed and verified.
          </span>
        )}

        {currentStatus === 'QC_FAILED' && (
          <span className="text-sm text-red-600 font-medium font-inter">
            Quality check failed. Review the items and create a new GRN if needed.
          </span>
        )}
      </div>
    </div>
  );
}
