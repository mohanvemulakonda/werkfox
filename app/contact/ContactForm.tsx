'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TEAM_EMAIL, TRADES } from '../_site/data';
import { I } from '../_site/ui';

type Status = { kind: 'idle' | 'sending' | 'ok' | 'err'; text?: string };

/** Book a demo / ask a question. Posts to /api/contact, which stores it and mails the team. */
export default function ContactForm() {
  const q = useSearchParams();
  const first = q.get('topic');
  const [topic, setTopic] = useState(first === 'app' || first === 'pricing' || first === 'other' ? first : 'demo');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(Date.now());
  useEffect(() => { started.current = Date.now(); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = Object.fromEntries(f.entries());
    setStatus({ kind: 'sending' });
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, topic, _timingCheck: Date.now() - started.current }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(out.errors ?? {});
        setStatus({ kind: 'err', text: out.error ?? `Sorry, that did not go through. Please email ${TEAM_EMAIL}.` });
        return;
      }
      setStatus({ kind: 'ok', text: topic === 'demo' ? 'Thank you. We will call or email you to fix a time.' : 'Thank you. We will get back to you soon.' });
      e.currentTarget.reset();
    } catch {
      setStatus({ kind: 'err', text: `Sorry, that did not go through. Please email ${TEAM_EMAIL}.` });
    }
  }

  const err = (k: string) => errors[k] && <small>{errors[k]}</small>;
  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <label className="fld">What can we help with?
        <select name="topicSel" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="demo">Book a demo</option>
          <option value="app">An app I need</option>
          <option value="pricing">Pricing or billing</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <div className="two">
        <label className="fld">Your name<input name="name" autoComplete="name" required />{err('name')}</label>
        <label className="fld">Business name<input name="company" autoComplete="organization" /></label>
      </div>
      <div className="two">
        <label className="fld">Email<input name="email" type="email" autoComplete="email" required />{err('email')}</label>
        <label className="fld">Mobile (optional)<input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="For a call back" />{err('phone')}</label>
      </div>
      <label className="fld">Your trade
        <select name="trade" defaultValue="">
          <option value="">Choose one</option>
          {TRADES.map((t) => <option key={t.key} value={t.label}>{t.label}</option>)}
        </select>
      </label>
      <label className="fld">{topic === 'demo' ? 'Anything we should know (optional)' : 'Your message'}
        <textarea name="message" rows={5} required={topic !== 'demo'} placeholder={topic === 'demo' ? 'What you make, and a good time to call' : undefined} />{err('message')}
      </label>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {status.kind === 'ok' && <p className="form-msg ok" role="status">{status.text}</p>}
      {status.kind === 'err' && <p className="form-msg err" role="alert">{status.text}</p>}
      <button className="btn pri lg" type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Sending...' : topic === 'demo' ? 'Book my demo' : 'Send'} <I n="arrow-right" />
      </button>
    </form>
  );
}
