"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FirecrawlLogo } from "../icons";

interface SidebarProps {
  teamId: string;
}

export function FirecrawlSidebar({ teamId }: SidebarProps) {
  const pathname = usePathname();

  const isOverview = pathname === `/app/t/${teamId}` || pathname === `/app/t/${teamId}/`;

  return (
    <aside className="w-60 border-r border-[#1f1f1f] bg-[#0c0c0c] flex flex-col h-screen sticky top-0 shrink-0 text-neutral-300 font-sans text-xs select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1a1a1a]">
        <Link href={`/app/t/${teamId}`} className="flex items-center gap-2">
          <FirecrawlLogo className="h-6 w-auto text-white" />
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-2.5 py-3 space-y-5 overflow-y-auto">
        {/* Overview Item */}
        <div>
          <Link
            href={`/app/t/${teamId}`}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isOverview
                ? "bg-[#fa5d19]/15 text-[#fa5d19] border border-[#fa5d19]/30 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
            }`}
          >
            <svg className="w-4 h-4 text-[#fa5d19]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Overview</span>
          </Link>
        </div>

        {/* Section: PLAYGROUND */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
            Playground
          </div>
          <Link
            href={`/app/t/${teamId}/playground`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search the web</span>
          </Link>
          <Link
            href={`/app/t/${teamId}/playground`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Scrape a web page</span>
          </Link>
          <Link
            href={`/app/t/${teamId}/playground`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Interact with a page</span>
          </Link>
          <Link
            href={`/app/t/${teamId}/extract`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Parse a file</span>
          </Link>
          <Link
            href={`/app/t/${teamId}/playground`}
            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Crawl entire website</span>
            </div>
            <span className="text-[10px] text-neutral-500">▾</span>
          </Link>
          <Link
            href={`/app/t/${teamId}`}
            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Monitor the web</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fa5d19] text-white">NEW</span>
          </Link>
        </div>

        {/* Section: RESEARCH PREVIEW */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
            Research Preview
          </div>
          <Link
            href={`/app/t/${teamId}`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Agent</span>
          </Link>
        </div>

        {/* Section: ACCOUNT */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
            Account
          </div>
          <Link
            href={`/app/t/${teamId}/usage`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Activity Logs</span>
          </Link>
        </div>
      </div>

      {/* Bottom Profile & Usage Box */}
      <div className="p-3 border-t border-[#1a1a1a] bg-[#090909] space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-white">595 credits left</span>
            <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-[#fa5d19] rounded-full" style={{ width: "95%" }} />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">Resets Sep 9</span>
            <Link href={`/app/t/${teamId}/settings`} className="text-[#fa5d19] font-medium hover:underline">
              Upgrade
            </Link>
          </div>
        </div>

        <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-5 h-5 rounded bg-[#fa5d19]/20 text-[#fa5d19] text-[10px] font-bold flex items-center justify-center">
              TC
            </span>
            <span className="text-[11px] text-neutral-300 truncate">executus.ahli@gmail.com</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <span>❮</span>
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}
