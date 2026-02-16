'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Activity {
    id: number;
    type: string;
    subject: string;
    description?: string;
    status: string;
    scheduledFor: string;
    completedAt?: string;
    duration?: number;
    location?: string;
    attendees?: string;
    outcome?: string;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    lead?: {
        id: number;
        name: string;
        email: string;
        company?: string;
        phone?: string;
    };
    opportunity?: {
        id: number;
        name: string;
        value: string;
        currency: string;
        stage: string;
    };
}

const activityTypes = ['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'DEMO', 'FOLLOW_UP'];
const activityStatuses = ['PENDING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'];

const typeColors: Record<string, string> = {
    CALL: 'bg-blue-100 text-blue-800',
    EMAIL: 'bg-purple-100 text-purple-800',
    MEETING: 'bg-green-100 text-green-800',
    TASK: 'bg-yellow-100 text-yellow-800',
    NOTE: 'bg-gray-100 text-gray-800',
    DEMO: 'bg-indigo-100 text-indigo-800',
    FOLLOW_UP: 'bg-pink-100 text-pink-800',
};

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    RESCHEDULED: 'bg-blue-100 text-blue-800',
};

export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const activityId = params.id as string;

    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Activity>>({});

    useEffect(() => {
        fetchActivity();
    }, [activityId]);

    const fetchActivity = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/activities/${activityId}`);
            const data = await response.json();

            if (response.ok) {
                setActivity(data);
                setFormData(data);
            } else {
                setError(data.error || 'Failed to fetch activity');
            }
        } catch (err) {
            setError('Failed to fetch activity');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            setSaving(true);
            setError('');

            const response = await fetch(`/api/activities/${activityId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: formData.type,
                    subject: formData.subject,
                    description: formData.description,
                    status: formData.status,
                    scheduledFor: formData.scheduledFor,
                    duration: formData.duration ? parseInt(formData.duration.toString()) : undefined,
                    location: formData.location,
                    attendees: formData.attendees,
                    outcome: formData.outcome,
                    assignedTo: formData.assignedTo,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setActivity(data);
                setFormData(data);
                setEditing(false);
            } else {
                setError(data.error || 'Failed to update activity');
            }
        } catch (err) {
            setError('Failed to update activity');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this activity? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/activities/${activityId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/admin/crm/activities');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete activity');
            }
        } catch (err) {
            setError('Failed to delete activity');
            console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (value: string, currency: string = 'INR') => {
        const num = parseFloat(value);
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(num);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && !activity) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link href="/admin/crm/activities" className="text-blue-600 hover:underline">
                        ← Back to Activities
                    </Link>
                </div>
            </div>
        );
    }

    if (!activity) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{activity.subject}</h1>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${typeColors[activity.type] || 'bg-gray-100 text-gray-800'}`}>
                                    {activity.type.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[activity.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {activity.status}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {formatDate(activity.scheduledFor)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/admin/crm/activities"
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                ← Back
                            </Link>
                            {!editing ? (
                                <>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setFormData(activity);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={saving}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Activity Details Card */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Details</h2>
                            {editing ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <select
                                                name="type"
                                                value={formData.type || ''}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                {activityTypes.map(type => (
                                                    <option key={type} value={type}>{type.replace('_', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled For</label>
                                            <input
                                                type="datetime-local"
                                                name="scheduledFor"
                                                value={formData.scheduledFor?.slice(0, 16) || ''}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description || ''}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                value={formData.duration || ''}
                                                onChange={handleChange}
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location || ''}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                                        <input
                                            type="text"
                                            name="attendees"
                                            value={formData.attendees || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                                    <div className="md:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{activity.description || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Scheduled For</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(activity.scheduledFor)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Duration</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.duration ? `${activity.duration} mins` : 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.location || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Attendees</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.attendees || 'N/A'}</dd>
                                    </div>
                                </dl>
                            )}
                        </div>

                        {/* Linked Lead Card */}
                        {activity.lead && (
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Linked Lead</h2>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.lead.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.lead.email}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.lead.company || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.lead.phone || 'N/A'}</dd>
                                    </div>
                                </dl>
                                <div className="mt-4">
                                    <Link
                                        href={`/admin/crm/leads/${activity.lead.id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Lead Details →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Linked Opportunity Card */}
                        {activity.opportunity && (
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Linked Opportunity</h2>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.opportunity.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Stage</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[activity.opportunity.stage] || 'bg-gray-100 text-gray-800'}`}>
                                                {activity.opportunity.stage.replace('_', ' ')}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Value</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(activity.opportunity.value, activity.opportunity.currency)}</dd>
                                    </div>
                                </dl>
                                <div className="mt-4">
                                    <Link
                                        href={`/admin/crm/opportunities/${activity.opportunity.id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Opportunity →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Status & Assignment Card */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status & Assignment</h2>
                            {editing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            {activityStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                                        <input
                                            type="text"
                                            name="assignedTo"
                                            value={formData.assignedTo || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.status}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{activity.assignedTo || 'Unassigned'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(activity.createdAt)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(activity.updatedAt)}</dd>
                                    </div>
                                    {activity.completedAt && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Completed At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{formatDate(activity.completedAt)}</dd>
                                        </div>
                                    )}
                                </dl>
                            )}
                        </div>

                        {/* Outcome Card */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Outcome</h2>
                            {editing ? (
                                <div>
                                    <textarea
                                        name="outcome"
                                        value={formData.outcome || ''}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Record the outcome of this activity..."
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                    {activity.outcome || 'No outcome recorded'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
