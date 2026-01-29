'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const navigation = [
    { name: 'Modules', href: '/modules' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const solutions = [
    { name: 'Manufacturing', href: '/solutions/manufacturing', desc: 'Production, BOM & inventory' },
    { name: 'Wholesale & Distribution', href: '/solutions/wholesale', desc: 'Supply chain & logistics' },
    { name: 'Retail & E-commerce', href: '/solutions/retail', desc: 'POS & omnichannel' },
    { name: 'Food & Beverage', href: '/solutions/food', desc: 'Batch tracking & compliance' },
    { name: 'Automotive & Parts', href: '/solutions/automotive', desc: 'Spare parts & service' },
    { name: 'Textiles & Apparel', href: '/solutions/textiles', desc: 'Size/color matrix & jobwork' },
  ];

  return (
    <header className="header-glass fixed top-[36px] left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/fox-icon.svg"
              alt="WerkFox"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-[15px] font-medium text-[#1d1d1f] tracking-tight">WerkFox</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="nav-link px-4 py-2 flex items-center gap-1">
                Solutions
                <svg className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#d2d2d7]/50 p-2 min-w-[280px]">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col px-4 py-3 rounded-xl hover:bg-[#f5f5f7] transition-colors"
                      >
                        <span className="text-sm font-medium text-[#1d1d1f]">{item.name}</span>
                        <span className="text-xs text-[#86868b]">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link px-4 py-2"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/sign-up" className="header-cta ml-4">
              Start Free Trial
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {!mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#d2d2d7]/50">
            <div className="flex flex-col gap-1">
              {/* Mobile Solutions Section */}
              <div className="px-4 py-2">
                <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">Solutions</span>
              </div>
              {solutions.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2.5 text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-[#d2d2d7]/50 my-2" />

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link px-4 py-2.5 rounded-lg hover:bg-[#f5f5f7]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/sign-up"
                className="cta-button mt-3 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
