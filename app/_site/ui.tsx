import type { ReactNode } from 'react';
import type { Tone } from './data';

/** A lucide icon from the sprite in /public/site-icons.svg. */
export function I({ n, s, className }: { n: string; s?: 's' | 'l'; className?: string }) {
  const cls = ['i', s ? `i-${s}` : '', className ?? ''].filter(Boolean).join(' ');
  return <svg className={cls} aria-hidden="true"><use href={`/site-icons.svg#i-${n}`} /></svg>;
}

/** App tile: coloured square with the app's icon (werkfox-app AppIcon). */
export function Tile({ icon, tone, size }: { icon: string; tone: Tone; size?: 'sm' | 'xs' }) {
  return <span className={`tile${size ? ' ' + size : ''} tn-${tone}`}><I n={icon} /></span>;
}

export function Check() {
  return <span className="tk"><I n="check" /></span>;
}

/** WerkFox word mark: "Werk" + "Fox" in Caveat with the brand gradient. */
export function WordMark() {
  return <span className="wm">Werk<span className="fox">Fox</span></span>;
}

export function Brand({ href = '/' }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="WerkFox home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" width={32} height={32} />
      <WordMark />
    </a>
  );
}

/** Invented customer brands used inside the product screens (CSS shapes + Google Fonts, see site.css). */
export type LogoKey = 'vy' | 'ar' | 'gr' | 'sh' | 'mh' | 'th';
const LOGOS: Record<LogoKey, { l: string; w: string; s: string }> = {
  vy: { l: 'V', w: 'VAYURA', s: 'FABTECH' },
  ar: { l: 'A', w: 'Aranya', s: 'TRADE LINKS' },
  gr: { l: 'G', w: 'GODHULI', s: 'ROADLINES' },
  sh: { l: 'S', w: 'SHILPRA', s: 'INFRA BUILDERS' },
  mh: { l: 'M', w: 'Mehvar & Associates', s: 'CHARTERED ACCOUNTANTS' },
  th: { l: '', w: 'thandak', s: 'COOLING SERVICES' },
};
type LogoSize = 's24' | 's32' | 's44' | 's56';

export function Mark({ k, size = 's32' }: { k: LogoKey; size?: LogoSize }) {
  return (
    <span className={`lm ${k} ${size}`}>
      {k === 'th' ? <svg aria-hidden="true"><use href="/site-icons.svg#i-snowflake" /></svg> : LOGOS[k].l}
    </span>
  );
}

export function Logo({ k, size = 's32', full = false }: { k: LogoKey; size?: LogoSize; full?: boolean }) {
  return (
    <span className="lg">
      <Mark k={k} size={size} />
      {full && <span className={`lw ${k}`}><b>{LOGOS[k].w}</b><small>{LOGOS[k].s}</small></span>}
    </span>
  );
}

export type BadgeTone = 'green' | 'amber' | 'blue' | 'red' | 'grey';
export function Badge({ t, children }: { t: BadgeTone; children: ReactNode }) {
  return <span className={`a-badge t-${t}`}>{children}</span>;
}

/** Browser window frame around a product screen. */
export function Browser({ url, className, children }: { url: string; className?: string; children: ReactNode }) {
  return (
    <div className={`browser${className ? ' ' + className : ''}`}>
      <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/{url}</span></div>
      {children}
    </div>
  );
}
