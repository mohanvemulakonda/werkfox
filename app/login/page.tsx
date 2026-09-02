'use client';

import { useState, Suspense} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

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

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <Image src="/logo.png" alt="WerkFox" width={40} height={40} />
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.5px' }}>Werk</span>
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E03B12, #FD9220)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Fox</span>
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px', letterSpacing: '-0.3px' }}>
          Sign in
        </h1>
        <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '28px' }}>
          Enter your credentials to continue
        </p>

        {/* Error */}
        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: '#FEE2E2',
            color: '#DC2626',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e5ea',
                fontSize: '15px',
                background: '#f5f5f7',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e5ea',
                fontSize: '15px',
                background: '#f5f5f7',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: loading ? '#aeaeb2' : 'linear-gradient(135deg, #E03B12, #FD9220)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(224, 59, 18, 0.3)',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontSize: '13px', color: '#aeaeb2', textAlign: 'center', marginTop: '20px' }}>
          Contact your admin if you need access
        </p>
      </div>
    </div>
  );
}

/**
 * useSearchParams() opts the whole page into client-side rendering, and Next refuses to
 * prerender it without a boundary — the build fails outright rather than warning. The form is
 * split out and wrapped so the page itself can still be statically generated.
 *
 * Commit 091794c fixed this same class of bug elsewhere in the app; this page was written after
 * it and reintroduced it.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
