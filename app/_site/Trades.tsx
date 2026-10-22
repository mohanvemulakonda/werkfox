'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Fit from './Fit';
import { APPS, CORE, SIGNUP_URL, TRADES, type TradeKey, type Tone } from './data';
import { Badge, Browser, I, Logo, Mark, Tile, type LogoKey } from './ui';

/** One invented company per trade, on a screen of an app that trade can use today. */
interface Co { k: LogoKey; name: string; city: string; url: string; title: string; rail: [string, Tone]; railApps: [string, Tone][]; cols: string[]; right: number[]; rows: ReactNode[][] }
const sub = (t: string) => <span className="sub">{t}</span>;
const CO: Record<TradeKey, Co> = {
  manufacturing: { k: 'vy', name: 'Vayura Fabtech', city: 'Hyderabad', url: 'production', title: 'Production', rail: ['factory', 'violet'],
    railApps: [['file-pen', 'sky'], ['boxes', 'teal'], ['truck', 'pink'], ['banknote', 'green']],
    cols: ['Number', 'Makes', 'Made', 'Machine / line', 'Status'], right: [2],
    rows: [
      ['PRD-0037', 'Gear box mounting base', '12 of 30 pcs', 'Welding bay 1', <Badge key="b" t="blue">Running</Badge>],
      ['PRD-0036', 'Conveyor idler frame', '48 of 120 pcs', 'Welding bay 2', <Badge key="b" t="blue">Running</Badge>],
      ['PRD-0030', 'Conveyor roller bracket', '880 of 1,200 pcs', 'Press line', <Badge key="b" t="red">Behind plan</Badge>],
    ] },
  trading: { k: 'ar', name: 'Aranya Trade Links', city: 'Vijayawada', url: 'stock', title: 'Stock', rail: ['boxes', 'teal'],
    railApps: [['file-pen', 'sky'], ['shopping-cart', 'amber'], ['truck', 'pink'], ['receipt-text', 'orange']],
    cols: ['Item', 'Location', 'On hand', 'Free', 'Reorder at', 'Status'], right: [2, 3, 4],
    rows: [
      ['Copper wire 1.5 sq mm, 90 m', 'Warehouse Benz Circle', '52 roll', '12 roll', '60 roll', <Badge key="b" t="red">Running low</Badge>],
      ['PVC conduit pipe 25 mm', 'Warehouse Benz Circle', '1,240 pcs', '940 pcs', '400 pcs', <Badge key="b" t="green">OK</Badge>],
      ['Modular switch 6 A', 'Warehouse Auto Nagar', '2,600 pcs', '1,700 pcs', '1,000 pcs', <Badge key="b" t="green">OK</Badge>],
      ['MCB 32 A double pole', 'Warehouse Auto Nagar', '38 pcs', '8 pcs', '50 pcs', <Badge key="b" t="red">Running low</Badge>],
    ] },
  transport: { k: 'gr', name: 'Godhuli Roadlines', city: 'Nagpur', url: 'invoices', title: 'Invoices', rail: ['receipt-text', 'orange'],
    railApps: [['file-pen', 'sky'], ['user-check', 'cyan'], ['banknote', 'green']],
    cols: ['Invoice', 'Customer', 'Date', 'Amount', 'Status'], right: [3],
    rows: [
      ['INV-0311', <>Sonegaon Cotton Ginners{sub('Freight, Nagpur to Raipur, 2 trips')}</>, '21 Oct', '₹96,600', <Badge key="b" t="amber">Unpaid</Badge>],
      ['INV-0310', <>Wardha Rolling Mills{sub('Freight, Nagpur to Hyderabad, 1 trip')}</>, '19 Oct', '₹58,800', <Badge key="b" t="green">Paid</Badge>],
      ['INV-0309', <>Kamptee Agro Exports{sub('Freight, Nagpur to JNPT, 1 trip')}</>, '16 Oct', '₹1,12,350', <Badge key="b" t="blue">Part paid</Badge>],
    ] },
  construction: { k: 'sh', name: 'Shilpra Infra Builders', city: 'Visakhapatnam', url: 'stock', title: 'Stock', rail: ['boxes', 'teal'],
    railApps: [['shopping-cart', 'amber'], ['truck', 'pink'], ['receipt-text', 'orange']],
    cols: ['Item', 'Location', 'On hand', 'Free', 'Reorder at', 'Status'], right: [2, 3, 4],
    rows: [
      ['TMT bar 12 mm, Fe 500D', 'Site Madhurawada', '6.4 tonne', '1.4 tonne', '8 tonne', <Badge key="b" t="red">Running low</Badge>],
      ['OPC cement 53 grade', 'Site Madhurawada', '640 bag', '240 bag', '300 bag', <Badge key="b" t="green">OK</Badge>],
      ['River sand', 'Yard Gajuwaka', '18 brass', '6 brass', '10 brass', <Badge key="b" t="green">OK</Badge>],
      ['Red bricks, 9 inch', 'Site Rushikonda', '42,000 pcs', '12,000 pcs', '20,000 pcs', <Badge key="b" t="green">OK</Badge>],
    ] },
  consulting: { k: 'mh', name: 'Mehvar & Associates', city: 'Pune', url: 'invoices', title: 'Invoices', rail: ['receipt-text', 'orange'],
    railApps: [['file-pen', 'sky'], ['banknote', 'green']],
    cols: ['Invoice', 'Client', 'Date', 'Amount', 'Status'], right: [3],
    rows: [
      ['MA/26-27/118', <>Sahyadri Polymers Pvt Ltd{sub('Retainer, October 2026')}</>, '1 Oct', '₹41,300', <Badge key="b" t="green">Paid</Badge>],
      ['MA/26-27/121', <>Baner Bakes LLP{sub('Tax audit, FY 2025-26')}</>, '8 Oct', '₹88,500', <Badge key="b" t="blue">Part paid</Badge>],
      ['MA/26-27/124', <>Kothrud Dental Clinic{sub('GST returns, September')}</>, '15 Oct', '₹11,800', <Badge key="b" t="amber">Unpaid</Badge>],
    ] },
  'field-service': { k: 'th', name: 'Thandak Cooling Services', city: 'Chennai', url: 'quotations', title: 'Quotations', rail: ['file-pen', 'sky'],
    railApps: [['receipt-text', 'orange'], ['user-check', 'cyan'], ['banknote', 'green']],
    cols: ['Quotation', 'Customer', 'Valid till', 'Amount', 'Status'], right: [3],
    rows: [
      ['QT-0214', <>Adyar Residency Apartments{sub('AMC, 18 split ACs, 1 year')}</>, '5 Nov', '₹1,27,440', <Badge key="b" t="blue">Sent</Badge>],
      ['QT-0213', <>Velachery Medicals{sub('Supply and fit 2 cassette ACs')}</>, '30 Oct', '₹2,36,000', <Badge key="b" t="green">Won</Badge>],
      ['QT-0212', <>Tambaram Textiles{sub('AMC, 40 ACs, 1 year')}</>, '12 Nov', '₹2,83,200', <Badge key="b" t="grey">Draft</Badge>],
    ] },
};

function CompanyScreen({ c }: { c: Co }) {
  // Middle columns (not the first, not the status, not numbers) drop on a phone (.xm).
  const cls = (i: number, n: number, first: boolean) =>
    [first && i === 0 ? 'b' : '', c.right.includes(i) ? 'r' : '', i > 0 && i < n - 1 && !c.right.includes(i) ? 'xm' : ''].filter(Boolean).join(' ') || undefined;
  return (
    <>
      <Browser url={c.url} className="co-shot">
        <Fit w={860} m={460}>
          <div className="app a-frame">
            <aside className="a-rail">
              <Mark k={c.k} size="s32" />
              <span className="ri"><Tile icon="house" tone="slate" /></span>
              <span className="ri act"><Tile icon={c.rail[0]} tone={c.rail[1]} /></span>
              {c.railApps.map(([icon, tone]) => <span className="ri" key={icon}><Tile icon={icon} tone={tone} /></span>)}
            </aside>
            <div className="a-inset">
              <div className="a-hdr">
                <span className="org">{c.name} <span>· {c.city}</span></span>
                <span className="a-hr"><span className="a-search"><span><I n="search" />Search...</span><span className="a-kbd">⌘K</span></span></span>
              </div>
              <div className="a-page">
                <div className="a-tb"><h1>{c.title}</h1></div>
                <div className="a-card"><div className="a-cc">
                  <table className="a-t mx">
                    <thead><tr>{c.cols.map((h, i) => <th key={h} className={cls(i, c.cols.length, false)}>{h}</th>)}</tr></thead>
                    <tbody>{c.rows.map((r, j) => <tr key={j}>{r.map((v, i) => <td key={i} className={cls(i, r.length, true)}>{v}</td>)}</tr>)}</tbody>
                  </table>
                </div></div>
              </div>
            </div>
          </div>
        </Fit>
      </Browser>
      <div className="co-cap">
        <Logo k={c.k} size="s24" full />
        <span>Invented {c.title === 'Invoices' || c.title === 'Quotations' ? 'business' : 'company'}, {c.city}: what it uses WerkFox for today</span>
      </div>
    </>
  );
}

/** Pick your trade: six tabs, each with its apps (live first) and an invented company's screen. Deep link: /#trade-<key>. */
export default function Trades() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#trade-([a-z-]+)$/);
      const j = m ? TRADES.findIndex((t) => t.key === m[1]) : -1;
      if (j >= 0) { setI(j); document.getElementById('trades')?.scrollIntoView(); }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);
  const t = TRADES[i];
  const live = t.apps.filter((a) => APPS[a].live).length;
  const ids = [...t.apps].sort((a, b) => Number(APPS[b].live) - Number(APPS[a].live));
  return (
    <section className="alt" id="trades">
      <div className="wrap">
        <div className="sec-h">
          <span className="eyebrow">Pick your trade</span>
          <h2>Switch on the apps your business needs</h2>
          <p>Tell WerkFox what you do and it starts with the right apps, units and words. Switch apps on or off any time. Manufacturing and trading are ready today; other trades get their apps one by one.</p>
        </div>
        <div className="trade">
          <div className="tabs" role="tablist">
            {TRADES.map((tr, j) => (
              <button key={tr.key} className={`tab${j === i ? ' on' : ''}`} role="tab" aria-selected={j === i} onClick={() => setI(j)}>
                <span className="ti"><I n={tr.icon} /></span>
                <span className="tl"><b>{tr.label}</b><small>{tr.example}</small></span>
                <span className="ready">{tr.apps.filter((a) => APPS[a].live).length}/{tr.apps.length}</span>
              </button>
            ))}
          </div>
          <div className="panel" role="tabpanel" aria-live="polite">
            <div className="panel-h">
              <div><h3>{t.label}</h3><p>{t.example}</p></div>
              <div className="meter">
                <svg className="track" aria-hidden="true">
                  <defs><linearGradient id="wfh-meter" x1="0" x2="1" y1="0" y2="0"><stop offset="0" className="st1" /><stop offset="1" className="st2" /></linearGradient></defs>
                  <rect className="track-bg" width="100%" height="100%" rx="4" />
                  <rect className="track-fill" width={`${Math.round((live / t.apps.length) * 100)}%`} height="100%" rx="4" />
                </svg>
                <span><b>{live} of {t.apps.length}</b> apps ready today</span>
              </div>
            </div>
            <CompanyScreen key={t.key} c={CO[t.key]} />
            <div className="apps" key={`apps-${t.key}`}>
              {ids.map((id) => {
                const a = APPS[id];
                return (
                  <div key={id} className={`appc${a.live ? '' : ' soon'}`}>
                    <Tile icon={a.icon} tone={a.tone} />
                    <span className="at"><b>{a.name}</b><span className="l">{a.line}</span>
                      <span className="tags">
                        {a.live ? (
                          <>
                            <span className="chip live">Live</span>
                            <span className={`chip ${a.plan === 'pro' ? 'pro' : 'std'}`}>{a.plan === 'pro' ? 'Pro' : 'Standard'}</span>
                            {t.presets.includes(id) && <span className="chip start">On from day one</span>}
                          </>
                        ) : <span className="chip soon">Coming soon</span>}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="core">
              <span>Every business also gets</span>
              {CORE.map(([n, icon, tone]) => <span className="ci" key={n}><Tile icon={icon} tone={tone} size="sm" />{n}</span>)}
            </div>
            <p className="say">{t.say} <a href={SIGNUP_URL}>Start free as a {t.label.toLowerCase()} business</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
