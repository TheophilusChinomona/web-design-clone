import React from "react";
import Link from "next/link";
import { FirecrawlLogo } from "./icons";

export function FirecrawlFooter() {
  return (
    <footer className="border-t border-[#ededed] dark:border-[#2a2a2a] bg-[#f9f9f9] dark:bg-[#0a0a0a] py-12 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <FirecrawlLogo className="h-6 w-auto text-[#171717] dark:text-[#f5f5f5]" />
          <span className="text-xs text-neutral-400">© 2026 Mendable AI Inc. (Firecrawl)</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link href="/privacy-policy" className="hover:text-neutral-900 dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-neutral-900 dark:hover:text-white">
            Terms of Service
          </Link>
          <a
            href="https://docs.firecrawl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white"
          >
            Documentation
          </a>
          <a
            href="https://github.com/mendableai/firecrawl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
