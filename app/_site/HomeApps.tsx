import Fit from './Fit';
import { I, Logo } from './ui';

/** The five app rows, each with a recreated product screen (invented company Vayura Fabtech). */
export default function HomeApps() {
  return (
    <>
      {/* 6. APP ROWS WITH SCREENS */}
      <section id="apps">
        <div className="wrap">
          <div className="sec-h">
            <span className="eyebrow">The apps</span>
            <h2>Everything from the first call to salary day</h2>
            <p>Seven apps are live today, on top of GST invoicing, customers, items and reports that every business gets.</p>
          </div>
          <div className="rows">

            {/* A. Sell */}
            <div className="row">
              <div className="copy">
                <div className="apptiles"><span className="tile xs tn-sky"><I n="file-pen" /></span><span className="nm">Quotations &amp; orders</span></div>
                <h3>Quote fast. Follow up on time. Win more orders.</h3>
                <p>Every enquiry, every quotation and every follow-up in one list, so no lead goes cold because someone forgot to call.</p>
                <ul className="ticks">
                  <li><span className="tk"><I n="check" /></span><span><b>Leads with a next follow-up date.</b> Today&apos;s calls are waiting for you when you open WerkFox.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Quotations with your logo and GST,</b> sent on WhatsApp or email.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Won?</b> One click turns it into a sales order or an invoice. No retyping.</span></li>
                </ul>
                <div className="planline"><span className="chip std">Standard</span>Sales orders come with <span className="chip pro">Pro</span></div>
              </div>
              <div className="visual">
                <div className="browser">
                  <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/quotations</span></div>
                  <Fit w={980} m={440}>
                    <div className="app">
                      <div className="a-page">
                        <div className="a-tb">
                          <div><div className="a-back">Quotations</div><h1>QT-0087 <span className="a-badge t-green">Won</span></h1></div>
                          <div className="a-btns"><span className="a-btn o"><I n="message-circle" />Send</span><span className="a-btn o"><I n="clipboard-list" />Make sales order</span><span className="a-btn p"><I n="receipt-text" />Turn into invoice</span></div>
                        </div>
                        <div className="a-card"><div className="a-cc">
                          <dl className="a-kv"><dt>Customer</dt><dd><b>Ravula Pumps &amp; Motors</b> · 36AAHFR4417K1Z2</dd><dt>Quote date</dt><dd>14 Oct 2026 · valid till 28 Oct</dd><dt>Place of supply</dt><dd>Telangana (CGST + SGST)</dd></dl>
                        </div></div>
                        <div className="a-card"><div className="a-cc">
                          <table className="a-t mq"><thead><tr><th>Item</th><th>HSN</th><th className="r">Qty</th><th className="r">Rate</th><th className="r">GST</th><th className="r">Amount</th></tr></thead><tbody>
                            <tr><td className="b">MS base frame, 6 mm<span className="sub">Fabricated, primer coat</span></td><td>7308</td><td className="r">40 pcs</td><td className="r">₹2,150</td><td className="r">18%</td><td className="r">₹86,000</td></tr>
                            <tr><td className="b">Pump coupling guard<span className="sub">2 mm sheet, powder coated</span></td><td>7326</td><td className="r">40 pcs</td><td className="r">₹650</td><td className="r">18%</td><td className="r">₹26,000</td></tr>
                            <tr><td className="b">Laser cutting<span className="sub">Job work charges</span></td><td>9988</td><td className="r">12 hour</td><td className="r">₹1,100</td><td className="r">18%</td><td className="r">₹13,200</td></tr>
                          </tbody></table>
                          <div className="a-tot mt16"><span className="a-mut">Sub total</span><span className="r">₹1,25,200</span><span className="a-mut">CGST 9%</span><span className="r">₹11,268</span><span className="a-mut">SGST 9%</span><span className="r">₹11,268</span><span className="big">Total</span><span className="r big">₹1,47,736</span></div>
                        </div></div>
                      </div>
                    </div>
                  </Fit>
                </div>
              </div>
            </div>

            {/* B. Make */}
            <div className="row flip">
              <div className="copy">
                <div className="apptiles"><span className="tile xs tn-violet"><I n="factory" /></span><span className="tile xs tn-teal"><I n="boxes" /></span><span className="tile xs tn-amber"><I n="shopping-cart" /></span><span className="nm">Production, Inventory, Purchase</span></div>
                <h3>Know what is being made, and what it used.</h3>
                <p>Plan the job, record output on the shop floor, and let stock keep itself up to date.</p>
                <ul className="ticks">
                  <li><span className="tk"><I n="check" /></span><span><b>Plan production</b> from a sales order or for stock, by machine or line.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Record output as it is made.</b> Finished goods go into stock and the materials come out, from the bill of materials.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>See what is behind plan</b> before the customer calls to ask.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Stock by location,</b> suppliers, purchase orders, goods received and what you owe them.</span></li>
                </ul>
                <div className="planline"><span className="chip pro">Pro</span></div>
              </div>
              <div className="visual">
                <div className="browser">
                  <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/production</span></div>
                  <Fit w={940} m={480}>
                    <div className="app">
                      <div className="a-page">
                        <div className="a-tb"><h1>Production</h1><div className="a-btns"><span className="a-btn p"><I n="plus" />Plan production</span></div></div>
                        <div className="a-stats">
                          <div className="a-card a-stat"><span className="k">Running</span><span className="v">3</span><span className="n">production orders</span></div>
                          <div className="a-card a-stat"><span className="k">Planned</span><span className="v">1</span></div>
                          <div className="a-card a-stat"><span className="k">Made this week</span><span className="v">2,860 pcs</span></div>
                          <div className="a-card a-stat"><span className="k">Behind plan</span><span className="v">1</span></div>
                        </div>
                        <div className="a-filters"><span className="a-in"><I n="search" />Search by number, item or machine</span><span className="a-seg"><span className="on">Planned and running</span><span>Behind plan</span><span>Done</span><span>All</span></span></div>
                        <div className="a-card"><div className="a-cc"><table className="a-t mp"><thead><tr><th>Number</th><th>Makes</th><th>For order</th><th>Planned</th><th>Made</th><th>Machine / line</th><th>Finish by</th><th>Status</th></tr></thead><tbody>
                          <tr><td className="b">PRD-0037</td><td>Gear box mounting base</td><td>SO-0059</td><td>30 pcs</td><td>12 pcs</td><td>Welding bay 1</td><td>27 Oct</td><td><span className="a-badge t-blue">Running</span></td></tr>
                          <tr><td className="b">PRD-0036</td><td>Conveyor idler frame</td><td>SO-0060</td><td>120 pcs</td><td>48 pcs</td><td>Welding bay 2</td><td>28 Oct</td><td><span className="a-badge t-blue">Running</span></td></tr>
                          <tr><td className="b">PRD-0032</td><td>Motor mounting plate</td><td>For stock</td><td>500 pcs</td><td>310 pcs</td><td>CNC 1</td><td>24 Oct</td><td><span className="a-badge t-blue">Running</span></td></tr>
                          <tr><td className="b">PRD-0030</td><td>Conveyor roller bracket</td><td>SO-0054</td><td>1,200 pcs</td><td>880 pcs</td><td>Press line</td><td>19 Oct</td><td><span className="a-badge t-red">Behind plan</span></td></tr>
                          <tr><td className="b">PRD-0035</td><td>Hopper side panel</td><td>SO-0061</td><td>60 pcs</td><td>0 pcs</td><td>Laser</td><td>30 Oct</td><td><span className="a-badge t-grey">Planned</span></td></tr>
                        </tbody></table></div></div>
                      </div>
                    </div>
                  </Fit>
                </div>
              </div>
            </div>

            {/* C. Deliver */}
            <div className="row">
              <div className="copy">
                <div className="apptiles"><span className="tile xs tn-pink"><I n="truck" /></span><span className="nm">Dispatch</span></div>
                <h3>Every truck leaves with the right challan.</h3>
                <p>Delivery from the sales order, stock out at the same moment, and nothing delivered goes unbilled.</p>
                <ul className="ticks">
                  <li><span className="tk"><I n="check" /></span><span><b>Press Deliver on a sales order.</b> The goods come out of stock and the challan prints in triplicate.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Vehicle and driver on every challan,</b> and a live list of what is on the way.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Delivered but not invoiced?</b> WerkFox shows it, so no load is forgotten.</span></li>
                </ul>
                <div className="planline"><span className="chip pro">Pro</span></div>
              </div>
              <div className="visual">
                <div className="browser">
                  <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/dispatch</span></div>
                  <Fit w={1000} m={440}>
                    <div className="app">
                      <div className="a-page">
                        <div className="a-tb"><h1>Dispatch</h1><div className="a-btns"><span className="a-btn p"><I n="plus" />New challan</span></div></div>
                        <div className="a-stats">
                          <div className="a-card a-stat"><span className="k">Challans today</span><span className="v">3</span><span className="n">1 delivered</span></div>
                          <div className="a-card a-stat"><span className="k">On the way</span><span className="v">2</span><span className="n">2 vehicles</span></div>
                          <div className="a-card a-stat"><span className="k">Delivered this week</span><span className="v">9</span></div>
                          <div className="a-card a-stat"><span className="k">Waiting to invoice</span><span className="v">2</span><span className="n w">challans</span></div>
                        </div>
                        <div className="a-card"><div className="a-cc"><table className="a-t md"><thead><tr><th>Challan</th><th>Customer</th><th>Vehicle</th><th>Driver</th><th>Goods</th><th>Date</th><th>Status</th></tr></thead><tbody>
                          <tr><td className="b">DC-0072<span className="sub">SO-0058</span></td><td>Ravula Pumps &amp; Motors<span className="sub">Medchal, Hyderabad</span></td><td>TS 08 UB 4417</td><td>Srinu</td><td>40 pcs MS base frame, 40 pcs Pump coupling guard</td><td>22 Oct</td><td><span className="a-badge t-blue">On the way</span></td></tr>
                          <tr><td className="b">DC-0071<span className="sub">SO-0056</span></td><td>Kondapur Agro Foods<span className="sub">Guntur</span></td><td>AP 07 TC 2290</td><td>Mahesh</td><td>120 pcs Conveyor roller bracket</td><td>22 Oct</td><td><span className="a-badge t-blue">On the way</span></td></tr>
                          <tr><td className="b">DC-0070<span className="sub">SO-0055</span></td><td>Neeladri Engineering<span className="sub">Patancheru</span></td><td>TS 15 EK 7781</td><td>Raju</td><td>8 pcs Hopper side panel</td><td>22 Oct</td><td><span className="a-badge t-green">Delivered</span></td></tr>
                          <tr><td className="b">DC-0069<span className="sub">SO-0053</span></td><td>Godavari Alloy Castings<span className="sub">Rajahmundry</span></td><td>AP 05 BX 1102</td><td>Venkat</td><td>300 pcs Motor mounting plate</td><td>20 Oct</td><td><span className="a-badge t-green">Delivered, invoiced</span></td></tr>
                        </tbody></table></div></div>
                      </div>
                    </div>
                  </Fit>
                </div>
              </div>
            </div>

            {/* D. Get paid */}
            <div className="row flip">
              <div className="copy">
                <div className="apptiles"><span className="tile xs tn-orange"><I n="receipt-text" /></span><span className="nm">Invoicing, every plan</span></div>
                <h3>GST invoices that get paid sooner.</h3>
                <p>A proper tax invoice in under a minute, sent where your customer actually reads it.</p>
                <ul className="ticks">
                  <li><span className="tk"><I n="check" /></span><span><b>CGST + SGST or IGST</b> worked out from your customer&apos;s state. HSN, place of supply and amount in words on the page.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>A UPI QR for the amount due</b> prints on every invoice, with your bank details.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Send on WhatsApp or email.</b> Payments, credit notes and customer statements in the same place.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Reminds you about e-way bills</b> when an invoice for goods is above ₹50,000.</span></li>
                </ul>
                <div className="planline"><span className="chip std">Standard</span><span className="chip pro">Pro</span></div>
              </div>
              <div className="visual">
                <div className="paper-wrap">
                  <Fit w={720}>
                    <div>
                      <div className="paper">
                        <div className="pd-top">
                          <div className="pd-co"><span className="pd-logo"><Logo k="vy" size="s44" /></span><span><b>Vayura Fabtech Pvt Ltd</b><span>Plot 14, IDA Cherlapally, Hyderabad 500051</span><span>GSTIN 36AAKFV5512M1Z8</span></span></div>
                          <div><div className="pd-title">TAX INVOICE</div><div className="pd-copy">Original for recipient</div></div>
                        </div>
                        <div className="pd-two">
                          <div><dl className="pd-kv"><dt>Invoice No.</dt><dd>INV-0142</dd><dt>Invoice Date</dt><dd>20 Oct 2026</dd><dt>Due Date</dt><dd>19 Nov 2026</dd><dt>Place of supply</dt><dd>Telangana (36)</dd></dl></div>
                          <div><div className="pd-bar">Bill To</div><dl className="pd-kv"><dt>Name</dt><dd>Ravula Pumps &amp; Motors</dd><dt>GSTIN</dt><dd>36AAHFR4417K1Z2</dd><dt>Address</dt><dd>Medchal, Hyderabad</dd></dl></div>
                        </div>
                        <table className="pd-t"><thead><tr><th>#</th><th>Item &amp; Description</th><th>HSN/SAC</th><th className="r">Qty</th><th className="r">Rate</th><th className="r">GST %</th><th className="r">Amount</th></tr></thead><tbody>
                          <tr><td>1</td><td>MS base frame, 6 mm<small>Fabricated, primer coat</small></td><td>7308</td><td className="r">40</td><td className="r">2,150.00</td><td className="r">18</td><td className="r">86,000.00</td></tr>
                          <tr><td>2</td><td>Pump coupling guard<small>2 mm sheet, powder coated</small></td><td>7326</td><td className="r">40</td><td className="r">650.00</td><td className="r">18</td><td className="r">26,000.00</td></tr>
                          <tr><td>3</td><td>Laser cutting<small>Job work charges</small></td><td>9988</td><td className="r">12</td><td className="r">1,100.00</td><td className="r">18</td><td className="r">13,200.00</td></tr>
                        </tbody></table>
                        <div className="pd-foot">
                          <div className="pd-bank"><span className="pd-qr"><i /></span><span><b>Bank Details</b><br />A/c No : 50200012345678<br />IFSC : HDFC0001234<br />UPI : vayurafabtech@hdfcbank<br /><span className="pd-copy left">Scan to pay ₹1,47,736</span></span></div>
                          <div className="pd-tot"><span>Sub Total</span><span className="r">1,25,200.00</span><span>CGST 9%</span><span className="r">11,268.00</span><span>SGST 9%</span><span className="r">11,268.00</span><span className="big">Total</span><span className="r big">₹1,47,736.00</span><span>Balance Due</span><span className="r">₹1,47,736.00</span></div>
                        </div>
                        <div className="pd-made">Made with WerkFox</div>
                      </div>
                    </div>
                  </Fit>
                  <div className="wa-card">
                    <div className="app a-dlg">
                      <h4>Send INV-0142</h4>
                      <div className="msg">Dear Ravula Pumps, please find invoice INV-0142 for ₹1,47,736. You can view and pay it here: app.werkfox.com/d/…</div>
                      <div className="row2"><span className="a-btn o"><I n="mail" />Email</span><span className="a-btn wa"><I n="message-circle" />WhatsApp</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E. People & payroll */}
            <div className="row" id="people">
              <div className="copy">
                <div className="apptiles"><span className="tile xs tn-cyan"><I n="user-check" /></span><span className="tile xs tn-green"><I n="banknote" /></span><span className="nm">People &amp; attendance, Payroll</span><span className="chip pro">New</span></div>
                <h3>Salary day without the calculator.</h3>
                <p>From the attendance register to printed payslips, for staff on a salary, a daily wage or piece rate.</p>
                <ul className="ticks">
                  <li><span className="tk"><I n="check" /></span><span><b>Mark the whole crew at once.</b> Everyone not marked is present; overtime by the hour.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>Monthly, daily or piece rate,</b> with advances taken back a bit each month.</span></li>
                  <li><span className="tk"><I n="check" /></span><span><b>PF, ESI and professional tax</b> worked out. Check it, lock the month, mark it paid and print payslips.</span></li>
                </ul>
                <div className="planline"><span className="chip pro">Pro</span>Only the owner and admins see pay.</div>
              </div>
              <div className="visual">
                <div className="browser">
                  <div className="bar"><i /><i /><i /><span className="url"><I n="lock" />app.werkfox.com/salary</span></div>
                  <Fit w={1100} m={440}>
                    <div className="app">
                      <div className="a-page">
                        <div className="a-tb"><div><div className="a-back">Salary</div><h1>October 2026 <span className="a-badge t-amber">Draft</span></h1></div><div className="a-btns"><span className="a-btn o"><I n="refresh-cw" />Work out again</span><span className="a-btn p"><I n="lock" />Lock this month</span></div></div>
                        <div className="a-card"><div className="a-cc"><table className="a-t ms"><thead><tr><th>Person</th><th>Pay</th><th className="r">Days</th><th className="r">OT h</th><th className="r">Pieces</th><th className="r">Gross</th><th className="r">PF</th><th className="r">ESI</th><th className="r">Prof. tax</th><th className="r">Advance</th><th className="r">Net pay</th></tr></thead><tbody>
                          <tr><td className="b">Ramesh Yadav<span className="sub">Welder</span></td><td>₹18,000 / month</td><td className="r">26</td><td className="r">14</td><td className="r"></td><td className="r">₹19,940</td><td className="r">₹1,800</td><td className="r">₹150</td><td className="r">₹150</td><td className="r">₹1,000</td><td className="r b">₹16,840</td></tr>
                          <tr><td className="b">Lakshmi Devi<span className="sub">Packing</span></td><td>₹520 / day</td><td className="r">24</td><td className="r">6</td><td className="r"></td><td className="r">₹12,870</td><td className="r">₹1,544</td><td className="r">₹97</td><td className="r">₹0</td><td className="r">₹0</td><td className="r b">₹11,229</td></tr>
                          <tr><td className="b">Imran Shaikh<span className="sub">Press operator</span></td><td>₹2.40 / piece</td><td className="r">25</td><td className="r">0</td><td className="r">6,200</td><td className="r">₹14,880</td><td className="r">₹1,786</td><td className="r">₹112</td><td className="r">₹0</td><td className="r">₹2,000</td><td className="r b">₹10,982</td></tr>
                          <tr><td className="b">Suresh Babu<span className="sub">Supervisor</span></td><td>₹32,000 / month</td><td className="r">26</td><td className="r">0</td><td className="r"></td><td className="r">₹32,000</td><td className="r">₹1,800</td><td className="r">₹0</td><td className="r">₹200</td><td className="r">₹0</td><td className="r b">₹30,000</td></tr>
                        </tbody></table></div></div>
                      </div>
                    </div>
                  </Fit>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
