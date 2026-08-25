"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EndpointDoc {
  method: "GET" | "POST" | "DELETE";
  path: string;
  tag: string;
  summary: string;
  description: string;
  requestSample?: string;
  responseSample: string;
}

const endpoints: EndpointDoc[] = [
  {
    method: "POST",
    path: "/api/v1/scrape",
    tag: "Core Scraping",
    summary: "Scrape Single Web Page",
    description: "Turn any target URL into clean LLM-ready Markdown, HTML, links, or screenshot.",
    requestSample: JSON.stringify(
      {
        url: "https://firecrawl.dev",
        formats: ["markdown", "links"],
        onlyMainContent: true,
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        data: {
          title: "Firecrawl — Extracted Page",
          markdown: "# Firecrawl\n\nTurn web pages into LLM data.",
          metadata: { statusCode: 200, creditsUsed: 1 },
          links: ["https://firecrawl.dev/docs", "https://firecrawl.dev/pricing"],
        },
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/crawl",
    tag: "Core Scraping",
    summary: "Initiate Domain Crawl",
    description: "Asynchronously crawl all pages on a domain matching depth and page limits.",
    requestSample: JSON.stringify(
      {
        url: "https://docs.firecrawl.dev",
        limit: 10,
        maxDepth: 2,
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        id: "job_98a7b6c5-4d",
        status: "scraping",
        total: 10,
        creditsUsed: 1,
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/map",
    tag: "Core Scraping",
    summary: "Map Sub-URLs",
    description: "Discover all indexed sub-URLs for a domain without downloading full page bodies.",
    requestSample: JSON.stringify(
      {
        url: "https://example.com",
        limit: 50,
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        links: ["https://example.com/about", "https://example.com/blog", "https://example.com/pricing"],
        total: 3,
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/extract",
    tag: "AI Extraction",
    summary: "Extract Structured Data with Schema",
    description: "Map webpage content into a strict JSON Schema using AI instructions.",
    requestSample: JSON.stringify(
      {
        url: "https://example.com/pricing",
        prompt: "Extract tier names and prices",
        schema: {
          type: "object",
          properties: {
            tier: { type: "string" },
            price: { type: "number" },
          },
        },
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        data: {
          tier: "Pro Plan",
          price: 49.99,
        },
      },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/api/v1/keys",
    tag: "API Keys",
    summary: "List API Keys",
    description: "Retrieve all developer API authentication keys for the current workspace.",
    responseSample: JSON.stringify(
      {
        success: true,
        keys: [
          {
            id: "key_default",
            name: "Default Production Key",
            prefix: "fc_live_79a8e2b9",
            created: "2026-08-25T12:00:00.000Z",
            lastUsed: "Just now",
          },
        ],
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/keys",
    tag: "API Keys",
    summary: "Create New API Key",
    description: "Generate a new secret API token with permission scopes.",
    requestSample: JSON.stringify(
      {
        name: "Production Backend Service",
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        key: {
          id: "key_1724608800000",
          name: "Production Backend Service",
          token: "fc_live_79a8e2b9c04d81234f98a76e",
          prefix: "fc_live_79a8e2b9",
          created: "2026-08-25T14:00:00.000Z",
          lastUsed: "Never",
        },
      },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/api/v1/usage",
    tag: "Workspace & Usage",
    summary: "Get Workspace Usage & Analytics",
    description: "Returns real-time credit balance, active workers count, and request activity log.",
    responseSample: JSON.stringify(
      {
        success: true,
        creditsUsedThisMonth: 309,
        creditsTotal: 500,
        activeBrowsers: 0,
        recentRequests: [
          { endpoint: "/v1/scrape", url: "https://firecrawl.dev", status: 200, credits: 1, time: "Just now" },
        ],
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    tag: "Contact Inquiries",
    summary: "Submit Customer Inquiry Form",
    description: "EdgeTech customer quote and message submission endpoint with validation.",
    requestSample: JSON.stringify(
      {
        name: "John Smith",
        email: "john@woodcraft.co.za",
        subject: "Bulk Wood Edging Quote",
        message: "Need 100 panels edged with oak veneer.",
      },
      null,
      2
    ),
    responseSample: JSON.stringify(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
        inquiryId: "inq_1724608800000",
      },
      null,
      2
    ),
  },
];

export default function OpenApiDocsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const tags = ["All", "Core Scraping", "AI Extraction", "API Keys", "Workspace & Usage", "Contact Inquiries"];

  const filteredEndpoints =
    activeTab === "All" ? endpoints : endpoints.filter((e) => e.tag === activeTab);

  const executeLiveTest = async (ep: EndpointDoc) => {
    setTestingEndpoint(ep.path + ep.method);
    setLoading(true);
    try {
      const res = await fetch(ep.path, {
        method: ep.method,
        headers: ep.requestSample ? { "Content-Type": "application/json" } : {},
        body: ep.requestSample || undefined,
      });
      const data = await res.json();
      setTestResult((prev) => ({
        ...prev,
        [ep.path + ep.method]: {
          status: res.status,
          statusText: res.statusText,
          data,
        },
      }));
    } catch (err: any) {
      setTestResult((prev) => ({
        ...prev,
        [ep.path + ep.method]: {
          status: 500,
          error: err.message,
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-[#222] bg-[#111]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white">
            ← Hub
          </Link>
          <div className="h-4 w-[1px] bg-neutral-700" />
          <h1 className="text-base font-bold text-white flex items-center gap-2">
            <span>OpenAPI 3.1 Specification Explorer</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#fa5d19]/20 text-[#fa5d19] border border-[#fa5d19]/40">
              OAS 3.1
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href="/docs/api/openapi.json"
            target="_blank"
            download
            className="px-3 py-1.5 rounded-lg border border-[#333] hover:border-neutral-500 bg-[#161616] text-neutral-300 transition-colors"
          >
            Download openapi.json ↗
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Intro */}
        <div className="p-6 rounded-2xl border border-[#222] bg-[#141414] space-y-3">
          <h2 className="text-xl font-bold text-white">Full-Stack Application Backend Services</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            All endpoints below are live Next.js App Router Route Handlers created by the <strong>convert-to-webapp</strong> workflow.
            You can test live requests directly against the local development server.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTab(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tag
                  ? "bg-[#fa5d19] text-white shadow-sm"
                  : "bg-[#1c1c1c] text-neutral-400 hover:text-white hover:bg-[#252525]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Endpoints List */}
        <div className="space-y-6">
          {filteredEndpoints.map((ep, idx) => {
            const resultKey = ep.path + ep.method;
            const liveData = testResult[resultKey];

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#222] bg-[#111111] space-y-5 hover:border-neutral-700 transition-colors"
              >
                {/* Method & Path Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                        ep.method === "POST"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : ep.method === "GET"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-red-500/20 text-red-400 border border-red-500/40"
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm font-semibold text-white">{ep.path}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                      {ep.tag}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => executeLiveTest(ep)}
                    disabled={loading}
                    className="px-4 py-1.5 rounded-lg bg-[#fa5d19] text-white font-semibold text-xs hover:bg-[#e04f12] active:scale-95 transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    {testingEndpoint === resultKey && loading ? "Executing..." : "Execute Test Request"}
                  </button>
                </div>

                <div className="text-xs text-neutral-400">{ep.description}</div>

                {/* Live Test Output Display */}
                {liveData && (
                  <div className="p-4 rounded-xl border border-[#fa5d19]/40 bg-[#070707] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#fa5d19] font-bold">Live Test Response</span>
                      <span className={liveData.status < 300 ? "text-emerald-400" : "text-red-400"}>
                        HTTP {liveData.status} {liveData.statusText}
                      </span>
                    </div>
                    <pre className="p-3 rounded-lg bg-black text-xs font-mono text-neutral-200 overflow-x-auto">
                      {JSON.stringify(liveData.data || liveData.error, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Schema Specs & Samples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {ep.requestSample && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                        Request Body (JSON)
                      </div>
                      <pre className="p-3 rounded-xl bg-[#070707] border border-[#222] text-[11px] font-mono text-neutral-300 overflow-x-auto">
                        {ep.requestSample}
                      </pre>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Response Schema (200 OK)
                    </div>
                    <pre className="p-3 rounded-xl bg-[#070707] border border-[#222] text-[11px] font-mono text-emerald-300 overflow-x-auto">
                      {ep.responseSample}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
