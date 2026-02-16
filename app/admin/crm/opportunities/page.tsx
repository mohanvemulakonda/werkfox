'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';
import KanbanBoard from '../../components/KanbanBoard';
import KanbanCard from '../../components/KanbanCard';

interface Opportunity {
  id: number;
  name: string;
  description?: string;
  value: string;
  currency: string;
  probability?: number;
  expectedCloseDate?: string;
  stage: string;
  status: string;
  lead: {
    name: string;
    company?: string;
  };
}

const STAGES = ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('kanban');

  useEffect(() => {
    fetchOpportunities();
  }, [searchQuery]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/opportunities?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setOpportunities(data.opportunities);
      } else {
        setError(data.error || 'Failed to fetch opportunities');
      }
    } catch (err) {
      setError('Failed to fetch opportunities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const oppsByStage = useMemo(() => {
    const grouped: Record<string, Opportunity[]> = {};
    STAGES.forEach(stage => grouped[stage] = []);
    opportunities.forEach(opp => {
      if (grouped[opp.stage]) {
        grouped[opp.stage].push(opp);
      } else {
        if (!grouped['QUALIFICATION']) grouped['QUALIFICATION'] = [];
        grouped['QUALIFICATION'].push(opp);
      }
    });
    return grouped;
  }, [opportunities]);

  const formatCurrency = (value: string, currency: string = 'INR') => {
    const num = parseFloat(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const kanbanColumns = STAGES.map(stage => {
    const stageOpps = oppsByStage[stage] || [];
    const totalValue = stageOpps.reduce((sum, opp) => sum + parseFloat(opp.value), 0);
    return {
      id: stage,
      title: stage.replace('_', ' '),
      count: stageOpps.length,
      aggregate: totalValue > 0 ? formatCurrency(totalValue.toString()) : ''
    };
  });

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <FilterBar
        onSearch={setSearchQuery}
        filters={searchQuery ? [{ id: 'search', label: 'Search', value: searchQuery }] : []}
        onRemoveFilter={() => setSearchQuery('')}
        view={view}
        onViewChange={setView}
        actions={
          <Link
            href="/admin/crm/opportunities/create"
            className="admin-btn admin-btn-primary"
          >
            + New Opportunity
          </Link>
        }
      />

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : opportunities.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No opportunities found.</div>
        ) : view === 'kanban' ? (
          <KanbanBoard columns={kanbanColumns}>
            {STAGES.map(stage => (
              <div key={stage} className="flex flex-col gap-2">
                {oppsByStage[stage]?.map(opp => (
                  <Link href={`/admin/crm/opportunities/${opp.id}`} key={opp.id} className="no-underline">
                    <KanbanCard
                      title={opp.name}
                      subtitle={opp.lead?.company || opp.lead?.name}
                      amount={formatCurrency(opp.value, opp.currency)}
                      initials={(opp.lead?.name || 'OP').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      priority={opp.probability ? Math.min(3, Math.floor(opp.probability / 33)) : 0}
                      tags={opp.status === 'WON' ? [{ label: 'Won', color: '#10B981' }] : opp.status === 'LOST' ? [{ label: 'Lost', color: '#EF4444' }] : []}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </KanbanBoard>
        ) : (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Opportunity</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/crm/opportunities/${opp.id}`} className="text-sm font-semibold text-[#E03B12] hover:underline">
                        {opp.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{opp.lead?.company || opp.lead?.name}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(opp.value, opp.currency)}</td>
                    <td className="px-6 py-4 text-xs font-medium uppercase text-gray-500">
                      {opp.stage.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{opp.probability || 0}%</span>
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className="bg-[#E03B12] h-1.5 rounded-full" style={{ width: `${opp.probability || 0}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
