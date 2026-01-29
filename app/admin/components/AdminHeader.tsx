'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminHeader({ user, organizations = [], currentOrg = null }: { user?: any; organizations?: any[]; currentOrg?: any }) {
  const { user: clerkUser } = useUser();

  const displayUser = user || {
    name: clerkUser?.fullName || clerkUser?.firstName || 'User',
    email: clerkUser?.emailAddresses[0]?.emailAddress || ''
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/fox-icon.svg"
              alt="WerkFox"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900 font-open-sans">WerkFox Admin</h1>
              <p className="text-xs text-gray-500 font-light font-inter">Dashboard & Management</p>
            </div>
          </Link>

          {/* Organization Switcher (client) */}
          <div className="ml-4 hidden md:block">
            <details className="relative">
              <summary className="cursor-pointer px-3 py-2 bg-gray-100 rounded">{currentOrg ? currentOrg.name : 'No Organization'}</summary>
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow z-50 p-2">
                {organizations && organizations.length > 0 ? (
                  organizations.map((o) => (
                    <div key={o.id} className="flex items-center justify-between p-2 hover:bg-gray-50">
                      <div>
                        <div className="text-sm font-medium">{o.name}</div>
                        <div className="text-xs text-gray-500">{o.slug} — {o.role}</div>
                      </div>
                      <div>
                        <button onClick={async () => {
                          await fetch('/api/admin/organizations/switch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ organizationId: o.id }) });
                          window.location.href = '/admin';
                        }} className="px-2 py-1 bg-blue-600 text-white text-sm rounded">Switch</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No organizations</div>
                )}

                <div className="mt-2">
                  <Link href="/admin/organizations/select" className="text-sm text-blue-600">Manage organizations</Link>
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 font-inter">{displayUser?.name}</p>
            <p className="text-xs text-gray-500 font-inter">{displayUser?.email}</p>
          </div>
          <SignOutButton>
            <button className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 overflow-hidden font-inter">
              <span className="relative z-10 text-sm tracking-wide">Sign Out</span>
              <div className="absolute inset-0 bg-gray-900 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </SignOutButton>
        </div>
      </div>
    </header>
  );
}
