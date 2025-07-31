'use client';

export default function RootDashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard">
            {children}
        </div>
    );
}