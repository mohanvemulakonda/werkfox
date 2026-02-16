'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavProps {
    items: { name: string; href: string }[];
}

export default function SubNav({ items }: SubNavProps) {
    const pathname = usePathname();

    const isActive = (href: string, index: number) => {
        // For the first item (usually "Overview"), use exact match
        if (index === 0) return pathname === href;
        // For other items, use startsWith
        return pathname.startsWith(href);
    };

    return (
        <nav className="subnav">
            <div className="subnav-items">
                {items.map((item, index) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`subnav-item ${isActive(item.href, index) ? 'active' : ''}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
