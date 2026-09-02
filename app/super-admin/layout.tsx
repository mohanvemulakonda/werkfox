'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const navigation = [
  { name: 'Overview', href: '/super-admin' },
  { name: 'Organizations', href: '/super-admin/organizations' },
  { name: 'Users', href: '/super-admin/users' },
  { name: 'Login Attempts', href: '/super-admin/login-attempts' },
  { name: 'Settings', href: '/super-admin/settings' },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (data.user?.role !== 'SUPER_ADMIN') {
          router.push('/admin');
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f7' }}>
        <p style={{ color: '#86868b' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      {/* Warning banner */}
      <div style={{ background: '#1d1d1f', color: 'white', padding: '6px 16px', fontSize: '12px', textAlign: 'center', fontWeight: 500 }}>
        🔒 Super Admin — Platform Management
      </div>

      {/* Top bar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e5ea', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image src="/logo.png" alt="WerkFox" width={28} height={28} />
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f' }}>
            Werk<span style={{ color: '#E03B12' }}>Fox</span>
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#86868b', background: '#f5f5f7', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
            SUPER ADMIN
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#86868b' }}>{user?.name}</span>
          <Link href="/admin" style={{ fontSize: '13px', color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to Dashboard
          </Link>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/login');
            }}
            style={{ fontSize: '13px', color: '#86868b', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: '220px', background: 'white', borderRight: '1px solid #e5e5ea', minHeight: 'calc(100vh - 90px)', padding: '12px 8px' }}>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/super-admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#E03B12' : '#6E6E73',
                  background: isActive ? '#FEF2F2' : 'transparent',
                  textDecoration: 'none',
                  marginBottom: '2px',
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: '24px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
