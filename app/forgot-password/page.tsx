'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthCard, Field, SubmitButton } from '../login/AuthCard';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json().catch(() => ({}));
      setNotice(data.message || 'If that email has a WerkFox account, a reset link is on its way.');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="We will email you a link to choose a new one"
      error={error}
      notice={notice}
      footer={<Link href="/login" style={{ color: 'var(--werkfox-primary, #E03B12)', fontWeight: 500 }}>Back to sign in</Link>}
    >
      {!notice && (
        <form onSubmit={handleSubmit}>
          <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
          <SubmitButton loading={loading}>{loading ? 'Sending...' : 'Send reset link'}</SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}
