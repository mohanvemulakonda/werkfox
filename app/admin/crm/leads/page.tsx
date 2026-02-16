'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';
import KanbanBoard from '../../components/KanbanBoard';
import KanbanCard from '../../components/KanbanCard';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  city?: string;
  state?: string;
  leadScore?: number;
  stage: string;
  status: string;
  assignedTo?: string;
  nextFollowUp?: string;
  lastContacted?: string;
  createdAt: string;
}

const STAGES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('kanban');

  useEffect(() => {
    fetchLeads();
  }, [searchQuery]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/leads?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads);
      } else {
        setError(data.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError('Failed to fetch leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const leadsByStage = useMemo(() => {
    const grouped: Record<string, Lead[]> = {};
    STAGES.forEach(stage => grouped[stage] = []);
    leads.forEach(lead => {
      if (grouped[lead.stage]) {
        grouped[lead.stage].push(lead);
      } else {
        // Fallback for unexpected stages
        if (!grouped['NEW']) grouped['NEW'] = [];
        grouped['NEW'].push(lead);
      }
    });
    return grouped;
  }, [leads]);

  const kanbanColumns = STAGES.map(stage => ({
    id: stage,
    title: stage.replace('_', ' '),
    count: leadsByStage[stage]?.length || 0,
    aggregate: '' // Dynamic aggregates could be added if lead value was present
  }));

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
            href="/admin/crm/leads/create"
            className="admin-btn admin-btn-primary"
          >
            + New Lead
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
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No leads found.</div>
        ) : view === 'kanban' ? (
          <KanbanBoard columns={kanbanColumns}>
            {STAGES.map(stage => (
              <div key={stage} className="flex flex-col gap-2">
                {leadsByStage[stage]?.map(lead => (
                  <Link href={`/admin/crm/leads/${lead.id}`} key={lead.id} className="no-underline">
                    <KanbanCard
                      title={lead.name}
                      subtitle={lead.company}
                      initials={lead.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      priority={lead.leadScore ? Math.min(3, Math.floor(lead.leadScore / 33)) : 0}
                      tags={lead.status === 'ACTIVE' ? [{ label: 'Active', color: '#10B981' }] : []}
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#fbfbfb] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/crm/leads/${lead.id}`} className="text-sm font-semibold text-[#E03B12] hover:underline">
                        {lead.name}
                      </Link>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{lead.company || '—'}</td>
                    <td className="px-6 py-4 text-xs font-medium uppercase text-gray-500">
                      {lead.stage.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${lead.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                        }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{lead.leadScore || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.createdAt)}</td>
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
