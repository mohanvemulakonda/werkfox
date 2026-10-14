'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard, Field, SubmitButton, safeNext } from './AuthCard';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Only a path inside WerkFox: an unchecked ?redirect= let a crafted link send people off-site after sign-in.
  const redirect = safeNext(searchParams.get('redirect'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Sign-in failed. Please try again.');
        setLoading(false);
        return;
      }
      router.push(redirect);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Enter your email and password"
      error={error}
      notice={searchParams.get('reset') === '1' ? 'Your password is changed. Sign in with the new one.' : undefined}
      footer={<>Forgot your password? <Link href="/forgot-password" style={{ color: 'var(--werkfox-primary, #E03B12)', fontWeight: 500 }}>Reset it</Link></>}
    >
      <form onSubmit={handleSubmit}>
        <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
        <Field label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
        <SubmitButton loading={loading}>{loading ? 'Signing in...' : 'Sign in'}</SubmitButton>
      </form>
    </AuthCard>
  );
}

/**
 * useSearchParams() opts the whole page into client-side rendering, and Next refuses to
 * prerender it without a boundary — the build fails outright rather than warning. The form is
 * split out and wrapped so the page itself can still be statically generated.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
