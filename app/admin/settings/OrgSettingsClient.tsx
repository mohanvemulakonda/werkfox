'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PACKAGE_INFO, type PackageType } from '@/lib/modules';

interface OrgSettings {
  id: number;
  name: string;
  slug: string;
  packageType: PackageType;
  billingInfo: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrgSettingsClientProps {
  organizationId: number;
  userRole: string;
  initialPackageType: PackageType;
}

export default function OrgSettingsClient({
  organizationId,
  userRole,
  initialPackageType,
}: OrgSettingsClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<OrgSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const canEdit = userRole === 'OWNER' || userRole === 'ADMIN';

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/organizations/settings');
      if (!res.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await res.json();
      setSettings(data.organization);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }

  async function handlePackageChange(newPackageType: PackageType) {
    if (!canEdit || saving) return;
    if (settings?.packageType === newPackageType) return;

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const res = await fetch('/api/admin/organizations/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageType: newPackageType }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update package');
      }

      const data = await res.json();
      setSettings(data.organization);
      setSuccessMessage('Package updated successfully! Refreshing navigation...');

      // Reload the page to update navigation after a short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update package');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Organization Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{settings?.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Slug</dt>
            <dd className="mt-1 text-sm text-gray-900 font-mono">{settings?.slug}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Your Role</dt>
            <dd className="mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {userRole}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  settings?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {settings?.isActive ? 'Active' : 'Inactive'}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Package Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Package</h2>
            <p className="text-sm text-gray-500">
              {canEdit
                ? 'Select which modules are available to your team'
                : 'Contact an admin to change the package'}
            </p>
          </div>
          {saving && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Saving...
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(PACKAGE_INFO) as PackageType[]).map((packageType) => {
            const info = PACKAGE_INFO[packageType];
            const isSelected = settings?.packageType === packageType;
            const isDisabled = !canEdit || saving;

            return (
              <button
                key={packageType}
                onClick={() => handlePackageChange(packageType)}
                disabled={isDisabled}
                className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <h3
                  className={`text-base font-semibold ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {info.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isSelected ? 'text-blue-700' : 'text-gray-500'
                  }`}
                >
                  {info.description}
                </p>

                <ul className="mt-3 space-y-1">
                  {info.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-xs ${
                        isSelected ? 'text-blue-700' : 'text-gray-600'
                      }`}
                    >
                      <svg
                        className={`w-3 h-3 ${
                          isSelected ? 'text-blue-600' : 'text-gray-400'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {!canEdit && (
          <p className="mt-4 text-sm text-gray-500 italic">
            Only organization owners and admins can change the package.
          </p>
        )}
      </div>
    </div>
  );
}
