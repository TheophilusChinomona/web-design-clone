"use client";

import React, { useState, useEffect } from "react";

interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  token?: string;
  created: string;
  lastUsed: string;
}

export default function TeamApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/v1/keys");
      const json = await res.json();
      if (json.success && json.keys) {
        setKeys(json.keys);
      }
    } catch (err) {
      console.error("Failed to fetch keys", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.key) {
        setKeys((prev) => [...prev, json.key]);
        setNewKeyName("");
        setIsCreating(false);
      }
    } catch (err) {
      console.error("Failed to create key", err);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/keys?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete key", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            API Keys
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage authentication keys used to access Firecrawl endpoints from your code (connected to Live API).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="h-10 px-5 rounded-full bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          + Create New Key
        </button>
      </div>

      {/* Creation Modal / Inline Form */}
      {isCreating && (
        <div className="p-6 rounded-2xl border border-[#fa5d19]/30 bg-orange-50/50 dark:bg-orange-950/10 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Create API Key</h2>
          <form onSubmit={handleCreateKey} className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Production Backend, Local Dev"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#1a1a1a] border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-[#fa5d19]"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] cursor-pointer"
            >
              Generate Key
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Keys Table */}
      <div className="rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-medium">
            <tr>
              <th className="px-6 py-3">Key Name</th>
              <th className="px-6 py-3">Key Token</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Last Used</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-neutral-400">
                  Loading API keys from backend...
                </td>
              </tr>
            ) : keys.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-neutral-400">
                  No API keys generated yet. Click "+ Create New Key" above.
                </td>
              </tr>
            ) : (
              keys.map((k) => (
                <tr key={k.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{k.name}</td>
                  <td className="px-6 py-4 font-mono text-neutral-600 dark:text-neutral-400">
                    {k.prefix}••••••••••••
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {new Date(k.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{k.lastUsed}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteKey(k.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
