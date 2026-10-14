'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard, Field, SubmitButton } from '../login/AuthCard';

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get('token') || '';
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== again) return setError('The two passwords are not the same.');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'That did not work. Ask for a new link.'); setLoading(false); return; }
      router.push('/login?reset=1');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Choose a new password"
      subtitle="At least 8 characters"
      error={!token ? 'This link is not complete. Open it again from the email, or ask for a new one.' : error}
      footer={<Link href="/forgot-password" style={{ color: 'var(--werkfox-primary, #E03B12)', fontWeight: 500 }}>Ask for a new link</Link>}
    >
      {token && (
        <form onSubmit={handleSubmit}>
          <Field label="New password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          <Field label="New password again" type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} minLength={8} required />
          <SubmitButton loading={loading}>{loading ? 'Saving...' : 'Save new password'}</SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}
