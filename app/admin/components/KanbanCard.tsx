'use client';

interface KanbanCardProps {
    title: string;
    subtitle?: string;
    amount?: string;
    tags?: { label: string; color: string }[];
    initials?: string;
    onClick?: () => void;
    priority?: number; // 0, 1, 2, 3 stars
}

export default function KanbanCard({
    title,
    subtitle,
    amount,
    tags,
    initials,
    onClick,
    priority
}: KanbanCardProps) {
    return (
        <div className="kanban-card" onClick={onClick}>
            <div className="kanban-card-title">{title}</div>
            {subtitle && <div className="text-[11px] text-gray-500 mb-1">{subtitle}</div>}

            {amount && <div className="kanban-card-amount">{amount}</div>}

            <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">
                    {tags?.map((tag, i) => (
                        <span
                            key={i}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                        >
                            {tag.label.toUpperCase()}
                        </span>
                    ))}

                    {priority !== undefined && (
                        <div className="flex text-amber-400 gap-0.5 ml-1">
                            {[...Array(3)].map((_, i) => (
                                <span key={i} className={i < priority ? 'opacity-100' : 'opacity-20'}>★</span>
                            ))}
                        </div>
                    )}
                </div>

                {initials && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                        {initials}
                    </div>
                )}
            </div>
        </div>
    );
}
