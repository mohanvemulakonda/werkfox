import '../_site/site.css';
import SiteFooter from '../_site/SiteFooter';

/** Footer of the older marketing pages: the new site footer, always light (those pages have no dark mode). */
export default function Footer() {
  return (
    <div className="wfh wfh-strip" data-theme="light">
      <SiteFooter />
    </div>
  );
}
