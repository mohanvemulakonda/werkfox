import type { Metadata } from 'next';
import { Suspense } from 'react';
import SiteShell from '../_site/SiteShell';
import { I } from '../_site/ui';
import { SIGNUP_URL, TEAM_EMAIL } from '../_site/data';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Book a demo',
  description: 'Book a WerkFox demo or ask us anything. We read every message.',
  alternates: { canonical: 'https://werkfox.com/contact' },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="wrap">
        <div className="page-h">
          <span className="eyebrow">Talk to us</span>
          <h1>Book a demo, or ask us anything</h1>
          <p>We show you WerkFox on your own kind of work. Tell us a little about your business and we will get back to you to fix a time.</p>
        </div>
        <div className="contact">
          <Suspense fallback={null}><ContactForm /></Suspense>
          <div className="side">
            <div className="card">
              <h3><I n="mail" />Email</h3>
              <p>Write to us any time at <a className="lnk" href={`mailto:${TEAM_EMAIL}`}>{TEAM_EMAIL}</a>. We read every message.</p>
            </div>
            <div className="card">
              <h3><I n="sparkles" />Rather try it yourself?</h3>
              <p>Sign up in a minute and get 7 days of everything in Pro, with no card.</p>
              <p><a className="lnk" href={SIGNUP_URL}>Try Pro free for 7 days</a></p>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
