"use client";

import React, { useState, useEffect } from "react";

interface UsageData {
  creditsUsedThisMonth: number;
  creditsTotal: number;
  creditsRemaining: number;
  activeBrowsers: number;
  maxBrowsers: number;
  successRate: number;
  recentRequests: {
    endpoint: string;
    url: string;
    status: number;
    credits: number;
    time: string;
  }[];
}

export default function TeamUsagePage() {
  const [data, setData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/usage")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json);
        }
      })
      .catch((err) => console.error("Failed to load usage", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Usage & Activity Logs
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Review real-time credit consumption and inspect live API request logs from the backend.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm">
          <div className="text-xs text-neutral-500 font-medium">Credits Used This Billing Cycle</div>
          <div className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
            {data ? data.creditsUsedThisMonth : "..."} <span className="text-sm font-normal text-neutral-400">/ {data ? data.creditsTotal : "500"}</span>
          </div>
          <div className="mt-3 text-xs text-emerald-500 font-medium">
            {data ? `${data.creditsRemaining} remaining` : "Calculating..."}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm">
          <div className="text-xs text-neutral-500 font-medium">Active Concurrent Browsers</div>
          <div className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
            {data ? data.activeBrowsers : "0"} <span className="text-sm font-normal text-neutral-400">/ {data ? data.maxBrowsers : "2"}</span>
          </div>
          <div className="mt-3 text-xs text-neutral-400">Worker pool ready</div>
        </div>

        <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm">
          <div className="text-xs text-neutral-500 font-medium">Success Rate</div>
          <div className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
            {data ? `${data.successRate}%` : "100%"}
          </div>
          <div className="mt-3 text-xs text-emerald-500 font-medium">All endpoints operational</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Recent API Requests (Live Log)</h2>
          <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-3">Endpoint</th>
                <th className="px-6 py-3">Target URL</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Credits</th>
                <th className="px-6 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-400">
                    Fetching activity logs...
                  </td>
                </tr>
              ) : (
                (data?.recentRequests || []).map((log, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                    <td className="px-6 py-3.5 font-mono font-semibold text-[#fa5d19]">{log.endpoint}</td>
                    <td className="px-6 py-3.5 font-mono text-neutral-700 dark:text-neutral-300 truncate max-w-xs">{log.url}</td>
                    <td className="px-6 py-3.5"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold">{log.status} OK</span></td>
                    <td className="px-6 py-3.5 text-neutral-600 dark:text-neutral-400">{log.credits}</td>
                    <td className="px-6 py-3.5 text-right text-neutral-400">{log.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
