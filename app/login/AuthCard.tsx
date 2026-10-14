'use client';

import Image from 'next/image';

/**
 * The sign-in card shared by /login, /forgot-password and /reset-password, so the three pages are
 * one design: logo, title, a line under it, an optional message, then the form.
 */
export function AuthCard({ title, subtitle, error, notice, children, footer }: {
  title: string;
  subtitle: string;
  error?: string;
  notice?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface, #f5f5f7)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, system-ui, sans-serif', padding: '16px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: 'white', borderRadius: '20px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <Image src="/logo.png" alt="WerkFox" width={40} height={40} />
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary, #1d1d1f)', letterSpacing: '-0.5px' }}>Werk</span>
            <span style={{
              fontFamily: 'Caveat, cursive', fontSize: '28px', fontWeight: 700,
              background: 'linear-gradient(135deg, var(--werkfox-primary, #E03B12), var(--werkfox-accent, #FD9220))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Fox</span>
          </span>
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary, #1d1d1f)', marginBottom: '4px', letterSpacing: '-0.3px' }}>{title}</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary, #86868b)', marginBottom: '28px' }}>{subtitle}</p>

        {error && <div role="alert" style={{ padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#DC2626', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{error}</div>}
        {notice && <div role="status" style={{ padding: '10px 14px', borderRadius: '10px', background: '#DCFCE7', color: '#166534', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{notice}</div>}

        {children}

        {footer && <div style={{ fontSize: '13px', color: 'var(--text-secondary, #86868b)', textAlign: 'center', marginTop: '20px' }}>{footer}</div>}
      </div>
    </div>
  );
}

export function Field({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary, #1d1d1f)', marginBottom: '6px' }}>
        {label}
        <input {...input} style={{
          display: 'block', marginTop: '6px', width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e5e5ea',
          fontSize: '15px', background: 'var(--surface, #f5f5f7)', outline: 'none', boxSizing: 'border-box', fontWeight: 400,
        }} />
      </label>
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: '100%', padding: '14px', borderRadius: '12px', border: 'none', marginTop: '8px',
      background: loading ? '#aeaeb2' : 'linear-gradient(135deg, var(--werkfox-primary, #E03B12), var(--werkfox-accent, #FD9220))',
      color: 'white', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: loading ? 'none' : '0 4px 12px rgba(224, 59, 18, 0.3)',
    }}>{children}</button>
  );
}

/** Only a path inside WerkFox may follow sign-in: "/admin/crm" yes, "https://evil.example" or "//evil" no. */
export const safeNext = (v: string | null) => (v && v.startsWith('/') && !v.startsWith('//') && !v.startsWith('/\\') ? v : '/admin');
