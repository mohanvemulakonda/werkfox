// Demo downloads data
const demoDownloads = [
  { id: 1, resourceType: 'Product Catalog 2026', email: 'john@techcorp.com', company: 'TechCorp Ltd', downloadedAt: new Date('2026-01-20') },
  { id: 2, resourceType: 'Price List Q1', email: 'priya@manufacturing.in', company: 'Priya Manufacturing', downloadedAt: new Date('2026-01-18') },
  { id: 3, resourceType: 'Technical Specs', email: 'amit@gmail.com', company: null, downloadedAt: new Date('2026-01-15') },
  { id: 4, resourceType: 'Product Catalog 2026', email: 'sales@sharma.in', company: 'Sharma Industries', downloadedAt: new Date('2026-01-12') },
  { id: 5, resourceType: 'Case Study - Manufacturing', email: 'raj@industrial.com', company: 'Industrial Solutions', downloadedAt: new Date('2026-01-10') },
];

export default function DownloadsPage() {
  const downloads = demoDownloads;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Downloads Tracking</h1>
        <p className="text-gray-600 font-inter font-light">Monitor resource downloads and user engagement</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 font-inter">Total Downloads</p>
            <p className="text-3xl font-bold text-gray-900 font-open-sans">{downloads.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-inter">Unique Users</p>
            <p className="text-3xl font-bold text-blue-600 font-open-sans">
              {new Set(downloads.map(d => d.email)).size}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100">
        {downloads.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No downloads yet</h3>
            <p className="text-gray-600 font-inter font-light">Download tracking data will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Downloaded Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {downloads.map((download) => (
                  <tr key={download.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {download.resourceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {download.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {download.company || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {download.downloadedAt.toLocaleDateString()}
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
