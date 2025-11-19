'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  assignedTo?: string;
  outcome?: string;
  createdAt: string;
  lead?: {
    id: number;
    name: string;
    company?: string;
  };
  opportunity?: {
    id: number;
    name: string;
    value: string;
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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'upcoming'>('upcoming');

  useEffect(() => {
    fetchActivities();
  }, [filterType, filterStatus]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterStatus) params.append('status', filterStatus);
      params.append('limit', '100');

      const response = await fetch(`/api/activities?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setActivities(data.activities);
      } else {
        setError(data.error || 'Failed to fetch activities');
      }
    } catch (err) {
      setError('Failed to fetch activities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isUpcoming = (activity: Activity) => {
    const scheduledDate = new Date(activity.scheduledFor);
    const now = new Date();
    return scheduledDate > now && activity.status === 'PENDING';
  };

  const isPastDue = (activity: Activity) => {
    const scheduledDate = new Date(activity.scheduledFor);
    const now = new Date();
    return scheduledDate < now && activity.status === 'PENDING';
  };

  const filteredActivities = viewMode === 'upcoming'
    ? activities.filter(a => isUpcoming(a) || isPastDue(a))
    : activities;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track calls, meetings, tasks, and follow-ups
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Toggle & Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View
              </label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'list' | 'upcoming')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Upcoming & Overdue</option>
                <option value="list">All Activities</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {activityStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Total Activities</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{activities.length}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Upcoming</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {activities.filter(a => isUpcoming(a)).length}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Past Due</div>
            <div className="mt-2 text-3xl font-bold text-red-600">
              {activities.filter(a => isPastDue(a)).length}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {activities.filter(a => a.status === 'COMPLETED').length}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500">No activities found</p>
          </div>
        ) : (
          /* Activities List */
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-6 hover:bg-gray-50 ${
                    isPastDue(activity) ? 'bg-red-50 border-l-4 border-red-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[activity.type]}`}>
                          {activity.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[activity.status]}`}>
                          {activity.status}
                        </span>
                        {isPastDue(activity) && (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{activity.subject}</h3>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDateTime(activity.scheduledFor)}</span>
                        </div>
                        {activity.duration && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{activity.duration} min</span>
                          </div>
                        )}
                        {activity.location && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{activity.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        {activity.lead && (
                          <Link
                            href={`/admin/leads/${activity.lead.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Lead: {activity.lead.name}
                          </Link>
                        )}
                        {activity.opportunity && (
                          <Link
                            href={`/admin/opportunities/${activity.opportunity.id}`}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            Opportunity: {activity.opportunity.name}
                          </Link>
                        )}
                      </div>
                      {activity.assignedTo && (
                        <div className="mt-2 text-sm text-gray-500">
                          Assigned to: {activity.assignedTo}
                        </div>
                      )}
                      {activity.outcome && activity.status === 'COMPLETED' && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <strong>Outcome:</strong> {activity.outcome}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
