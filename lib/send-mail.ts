/**
 * Account emails (password reset, welcome) through Resend, the provider every StackNex product
 * uses. lib/email.ts is the contact form's SMTP sender and needs SMTP_* settings the live project
 * does not have; account email must not depend on that.
 *
 *   RESEND_API_KEY    required; without it nothing is sent and the caller is told so
 *   WERKFOX_MAIL_FROM optional; defaults to "WerkFox <notify@stacknex.io>" (a verified domain)
 *
 * Returns { ok, error } and never throws, so a failed send is never recorded as a success.
 */
export async function sendMail(to: string, subject: string, html: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY is not set' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.WERKFOX_MAIL_FROM || 'WerkFox <notify@stacknex.io>', to: [to], subject, html, text }),
    });
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** The plain WerkFox account email: heading, a few lines, one button. No images, no emojis. */
export function accountEmail(heading: string, lines: string[], button?: { label: string; url: string }): string {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Inter,Segoe UI,sans-serif;color:#1d1d1f">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" style="max-width:480px;background:#ffffff;border-radius:20px;padding:36px" cellpadding="0" cellspacing="0"><tr><td>
<div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;margin-bottom:24px">Werk<span style="color:#E03B12">Fox</span></div>
<h1 style="font-size:22px;margin:0 0 12px">${esc(heading)}</h1>
${lines.map((l) => `<p style="font-size:15px;line-height:1.5;color:#424245;margin:0 0 12px">${esc(l)}</p>`).join('')}
${button ? `<p style="margin:24px 0 8px"><a href="${esc(button.url)}" style="display:inline-block;background:#E03B12;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 24px;border-radius:12px">${esc(button.label)}</a></p>` : ''}
</td></tr></table>
<p style="font-size:12px;color:#86868b;margin-top:16px">WerkFox by StackNex</p>
</td></tr></table></body></html>`;
}
