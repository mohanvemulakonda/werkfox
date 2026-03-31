'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CuttingPlan {
  id: number;
  name: string;
  material: string | null;
  sheetWidth: number;
  sheetHeight: number;
  kerf: number;
  utilization: string | null;
  sheetsUsed: number | null;
  createdAt: string;
}

export default function FoxCutHistoryPage() {
  const [plans, setPlans] = useState<CuttingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/foxcut');
      const data = await res.json();
      if (res.ok) {
        setPlans(Array.isArray(data) ? data : []);
      } else {
        setError(data.error || 'Failed to fetch plans');
      }
    } catch {
      setError('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this cutting plan?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/foxcut/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlans(plans.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete');
      }
    } catch {
      alert('Failed to delete plan');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
            Saved Cutting Plans
          </h1>
          <p className="text-gray-600 font-inter font-light">
            Previously optimized cutting layouts
          </p>
        </div>
        <Link
          href="/admin/erp/foxcut"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#E03B12] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Optimization</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-400 font-inter">Loading plans...</p>
        </div>
      ) : error ? (
        <div className="bg-white border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-red-500 font-inter">{error}</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="bg-white border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <p className="text-gray-400 font-inter mt-4 text-sm">No saved cutting plans yet</p>
          <Link
            href="/admin/erp/foxcut"
            className="mt-3 text-sm text-[#E03B12] hover:underline font-inter"
          >
            Create your first optimization
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm font-inter">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Plan Name</th>
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Material</th>
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Sheet Size</th>
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Sheets Used</th>
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Utilization</th>
                <th className="py-3 px-4 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-right text-xs text-gray-500 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{plan.name}</td>
                  <td className="py-3 px-4 text-gray-600">{plan.material || '---'}</td>
                  <td className="py-3 px-4 text-gray-600">{plan.sheetWidth} x {plan.sheetHeight} mm</td>
                  <td className="py-3 px-4 text-gray-600">{plan.sheetsUsed ?? '---'}</td>
                  <td className="py-3 px-4">
                    {plan.utilization ? (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: parseFloat(plan.utilization) >= 80 ? '#ECFDF5' : parseFloat(plan.utilization) >= 60 ? '#FFFBEB' : '#FEF2F2',
                          color: parseFloat(plan.utilization) >= 80 ? '#059669' : parseFloat(plan.utilization) >= 60 ? '#D97706' : '#DC2626',
                        }}
                      >
                        {parseFloat(plan.utilization).toFixed(1)}%
                      </span>
                    ) : '---'}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {new Date(plan.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(plan.id)}
                      disabled={deleting === plan.id}
                      className="text-xs text-red-500 hover:text-red-700 font-inter transition-colors disabled:opacity-50"
                    >
                      {deleting === plan.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
