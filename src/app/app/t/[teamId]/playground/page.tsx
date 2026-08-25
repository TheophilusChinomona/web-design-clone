"use client";

import React, { useState } from "react";

export default function TeamPlaygroundPage() {
  const [url, setUrl] = useState("https://firecrawl.dev");
  const [endpoint, setEndpoint] = useState<"scrape" | "crawl" | "map" | "extract">("crawl");
  const [format, setFormat] = useState({
    markdown: true,
    html: false,
    links: true,
    screenshot: false,
  });
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);
    setStreamLogs([]);
    setStreamProgress(0);

    // If Crawl with Real-Time Streaming is selected
    if (endpoint === "crawl" && isStreaming) {
      try {
        const res = await fetch(`/api/v1/crawl/stream?url=${encodeURIComponent(url)}&limit=5`);
        if (!res.body) throw new Error("ReadableStream not supported");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const chunk of lines) {
            const eventMatch = chunk.match(/event:\s*([^\n]+)/);
            const dataMatch = chunk.match(/data:\s*([^\n]+)/);

            if (eventMatch && dataMatch) {
              const eventType = eventMatch[1].trim();
              const eventData = JSON.parse(dataMatch[1]);

              if (eventType === "progress") {
                setStreamProgress(eventData.percent);
                setStreamLogs((prev) => [...prev, `[${eventData.time}] ${eventData.log}`]);
              } else if (eventType === "done") {
                setStreamProgress(100);
                setOutput(JSON.stringify(eventData, null, 2));
              }
            }
          }
        }
      } catch (err: any) {
        setOutput(JSON.stringify({ success: false, error: err.message }, null, 2));
      } finally {
        setLoading(false);
      }
      return;
    }

    // Standard Non-Streaming execution
    const activeFormats = Object.entries(format)
      .filter(([_, active]) => active)
      .map(([name]) => name);

    try {
      let endpointPath = `/api/v1/${endpoint}`;
      let bodyData: any = { url };

      if (endpoint === "scrape") {
        bodyData.formats = activeFormats.length ? activeFormats : ["markdown"];
      } else if (endpoint === "crawl") {
        bodyData.limit = 10;
        bodyData.maxDepth = 2;
      } else if (endpoint === "map") {
        bodyData.limit = 50;
      } else if (endpoint === "extract") {
        bodyData.prompt = "Extract page metadata and title";
        bodyData.schema = {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
        };
      }

      const res = await fetch(endpointPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const json = await res.json();
      setOutput(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setOutput(
        JSON.stringify(
          {
            success: false,
            error: err.message || "Failed to execute request",
          },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            API Playground & Live Streamer
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Execute requests live against local Next.js Route Handlers with real-time SSE progress streaming.
          </p>
        </div>

        {endpoint === "crawl" && (
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fa5d19]/10 border border-[#fa5d19]/30 text-xs font-semibold text-[#fa5d19] cursor-pointer">
            <input
              type="checkbox"
              checked={isStreaming}
              onChange={(e) => setIsStreaming(e.target.checked)}
              className="accent-[#fa5d19]"
            />
            <span>Enable Real-Time SSE Stream</span>
          </label>
        )}
      </div>

      {/* Endpoint Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        {(["crawl", "scrape", "map", "extract"] as const).map((ep) => (
          <button
            key={ep}
            type="button"
            onClick={() => setEndpoint(ep)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              endpoint === ep
                ? "bg-[#fa5d19] text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800"
            }`}
          >
            /{ep}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Request Configuration</h2>

            <form onSubmit={handleRun} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Target URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#fa5d19]"
                  required
                />
              </div>

              {endpoint === "scrape" && (
                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Return Formats
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={format.markdown}
                        onChange={(e) => setFormat({ ...format, markdown: e.target.checked })}
                        className="accent-[#fa5d19]"
                      />
                      <span>markdown</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={format.html}
                        onChange={(e) => setFormat({ ...format, html: e.target.checked })}
                        className="accent-[#fa5d19]"
                      />
                      <span>html</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={format.links}
                        onChange={(e) => setFormat({ ...format, links: e.target.checked })}
                        className="accent-[#fa5d19]"
                      />
                      <span>links</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={format.screenshot}
                        onChange={(e) => setFormat({ ...format, screenshot: e.target.checked })}
                        className="accent-[#fa5d19]"
                      />
                      <span>screenshot</span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 px-5 rounded-xl bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70"
              >
                {loading
                  ? endpoint === "crawl" && isStreaming
                    ? "Streaming Progress..."
                    : "Calling Live API..."
                  : `Run /api/v1/${endpoint}${endpoint === "crawl" && isStreaming ? " (SSE Stream)" : ""}`}
              </button>
            </form>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Progress Bar (When Streaming) */}
          {endpoint === "crawl" && isStreaming && (
            <div className="p-4 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-700 dark:text-neutral-300">Live Crawl Progress</span>
                <span className="font-mono text-[#fa5d19]">{streamProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-[#fa5d19] transition-all duration-300 rounded-full"
                  style={{ width: `${streamProgress}%` }}
                />
              </div>

              {/* Streaming Terminal Logs */}
              {streamLogs.length > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-black font-mono text-[11px] text-emerald-400 space-y-1 max-h-32 overflow-y-auto">
                  {streamLogs.map((log, lIdx) => (
                    <div key={lIdx} className="leading-tight">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Final Payload Display */}
          <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-[#0d0d0d] text-neutral-200 shadow-sm flex flex-col min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono text-neutral-400">
              <span>Response Payload</span>
              {output && <span className="text-emerald-400">200 OK (Completed)</span>}
            </div>

            <div className="flex-1 mt-4 font-mono text-xs overflow-x-auto">
              <pre className="text-neutral-300 leading-relaxed">
                {output || `// Click "Run /api/v1/${endpoint}" to view results`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
