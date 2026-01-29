"use client";

import React, { useState } from 'react';

export default function OrgSelectClient({ organizations = [] }: { organizations?: any[] }) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  async function switchOrg(id: number) {
    const res = await fetch('/api/admin/organizations/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationId: id }),
    });

    if (res.ok) {
      // reload to pick up cookie+auth
      window.location.href = '/admin';
    } else {
      const j = await res.json();
      setError(j.error || 'Could not switch org');
    }
  }

  async function createOrg(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/organizations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        // switch to the new org
        await switchOrg(j.org.id);
      } else {
        setError(j.error || 'Could not create org');
      }
    } catch (e: any) {
      setError(String(e));
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Select Organization</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {organizations && organizations.length > 0 ? (
        <div className="space-y-3 mb-6">
          {organizations.map((o) => (
            <div key={o.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <div className="font-medium">{o.name}</div>
                <div className="text-sm text-gray-500">{o.slug} — {o.role}</div>
              </div>
              <div>
                <button onClick={() => switchOrg(o.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Switch</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600 mb-6">You are not part of any organization yet. Create one below.</div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Create Organization</h3>
        <form onSubmit={createOrg} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
