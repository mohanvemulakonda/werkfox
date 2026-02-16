'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductionActionsProps {
  productionOrderId: number;
  status: string;
  hasItems: boolean;
}

export default function ProductionActions({ productionOrderId, status, hasItems }: ProductionActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async (newStatus: string) => {
    const confirmMessages: Record<string, string> = {
      IN_PROGRESS: 'Are you sure you want to start production? This will set the actual start date.',
      COMPLETED: 'Are you sure you want to mark this production order as completed?',
      QC: 'Move this production order to Quality Control inspection?',
    };

    const message = confirmMessages[newStatus] || `Change status to ${newStatus}?`;
    if (!confirm(message)) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/production-orders/${productionOrderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMaterialRequest = async () => {
    if (!confirm('Create a material request from this production order\'s BOM items?')) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/production-orders/${productionOrderId}/create-material-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const mr = await response.json();
        router.push(`/admin/erp/material-requests/${mr.id}`);
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create material request');
      }
    } catch (err) {
      setError('Failed to create material request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <span className="admin-btn admin-btn-secondary" style={{ opacity: 0.6, cursor: 'wait' }}>
        Processing...
      </span>
    );
  }

  return (
    <>
      {error && (
        <span style={{ color: '#991b1b', fontSize: '0.75rem', marginRight: '0.5rem' }}>{error}</span>
      )}

      {/* PLANNED actions */}
      {status === 'PLANNED' && (
        <>
          <Link
            href={`/admin/erp/production/${productionOrderId}/edit`}
            className="admin-btn admin-btn-secondary"
          >
            Edit
          </Link>
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            className="admin-btn admin-btn-primary"
          >
            Start Production
          </button>
          {hasItems && (
            <button
              onClick={handleCreateMaterialRequest}
              className="admin-btn admin-btn-secondary"
              style={{ borderColor: '#d97706', color: '#d97706' }}
            >
              Create Material Request
            </button>
          )}
        </>
      )}

      {/* MATERIAL_REQUESTED actions */}
      {status === 'MATERIAL_REQUESTED' && (
        <>
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            className="admin-btn admin-btn-primary"
          >
            Start Production
          </button>
        </>
      )}

      {/* IN_PROGRESS actions */}
      {status === 'IN_PROGRESS' && (
        <>
          <button
            onClick={() => handleStatusChange('QC')}
            className="admin-btn admin-btn-secondary"
            style={{ borderColor: '#7c3aed', color: '#7c3aed' }}
          >
            QC Check
          </button>
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            className="admin-btn admin-btn-primary"
            style={{ backgroundColor: '#059669' }}
          >
            Complete
          </button>
        </>
      )}

      {/* QC actions */}
      {status === 'QC' && (
        <>
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            className="admin-btn admin-btn-secondary"
          >
            Back to Production
          </button>
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            className="admin-btn admin-btn-primary"
            style={{ backgroundColor: '#059669' }}
          >
            Complete
          </button>
        </>
      )}

      {/* COMPLETED - no actions */}
    </>
  );
}
