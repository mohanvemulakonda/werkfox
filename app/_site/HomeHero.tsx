import Fit from './Fit';
import { I, Logo } from './ui';
import { SIGNUP_URL, DEMO_URL } from './data';

/** Hero: headline, trial buttons, the Home screen of an invented factory (browser on a computer, phone on a phone). */
export default function HomeHero() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <a className="pill" href="#people"><span className="new">New</span><span>HR &amp; Payroll is live<span className="pill-x">: attendance, salary, PF and ESI</span></span><I n="arrow-right" s="s" /></a>
          <h1>Run your whole factory from <span className="hand">one app</span></h1>
          <p className="lede">Quotations, production, stock, dispatch, GST invoices and salary, all connected. Type an order once and it flows from quotation to payment. Made for India&apos;s small factories and traders.</p>
          <div className="cta-row">
            <a className="btn pri lg" href={SIGNUP_URL}>Try Pro free for 7 days <I n="arrow-right" /></a>
            <a className="btn sec lg" href={DEMO_URL}>Book a demo</a>
          </div>
          <div className="micro">
            <span><I n="check" s="s" />7 days of everything in Pro</span>
            <span><I n="check" s="s" />No card needed</span>
            <span><I n="check" s="s" />Then ₹1,999 a month + GST</span>
          </div>

          {/* desktop: Home screen in a browser frame */}
          <div className="hero-stage hero-desk">
            <div className="float f1"><span className="ic ic-vi"><I n="factory" /></span><span><b>PRD-0034 done</b><span className="s">40 frames into stock, materials out</span></span></div>
            <div className="float f2"><span className="ic ic-wa"><I n="message-circle" /></span><span><b>Invoice sent on WhatsApp</b><span className="s">INV-0142 · ₹1,47,736 · with UPI QR</span></span></div>
            <div className="float f3"><span className="ic ic-gr"><I n="banknote" /></span><span><b>September salary paid</b><span className="s">24 payslips ready to print</span></span></div>
            <div className="browser">
              <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/home</span></div>
              <Fit w={1280}>
                <div className="app a-frame">
                  {/* sidebar: app-sidebar.tsx + nav-groups.tsx */}
                  <aside className="a-sb">
                    <div className="a-sbh"><Logo k="vy" size="s32" /><div><span className="co-n">Vayura Fabtech</span><div className="a-org">on <span className="wm">Werk<span className="fox">Fox</span></span></div></div></div>
                    <div className="a-sbb">
                      <span className="a-mi act"><I n="house" />Home</span>
                      <span className="a-mi grp open"><span className="tile sm tn-sky"><I n="file-pen" /></span>Quotations &amp; orders<I n="chevron-right" className="chev" /></span>
                      <div className="a-sub"><span>Leads</span><span>Follow-ups</span><span>Quotations</span><span>Sales orders</span></div>
                      <span className="a-mi grp"><span className="tile sm tn-violet"><I n="factory" /></span>Production<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-teal"><I n="boxes" /></span>Inventory<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-amber"><I n="shopping-cart" /></span>Purchase<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-pink"><I n="truck" /></span>Dispatch<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-cyan"><I n="user-check" /></span>People &amp; attendance<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-green"><I n="banknote" /></span>Payroll<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-orange"><I n="receipt-text" /></span>Invoicing<I n="chevron-right" className="chev" /></span>
                      <span className="a-mi grp"><span className="tile sm tn-slate"><I n="chart-no-axes-combined" /></span>Records<I n="chevron-right" className="chev" /></span>
                    </div>
                    <div className="a-sbf"><span className="a-av t1">AR</span><span className="a-nu"><b>Arjun Reddy</b><span>Owner</span></span></div>
                  </aside>
                  <div className="a-inset">
                    <div className="a-hdr">
                      <span className="a-ib"><I n="panel-left" /></span>
                      <span className="a-search"><span><I n="search" />Search...</span><span className="a-kbd">⌘K</span></span>
                      <span className="a-hr"><span className="a-avs"><span className="a-av r t2">PK</span><span className="a-av r t3">SB</span><span className="a-av r t4">MN</span></span><span className="a-ib b"><I n="bell" /></span><span className="a-ib b"><I n="moon" /></span><span className="a-av r t1">AR</span></span>
                    </div>
                    <div className="a-page">
                      <div className="a-tb">
                        <div><div className="a-date">Thursday, 22 October</div><h1>Good morning, Arjun</h1></div>
                        <div className="a-btns"><span className="a-btn o"><I n="file-text" />New quotation</span><span className="a-btn p"><I n="receipt-text" />New invoice</span></div>
                      </div>
                      <div className="a-stats">
                        <div className="a-card a-stat"><span className="k">To collect</span><span className="v">₹8,42,600</span><span className="n w">₹1,18,400 overdue</span></div>
                        <div className="a-card a-stat"><span className="k">Invoiced this month</span><span className="v">₹12,65,300</span><span className="n">18 invoices</span></div>
                        <div className="a-card a-stat"><span className="k">Received this month</span><span className="v">₹9,80,000</span><span className="n">14 payments</span></div>
                        <div className="a-card a-stat"><span className="k">Open quotations</span><span className="v">7</span><span className="n">worth ₹6,24,500</span></div>
                      </div>
                      <div className="a-g3">
                        <div className="a-card a-span2">
                          <div className="a-ch"><span className="a-ct">Latest invoices</span><span className="a-btn g sm">See all <I n="arrow-up-right" /></span></div>
                          <div className="a-cc"><table className="a-t"><thead><tr><th>Invoice</th><th>Customer</th><th className="r">Amount</th><th>Status</th></tr></thead><tbody>
                            <tr><td className="b">INV-0142</td><td>Ravula Pumps &amp; Motors</td><td className="r">₹1,47,736</td><td><span className="a-badge t-amber">Unpaid</span></td></tr>
                            <tr><td className="b">INV-0141</td><td>Kondapur Agro Foods</td><td className="r">₹62,540</td><td><span className="a-badge t-green">Paid</span></td></tr>
                            <tr><td className="b">INV-0140</td><td>Neeladri Engineering</td><td className="r">₹2,36,000</td><td><span className="a-badge t-blue">Part paid</span></td></tr>
                            <tr><td className="b">INV-0139</td><td>Pranava Packaging</td><td className="r">₹41,300</td><td><span className="a-badge t-red">Overdue</span></td></tr>
                            <tr><td className="b">INV-0138</td><td>Tanvi Conveyors</td><td className="r">₹88,500</td><td><span className="a-badge t-green">Paid</span></td></tr>
                          </tbody></table></div>
                        </div>
                        <div className="a-card">
                          <div className="a-ch"><span className="a-ct">Who owes you most</span></div>
                          <div className="a-cc">
                            <div className="a-owe"><span><b>Neeladri Engineering</b><span>Oldest bill 38 days</span></span><span className="amt">₹2,86,000</span></div>
                            <div className="a-owe"><span><b>Ravula Pumps &amp; Motors</b><span>Oldest bill 2 days</span></span><span className="amt">₹1,47,736</span></div>
                            <div className="a-owe"><span><b>Pranava Packaging</b><span>Oldest bill 47 days</span></span><span className="amt">₹1,03,900</span></div>
                            <div className="a-owe"><span><b>Godavari Alloy Castings</b><span>Oldest bill 21 days</span></span><span className="amt">₹74,220</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fit>
            </div>
          </div>

          {/* phone: Home on a phone */}
          <div className="hero-phone">
            <div className="phone"><div className="scr"><span className="notch"></span>
              <Fit w={390}>
                <div className="app">
                  <div className="a-mhdr"><span className="a-ib"><I n="panel-left" /></span><Logo k="vy" size="s24" full /><span className="a-hr"><span className="a-ib b"><I n="search" /></span><span className="a-av r t1">AR</span></span></div>
                  <div className="a-mpage">
                    <div><div className="a-date">Thursday, 22 October</div><h1>Good morning, Arjun</h1></div>
                    <div className="a-btns"><span className="a-btn o"><I n="file-text" />New quotation</span><span className="a-btn p"><I n="receipt-text" />New invoice</span></div>
                    <div className="a-mstats">
                      <div className="a-card a-stat"><span className="k">To collect</span><span className="v">₹8,42,600</span><span className="n w">₹1,18,400 overdue</span></div>
                      <div className="a-card a-stat"><span className="k">Received this month</span><span className="v">₹9,80,000</span><span className="n">14 payments</span></div>
                    </div>
                    <div className="a-card">
                      <div className="a-ch"><span className="a-ct">Who owes you most</span></div>
                      <div className="a-cc">
                        <div className="a-owe"><span><b>Neeladri Engineering</b><span>Oldest bill 38 days</span></span><span className="amt">₹2,86,000</span></div>
                        <div className="a-owe"><span><b>Ravula Pumps &amp; Motors</b><span>Oldest bill 2 days</span></span><span className="amt">₹1,47,736</span></div>
                        <div className="a-owe"><span><b>Pranava Packaging</b><span>Oldest bill 47 days</span></span><span className="amt">₹1,03,900</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fit>
            </div></div>
            <div className="float"><span className="ic ic-wa"><I n="message-circle" /></span><span><b>Invoice sent on WhatsApp</b><span className="s">INV-0142 · ₹1,47,736 · with UPI QR</span></span></div>
          </div>
        </div>
        <div className="hero-fade hero-desk"></div>
      </section>
    </>
  );
}
