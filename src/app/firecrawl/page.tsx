import type { Metadata } from "next";
import { FirecrawlNavbar } from "@/components/sites/firecrawl/FirecrawlNavbar";
import { FirecrawlHero } from "@/components/sites/firecrawl/FirecrawlHero";
import { FirecrawlFeatures } from "@/components/sites/firecrawl/FirecrawlFeatures";
import { FirecrawlFooter } from "@/components/sites/firecrawl/FirecrawlFooter";

export const metadata: Metadata = {
  title: "Firecrawl - The context API to search, scrape, and interact with the web at scale. 🔥",
  description:
    "Firecrawl is the context API to search, scrape, and interact with the web at scale. Turn any source into clean Markdown or structured data your agents can ship with.",
};

export default function FirecrawlHomePage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white flex flex-col font-sans">
      <FirecrawlNavbar />
      <main className="flex-1">
        <FirecrawlHero />
        <FirecrawlFeatures />
      </main>
      <FirecrawlFooter />
    </div>
  );
}
