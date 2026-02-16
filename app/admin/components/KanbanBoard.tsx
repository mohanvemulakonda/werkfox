'use client';

import React from 'react';

interface KanbanColumn {
    id: string;
    title: string;
    count: number;
    aggregate?: string;
}

interface KanbanBoardProps {
    columns: KanbanColumn[];
    children: React.ReactNode;
}

export default function KanbanBoard({ columns, children }: KanbanBoardProps) {
    return (
        <div className="kanban-board">
            {React.Children.map(children, (child, index) => {
                const column = columns[index];
                if (!column) return null;

                return (
                    <div className="kanban-column" key={column.id}>
                        <div className="kanban-column-header">
                            <div className="flex items-center">
                                <span>{column.title}</span>
                                <span className="kanban-column-count">{column.count}</span>
                            </div>
                            {column.aggregate && (
                                <span className="text-[10px] text-gray-400 font-normal ml-2">
                                    {column.aggregate}
                                </span>
                            )}
                        </div>
                        <div className="kanban-cards">
                            {child}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
