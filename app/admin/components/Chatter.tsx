'use client';

interface ChatterEntry {
    id: string;
    author: string;
    initials: string;
    time: string;
    text: string;
    type?: 'note' | 'email' | 'system';
}

interface ChatterProps {
    activities: ChatterEntry[];
}

export default function Chatter({ activities }: ChatterProps) {
    return (
        <div className="chatter">
            <div className="chatter-actions">
                <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Log Note
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    Send Email
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    Schedule Activity
                </button>
            </div>

            <div className="chatter-timeline">
                {activities.map((entry) => (
                    <div key={entry.id} className="chatter-entry">
                        <div className={`chatter-avatar ${entry.type === 'system' ? 'bg-orange-50 text-orange-600 border-orange-100' : ''}`}>
                            {entry.initials}
                        </div>
                        <div className="chatter-content">
                            <div className="flex items-center">
                                <span className="chatter-author">{entry.author}</span>
                                <span className="chatter-time">{entry.time}</span>
                            </div>
                            <div className="chatter-text" dangerouslySetInnerHTML={{ __html: entry.text }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
