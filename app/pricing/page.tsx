import type { Metadata } from 'next';
import SiteShell from '../_site/SiteShell';
import PricingSection from '../_site/PricingSection';
import Faq from '../_site/Faq';
import FinalBand from '../_site/FinalBand';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pro ₹1,999 or Standard ₹999 a month, plus GST. Yearly is the price of 10 months. Try Pro free for 7 days, no card needed.',
  alternates: { canonical: 'https://werkfox.com/pricing' },
};

/** Same plans and words as the homepage pricing section. */
export default function PricingPage() {
  return (
    <SiteShell>
      <PricingSection heading="h1" />
      <Faq />
      <FinalBand />
    </SiteShell>
  );
}
