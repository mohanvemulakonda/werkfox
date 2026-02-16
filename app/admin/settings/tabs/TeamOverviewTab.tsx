'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TeamStats {
  department: string;
  count: number;
}

interface RoleStats {
  role: string;
  count: number;
}

export default function TeamOverviewTab() {
  const [departmentStats, setDepartmentStats] = useState<TeamStats[]>([]);
  const [roleStats, setRoleStats] = useState<RoleStats[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  async function fetchTeamData() {
    try {
      const res = await fetch('/api/admin-users?isActive=true');
      if (res.ok) {
        const data = await res.json();
        const users = data.users || [];
        setTotalMembers(users.length);

        // Group by department
        const deptMap: Record<string, number> = {};
        const roleMap: Record<string, number> = {};
        users.forEach((u: { department?: string; role: string }) => {
          const dept = u.department || 'Unassigned';
          deptMap[dept] = (deptMap[dept] || 0) + 1;
          roleMap[u.role] = (roleMap[u.role] || 0) + 1;
        });

        setDepartmentStats(
          Object.entries(deptMap)
            .map(([department, count]) => ({ department, count }))
            .sort((a, b) => b.count - a.count)
        );
        setRoleStats(
          Object.entries(roleMap)
            .map(([role, count]) => ({ role, count }))
            .sort((a, b) => b.count - a.count)
        );
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const DEPT_COLORS: Record<string, string> = {
    Sales: 'bg-blue-100 text-blue-800 border-blue-200',
    Marketing: 'bg-purple-100 text-purple-800 border-purple-200',
    Finance: 'bg-green-100 text-green-800 border-green-200',
    Support: 'bg-amber-100 text-amber-800 border-amber-200',
    Engineering: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Unassigned: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Team Overview</h2>
            <p className="text-sm text-gray-500">{totalMembers} active team members</p>
          </div>
          <Link
            href="/admin/team"
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50"
          >
            Manage Team
          </Link>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentStats.map(({ department, count }) => {
            const colorClass = DEPT_COLORS[department] || DEPT_COLORS.Unassigned;
            return (
              <Link
                key={department}
                href={`/admin/team?department=${encodeURIComponent(department)}`}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${colorClass}`}
              >
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm font-medium mt-1">{department}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Role Distribution</h2>
        <div className="space-y-3">
          {roleStats.map(({ role, count }) => {
            const pct = totalMembers > 0 ? (count / totalMembers) * 100 : 0;
            return (
              <div key={role} className="flex items-center gap-4">
                <span className="text-sm text-gray-700 w-32 font-medium">
                  {role.replace(/_/g, ' ')}
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${Math.max(pct, 4)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
