'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '../../../components/StatusBar';
import Sheet from '../../../components/Sheet';
import Chatter from '../../../components/Chatter';

interface Opportunity {
  id: number;
  name: string;
  description?: string;
  value: string;
  currency: string;
  probability?: number;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  stage: string;
  status: string;
  lostReason?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lead: {
    id: number;
    name: string;
    email: string;
    company?: string;
  };
  activities: any[];
}

const STAGES = ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const oppId = params.id as string;

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Opportunity>>({});

  useEffect(() => {
    fetchOpportunity();
  }, [oppId]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/opportunities/${oppId}`);
      const data = await response.json();
      if (response.ok) {
        setOpp(data);
        setFormData(data);
      } else {
        setError(data.error || 'Failed to fetch opportunity');
      }
    } catch (err) {
      setError('Failed to fetch opportunity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError('');
      const response = await fetch(`/api/opportunities/${oppId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setOpp(data);
        setFormData(data);
        setEditing(false);
      } else {
        setError(data.error || 'Failed to update opportunity');
      }
    } catch (err) {
      setError('Failed to update opportunity');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    try {
      const response = await fetch(`/api/opportunities/${oppId}`, { method: 'DELETE' });
      if (response.ok) router.push('/admin/crm/opportunities');
      else setError('Failed to delete opportunity');
    } catch (err) {
      setError('Failed to delete opportunity');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const statusSteps = useMemo(() => {
    return STAGES.map(stage => ({
      id: stage,
      label: stage.replace('_', ' '),
      status: opp?.stage === stage ? 'current' as const :
        STAGES.indexOf(opp?.stage || '') > STAGES.indexOf(stage) ? 'completed' as const : 'pending' as const
    }));
  }, [opp?.stage]);

  const chatterActivities = useMemo(() => {
    return (opp?.activities || []).map((a: any) => ({
      id: a.id.toString(),
      author: a.user?.name || 'System',
      initials: (a.user?.name || 'SY').split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2),
      time: new Date(a.createdAt).toLocaleString(),
      text: a.subject || a.description || 'Activity logged',
      type: a.type === 'EMAIL' ? 'email' as const : a.type === 'NOTE' ? 'note' as const : 'system' as const
    })).reverse();
  }, [opp?.activities]);

  const formatCurrency = (value: string, currency: string = 'INR') => {
    const num = parseFloat(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>;
  if (!opp) return <div className="p-8 text-center text-red-600">{error || 'Opportunity not found'}</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <StatusBar
        actions={
          <div className="flex gap-2">
            {!editing ? (
              <>
                <button onClick={() => setEditing(true)} className="admin-btn admin-btn-primary">Edit</button>
                <button onClick={handleDelete} className="admin-btn admin-btn-danger">Delete</button>
              </>
            ) : (
              <>
                <button onClick={handleUpdate} disabled={saving} className="admin-btn admin-btn-primary">{saving ? 'Saving...' : 'Save'}</button>
                <button onClick={() => { setEditing(false); setFormData(opp); }} className="admin-btn admin-btn-secondary">Cancel</button>
              </>
            )}
            <Link href="/admin/crm/opportunities" className="admin-btn admin-btn-ghost">← Pipeline</Link>
          </div>
        }
        steps={statusSteps}
      />

      <div className="flex-1 overflow-auto py-8 px-4">
        <Sheet>
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {editing ? (
                    <input
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-[#E03B12] focus:outline-none"
                      placeholder="Opportunity Name"
                    />
                  ) : opp.name}
                </h1>
                <Link href={`/admin/crm/leads/${opp.lead.id}`} className="text-lg text-[#E03B12] font-medium mt-1 hover:underline">
                  {opp.lead.company || opp.lead.name}
                </Link>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Expected Revenue</div>
                <div className="text-3xl font-black text-gray-900">
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{opp.currency}</span>
                      <input
                        name="value"
                        type="number"
                        value={formData.value || ''}
                        onChange={handleChange}
                        className="w-32 bg-transparent border-b border-gray-300 text-right focus:outline-none"
                      />
                    </div>
                  ) : formatCurrency(opp.value, opp.currency)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Contact Email</label>
                <div className="text-sm font-semibold">{opp.lead.email}</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Probability (%)</label>
                {editing ? (
                  <input name="probability" type="number" value={formData.probability || 0} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold">{opp.probability || 0}%</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[100px]">
                      <div className="bg-[#E03B12] h-1.5 rounded-full" style={{ width: `${opp.probability || 0}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Expected Closing</label>
                {editing ? (
                  <input name="expectedCloseDate" type="date" value={formData.expectedCloseDate?.split('T')[0] || ''} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="text-sm font-semibold">{opp.expectedCloseDate ? new Date(opp.expectedCloseDate).toLocaleDateString() : '—'}</div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Sales Stage</label>
                {editing ? (
                  <select name="stage" value={formData.stage} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm">
                    {STAGES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                ) : (
                  <div className="text-sm font-bold">{opp.stage.replace('_', ' ')}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Assigned To</label>
                {editing ? (
                  <input name="assignedTo" value={formData.assignedTo || ''} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="text-sm font-semibold">{opp.assignedTo || 'Unassigned'}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Status</label>
                <div className={`text-sm font-bold ${opp.status === 'WON' ? 'text-green-600' : opp.status === 'LOST' ? 'text-red-600' : 'text-blue-600'}`}>
                  {opp.status}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Opportunity Description</label>
            {editing ? (
              <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-[#E03B12] outline-none" placeholder="Details about this deal..." />
            ) : (
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{opp.description || 'No specialized description recorded yet.'}</div>
            )}
          </div>
        </Sheet>

        <Chatter activities={chatterActivities} />
      </div>
    </div>
  );
}
