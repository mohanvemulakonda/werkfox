'use client';

import { useState } from 'react';

interface Filter {
    id: string;
    label: string;
    value: string;
}

interface FilterBarProps {
    onSearch: (query: string) => void;
    filters: Filter[];
    onRemoveFilter: (id: string) => void;
    view: 'list' | 'kanban' | 'calendar';
    onViewChange: (view: 'list' | 'kanban' | 'calendar') => void;
    actions?: React.ReactNode;
}

export default function FilterBar({
    onSearch,
    filters,
    onRemoveFilter,
    view,
    onViewChange,
    actions
}: FilterBarProps) {
    const [query, setQuery] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <div className="filterbar">
            <div className="flex items-center gap-2 flex-1 min-w-0 bg-white border border-gray-300 rounded-md px-3 py-1.5 focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <div className="flex flex-wrap gap-1.5 min-w-0">
                    {filters.map((filter) => (
                        <div key={filter.id} className="filter-chip">
                            <span className="truncate max-w-[120px]">{filter.label}: {filter.value}</span>
                            <button
                                onClick={() => onRemoveFilter(filter.id)}
                                className="filter-chip-close hover:text-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Search or add filter..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <div className="view-toggle">
                    <button
                        className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`}
                        onClick={() => onViewChange('list')}
                        title="List View"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        <span className="hidden sm:inline">List</span>
                    </button>
                    <button
                        className={`view-toggle-btn ${view === 'kanban' ? 'active' : ''}`}
                        onClick={() => onViewChange('kanban')}
                        title="Kanban Board"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                        </svg>
                        <span className="hidden sm:inline">Kanban</span>
                    </button>
                    <button
                        className={`view-toggle-btn ${view === 'calendar' ? 'active' : ''}`}
                        onClick={() => onViewChange('calendar')}
                        title="Calendar View"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </button>
                </div>

                {actions && (
                    <div className="flex gap-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
