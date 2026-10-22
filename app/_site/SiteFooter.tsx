import { DEMO_URL, LOGIN_URL, SIGNUP_URL } from './data';
import { Brand } from './ui';

/** werkfox.com footer. About is left out until it is rewritten (the old page claims offices and apps that do not exist). */
export default function SiteFooter({ home = false }: { home?: boolean }) {
  const at = (id: string) => (home ? `#${id}` : `/#${id}`);
  return (
    <footer>
      <div className="wrap">
        <div className="foot-g">
          <div className="about">
            <Brand href={home ? '#top' : '/'} />
            <p>Quotations, production, stock, dispatch, GST invoices and payroll for India&apos;s small factories and traders.</p>
          </div>
          <div><h4>Product</h4><ul><li><a href={at('apps')}>Apps</a></li><li><a href={at('trades')}>Industries</a></li><li><a href={home ? '#pricing' : '/pricing'}>Pricing</a></li><li><a href={at('gst')}>GST and reports</a></li></ul></div>
          <div><h4>Get started</h4><ul><li><a href={SIGNUP_URL}>Try Pro free</a></li><li><a href={LOGIN_URL}>Sign in</a></li><li><a href={DEMO_URL}>Book a demo</a></li></ul></div>
          <div><h4>Company</h4><ul><li><a href={at('faq')}>FAQ</a></li><li><a href="/contact">Contact</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/terms">Terms</a></li></ul></div>
        </div>
        <div className="foot-b">
          <span>© {new Date().getFullYear()} WerkFox. Prices in Indian rupees, plus GST.</span>
          <span>Product screens on this site show invented companies and figures.</span>
          <span>app.werkfox.com</span>
        </div>
      </div>
    </footer>
  );
}
