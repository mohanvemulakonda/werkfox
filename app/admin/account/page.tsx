'use client';

import { useState } from 'react';
import { Field, SubmitButton } from '../../login/AuthCard';

/** Change your own password: current one, then the new one twice. */
export default function AccountPage() {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setDone(false);
    if (password !== again) return setError('The two new passwords are not the same.');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current, password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setError(data.error || 'That did not work. Please try again.');
      else { setDone(true); setCurrent(''); setPassword(''); setAgain(''); }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', padding: '32px', background: 'white', borderRadius: '20px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary, #1d1d1f)', marginBottom: '4px' }}>Change password</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary, #86868b)', marginBottom: '24px' }}>At least 8 characters</p>
      {error && <div role="alert" style={{ padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#DC2626', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{error}</div>}
      {done && <div role="status" style={{ padding: '10px 14px', borderRadius: '10px', background: '#DCFCE7', color: '#166534', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>Your password is changed.</div>}
      <form onSubmit={handleSubmit}>
        <Field label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        <Field label="New password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
        <Field label="New password again" type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} minLength={8} required />
        <SubmitButton loading={loading}>{loading ? 'Saving...' : 'Save new password'}</SubmitButton>
      </form>
    </div>
  );
}
