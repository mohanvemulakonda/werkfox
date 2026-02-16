'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const activityTypes = ['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'DEMO', 'FOLLOW_UP'];
const activityStatuses = ['PENDING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'];

interface Lead {
    id: number;
    name: string;
    company?: string;
}

interface Opportunity {
    id: number;
    name: string;
    lead: {
        name: string;
    };
}

export default function CreateActivityPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedLeadId = searchParams.get('leadId') || '';
    const preselectedOppId = searchParams.get('opportunityId') || '';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [leads, setLeads] = useState<Lead[]>([]);
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loadingRel, setLoadingRel] = useState(true);

    const [formData, setFormData] = useState({
        type: 'CALL',
        subject: '',
        description: '',
        leadId: preselectedLeadId,
        opportunityId: preselectedOppId,
        status: 'PENDING',
        scheduledFor: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm
        duration: 30, // minutes
        location: '',
        assignedTo: '',
        attendees: '',
        outcome: '',
    });

    useEffect(() => {
        fetchRelations();
    }, []);

    const fetchRelations = async () => {
        try {
            setLoadingRel(true);
            const [leadsRes, oppsRes] = await Promise.all([
                fetch('/api/leads?limit=100'),
                fetch('/api/opportunities?limit=100')
            ]);

            if (leadsRes.ok) {
                const data = await leadsRes.json();
                setLeads(data.leads);
            }

            if (oppsRes.ok) {
                const data = await oppsRes.json();
                setOpportunities(data.opportunities);
            }
        } catch (err) {
            console.error('Error fetching relations:', err);
        } finally {
            setLoadingRel(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.leadId && !formData.opportunityId) {
            setError('Please link this activity to at least one Lead or Opportunity.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    leadId: formData.leadId ? parseInt(formData.leadId) : null,
                    opportunityId: formData.opportunityId ? parseInt(formData.opportunityId) : null,
                    duration: parseInt(formData.duration.toString()),
                    attendees: formData.attendees || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/admin/crm/activities/${data.id}`);
            } else {
                setError(data.error || 'Failed to create activity');
            }
        } catch (err) {
            setError('Failed to create activity');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Log Activity</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Record a call, meeting, or task
                            </p>
                        </div>
                        <Link
                            href="/admin/crm/activities"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            ← Back to Activities
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type & Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Activity Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                {activityTypes.map(type => (
                                    <option key={type} value={type}>{type.replace('_', ' ')}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                {activityStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subject */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Discovery Call with Client"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Date & Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="scheduledFor"
                                value={formData.scheduledFor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="0"
                                step="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Relations */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Related Lead
                            </label>
                            <select
                                name="leadId"
                                value={formData.leadId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">None</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>
                                        {lead.name} {lead.company ? `(${lead.company})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Related Opportunity
                            </label>
                            <select
                                name="opportunityId"
                                value={formData.opportunityId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">None</option>
                                {opportunities.map(opp => (
                                    <option key={opp.id} value={opp.id}>
                                        {opp.name} ({opp.lead?.name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Location & Assignment */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location / Link
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., Google Meet Link or Office"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assigned To
                                </label>
                                <input
                                    type="text"
                                    name="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                    placeholder="Email of team member"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attendees
                                </label>
                                <input
                                    type="text"
                                    name="attendees"
                                    value={formData.attendees}
                                    onChange={handleChange}
                                    placeholder="Comma-separated emails of attendees"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description / Notes
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Outcome (only if completed) */}
                        {formData.status === 'COMPLETED' && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Outcome / Result
                                </label>
                                <textarea
                                    name="outcome"
                                    value={formData.outcome}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="What was the result of this activity?"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Link
                            href="/admin/crm/activities"
                            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Activity'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
