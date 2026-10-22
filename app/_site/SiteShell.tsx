import type { ReactNode } from 'react';
import './site.css';
import { siteFonts } from './fonts';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

/** The page frame of the new werkfox.com pages: tokens + styles scope (.wfh), header, main, footer. Light, or Forge when the device is in dark mode. */
export default function SiteShell({ home = false, children }: { home?: boolean; children: ReactNode }) {
  return (
    <div className={`wfh wfh-page ${siteFonts}`}>
      <SiteHeader home={home} />
      <main>{children}</main>
      <SiteFooter home={home} />
    </div>
  );
}
