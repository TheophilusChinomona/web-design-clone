"use client";

import React from "react";

const features = [
  {
    title: "/scrape",
    description: "Turn any single URL into clean, LLM-ready Markdown with main content extraction and images preserved.",
    badge: "Fast & Clean",
    icon: "📄"
  },
  {
    title: "/crawl",
    description: "Crawl entire domains or subpaths automatically. Follow links, bypass bot protection, and extract all pages.",
    badge: "Multi-page",
    icon: "🕷️"
  },
  {
    title: "/map",
    description: "Discover all reachable URLs within a website in seconds without downloading the full HTML.",
    badge: "Discovery",
    icon: "🗺️"
  },
  {
    title: "/extract",
    description: "Extract structured data matching a specific JSON schema using intelligent AI-assisted parsing.",
    badge: "Structured JSON",
    icon: "⚡"
  },
  {
    title: "/search",
    description: "Search the live web directly and get back clean Markdown results formatted specifically for agent contexts.",
    badge: "New in v2",
    icon: "🔍"
  },
  {
    title: "Agent Actions",
    description: "Click, fill forms, wait for elements, and handle pagination in dynamic JavaScript heavy web apps.",
    badge: "Automation",
    icon: "🤖"
  }
];

export function FirecrawlFeatures() {
  return (
    <section id="features" className="py-24 border-t border-[#ededed] dark:border-[#2a2a2a] bg-[#fbfbfb] dark:bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#fa5d19]">API Capabilities</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Built for developers and AI engineers
          </p>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
            Handle anti-bot systems, JavaScript rendering, proxy rotation, and complex pagination with a simple REST API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] hover:border-[#fa5d19]/40 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#fa5d19]/10 text-[#fa5d19]">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold font-mono text-neutral-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
