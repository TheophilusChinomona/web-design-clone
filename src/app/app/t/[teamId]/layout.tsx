import React from "react";
import { FirecrawlSidebar } from "@/components/sites/firecrawl/dashboard/FirecrawlSidebar";
import Link from "next/link";

export default async function TeamDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex font-sans antialiased">
      {/* Left Sidebar */}
      <FirecrawlSidebar teamId={teamId} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070707] overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-14 border-b border-[#1f1f1f] px-6 flex items-center justify-between bg-[#0c0c0c]/80 backdrop-blur-md sticky top-0 z-30">
          {/* Team Switcher Button */}
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222] bg-[#141414] text-xs font-medium text-neutral-200 hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="w-4 h-4 rounded bg-[#fa5d19] text-white text-[10px] font-bold flex items-center justify-center">
              P
            </span>
            <span>Personal Team</span>
            <span className="text-neutral-500 text-[10px]">▾</span>
          </button>

          {/* Right Action Items */}
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#fa5d19] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                2
              </span>
            </button>

            {/* Terminal Screen Icon */}
            <button type="button" className="p-2 text-neutral-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Help Link */}
            <a
              href="https://firecrawl.dev/support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help</span>
            </a>

            {/* Docs Link */}
            <a
              href="https://docs.firecrawl.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Docs</span>
            </a>

            {/* Upgrade Button */}
            <Link
              href={`/app/t/${teamId}/settings`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#fa5d19] text-white font-semibold hover:bg-[#e04f12] active:scale-95 transition-all shadow-[0_2px_10px_rgba(250,93,25,0.3)]"
            >
              <span>↑</span>
              <span>Upgrade</span>
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-6 sm:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
