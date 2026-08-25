"use client";

import React, { useState } from "react";

export default function TeamExtractPage() {
  const [schemaText, setSchemaText] = useState(`{
  "type": "object",
  "properties": {
    "company_name": { "type": "string" },
    "pricing_tiers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "tier_name": { "type": "string" },
          "price_per_month": { "type": "number" }
        }
      }
    }
  }
}`);
  const [prompt, setPrompt] = useState("Extract all pricing tiers, features, and enterprise options.");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          AI Extract & Schemas
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Define JSON schemas and natural language extraction prompts for structured data extraction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Extraction Schema (JSON Schema)</h2>
          <textarea
            rows={14}
            value={schemaText}
            onChange={(e) => setSchemaText(e.target.value)}
            className="w-full p-4 text-xs font-mono rounded-xl bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#fa5d19]"
          />
        </div>

        <div className="p-6 rounded-2xl border border-[#ededed] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Extraction Instructions (Prompt)</h2>
            <textarea
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Extract the author names, publish dates, and main conclusions."
              className="w-full p-4 text-xs rounded-xl bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#fa5d19]"
            />
            <div className="p-4 rounded-xl bg-[#fa5d19]/10 border border-[#fa5d19]/20 text-xs text-[#fa5d19] space-y-1">
              <div className="font-semibold">💡 Tip</div>
              <div>Firecrawl utilizes LLM-guided extraction to match complex nested JSON schemas directly against live DOM trees.</div>
            </div>
          </div>

          <button
            type="button"
            className="w-full h-11 px-5 rounded-xl bg-[#fa5d19] text-white text-xs font-semibold hover:bg-[#e04f12] active:scale-95 transition-all shadow-sm"
          >
            Save Schema & Test
          </button>
        </div>
      </div>
    </div>
  );
}
