'use client';

import { useState } from 'react';

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'crm', label: 'CRM' },
    { id: 'production', label: 'Production' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            Everything in one place
          </h2>
          <p className="text-lg text-[#86868b] max-w-xl mx-auto">
            Real-time insights into inventory, production, sales, and customer relationships
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#f5f5f7] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-[#f5f5f7] rounded-3xl p-4 lg:p-6 shadow-lg">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-[#f5f5f7] px-4 py-3 flex items-center gap-2 border-b border-[#e5e5ea]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-[#86868b] min-w-[200px] text-center">
                  app.werkfox.com
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-2 space-y-2">
                    {['Dashboard', 'Inventory', 'Sales', 'CRM', 'Production', 'Reports'].map((item, i) => (
                      <div key={i} className={`px-3 py-2 rounded-lg text-sm ${i === 0 ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:bg-[#f5f5f7]'}`}>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="col-span-10 space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Total Revenue', value: '$124,500', change: '+12%', color: 'text-green-600' },
                        { label: 'Orders', value: '1,234', change: '+8%', color: 'text-green-600' },
                        { label: 'Products', value: '456', change: '+3%', color: 'text-green-600' },
                        { label: 'Customers', value: '892', change: '+15%', color: 'text-green-600' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-[#f5f5f7] rounded-xl p-4">
                          <p className="text-xs text-[#86868b] mb-1">{stat.label}</p>
                          <p className="text-xl font-semibold text-[#1d1d1f]">{stat.value}</p>
                          <p className={`text-xs ${stat.color}`}>{stat.change} vs last month</p>
                        </div>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-[#f5f5f7] rounded-xl p-4 h-48 flex items-end justify-between gap-2">
                      {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[var(--werkfox-primary)] to-[var(--werkfox-accent)] rounded-t-lg opacity-80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#1d1d1f]">Inventory Overview</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm bg-[#1d1d1f] text-white rounded-lg">Add Product</button>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-[#e5e5ea]">
                    <table className="w-full text-sm">
                      <thead className="bg-[#f5f5f7]">
                        <tr>
                          <th className="text-left px-4 py-3 text-[#86868b] font-medium">Product</th>
                          <th className="text-left px-4 py-3 text-[#86868b] font-medium">SKU</th>
                          <th className="text-left px-4 py-3 text-[#86868b] font-medium">Stock</th>
                          <th className="text-left px-4 py-3 text-[#86868b] font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Steel Rod 12mm', sku: 'STL-012', stock: 1250, status: 'In Stock' },
                          { name: 'Aluminum Sheet 2mm', sku: 'ALU-002', stock: 85, status: 'Low Stock' },
                          { name: 'Copper Wire 1.5mm', sku: 'COP-015', stock: 3200, status: 'In Stock' },
                          { name: 'PVC Pipe 4inch', sku: 'PVC-040', stock: 0, status: 'Out of Stock' },
                        ].map((item, i) => (
                          <tr key={i} className="border-t border-[#e5e5ea]">
                            <td className="px-4 py-3 text-[#1d1d1f]">{item.name}</td>
                            <td className="px-4 py-3 text-[#86868b]">{item.sku}</td>
                            <td className="px-4 py-3 text-[#1d1d1f]">{item.stock}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                                item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'crm' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#1d1d1f]">Sales Pipeline</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { stage: 'Lead', count: 24, value: '$45,000', color: 'bg-blue-500' },
                      { stage: 'Qualified', count: 12, value: '$89,000', color: 'bg-purple-500' },
                      { stage: 'Proposal', count: 8, value: '$124,000', color: 'bg-amber-500' },
                      { stage: 'Closed Won', count: 5, value: '$67,000', color: 'bg-green-500' },
                    ].map((stage, i) => (
                      <div key={i} className="bg-[#f5f5f7] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                          <span className="text-sm font-medium text-[#1d1d1f]">{stage.stage}</span>
                        </div>
                        <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{stage.count}</p>
                        <p className="text-sm text-[#86868b]">{stage.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'production' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#1d1d1f]">Production Orders</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { order: 'PO-2024-001', product: 'Steel Assembly A', progress: 75, status: 'In Progress' },
                      { order: 'PO-2024-002', product: 'Aluminum Frame B', progress: 100, status: 'Completed' },
                      { order: 'PO-2024-003', product: 'Copper Module C', progress: 30, status: 'In Progress' },
                    ].map((item, i) => (
                      <div key={i} className="bg-[#f5f5f7] rounded-xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm font-medium text-[#1d1d1f]">{item.order}</p>
                            <p className="text-xs text-[#86868b]">{item.product}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="w-full bg-[#e5e5ea] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[var(--werkfox-primary)] to-[var(--werkfox-accent)] h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#86868b] mt-2">{item.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
