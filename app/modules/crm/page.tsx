import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';
import { CRM, Users, Mail, Phone, CheckCircleFilled, ArrowRight, Target, Calendar, Analytics, Chat } from '../../components/Icons';

export default function CRMModule() {
  const features = [
    {
      title: 'Lead Management',
      description: 'Capture leads from multiple sources, qualify them with custom criteria, and nurture them through automated workflows.',
      items: ['Web form integration', 'Lead scoring & qualification', 'Automated lead assignment', 'Follow-up reminders']
    },
    {
      title: 'Sales Pipeline',
      description: 'Visualize your entire sales process with customizable pipeline stages and deal tracking.',
      items: ['Drag-and-drop pipeline', 'Custom deal stages', 'Win probability tracking', 'Revenue forecasting']
    },
    {
      title: 'Contact Management',
      description: 'Maintain a complete 360-degree view of every customer with interaction history and communication logs.',
      items: ['Unified contact profiles', 'Interaction timeline', 'Communication history', 'Custom fields & tags']
    },
    {
      title: 'Activity Management',
      description: 'Schedule and track calls, meetings, tasks, and follow-ups to never miss an opportunity.',
      items: ['Task scheduling', 'Call logging', 'Meeting management', 'Activity reminders']
    }
  ];

  const capabilities = [
    { icon: Target, title: 'Deal Tracking', desc: 'Monitor every opportunity from first contact to closed deal' },
    { icon: Mail, title: 'Email Integration', desc: 'Sync emails, track opens, and use templates' },
    { icon: Phone, title: 'Call Management', desc: 'Log calls, record notes, and schedule callbacks' },
    { icon: Calendar, title: 'Scheduling', desc: 'Calendar sync and appointment management' },
    { icon: Analytics, title: 'Sales Analytics', desc: 'Performance dashboards and conversion reports' },
    { icon: Chat, title: 'Team Collaboration', desc: 'Share notes, mentions, and deal updates' }
  ];

  const metrics = [
    { value: '35%', label: 'More Leads Converted' },
    { value: '50%', label: 'Faster Response Time' },
    { value: '2x', label: 'Sales Productivity' },
    { value: '100%', label: 'Visibility into Pipeline' }
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                  <CRM size={16} />
                  <span>CRM Module</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
                  Build stronger customer relationships
                </h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Manage leads, track opportunities, and close more deals with a CRM designed specifically for manufacturing businesses.
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
                    <CRM size={64} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">CRM Dashboard Preview</p>
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
                Everything you need to grow sales
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                From lead capture to deal closure, manage every step of your sales process
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
                Tools to accelerate your sales
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

        {/* Quote to Order */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">QUOTE TO ORDER</p>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                  From quote to order in clicks
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Create professional quotes, get customer approval, and convert to sales orders instantly. The entire quote-to-cash process in one seamless workflow.
                </p>
                <ul className="space-y-4">
                  {[
                    'Professional quote templates',
                    'E-signature and approval tracking',
                    'One-click conversion to sales order',
                    'Automatic inventory reservation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleFilled size={20} className="text-[var(--color-success)] flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-glass p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-[var(--surface)] rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Create Quote</p>
                      <p className="text-sm text-[var(--text-secondary)]">Build professional quotes with your products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[var(--surface)] rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 font-semibold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Get Approval</p>
                      <p className="text-sm text-[var(--text-secondary)]">Send for review and e-signature</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[var(--surface)] rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Convert to Order</p>
                      <p className="text-sm text-[var(--text-secondary)]">One click to sales order with inventory sync</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-panel p-10 text-center">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Connected to your operations
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                CRM integrates with Inventory, Production, and Invoicing for a complete view of customer orders and fulfillment status.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/modules/inventory" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Inventory
                </Link>
                <Link href="/modules/production" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
                  Production
                </Link>
                <Link href="/modules/invoicing" className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-white transition-colors">
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
              Ready to grow your sales?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Start your free trial and see how WerkFox CRM can transform your customer relationships.
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
