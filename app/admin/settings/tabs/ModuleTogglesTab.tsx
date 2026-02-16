'use client';

import { useState, useEffect } from 'react';

interface ModuleToggleSettings {
  enableApprovals: boolean;
  enableQCInspections: boolean;
  enableReturns: boolean;
  enableAuditTrail: boolean;
}

const MODULES = [
  {
    key: 'enableApprovals' as const,
    label: 'Approval Workflows',
    description: 'Enable multi-level approval flows for Purchase Orders, Payments, Material Requests, and Expenses. Documents will require approval before proceeding.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'enableQCInspections' as const,
    label: 'QC Inspections',
    description: 'Enable detailed quality control inspections for GRN, Production Orders, and Dispatch. Track inspection parameters, pass/fail rates, and quality status.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'enableReturns' as const,
    label: 'Returns & Credit Notes',
    description: 'Enable processing of sales returns and purchase returns. Automatically generate credit notes and reverse inventory movements.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
      </svg>
    ),
  },
  {
    key: 'enableAuditTrail' as const,
    label: 'Audit Trail / Activity Logs',
    description: 'Track all changes to documents and records. View who made changes, when, and what was modified. Useful for compliance and accountability.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ModuleTogglesTab() {
  const [settings, setSettings] = useState<ModuleToggleSettings>({
    enableApprovals: false,
    enableQCInspections: false,
    enableReturns: false,
    enableAuditTrail: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/company-settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          enableApprovals: data.enableApprovals ?? false,
          enableQCInspections: data.enableQCInspections ?? false,
          enableReturns: data.enableReturns ?? false,
          enableAuditTrail: data.enableAuditTrail ?? false,
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load module settings' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/company-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Module settings saved successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save module settings' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save module settings' });
    } finally {
      setSaving(false);
    }
  }

  function toggleModule(key: keyof ModuleToggleSettings) {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Optional Modules</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enable or disable optional modules. When disabled, their sidebar entries, pages, and related features will be hidden.
        </p>

        <div className="space-y-4">
          {MODULES.map(({ key, label, description, icon }) => (
            <div
              key={key}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                settings[key]
                  ? 'border-blue-200 bg-blue-50/50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`flex-shrink-0 mt-0.5 ${settings[key] ? 'text-blue-600' : 'text-gray-400'}`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                  </div>
                  <button
                    onClick={() => toggleModule(key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings[key] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings[key]}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings[key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Module Settings'}
        </button>
      </div>
    </div>
  );
}
