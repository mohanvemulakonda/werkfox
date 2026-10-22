import type { Metadata } from 'next';
import SiteShell from '../_site/SiteShell';
import Faq from '../_site/Faq';
import FinalBand from '../_site/FinalBand';

export const metadata: Metadata = {
  title: 'Questions',
  description: 'Straight answers about WerkFox: installing, the 7-day Pro trial, GST, e-way bills, Excel import and who sees salaries.',
  alternates: { canonical: 'https://werkfox.com/faq' },
};

export default function FaqPage() {
  return (
    <SiteShell>
      <Faq />
      <FinalBand />
    </SiteShell>
  );
}
