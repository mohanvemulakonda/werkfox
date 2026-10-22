import { I } from './ui';

/** Proof strip (true facts only) and the problem / answer cards with the one-order flow. */
export default function HomeWhy() {
  return (
    <>
      {/* 3. PROOF STRIP: true facts, no numbers made up */}
      <div className="strip">
        <div className="wrap">
          <h2>Made for how Indian businesses bill, ship and pay</h2>
          <div className="facts">
            <div className="fact"><span className="fi"><I n="indian-rupee" /></span><b>GST done right</b><span>CGST + SGST or IGST, picked from your customer&apos;s state.</span></div>
            <div className="fact"><span className="fi"><I n="qr-code" /></span><b>UPI QR on every bill</b><span>For the exact amount due, so customers pay in seconds.</span></div>
            <div className="fact"><span className="fi"><I n="message-circle" /></span><b>WhatsApp or email</b><span>Send quotations, invoices and challans in one tap.</span></div>
            <div className="fact"><span className="fi"><I n="file-spreadsheet" /></span><b>GSTR-1 and 3B ready</b><span>Returns figures as files that open in Excel.</span></div>
            <div className="fact"><span className="fi"><I n="monitor-smartphone" /></span><b>Computer or phone</b><span>Nothing to install. Works in the browser.</span></div>
          </div>
        </div>
      </div>

      {/* 4. PROBLEM -> ANSWER, and the one-order flow */}
      <section>
        <div className="wrap">
          <div className="sec-h">
            <span className="eyebrow">Why WerkFox</span>
            <h2>Stop running the business from five places</h2>
            <p>Orders on WhatsApp, stock in a register, bills in one software and salary on a calculator. WerkFox puts it in one place, so everyone works from the same numbers.</p>
          </div>
          <div className="pains">
            <div className="pain"><span className="was">Typing the same order three times</span><h3>Type it once</h3><p>A won quotation becomes a sales order, then a challan, then an invoice. Customer, items, rates and GST carry across.</p></div>
            <div className="pain"><span className="was">&quot;Who still owes us?&quot;</span><h3>Know every morning</h3><p>Home shows what is to collect, what is overdue and who owes you most. Overdue reminders can go out by email, and you get a daily summary at 9:30 every morning.</p></div>
            <div className="pain"><span className="was">Month-end on a calculator</span><h3>Salary works itself out</h3><p>Attendance, overtime, advances, PF, ESI and professional tax are added up for you. Lock the month and print payslips.</p></div>
          </div>
          <div className="flow" aria-label="One order from lead to payment">
            <div className="fstep"><span className="tile tn-sky"><I n="user-plus" /></span><b>Lead</b><span>With the next follow-up date</span></div>
            <div className="fstep"><span className="tile tn-sky"><I n="file-pen" /></span><b>Quotation</b><span>Sent on WhatsApp</span></div>
            <div className="fstep"><span className="tile tn-blue"><I n="clipboard-list" /></span><b>Sales order</b><span>One click when it is won</span></div>
            <div className="fstep"><span className="tile tn-violet"><I n="factory" /></span><b>Production</b><span>Materials out, goods in</span></div>
            <div className="fstep"><span className="tile tn-pink"><I n="truck" /></span><b>Challan</b><span>Printed in triplicate</span></div>
            <div className="fstep"><span className="tile tn-orange"><I n="receipt-text" /></span><b>GST invoice</b><span>With a UPI QR</span></div>
            <div className="fstep"><span className="tile tn-green"><I n="wallet" /></span><b>Payment</b><span>Matched to the bill</span></div>
          </div>
          <p className="flow-note">One order, typed once, from the first call to the money in the bank.</p>
        </div>
      </section>
    </>
  );
}
