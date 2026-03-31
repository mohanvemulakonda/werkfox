'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '../../../components/StatusBar';
import Sheet from '../../../components/Sheet';
import Chatter from '../../../components/Chatter';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  billingAddress?: string;
  shippingAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  gstNumber?: string;
  gstType?: string;
  source?: string;
  industry?: string;
  leadScore?: number;
  stage: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  nextFollowUp?: string;
  lastContacted?: string;
  createdAt: string;
  updatedAt: string;
  activities: any[];
}

const STAGES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST'];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  const fetchLead = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/leads/${leadId}`);
      const data = await response.json();
      if (response.ok) {
        setLead(data);
        setFormData(data);
      } else {
        setError(data.error || 'Failed to fetch lead');
      }
    } catch (err) {
      setError('Failed to fetch lead');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError('');
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setLead(data);
        setFormData(data);
        setEditing(false);
      } else {
        setError(data.error || 'Failed to update lead');
      }
    } catch (err) {
      setError('Failed to update lead');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToOpportunity = async () => {
    setConverting(true);
    setError('');
    try {
      const response = await fetch(`/api/leads/${leadId}/convert-to-opportunity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Conversion failed');
      router.push(`/admin/crm/opportunities/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setConverting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const response = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      if (response.ok) router.push('/admin/crm/leads');
      else setError('Failed to delete lead');
    } catch (err) {
      setError('Failed to delete lead');
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
      status: lead?.stage === stage ? 'current' as const :
        STAGES.indexOf(lead?.stage || '') > STAGES.indexOf(stage) ? 'completed' as const : 'pending' as const
    }));
  }, [lead?.stage]);

  const chatterActivities = useMemo(() => {
    return (lead?.activities || []).map((a: any) => ({
      id: a.id.toString(),
      author: a.user?.name || 'System',
      initials: (a.user?.name || 'SY').split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2),
      time: new Date(a.createdAt).toLocaleString(),
      text: a.subject || a.description || 'Activity logged',
      type: a.type === 'EMAIL' ? 'email' as const : a.type === 'NOTE' ? 'note' as const : 'system' as const
    })).reverse();
  }, [lead?.activities]);

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>;
  if (!lead) return <div className="p-8 text-center text-red-600">{error || 'Lead not found'}</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#f5f5f7]">
      <StatusBar
        actions={
          <div className="flex gap-2">
            {!editing ? (
              <>
                {lead.status !== 'CONVERTED' && lead.stage !== 'WON' && lead.stage !== 'LOST' && (
                  <button
                    onClick={handleConvertToOpportunity}
                    disabled={converting}
                    className="admin-btn admin-btn-primary"
                  >
                    {converting ? 'Converting...' : 'Convert to Opportunity'}
                  </button>
                )}
                <button onClick={() => setEditing(true)} className="admin-btn admin-btn-secondary">Edit</button>
                <button onClick={handleDelete} className="admin-btn admin-btn-danger">Delete</button>
              </>
            ) : (
              <>
                <button onClick={handleUpdate} disabled={saving} className="admin-btn admin-btn-primary">{saving ? 'Saving...' : 'Save'}</button>
                <button onClick={() => { setEditing(false); setFormData(lead); }} className="admin-btn admin-btn-secondary">Cancel</button>
              </>
            )}
            <Link href="/admin/crm/leads" className="admin-btn admin-btn-ghost">← Back</Link>
          </div>
        }
        steps={statusSteps}
      />

      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-auto py-8 px-4">
        <Sheet>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {editing ? (
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-[#E03B12] focus:outline-none"
                  placeholder="Lead Name"
                />
              ) : lead.name}
            </h1>
            <p className="text-lg text-[#E03B12] font-medium mt-1">
              {editing ? (
                <input
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm py-1"
                  placeholder="Company Name"
                />
              ) : lead.company || 'Private Lead'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                {editing ? (
                  <input name="email" value={formData.email || ''} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <a href={`mailto:${lead.email}`} className="text-sm font-semibold text-[#E03B12] hover:underline underline-offset-4">{lead.email}</a>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Phone Number</label>
                {editing ? (
                  <input name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="text-sm font-semibold">{lead.phone || '—'}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Office Location</label>
                {editing ? (
                  <div className="flex gap-2">
                    <input name="city" placeholder="City" value={formData.city || ''} onChange={handleChange} className="w-1/2 p-2 border border-gray-200 rounded text-sm" />
                    <input name="state" placeholder="State" value={formData.state || ''} onChange={handleChange} className="w-1/2 p-2 border border-gray-200 rounded text-sm" />
                  </div>
                ) : (
                  <div className="text-sm font-semibold">{lead.city && lead.state ? `${lead.city}, ${lead.state}` : lead.city || lead.state || '—'}</div>
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
                  <div className="text-sm font-bold">{lead.stage.replace('_', ' ')}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Lead Score (0-100)</label>
                {editing ? (
                  <input name="leadScore" type="number" value={formData.leadScore || 0} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold">{lead.leadScore || 0}%</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[100px]">
                      <div className="bg-[#E03B12] h-1.5 rounded-full" style={{ width: `${lead.leadScore || 0}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Industry</label>
                {editing ? (
                  <input name="industry" value={formData.industry || ''} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded text-sm" />
                ) : (
                  <div className="text-sm font-semibold">{lead.industry || '—'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Internal Notes</label>
            {editing ? (
              <textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-[#E03B12] outline-none" placeholder="Add detailed notes about the customer requirements..." />
            ) : (
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{lead.notes || 'No specialized requirements recorded yet.'}</div>
            )}
          </div>
        </Sheet>

        <Chatter activities={chatterActivities} />
      </div>
    </div>
  );
}
