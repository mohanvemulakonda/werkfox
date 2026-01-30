'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdminHeader({ user, organizations = [], currentOrg = null }: { user?: any; organizations?: any[]; currentOrg?: any }) {
  const displayUser = user || {
    name: 'Demo User',
    email: 'demo@werkfox.com'
  };

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="admin-logo-link">
            <Image
              src="/logo.png"
              alt="WerkFox"
              width={40}
              height={40}
            />
            <div>
              <h1 className="admin-title">WerkFox Admin</h1>
              <p className="admin-subtitle">Dashboard & Management</p>
            </div>
          </Link>

          {/* Organization Switcher */}
          <div className="admin-org-switcher hidden md:block">
            <details className="relative">
              <summary className="admin-org-trigger cursor-pointer">
                {currentOrg ? currentOrg.name : 'No Organization'}
              </summary>
              <div className="admin-org-dropdown">
                {organizations && organizations.length > 0 ? (
                  organizations.map((o) => (
                    <div key={o.id} className="admin-org-item">
                      <div>
                        <div className="text-sm font-medium">{o.name}</div>
                        <div className="text-xs text-gray-500">{o.slug} — {o.role}</div>
                      </div>
                      <button
                        onClick={async () => {
                          await fetch('/api/admin/organizations/switch', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ organizationId: o.id })
                          });
                          window.location.href = '/admin';
                        }}
                        className="admin-btn admin-btn-primary text-xs py-1 px-2"
                      >
                        Switch
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 p-2">No organizations</div>
                )}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <Link href="/admin/organizations/select" className="admin-table-link text-sm">
                    Manage organizations
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="admin-user-info">
            <p className="admin-user-name">{displayUser?.name}</p>
            <p className="admin-user-email">{displayUser?.email}</p>
          </div>
          <Link href="/">
            <button className="admin-btn admin-btn-secondary">
              Exit Demo
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
