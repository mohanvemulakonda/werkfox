'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LOGIN_URL, SIGNUP_URL, TRADES } from '../_site/data';

/** Header of the older marketing pages. Solutions = the six industries WerkFox sets up (werkfox-app werkfox-industries.ts). */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const navigation = [
    { name: 'Apps', href: '/#apps' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Questions', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];
  const solutions = TRADES.map((t) => ({ name: t.label, href: `/#trade-${t.key}`, desc: t.example }));

  return (
    <header className="header-glass fixed top-[28px] left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="WerkFox" width={36} height={36} className="h-9 w-auto" />
            <span className="brand-word">Werk<span className="brand-fox">Fox</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
              <button className="nav-link px-4 py-2 flex items-center gap-1">
                Solutions
                <svg className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="/site-icons.svg#i-chevron-down" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="menu-pop rounded-2xl shadow-xl p-2 min-w-[280px]">
                    {solutions.map((item) => (
                      <Link key={item.name} href={item.href} className="menu-item flex flex-col px-4 py-3 rounded-xl transition-colors">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="menu-sub text-xs">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="nav-link px-4 py-2">{item.name}</Link>
            ))}
            <a href={LOGIN_URL} className="nav-link px-4 py-2">Sign in</a>
            <a href={SIGNUP_URL} className="header-cta ml-2">Try Pro free</a>
          </div>

          <button type="button" className="menu-item lg:hidden p-2 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <use href={mobileMenuOpen ? '/site-icons.svg#i-x' : '/site-icons.svg#i-menu'} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="menu-line lg:hidden py-4 border-t">
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2"><span className="menu-sub text-xs font-semibold uppercase tracking-wider">Solutions</span></div>
              {solutions.map((item) => (
                <Link key={item.name} href={item.href} className="menu-item px-4 py-2.5 text-sm rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
              ))}
              <div className="menu-line h-px border-t my-2" />
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="nav-link menu-item px-4 py-2.5 rounded-lg" onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
              ))}
              <a href={LOGIN_URL} className="nav-link menu-item px-4 py-2.5 rounded-lg">Sign in</a>
              <a href={SIGNUP_URL} className="cta-button mt-3 text-center">Try Pro free for 7 days</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
