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
    { name: 'MATERIALS', href: '/materials' },
    { name: 'LABEL DESIGNER', href: '/label-designer' },
    { name: 'DOWNLOADS', href: '/downloads' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="header-container">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white py-2.5 px-4 border-b border-gray-800">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-sm">
          <a href="tel:+918008413800" className="flex items-center gap-2 hover:text-gray-300 transition-colors font-light tracking-wide">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-xs">+91-8008413800</span>
          </a>
          <a href="mailto:info@livatosolutions.com" className="flex items-center gap-2 hover:text-gray-300 transition-colors font-light tracking-wide">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">info@livatosolutions.com</span>
          </a>
        </div>
      </div>

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
                Innovate. Inspire. Transform.
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link font-inter"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="group relative px-5 py-2 bg-gray-900 text-white overflow-hidden ml-2">
              <span className="relative z-10 text-xs tracking-wide">Get in Touch</span>
              <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>

          <button
            type="button"
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {!mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-gray-200">
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
                GET IN TOUCH
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
