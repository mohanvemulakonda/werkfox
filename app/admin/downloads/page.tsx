export default function DownloadsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Downloads Tracking</h1>
        <p className="text-gray-600 font-inter font-light">Monitor resource downloads and user engagement</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100">
        <div className="p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No downloads yet</h3>
          <p className="text-gray-600 font-inter font-light">Download tracking data will appear here when resources are downloaded</p>
        </div>
      </div>
    </div>
  );
}
