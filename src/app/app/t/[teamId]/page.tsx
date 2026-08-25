"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TeamOverviewPage() {
  const params = useParams();
  const teamId = (params?.teamId as string) || "workspace";

  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);

  const maskedKey = "fc-5****************************19ab";
  const realKey = "fc-5829104729184719028471928419ab";

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const integrations = [
    { name: "Claude / Claude Code", icon: "✳️" },
    { name: "ChatGPT / Codex", icon: "💬" },
    { name: "OpenClaw", icon: "🦞" },
    { name: "Hermes", icon: "🦙" },
    { name: "Cursor", icon: "▲" },
    { name: "opencode", icon: "📱" },
    { name: "Gemini CLI", icon: "✦" },
    { name: "VS Code", icon: "♾️" },
    { name: "Grok Build", icon: "⚡" },
    { name: "Devin", icon: "⚙️" },
    { name: "Cline", icon: "🤖" },
    { name: "Goose", icon: "🪿" },
    { name: "Amp", icon: "⚡" },
    { name: "Lovable", icon: "🩶" },
    { name: "Zapier", icon: "✴️" },
    { name: "Make", icon: "Ⓜ️" },
    { name: "n8n", icon: "🔀" },
  ];

  const workflows = [
    {
      title: "Market Research",
      desc: "Sourced market, financial, and industry research.",
      badge: "Research",
      href: "#"
    },
    {
      title: "SEO Audit",
      desc: "Prioritized SEO audit from a live site crawl.",
      badge: "Marketing",
      href: "#"
    },
    {
      title: "Site QA",
      desc: "Exploratory QA on a live site, with reproducible bugs.",
      badge: "Engineering",
      href: "#"
    },
    {
      title: "Lead Gen",
      desc: "CRM-ready prospect lists from directories and databases.",
      badge: "Sales",
      href: "#"
    }
  ];

  return (
    <div className="space-y-10 pb-16 text-neutral-200 text-xs">
      {/* 1. Explore our endpoints Section */}
      <section className="space-y-4">
        <div>
          <h1 className="text-base font-semibold text-white tracking-tight">Explore our endpoints</h1>
          <p className="text-neutral-500 text-xs mt-0.5">Power your applications with our comprehensive scraping API</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Card */}
          <Link
            href={`/app/t/${teamId}/playground`}
            className="p-4 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-neutral-700 hover:bg-[#141414] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fa5d19]">⁝⁝⁝</span>
              <span className="font-semibold text-white text-sm">Search</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Search the web and get full content from results.
            </p>
          </Link>

          {/* Scrape Card */}
          <Link
            href={`/app/t/${teamId}/playground`}
            className="p-4 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-neutral-700 hover:bg-[#141414] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fa5d19]">⁝⁝⁝</span>
              <span className="font-semibold text-white text-sm">Scrape</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Get llm-ready data from websites. Markdown, JSON, screenshot, etc.
            </p>
          </Link>

          {/* Interact Card */}
          <Link
            href={`/app/t/${teamId}/playground`}
            className="p-4 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-neutral-700 hover:bg-[#141414] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fa5d19]">⁝⁝⁝</span>
              <span className="font-semibold text-white text-sm">Interact</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fa5d19]/20 text-[#fa5d19] border border-[#fa5d19]/40">
                NEW
              </span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Interact with a scraped page using AI prompts or code.
            </p>
          </Link>

          {/* Crawl Card */}
          <Link
            href={`/app/t/${teamId}/playground`}
            className="p-4 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-neutral-700 hover:bg-[#141414] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fa5d19]">⁝⁝⁝</span>
              <span className="font-semibold text-white text-sm">Crawl</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Crawl all the pages on a website and get data for each page.
            </p>
          </Link>
        </div>
      </section>

      {/* 2. Middle Row: Credits/Concurrency (Left) + API Key/Agent Integrations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Credits Used Chart & Concurrent Browsers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Credits Used - Last 7 days Card */}
          <div className="p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Credits used - Last 7 days</h2>
              <span className="text-2xl font-bold font-mono text-white">309</span>
            </div>

            {/* Waveform Chart Visualization */}
            <div className="relative h-44 w-full flex flex-col justify-end">
              {/* Background Dot Matrix Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

              {/* Waveform SVG */}
              <svg className="w-full h-32 overflow-visible relative z-10" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fa5d19" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fa5d19" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path
                  d="M 0 110 C 60 20, 100 10, 160 85 C 220 105, 350 108, 500 110 L 500 120 L 0 120 Z"
                  fill="url(#orangeGrad)"
                />
                {/* Orange Curve */}
                <path
                  d="M 0 110 C 60 20, 100 10, 160 85 C 220 105, 350 108, 500 110"
                  fill="none"
                  stroke="#fa5d19"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Time X-Axis */}
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-2 pt-2 border-t border-[#1a1a1a]">
                <span>08/19</span>
                <span>08/22</span>
                <span>08/25</span>
              </div>
            </div>
          </div>

          {/* Concurrent Browsers Card */}
          <div className="p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Concurrent Browsers</span>
                <span className="text-[10px] font-mono text-[#fa5d19]">[ LIVE ]</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                # of active browsers — <Link href={`/app/t/${teamId}/settings`} className="text-neutral-300 underline hover:text-[#fa5d19]">upgrade plan</Link> for faster scraping
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                0
              </span>
              <span className="text-neutral-400 text-xs">of <span className="font-semibold text-white">2</span> active browsers</span>
            </div>
          </div>
        </div>

        {/* Right Column: API Key & Agent Integrations */}
        <div className="lg:col-span-5 space-y-6">
          {/* API Key Box */}
          <div className="p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-white">API Key</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">Start scraping right away</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-[#222] bg-[#080808] font-mono text-xs text-neutral-300">
              <span>{showKey ? realKey : maskedKey}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1 hover:text-white transition-colors"
                  title="Toggle Reveal"
                >
                  👁️
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(realKey, setCopiedKey)}
                  className="p-1 hover:text-[#fa5d19] transition-colors"
                  title="Copy Key"
                >
                  {copiedKey ? "✓" : "📋"}
                </button>
              </div>
            </div>
          </div>

          {/* Agent Integrations Card */}
          <div className="p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Agent Integrations</h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Give your AI agents web data</p>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] active:scale-95 transition-all shadow-[0_2px_10px_rgba(250,93,25,0.3)]"
              >
                Set up an agent
              </button>
            </div>

            {/* 1. SKILL.md */}
            <div className="p-3.5 rounded-lg border border-[#222] bg-[#080808] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base">📄</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-[#fa5d19]">SKILL.md</span>
                    <a
                      href="https://www.firecrawl.dev/agent-onboarding/SKILL.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-neutral-400 hover:text-white underline flex items-center gap-0.5"
                    >
                      <span>View</span> ↗
                    </a>
                  </div>
                  <div className="text-[11px] text-neutral-400">Paste into your AI agent's context</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard("https://www.firecrawl.dev/agent-onboarding/SKILL.md", setCopiedSkill)}
                className="px-3 py-1 rounded bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] transition-colors"
              >
                {copiedSkill ? "Copied" : "Copy"}
              </button>
            </div>

            {/* 2. CLI */}
            <div className="p-3.5 rounded-lg border border-[#222] bg-[#080808] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400 font-semibold">CLI</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("npx -y firecrawl-cli@latest init --all --browser", setCopiedCli)}
                  className="text-neutral-400 hover:text-white"
                >
                  {copiedCli ? "✓ Copied" : "📋"}
                </button>
              </div>
              <div className="p-2 rounded bg-black font-mono text-[11px] text-[#fa5d19] overflow-x-auto">
                $ npx -y firecrawl-cli@latest init --all --browser
              </div>
            </div>

            {/* 3. MCP */}
            <div className="p-3.5 rounded-lg border border-[#222] bg-[#080808] space-y-2.5">
              <div className="font-semibold text-neutral-300">Connect an MCP client</div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Copy this URL into Claude, Codex, or another OAuth-capable MCP client. When it connects, sign in to Firecrawl and choose your team.
              </p>

              <div className="flex items-center justify-between p-2 rounded bg-black font-mono text-[11px]">
                <span className="text-neutral-300 truncate">https://mcp.firecrawl.dev/v2/mcp-oauth</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("https://mcp.firecrawl.dev/v2/mcp-oauth", setCopiedMcp)}
                  className="px-2.5 py-1 rounded bg-[#fa5d19] text-white text-[11px] font-semibold hover:bg-[#e04f12] transition-colors ml-2 shrink-0"
                >
                  {copiedMcp ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="pt-1">
                <a
                  href="https://docs.firecrawl.dev/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#fa5d19] hover:underline flex items-center gap-1"
                >
                  <span>See client setup guide</span> ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Integrations Matrix (Left) + Workflows (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Integrations Grid */}
        <div className="lg:col-span-7 p-6 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] space-y-4">
          <h2 className="text-sm font-semibold text-white">Integrations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg border border-[#1c1c1c] bg-[#0a0a0a] hover:border-neutral-700 transition-colors"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-medium text-neutral-200">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflows List */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Workflows</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">Drop-in Firecrawl skills for your AI agents</p>
            </div>

            <div className="space-y-3">
              {workflows.map((wf, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-[#1c1c1c] bg-[#0a0a0a] hover:border-neutral-700 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs">{wf.title} ↗</span>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                      {wf.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">{wf.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a1a1a]">
            <a
              href="https://docs.firecrawl.dev/workflows"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-300 hover:text-[#fa5d19] flex items-center gap-1 transition-colors"
            >
              <span>Browse all 15 workflows</span> ↗
            </a>
          </div>
        </div>
      </div>

      {/* Floating Orange Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          className="w-12 h-12 rounded-full bg-[#fa5d19] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(250,93,25,0.4)] hover:bg-[#e04f12] active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
