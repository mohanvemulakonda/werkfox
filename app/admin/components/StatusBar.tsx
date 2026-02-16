'use client';

interface StatusStep {
    id: string;
    label: string;
    status: 'pending' | 'current' | 'completed' | 'error';
}

interface StatusBarProps {
    actions: React.ReactNode;
    steps: StatusStep[];
}

export default function StatusBar({ actions, steps }: StatusBarProps) {
    return (
        <div className="statusbar">
            <div className="flex gap-2">
                {actions}
            </div>

            <div className="flex-1" />

            <div className="statusbar-steps">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`statusbar-step ${step.status === 'current' ? 'active' :
                                step.status === 'completed' ? 'done' : ''
                            }`}
                    >
                        {step.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
