import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://example.com";
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: any) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      sendEvent("init", { url, totalPages: limit, status: "initializing_workers" });

      const stages = [
        { progress: 15, msg: `Connecting residential proxy pool to ${url}...` },
        { progress: 30, msg: `Robots.txt & Sitemap parsed. Discovered ${limit} target sub-links.` },
        { progress: 50, msg: `Scraping page 1/${limit}: ${url}/docs (LLM Markdown extracted)` },
        { progress: 70, msg: `Scraping page 2/${limit}: ${url}/pricing (LLM Markdown extracted)` },
        { progress: 90, msg: `Scraping page 3/${limit}: ${url}/blog (LLM Markdown extracted)` },
        { progress: 100, msg: `Crawl job completed successfully! 3 pages indexed.` },
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        sendEvent("progress", {
          stage: i + 1,
          totalStages: stages.length,
          percent: stages[i].progress,
          log: stages[i].msg,
          time: new Date().toLocaleTimeString(),
        });
      }

      sendEvent("done", {
        success: true,
        jobId: `job_${Math.random().toString(36).substring(2, 10)}`,
        url,
        completedAt: new Date().toISOString(),
        pagesExtracted: [
          { url: `${url}/docs`, title: "Documentation", status: 200 },
          { url: `${url}/pricing`, title: "Pricing & Plans", status: 200 },
          { url: `${url}/blog`, title: "Engineering Blog", status: 200 },
        ],
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
