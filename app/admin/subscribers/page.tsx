import Link from 'next/link';

// Demo subscribers data
const demoSubscribers = [
  { id: 1, email: 'john.doe@techcorp.com', isActive: true, subscribedAt: new Date('2026-01-15') },
  { id: 2, email: 'priya.sharma@manufacturing.in', isActive: true, subscribedAt: new Date('2026-01-12') },
  { id: 3, email: 'amit.patel@gmail.com', isActive: true, subscribedAt: new Date('2026-01-10') },
  { id: 4, email: 'sales@industrialparts.com', isActive: false, subscribedAt: new Date('2025-12-28') },
  { id: 5, email: 'purchasing@sharmasteel.in', isActive: true, subscribedAt: new Date('2025-12-20') },
];

export default function SubscribersPage() {
  const subscribers = demoSubscribers;
  const activeCount = subscribers.filter(s => s.isActive).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Newsletter Subscribers</h1>
        <p className="text-gray-600 font-inter font-light">Manage your newsletter subscriber list</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 font-inter">Total Subscribers</p>
            <p className="text-3xl font-bold text-gray-900 font-open-sans">{subscribers.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-inter">Active</p>
            <p className="text-3xl font-bold text-green-600 font-open-sans">{activeCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-inter">Inactive</p>
            <p className="text-3xl font-bold text-gray-400 font-open-sans">{subscribers.length - activeCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No subscribers yet</h3>
            <p className="text-gray-600 font-inter font-light">Subscribers will appear here when someone signs up for your newsletter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Subscribed Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-900 font-inter ${subscriber.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {subscriber.subscribedAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
