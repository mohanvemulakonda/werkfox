import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';
import { Inventory, Warehouse, Truck, CheckCircleFilled, ArrowRight, Database, Shield, Analytics } from '../../components/Icons';

export default function InventoryModule() {
  const features = [
    {
      title: 'Multi-Warehouse Management',
      description: 'Manage inventory across multiple warehouses, zones, and bins with real-time visibility into stock levels at each location.',
      items: ['Unlimited warehouse locations', 'Zone and bin tracking', 'Inter-warehouse transfers', 'Location-based picking']
    },
    {
      title: 'Batch & Serial Tracking',
      description: 'Track products by batch numbers or serial numbers for complete traceability from receipt to delivery.',
      items: ['Batch number management', 'Serial number tracking', 'Expiry date monitoring', 'FIFO/LIFO enforcement']
    },
    {
      title: 'Stock Alerts & Reordering',
      description: 'Never run out of stock with intelligent reorder point alerts and automated purchase order generation.',
      items: ['Reorder point alerts', 'Safety stock levels', 'Auto-generate POs', 'Demand forecasting']
    },
    {
      title: 'Stock Adjustments',
      description: 'Handle stock corrections, write-offs, and adjustments with full audit trail and approval workflows.',
      items: ['Stock count adjustments', 'Write-off management', 'Audit trail logging', 'Approval workflows']
    }
  ];

  const capabilities = [
    { icon: Warehouse, title: 'Warehouse Operations', desc: 'Receiving, putaway, picking, packing, and shipping workflows' },
    { icon: Truck, title: 'Stock Movements', desc: 'Track every movement with automatic journal entries' },
    { icon: Database, title: 'Real-time Sync', desc: 'Instant updates across all connected systems and users' },
    { icon: Shield, title: 'Audit Compliance', desc: 'Complete history of all stock transactions for audits' },
    { icon: Analytics, title: 'Inventory Reports', desc: 'Stock valuation, aging analysis, and movement reports' },
    { icon: Inventory, title: 'BOM Integration', desc: 'Automatic stock reservation for production orders' }
  ];

  const metrics = [
    { value: '99.8%', label: 'Inventory Accuracy' },
    { value: '40%', label: 'Reduction in Stockouts' },
    { value: '25%', label: 'Lower Carrying Costs' },
    { value: '60%', label: 'Faster Cycle Counts' }
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                  <Inventory size={16} />
                  <span>Inventory Module</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
                  Complete inventory control at your fingertips
                </h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Track raw materials, work-in-progress, and finished goods across multiple warehouses with real-time visibility, batch tracking, and intelligent reorder alerts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sign-up" className="cta-button">
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
                    <Inventory size={64} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">Inventory Dashboard Preview</p>
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
                Everything you need for inventory management
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                From basic stock tracking to advanced warehouse operations
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
                Built for manufacturing complexity
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

        {/* Integration */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-panel p-10 text-center">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Seamlessly integrated
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Inventory connects with Production, Sales, and Purchasing modules for end-to-end visibility across your operations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/modules/production" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Production Planning
                </Link>
                <Link href="/modules/crm" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Sales & CRM
                </Link>
                <Link href="/modules/invoicing" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Invoicing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[var(--text-primary)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Ready to optimize your inventory?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Start your free trial today and see the difference real-time inventory control makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up" className="cta-button">
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
