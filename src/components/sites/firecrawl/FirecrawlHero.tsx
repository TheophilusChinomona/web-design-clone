"use client";

import React, { useState } from "react";
import Link from "next/link";

export function FirecrawlHero() {
  const [urlInput, setUrlInput] = useState("https://firecrawl.dev");
  const [activeTab, setActiveTab] = useState<"scrape" | "crawl" | "search">("scrape");
  const [activeLang, setActiveLang] = useState<"curl" | "python" | "node">("curl");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);

  const handleTestScrape = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
      setScrapeResult(
        JSON.stringify(
          {
            success: true,
            data: {
              title: "Firecrawl - Turn any website into LLM-ready data",
              description: "The context API to search, scrape, and interact with the web at scale.",
              markdown: "# Firecrawl 🔥\n\nTurn web pages into clean Markdown, structured JSON, or vector embeddings for your AI agents.",
              metadata: {
                statusCode: 200,
                pageAge: "2 hours ago",
                linksCount: 42
              }
            }
          },
          null,
          2
        )
      );
    }, 800);
  };

  const getCodeSnippet = () => {
    if (activeLang === "curl") {
      return `curl -X POST https://api.firecrawl.dev/v1/scrape \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer fc_YOUR_API_KEY' \\
  -d '{
    "url": "${urlInput}",
    "formats": ["markdown", "html"]
  }'`;
    }
    if (activeLang === "python") {
      return `from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="fc_YOUR_API_KEY")
response = app.scrape_url(
    "${urlInput}",
    params={"formats": ["markdown", "html"]}
)
print(response["markdown"])`;
    }
    return `import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: 'fc_YOUR_API_KEY' });
const scrapeResult = await app.scrapeUrl('${urlInput}', {
  formats: ['markdown', 'html'],
});
console.log(scrapeResult.markdown);`;
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial heat glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#fa5d19]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ededed] dark:border-[#2a2a2a] bg-white/60 dark:bg-black/40 text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#fa5d19] animate-ping" />
          <span>Firecrawl v2 is live: Interact API & Web Search</span>
          <span className="text-[#fa5d19]">→</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Turn entire websites into <span className="text-[#fa5d19]">LLM-ready data</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          The context API to search, scrape, and interact with the web at scale. Clean Markdown and structured data ready for AI agents.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/app"
            className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-[#fa5d19] text-white font-medium hover:bg-[#e04f12] shadow-[0_4px_20px_rgba(250,93,25,0.35)] active:scale-95 transition-all text-base"
          >
            Start Scraping for Free
          </Link>
          <a
            href="https://github.com/mendableai/firecrawl"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] text-neutral-800 dark:text-neutral-200 font-medium hover:border-neutral-400 dark:hover:border-neutral-600 transition-all text-base"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Star on GitHub (25k+)</span>
          </a>
        </div>

        {/* Interactive Playground Box */}
        <div id="playground" className="mt-16 max-w-5xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#121212]/90 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
          {/* Top Bar with Mode Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 gap-4 bg-neutral-50/50 dark:bg-[#171717]/50">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("scrape")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "scrape"
                    ? "bg-[#fa5d19] text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                /scrape
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("crawl")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "crawl"
                    ? "bg-[#fa5d19] text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                /crawl
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("search")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "search"
                    ? "bg-[#fa5d19] text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                /search
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-800/50 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveLang("curl")}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  activeLang === "curl" ? "bg-white dark:bg-[#202020] text-[#fa5d19] shadow-xs" : "text-neutral-500"
                }`}
              >
                cURL
              </button>
              <button
                type="button"
                onClick={() => setActiveLang("python")}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  activeLang === "python" ? "bg-white dark:bg-[#202020] text-[#fa5d19] shadow-xs" : "text-neutral-500"
                }`}
              >
                Python
              </button>
              <button
                type="button"
                onClick={() => setActiveLang("node")}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  activeLang === "node" ? "bg-white dark:bg-[#202020] text-[#fa5d19] shadow-xs" : "text-neutral-500"
                }`}
              >
                Node.js
              </button>
            </div>
          </div>

          {/* Interactive URL Input */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <form onSubmit={handleTestScrape} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter URL to scrape..."
                  className="w-full h-12 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-sm text-neutral-900 dark:text-neutral-100 font-mono focus:outline-none focus:border-[#fa5d19] focus:ring-2 focus:ring-[#fa5d19]/20"
                />
              </div>
              <button
                type="submit"
                disabled={isScraping}
                className="h-12 px-6 rounded-xl bg-[#fa5d19] text-white text-sm font-semibold hover:bg-[#e04f12] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isScraping ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Scraping...</span>
                  </>
                ) : (
                  <>
                    <span>Test Scrape</span>
                    <span>🔥</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Code & Response Preview Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-[#0d0d0d] text-neutral-200">
            {/* Request Code */}
            <div className="p-6 font-mono text-xs overflow-x-auto">
              <div className="text-neutral-500 text-[11px] mb-3 uppercase tracking-wider font-semibold">Request Code</div>
              <pre className="text-neutral-300 leading-relaxed">{getCodeSnippet()}</pre>
            </div>

            {/* Response Output */}
            <div className="p-6 font-mono text-xs overflow-x-auto bg-[#0a0a0a]">
              <div className="text-neutral-500 text-[11px] mb-3 uppercase tracking-wider font-semibold">Live Clean Response</div>
              <pre className="text-[#fa5d19] leading-relaxed">
                {scrapeResult ||
                  `{\n  "status": "ready",\n  "tip": "Click 'Test Scrape' to fetch clean Markdown or JSON from the URL."\n}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
