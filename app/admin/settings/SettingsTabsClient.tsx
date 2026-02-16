'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OrgSettingsClient from './OrgSettingsClient';
import CompanyProfileTab from './tabs/CompanyProfileTab';
import TaxBankingTab from './tabs/TaxBankingTab';
import DocumentSettingsTab from './tabs/DocumentSettingsTab';
import TeamOverviewTab from './tabs/TeamOverviewTab';
import { type PackageType } from '@/lib/modules';

const TABS = [
  { id: 'organization', label: 'Organization' },
  { id: 'company', label: 'Company Profile' },
  { id: 'tax', label: 'Tax & Banking' },
  { id: 'documents', label: 'Documents' },
  { id: 'team', label: 'Team' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface Props {
  organizationId: number;
  userRole: string;
  initialPackageType: PackageType;
}

export default function SettingsTabsClient({ organizationId, userRole, initialPackageType }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get('tab') as TabId) || 'organization';
  const [activeTab, setActiveTab] = useState<TabId>(
    TABS.some(t => t.id === initialTab) ? initialTab : 'organization'
  );

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    router.replace(`/admin/settings?tab=${tab}`, { scroll: false });
  }

  return (
    <div>
      {/* Tab Bar */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Settings tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'organization' && (
          <OrgSettingsClient
            organizationId={organizationId}
            userRole={userRole}
            initialPackageType={initialPackageType}
          />
        )}
        {activeTab === 'company' && <CompanyProfileTab />}
        {activeTab === 'tax' && <TaxBankingTab />}
        {activeTab === 'documents' && <DocumentSettingsTab />}
        {activeTab === 'team' && <TeamOverviewTab />}
      </div>
    </div>
  );
}
