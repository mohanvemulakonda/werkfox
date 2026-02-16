'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';

interface TopBarProps {
    user: { id: string; name: string; email: string; image?: string };
    organizations: { id: number; name: string; slug: string; role: string }[];
    currentOrg: { id: number; name: string; slug: string } | null;
}

export default function TopBar({ user, organizations = [], currentOrg = null }: TopBarProps) {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const orgRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (orgRef.current && !orgRef.current.contains(e.target as Node)) setOrgDropdownOpen(false);
            if (userRef.current && !userRef.current.contains(e.target as Node)) setUserDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const modules = [
        { name: 'CRM', href: '/admin/crm' },
        { name: 'ERP', href: '/admin/erp' },
    ];

    const isModuleActive = (href: string) => pathname.startsWith(href);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleOrgSwitch = async (orgId: number) => {
        await fetch('/api/admin/organizations/switch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ organizationId: orgId }),
        });
        window.location.href = '/admin';
    };

    return (
        <header className="topbar">
            {/* Logo */}
            <Link href="/admin" className="topbar-logo">
                <Image src="/logo.png" alt="WerkFox" width={28} height={28} />
                <span className="topbar-brand">
                    <span className="topbar-brand-werk">Werk</span>
                    <span className="topbar-brand-fox">Fox</span>
                </span>
            </Link>

            <div className="topbar-divider" />

            {/* Module Tabs */}
            <nav className="topbar-tabs">
                {modules.map((mod) => (
                    <Link
                        key={mod.name}
                        href={mod.href}
                        className={`topbar-tab ${isModuleActive(mod.href) ? 'active' : ''}`}
                    >
                        {mod.name}
                    </Link>
                ))}
            </nav>

            <div className="topbar-spacer" />

            {/* Org Switcher */}
            {organizations.length > 0 && (
                <div className="topbar-dropdown" ref={orgRef}>
                    <button
                        className="topbar-org-trigger"
                        onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                    >
                        {currentOrg ? currentOrg.name : 'No Organization'}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {orgDropdownOpen && (
                        <div className="topbar-dropdown-menu topbar-dropdown-right">
                            {organizations.map((org) => (
                                <button
                                    key={org.id}
                                    className={`topbar-dropdown-item ${currentOrg?.id === org.id ? 'active' : ''}`}
                                    onClick={() => { handleOrgSwitch(org.id); setOrgDropdownOpen(false); }}
                                >
                                    <div>
                                        <div className="topbar-dropdown-item-name">{org.name}</div>
                                        <div className="topbar-dropdown-item-meta">{org.slug} — {org.role}</div>
                                    </div>
                                    {currentOrg?.id === org.id && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Notifications */}
            <button className="topbar-icon" title="Notifications">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
            </button>

            {/* Settings */}
            <Link href="/admin/settings" className="topbar-icon" title="Settings">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </Link>

            {/* User Avatar + Dropdown */}
            <div className="topbar-dropdown" ref={userRef}>
                <button
                    className="topbar-avatar"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    title={user.name}
                >
                    {user.image ? (
                        <Image src={user.image} alt={user.name} width={28} height={28} className="topbar-avatar-img" />
                    ) : (
                        getInitials(user.name)
                    )}
                </button>
                {userDropdownOpen && (
                    <div className="topbar-dropdown-menu topbar-dropdown-right">
                        <div className="topbar-dropdown-header">
                            <div className="topbar-dropdown-item-name">{user.name}</div>
                            <div className="topbar-dropdown-item-meta">{user.email}</div>
                        </div>
                        <div className="topbar-dropdown-divider" />
                        <Link href="/admin/settings" className="topbar-dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                            Settings
                        </Link>
                        <button
                            className="topbar-dropdown-item topbar-dropdown-danger"
                            onClick={() => signOut({ redirectUrl: '/' })}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
