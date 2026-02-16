'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FilterBar from '../../components/FilterBar';

interface Activity {
  id: number;
  type: string;
  subject: string;
  description?: string;
  status: string;
  scheduledFor: string;
  lead?: { name: string };
  opportunity?: { name: string };
}

const TYPE_COLORS: Record<string, string> = {
  CALL: '#3B82F6',
  EMAIL: '#8B5CF6',
  MEETING: '#10B981',
  TASK: '#F59E0B',
  FOLLOW_UP: '#EC4899',
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'kanban' | 'calendar'>('list');

  useEffect(() => {
    fetchActivities();
  }, [searchQuery]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      const response = await fetch(`/api/activities?${params.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setActivities(data.activities);
      } else {
        setError(data.error || 'Failed to fetch activities');
      }
    } catch (err) {
      setError('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
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
            href="/admin/crm/activities/create"
            className="admin-btn admin-btn-primary"
          >
            + Log Activity
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : activities.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No activities recorded.</div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: TYPE_COLORS[activity.type] || '#6B7280' }}>
                  {activity.type[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Link href={`/admin/crm/activities/${activity.id}`} className="text-sm font-bold text-gray-900 hover:text-[#E03B12] truncate">
                      {activity.subject}
                    </Link>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${activity.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1 font-medium">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {new Date(activity.scheduledFor).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    {activity.lead && (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        {activity.lead.name}
                      </span>
                    )}
                    {activity.opportunity && (
                      <span className="flex items-center gap-1 text-purple-600 font-medium">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        {activity.opportunity.name}
                      </span>
                    )}
                  </div>
                  {activity.description && (
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2 italic">"{activity.description}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
