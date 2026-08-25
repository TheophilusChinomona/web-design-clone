"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function TeamSettingsPage() {
  const params = useParams();
  const teamId = (params?.teamId as string) || "workspace";
  const [teamName, setTeamName] = useState("Personal Workspace");
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Workspace Settings
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your team preferences, members, API permissions, and plan billing.
        </p>
      </div>

      {/* General Information */}
      <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Workspace Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
              Workspace Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#fa5d19]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
              Team ID
            </label>
            <input
              type="text"
              readOnly
              value={teamId}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Team Members</h2>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#fa5d19]"
          />
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] active:scale-95 transition-all shadow-sm"
          >
            Invite Member
          </button>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#fa5d19] text-white font-bold flex items-center justify-center text-xs">
                U
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">You</div>
                <div className="text-neutral-400 text-[11px]">Owner</div>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-semibold">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Subscription Tier</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Currently active on the Free Developer Tier (500 credits/mo).</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#fa5d19]/10 text-[#fa5d19] text-xs font-semibold">
            Free Plan
          </span>
        </div>

        <div className="pt-2 flex gap-4">
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Upgrade to Pro ($16/mo)
          </button>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-400"
          >
            Manage Billing
          </button>
        </div>
      </div>
    </div>
  );
}
