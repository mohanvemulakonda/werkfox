import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';
import { Production, Cog, Calendar, CheckCircleFilled, ArrowRight, Analytics, Inventory, Clock, Users } from '../../components/Icons';

export default function ProductionModule() {
  const features = [
    {
      title: 'Bill of Materials (BOM)',
      description: 'Create multi-level BOMs with components, sub-assemblies, and operations for accurate production planning.',
      items: ['Multi-level BOM structure', 'Component substitutions', 'Version control', 'Cost roll-up']
    },
    {
      title: 'Work Order Management',
      description: 'Create, track, and manage work orders from planning through completion with real-time status updates.',
      items: ['Work order creation', 'Material reservation', 'Operation tracking', 'Completion reporting']
    },
    {
      title: 'Production Scheduling',
      description: 'Schedule production runs based on capacity, material availability, and delivery deadlines.',
      items: ['Capacity planning', 'Resource allocation', 'Gantt chart view', 'Constraint handling']
    },
    {
      title: 'Shop Floor Control',
      description: 'Track production progress in real-time with barcode scanning and operator workstations.',
      items: ['Barcode scanning', 'Time tracking', 'Quality checkpoints', 'Operator assignments']
    }
  ];

  const capabilities = [
    { icon: Cog, title: 'Routing & Operations', desc: 'Define production routes with work centers and operations' },
    { icon: Calendar, title: 'MRP Planning', desc: 'Material requirements planning for demand forecasting' },
    { icon: Clock, title: 'Time Tracking', desc: 'Track labor hours and machine time per operation' },
    { icon: Users, title: 'Team Management', desc: 'Assign operators and track workload' },
    { icon: Analytics, title: 'Production Reports', desc: 'OEE, yield, and efficiency analytics' },
    { icon: Inventory, title: 'Material Consumption', desc: 'Automatic stock deduction on completion' }
  ];

  const metrics = [
    { value: '30%', label: 'Improved OEE' },
    { value: '45%', label: 'Less Downtime' },
    { value: '25%', label: 'Faster Throughput' },
    { value: '99%', label: 'On-Time Delivery' }
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                  <Production size={16} />
                  <span>Production Module</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
                  Streamline your manufacturing operations
                </h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Plan production, manage work orders, and track shop floor progress with tools built specifically for manufacturers.
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
                    <Production size={64} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">Production Dashboard Preview</p>
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
                Complete production management
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                From BOM creation to finished goods, manage every step of manufacturing
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
                Advanced manufacturing tools
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

        {/* Process Flow */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">WORKFLOW</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                End-to-end production workflow
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Plan', desc: 'Create production plan based on demand' },
                { step: '2', title: 'Schedule', desc: 'Allocate resources and set timelines' },
                { step: '3', title: 'Execute', desc: 'Track progress on the shop floor' },
                { step: '4', title: 'Complete', desc: 'Record output and update inventory' }
              ].map((item, index) => (
                <div key={index} className="card-glass p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--werkfox-primary)] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-panel p-10 text-center">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Integrated with your operations
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Production connects with Inventory for material availability and CRM for demand-driven planning.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/modules/inventory" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Inventory
                </Link>
                <Link href="/modules/crm" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Sales & CRM
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
              Ready to optimize production?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Start your free trial and experience smarter manufacturing operations.
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
