'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

/**
 * Shows a fixed-width app page scaled to its frame (CSS zoom), as the mock-up did.
 * `w` is the page width on a computer, `m` (optional) on a phone (560 px and below).
 * The width classes (.fit[data-fit="1280"] > *) are in site.css, so the layout is right before this runs.
 */
export default function Fit({ w, m, children }: { w: number; m?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const c = el.firstElementChild as HTMLElement | null;
      if (!c) return;
      const width = m && window.innerWidth <= 560 ? m : w;
      c.style.width = `${width}px`;
      c.style.setProperty('zoom', String(el.clientWidth / width));
      el.dataset.ready = '1';
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    const mo = new MutationObserver(apply);
    mo.observe(el, { childList: true });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, [w, m]);
  return <div className="fit" ref={ref} data-fit={w} data-fit-m={m}>{children}</div>;
}
