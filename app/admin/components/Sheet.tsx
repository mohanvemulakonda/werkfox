'use client';

interface SheetProps {
    children: React.ReactNode;
    className?: string;
}

export default function Sheet({ children, className = '' }: SheetProps) {
    return (
        <div className={`sheet animate-slide-up ${className}`}>
            <div className="sheet-inner">
                {children}
            </div>
        </div>
    );
}
