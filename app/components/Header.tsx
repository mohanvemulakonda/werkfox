'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="header-container">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Livato Logo.png"
              alt="Livato Solutions Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight font-open-sans">
                LIVATO SOLUTIONS
              </span>
              <span className="text-xs font-semibold text-gray-600 tracking-wide font-inter">
                Inspire. Innovate
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link font-inter"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors font-inter shadow-lg shadow-blue-600/30">
              GET STARTED
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {!mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link px-4 py-3 rounded-lg hover:bg-gray-50 font-inter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors font-inter shadow-lg shadow-blue-600/30 mt-2 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                GET STARTED
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
