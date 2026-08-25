import type { Metadata } from "next";
import { FirecrawlHeader } from "@/components/sites/firecrawl/FirecrawlHeader";
import { FirecrawlAuthCard } from "@/components/sites/firecrawl/FirecrawlAuthCard";

export const metadata: Metadata = {
  title: "Firecrawl - The context API to search, scrape, and interact with the web at scale. 🔥",
  description:
    "Firecrawl is the context API to search, scrape, and interact with the web at scale. Turn any source into clean Markdown or structured data your agents can ship with.",
};

export default function FirecrawlAppPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] dark:bg-[#0a0a0a] relative flex flex-col overflow-y-auto font-sans">
      {/* Left and Right Visual Grid Guide Lines */}
      <div className="fixed left-[calc(50%-200px)] top-0 bottom-0 w-[1px] bg-[#ededed] dark:bg-[#2a2a2a] z-0 pointer-events-none hidden sm:block" />
      <div className="fixed right-[calc(50%-200px)] top-0 bottom-0 w-[1px] bg-[#ededed] dark:bg-[#2a2a2a] z-0 pointer-events-none hidden sm:block" />

      {/* Main 400px Centered Column */}
      <div className="w-full pt-16 sm:pt-20 max-w-[400px] mx-auto relative flex flex-col min-h-full z-10 px-4 sm:px-0">
        <FirecrawlHeader />
        <FirecrawlAuthCard />
      </div>
    </main>
  );
}
