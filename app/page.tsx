import type { Metadata } from 'next';
import HomePage from './_site/HomePage';

export const metadata: Metadata = {
  title: { absolute: 'WerkFox: run your whole factory from one app' },
  description: "Quotations, production, stock, dispatch, GST invoices and salary, all connected. Made for India's small factories and traders. Try Pro free for 7 days, no card needed.",
  alternates: { canonical: 'https://werkfox.com' },
};

export default function Page() {
  return <HomePage />;
}
