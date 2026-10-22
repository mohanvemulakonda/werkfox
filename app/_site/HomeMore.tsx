import { I } from './ui';
import { NEED_URL } from './data';
import SoonGrid from './SoonGrid';

/** GST and reports, getting started, and what is coming soon. */
export default function HomeMore() {
  return (
    <>
      {/* 7. GST AND REPORTS */}
      <section className="alt" id="gst">
        <div className="wrap">
          <div className="sec-h">
            <span className="eyebrow">GST and reports</span>
            <h2>Month-end figures, ready when you are</h2>
            <p>Every report comes from the bills you already made. Download any of them as a file that opens in Excel, for you or your CA.</p>
          </div>
          <div className="reps">
            <div className="rep gst"><div className="rt"><b>GSTR-1</b><span className="csv">CSV</span></div><span>B2B invoices, B2C (small) and credit notes, for the month.</span></div>
            <div className="rep gst"><div className="rt"><b>GSTR-3B summary</b><span className="csv">CSV</span></div><span>Output tax, input credit from purchases, and what is payable.</span></div>
            <div className="rep gst"><div className="rt"><b>HSN summary</b><span className="csv">CSV</span></div><span>For table 12 of GSTR-1.</span></div>
            <div className="rep"><div className="rt"><b>Sales register</b><span className="csv">CSV</span></div><span>Every invoice in order, with cancelled ones kept at zero.</span></div>
            <div className="rep"><div className="rt"><b>Purchase register</b><span className="csv">CSV</span></div><span>Supplier bills with input GST, by bill date.</span></div>
            <div className="rep"><div className="rt"><b>Who owes you</b><span className="csv">CSV</span></div><span>Unpaid balances by how far past due they are.</span></div>
            <div className="rep"><div className="rt"><b>Sales by customer and item</b><span className="csv">CSV</span></div><span>Who buys what, and at what average rate.</span></div>
            <div className="rep"><div className="rt"><b>Quotations won and lost</b><span className="csv">CSV</span></div><span>See which quotes turn into orders.</span></div>
          </div>
          <p className="honest"><I n="shield-check" /><span>WerkFox makes the figures; you or your CA file the return. E-invoice (IRN) and e-way bill generation are not built yet: WerkFox reminds you when an e-way bill is needed.</span></p>
        </div>
      </section>

      {/* 8. HOW YOU START */}
      <section>
        <div className="wrap">
          <div className="sec-h">
            <span className="eyebrow">Getting started</span>
            <h2>Make your first GST invoice today</h2>
            <p>No consultant, no installation. Three steps and you are billing.</p>
          </div>
          <div className="steps">
            <div className="stp"><span className="n">1</span><h3>Sign up with Google or email</h3><p>Your name, business and mobile number, or one click with Google. Your 7 free days with everything in Pro start right away, with no card.</p><div className="mini"><span className="mk on"><I n="key-round" s="s" />Continue with Google</span><span className="mk"><I n="mail" s="s" />Email</span></div></div>
            <div className="stp"><span className="n">2</span><h3>Pick your business type</h3><p>WerkFox switches on the apps, units and words your trade uses. A factory gets &quot;Factory&quot;, a trader gets &quot;Warehouse&quot;.</p><div className="mini"><span className="mk on"><I n="factory" s="s" />Manufacturing</span><span className="mk"><I n="boxes" s="s" />Trading</span><span className="mk"><I n="wrench" s="s" />Field service</span></div></div>
            <div className="stp"><span className="n">3</span><h3>Add your details once</h3><p>Logo, GSTIN, bank and UPI go on every bill. Bring customers and items from Excel, up to 2,000 rows at a time.</p><div className="mini"><span className="mk"><I n="upload" s="s" />Import from Excel</span><span className="mk on"><I n="receipt-text" s="s" />First invoice</span></div></div>
          </div>
        </div>
      </section>

      {/* 9. COMING SOON (honest) */}
      <section className="alt">
        <div className="wrap">
          <div className="sec-h">
            <span className="eyebrow">Coming soon</span>
            <h2>What we are building next</h2>
            <p>These apps are planned but not ready yet. You will see them in WerkFox marked &quot;Coming soon&quot;. No dates promised: tell us which one you need first and it moves up the list.</p>
          </div>
          <SoonGrid />
          <div className="soon-cta">
            <a className="btn sec" href={NEED_URL}>Tell us what you need</a>
          </div>
        </div>
      </section>
    </>
  );
}
