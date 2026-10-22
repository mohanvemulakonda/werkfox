import Link from 'next/link';
import { I } from './ui';

/** FAQ: seven straight answers. */
export default function Faq() {
  return (
    <>
      {/* 11. FAQ */}
      <section className="alt" id="faq">
        <div className="wrap">
          <div className="sec-h"><span className="eyebrow">Questions</span><h2>Good questions, straight answers</h2></div>
          <div className="faq">
            <details open><summary>Do I need to install anything?<I n="plus" /></summary><p>No. WerkFox runs in the browser on your computer and on your phone. Sign in at app.werkfox.com with Google or your email.</p></details>
            <details><summary>What happens when the 7 free days end?<I n="plus" /></summary><p>Pick Pro or Standard, monthly or yearly, from Billing inside WerkFox. We email you a payment link for UPI or card within one working day, and your plan switches on as soon as it is paid. If you pick Standard, the Pro apps lock: their screens show what Pro adds, and nothing you entered in them is deleted. Move up to Pro later and it is all there.</p></details>
            <details><summary>Is GST included in the price?<I n="plus" /></summary><p>No. Pro is ₹1,999 and Standard is ₹999 a month, plus 18% GST. Yearly is the price of 10 months. You get a GST invoice from us, so you can claim the input credit.</p></details>
            <details><summary>Does WerkFox make e-invoices or e-way bills?<I n="plus" /></summary><p>Not yet. Invoices carry everything GST needs, and WerkFox reminds you when an invoice for goods is above ₹50,000 and needs an e-way bill, which you make on the government portal.</p></details>
            <details><summary>Can I bring my customers and items from Excel?<I n="plus" /></summary><p>Yes. Import customers and items from an Excel or CSV file, up to 2,000 rows at a time. Rows with a mistake come back with the reason, so you can fix them and try again.</p></details>
            <details><summary>Is it right for my trade?<I n="plus" /></summary><p>If you make, trade or stock goods, yes: those apps are live today, with quality checks, racks and bins, and machine maintenance. Repair businesses can run job cards now. Transport, construction, consulting and field service businesses can bill, quote and run payroll, and transport and construction can look after their vehicles and machines; their own apps are coming. See <Link href="/#trades" className="grad-t">Pick your trade</Link>.</p></details>
            <details><summary>Who can see salaries?<I n="plus" /></summary><p>Only the owner and admins. Everyone else on your team can still mark attendance, without seeing anyone&apos;s pay.</p></details>
          </div>
        </div>
      </section>
    </>
  );
}
