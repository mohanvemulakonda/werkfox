import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendMail } from '@/lib/send-mail';
import { applyRateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

/**
 * werkfox.com contact form ("Book a demo", "Tell us what you need", questions).
 * Stores the request in quote_requests (organizationId null, productName "Website: <topic>") and mails it
 * at once to the WerkFox team (WERKFOX_TEAM_EMAIL, default admin@werkfox.com) through Resend (lib/send-mail.ts),
 * with the visitor's email as reply-to. Succeeds when it was stored or mailed; fails only when both failed.
 */
const TOPICS: Record<string, string> = {
  demo: 'Book a demo',
  app: 'An app I need',
  pricing: 'Pricing or billing',
  other: 'Something else',
};

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '');
const cleanText = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\r\n/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export async function POST(request: NextRequest) {
  const limit = await applyRateLimit(request, RateLimitPresets.LENIENT);
  if (!limit.success) return NextResponse.json({ error: 'Too many requests. Please wait a minute and try again.' }, { status: 429, headers: limit.headers });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  // Bots: a filled hidden field gets a quiet "thank you" and nothing is kept.
  if (clean(body.website, 200)) return NextResponse.json({ success: true });
  if (typeof body._timingCheck === 'number' && body._timingCheck < 2000) return NextResponse.json({ error: 'Please take a moment before sending.' }, { status: 400 });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 30);
  const company = clean(body.company, 200);
  const trade = clean(body.trade, 60);
  const topicKey = clean(body.topic, 20);
  const topic = TOPICS[topicKey] ?? TOPICS.other;
  const message = cleanText(body.message, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please check your email address.';
  if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone)) errors.phone = 'Please check your phone number.';
  if (topicKey !== 'demo' && message.length < 5) errors.message = 'Please tell us a little more.';
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please check the form.', errors }, { status: 400, headers: limit.headers });

  const ip = getClientIp(request);
  const agent = clean(request.headers.get('user-agent'), 300);

  let stored = false;
  try {
    await prisma.quote_requests.create({
      data: {
        name, email, phone: phone || null, company: company || null,
        productName: `Website: ${topic}`,
        specifications: [trade && `Business: ${trade}`, message].filter(Boolean).join('\n\n') || null,
        notes: `werkfox.com contact form. IP ${ip}. ${agent}`.slice(0, 1000),
        updatedAt: new Date(),
      },
    });
    stored = true;
  } catch (e) {
    console.error('contact: could not store the request', e instanceof Error ? e.message : e);
  }

  const to = (process.env.WERKFOX_TEAM_EMAIL || 'admin@werkfox.com').trim();
  const rows: [string, string][] = [['Topic', topic], ['Name', name], ['Email', email], ['Phone', phone], ['Business', company], ['Trade', trade], ['Message', message]];
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n') + (stored ? '' : '\n\n(Not saved in the database: reply from this email.)');
  const html = `<div style="font-family:-apple-system,Inter,Segoe UI,sans-serif;font-size:15px;line-height:1.5">
<p><b>${esc(topic)}</b> from werkfox.com</p>
<table cellpadding="4">${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td valign="top">${esc(k)}</td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>
${stored ? '' : '<p>Not saved in the database: reply from this email.</p>'}</div>`;
  const mail = await sendMail(to, `WerkFox website: ${topic} from ${name}${company ? `, ${company}` : ''}`, html, text, email);
  if (!mail.ok) console.error('contact: mail not sent', mail.error);

  if (!stored && !mail.ok) {
    return NextResponse.json({ error: `Sorry, we could not send this. Please email ${to}.` }, { status: 500, headers: limit.headers });
  }
  return NextResponse.json({ success: true }, { status: 200, headers: limit.headers });
}
