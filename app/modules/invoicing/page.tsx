import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';
import { Invoice, Receipt, CheckCircleFilled, ArrowRight, Analytics, Mail, Shield, Globe, Database, Download } from '../../components/Icons';

export default function InvoicingModule() {
  const features = [
    {
      title: 'Professional Invoicing',
      description: 'Create beautiful, professional invoices with your branding, custom fields, and multiple templates.',
      items: ['Custom invoice templates', 'Logo and branding', 'Multi-currency support', 'Recurring invoices']
    },
    {
      title: 'Payment Tracking',
      description: 'Track payments, send reminders, and manage accounts receivable with automated workflows.',
      items: ['Payment recording', 'Automatic reminders', 'Partial payments', 'Payment history']
    },
    {
      title: 'GST & Tax Compliance',
      description: 'Built-in GST calculation, e-invoicing support, and compliance with Indian tax regulations.',
      items: ['GST calculation', 'E-invoicing (IRN)', 'E-way bill generation', 'GSTR reports']
    },
    {
      title: 'Credit Management',
      description: 'Manage customer credit limits, track outstanding amounts, and handle credit notes.',
      items: ['Credit limit tracking', 'Aging analysis', 'Credit notes', 'Debit notes']
    }
  ];

  const capabilities = [
    { icon: Receipt, title: 'Quote to Invoice', desc: 'Convert quotes to invoices with one click' },
    { icon: Mail, title: 'Email Delivery', desc: 'Send invoices directly via email with tracking' },
    { icon: Globe, title: 'Online Payments', desc: 'Accept payments via Razorpay, PayU, UPI' },
    { icon: Shield, title: 'GST Compliant', desc: 'Automatic GST calculation and filing support' },
    { icon: Database, title: 'Accounting Sync', desc: 'Auto-post to general ledger and AR' },
    { icon: Download, title: 'Export Reports', desc: 'Download statements and aging reports' }
  ];

  const metrics = [
    { value: '50%', label: 'Faster Invoicing' },
    { value: '35%', label: 'Improved Collection' },
    { value: '100%', label: 'GST Compliant' },
    { value: '0', label: 'Manual Errors' }
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                  <Invoice size={16} />
                  <span>Invoicing Module</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
                  Get paid faster with smart invoicing
                </h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Create professional invoices, track payments, and stay GST compliant with invoicing tools designed for Indian businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="cta-button">
                    Start Free Trial
                    <ArrowRight size={20} />
                  </Link>
                  <Link href="/contact" className="cta-secondary">
                    Request Demo
                  </Link>
                </div>
              </div>
              <div className="card-glass p-8">
                <div className="aspect-video bg-[var(--surface)] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Invoice size={64} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">Invoice Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 bg-[var(--text-primary)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-semibold text-white mb-2">{metric.value}</div>
                  <p className="text-white/60 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">KEY FEATURES</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Everything for billing and payments
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                From invoice creation to payment collection and tax compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card-glass p-8">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircleFilled size={20} className="text-[var(--color-success)] flex-shrink-0" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">CAPABILITIES</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Streamline your billing process
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, index) => (
                <div key={index} className="card-glass p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--text-primary)] flex items-center justify-center flex-shrink-0">
                    <cap.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GST Compliance */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="card-glass p-8">
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">E-Invoice Generation</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Auto</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">Generate IRN automatically via NIC portal</p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">E-Way Bill</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Auto</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">Auto-generate e-way bills for shipments</p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">GSTR Reports</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Ready</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">GSTR-1, GSTR-3B reports ready for filing</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">GST COMPLIANCE</p>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                  Stay compliant, effortlessly
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Built-in GST compliance features ensure your invoices meet all regulatory requirements without manual intervention.
                </p>
                <ul className="space-y-4">
                  {[
                    'Automatic GSTIN validation',
                    'HSN/SAC code management',
                    'E-invoicing with QR codes',
                    'GSTR-1 and GSTR-3B generation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleFilled size={20} className="text-[var(--color-success)] flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-panel p-10 text-center">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Connected to your workflows
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Invoicing integrates with Sales for order-to-invoice conversion and with Analytics for financial reporting.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/modules/crm" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Sales & CRM
                </Link>
                <Link href="/modules/inventory" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Inventory
                </Link>
                <Link href="/modules/analytics" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[var(--text-primary)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Ready to streamline invoicing?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Start your free trial and get paid faster with professional invoicing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="cta-button">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
