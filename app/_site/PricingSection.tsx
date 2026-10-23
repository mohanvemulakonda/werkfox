'use client';

import { useState } from 'react';
import { PLANS, SIGNUP_URL } from './data';
import { I, Tile } from './ui';

/** Two plans, monthly or yearly (yearly = 10 months). Pro first: it is the free trial. */
export default function PricingSection({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const [yearly, setYearly] = useState(false);
  const H = heading;
  const p = PLANS;
  const per = yearly ? 'a year + GST' : 'a month + GST';
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-h">
          <span className="eyebrow">Pricing</span>
          <H>Two plans. Plain prices.</H>
          <p>Pay monthly, or yearly and get two months free. Prices are in rupees, plus 18% GST, and you get a GST invoice for your input credit.</p>
        </div>
        <div className="center">
          <div className="period" role="tablist">
            <button className={yearly ? '' : 'on'} onClick={() => setYearly(false)} role="tab" aria-selected={!yearly}>Monthly</button>
            <button className={yearly ? 'on' : ''} onClick={() => setYearly(true)} role="tab" aria-selected={yearly}>Yearly <span className="save">2 months free</span></button>
          </div>
        </div>
        <div className="plans">
          <div className="plan best">
            <span className="best-tag">Recommended · your free trial</span>
            <div><h3>Pro</h3><p className="for">For making, moving and stocking</p></div>
            <div>
              <div className="price"><span className="amt">{yearly ? p.pro.year : p.pro.month}</span><span className="per">{per}</span></div>
              <p className="price-sub">{yearly ? `Works out to ${p.pro.perMonthYearly} a month` : `or ${p.pro.year} a year`}</p>
            </div>
            <div className="limits"><span><I n="users" s="s" />{p.pro.users} users</span><span><I n="map-pin" s="s" />{p.pro.locations} locations</span></div>
            <ul>
              <li><I n="check" /><span><b>Everything in Standard,</b> plus:</span></li>
              <li className="app-li"><Tile icon="clipboard-list" tone="sky" size="sm" /><span>Sales orders</span></li>
              <li className="app-li"><Tile icon="factory" tone="violet" size="sm" /><span>Production</span></li>
              <li className="app-li"><Tile icon="boxes" tone="teal" size="sm" /><span>Inventory, stock by location</span></li>
              <li className="app-li"><Tile icon="shopping-cart" tone="amber" size="sm" /><span>Purchase: suppliers, orders, bills</span></li>
              <li className="app-li"><Tile icon="truck" tone="pink" size="sm" /><span>Dispatch and delivery challans</span></li>
              <li className="app-li"><Tile icon="warehouse" tone="indigo" size="sm" /><span>Warehouse: bins, batches, serials</span></li>
              <li className="app-li"><Tile icon="badge-check" tone="green" size="sm" /><span>Quality checks, holds and rejects</span></li>
              <li className="app-li"><Tile icon="wrench" tone="slate" size="sm" /><span>Maintenance: service due, breakdowns</span></li>
              <li className="app-li"><Tile icon="repeat" tone="violet" size="sm" /><span>Job work: challans, ITC-04 tables</span></li>
              <li className="app-li"><Tile icon="tag" tone="rose" size="sm" /><span>Price lists &amp; schemes</span></li>
              <li className="app-li"><Tile icon="map-pin" tone="blue" size="sm" /><span>Field sales: beats, orders at the shop</span></li>
              <li className="app-li"><Tile icon="network" tone="violet" size="sm" /><span>Distributors &amp; commissions: BV, payouts with TDS</span></li>
              <li className="app-li"><Tile icon="user-check" tone="cyan" size="sm" /><span>People &amp; attendance</span></li>
              <li className="app-li"><Tile icon="banknote" tone="green" size="sm" /><span>Payroll: salary, PF, ESI, payslips</span></li>
              <li className="app-li"><Tile icon="wrench" tone="rose" size="sm" /><span>Parts from stock on job cards</span></li>
            </ul>
            <a className="btn pri lg" href={SIGNUP_URL}>Try Pro free for 7 days</a>
          </div>
          <div className="plan">
            <div><h3>Standard</h3><p className="for">For selling and billing</p></div>
            <div>
              <div className="price"><span className="amt">{yearly ? p.standard.year : p.standard.month}</span><span className="per">{per}</span></div>
              <p className="price-sub">{yearly ? `Works out to ${p.standard.perMonthYearly} a month` : `or ${p.standard.year} a year`}</p>
            </div>
            <div className="limits"><span><I n="users" s="s" />{p.standard.users} users</span><span><I n="map-pin" s="s" />{p.standard.locations} location</span></div>
            <ul>
              <li><I n="check" /><span><b>GST invoices,</b> payments, credit notes and statements</span></li>
              <li><I n="check" /><span><b>Leads, follow-ups and quotations</b></span></li>
              <li><I n="check" /><span><b>Job cards</b> for repairs at your counter</span></li>
              <li><I n="check" /><span><b>Collections:</b> chase list, cheques, TDS</span></li>
              <li><I n="check" /><span>Customers, items and GST reports</span></li>
              <li><I n="check" /><span>Send on WhatsApp or email</span></li>
              <li><I n="check" /><span>Overdue reminders and a daily summary</span></li>
            </ul>
            <a className="btn sec lg" href={SIGNUP_URL}>Start free, pick Standard later</a>
          </div>
        </div>
        <div className="price-foot">
          <div className="row3"><span><I n="clock" s="s" />7 days of Pro, no card</span><span><I n="indian-rupee" s="s" />Pay by UPI or card</span><span><I n="refresh-cw" s="s" />Move up to Pro any time</span></div>
          <p>Your 7 free days include everything in Pro. Pick a plan when they end.</p>
        </div>
      </div>
    </section>
  );
}
