'use client';

import { useState } from 'react';
import { LOGIN_URL, SIGNUP_URL } from './data';
import { Brand, I } from './ui';

/** werkfox.com header. On the homepage the links are anchors; on other pages they point back to the homepage. */
export default function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const at = (id: string) => (home ? `#${id}` : `/#${id}`);
  const links: [string, string][] = [
    ['Industries', at('trades')], ['Apps', at('apps')], ['GST', at('gst')], ['Pricing', home ? '#pricing' : '/pricing'], ['FAQ', at('faq')],
  ];
  return (
    <header className={`hdr-site${open ? ' open' : ''}`} id="top">
      <div className="wrap">
        <Brand href={home ? '#top' : '/'} />
        <nav className="nav" aria-label="Main">
          {links.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
        </nav>
        <div className="hdr-r">
          <a className="btn ghost sm hide-s" href={LOGIN_URL}>Sign in</a>
          <a className="btn pri sm" href={SIGNUP_URL}>Try Pro free</a>
          <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><I n="menu" /></button>
        </div>
      </div>
      <nav className="mnav" aria-label="Main (phone)">
        {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a href={LOGIN_URL}>Sign in</a>
      </nav>
    </header>
  );
}
