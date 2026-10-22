import SiteShell from './SiteShell';
import HomeHero from './HomeHero';
import HomeWhy from './HomeWhy';
import Trades from './Trades';
import HomeApps from './HomeApps';
import HomeMore from './HomeMore';
import PricingSection from './PricingSection';
import Faq from './Faq';
import FinalBand from './FinalBand';

/** werkfox.com homepage (mock-up v3, approved by Mohan 22 Oct 2026). */
export default function HomePage() {
  return (
    <SiteShell home>
      <HomeHero />
      <HomeWhy />
      <Trades />
      <HomeApps />
      <HomeMore />
      <PricingSection />
      <Faq />
      <FinalBand />
    </SiteShell>
  );
}
