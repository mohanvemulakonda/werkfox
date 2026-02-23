"use client";

import Link from "next/link";
import { Package, Heart, MessageSquare } from "lucide-react";

const TABS = [
  { key: "submissions", label: "My Submissions", icon: Package },
  { key: "upvotes", label: "My Upvotes", icon: Heart },
  { key: "reviews", label: "My Reviews", icon: MessageSquare },
];

export function DashboardTabs({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-1">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.key;
        return (
          <Link
            key={tab.key}
            href={`/dashboard?tab=${tab.key}`}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--bg)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
