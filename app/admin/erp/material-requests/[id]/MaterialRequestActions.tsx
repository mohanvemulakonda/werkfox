'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  materialRequestId: number;
  status: string;
}

export default function MaterialRequestActions({ materialRequestId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/material-requests/${materialRequestId}`, {
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

  async function handleConvertToPO() {
    if (loading) return;
    const vendorId = prompt('Enter Vendor ID for the Purchase Order:');
    const locationId = prompt('Enter Location/Warehouse ID:');
    if (!vendorId || !locationId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/material-requests/${materialRequestId}/convert-to-po`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId: parseInt(vendorId), locationId: parseInt(locationId) }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to convert to PO');
        return;
      }
      const po = await res.json();
      router.push(`/admin/erp/purchase-orders/${po.id}`);
    } catch {
      alert('Failed to convert to PO');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-detail-section mb-6">
      <div className="flex flex-wrap gap-3">
        {status === 'DRAFT' && (
          <>
            <button onClick={() => handleStatusChange('SUBMITTED')} className="admin-btn admin-btn-primary" disabled={loading}>Submit for Approval</button>
          </>
        )}
        {status === 'SUBMITTED' && (
          <>
            <button onClick={() => handleStatusChange('APPROVED')} className="admin-btn admin-btn-primary" disabled={loading}>Approve</button>
            <button onClick={() => handleStatusChange('DRAFT')} className="admin-btn admin-btn-secondary" disabled={loading}>Return to Draft</button>
          </>
        )}
        {status === 'APPROVED' && (
          <>
            <button onClick={handleConvertToPO} className="admin-btn admin-btn-primary" disabled={loading}>Convert to Purchase Order</button>
          </>
        )}
        {loading && <span className="text-sm text-gray-500 self-center">Processing...</span>}
      </div>
    </div>
  );
}
