import { NextRequest, NextResponse } from "next/server";
import { ScrapeRequestSchema } from "@/lib/schemas/api";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ScrapeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { url, formats } = parsed.data;

    // Simulate clean LLM-ready extraction
    const host = new URL(url).hostname;
    const cleanTitle = `${host.charAt(0).toUpperCase() + host.slice(1)} — Extracted Page`;

    const data: Record<string, any> = {
      title: cleanTitle,
      metadata: {
        statusCode: 200,
        pageStatusCode: 200,
        creditsUsed: 1,
        proxyUsed: "residential",
        sourceUrl: url,
        scrapedAt: new Date().toISOString(),
      },
    };

    if (formats.includes("markdown")) {
      data.markdown = `# ${cleanTitle}\n\nAutomated extraction performed by Firecrawl.\n\n- Source URL: ${url}\n- Content: Clean markdown body without boilerplate or cookie banners.\n- Status: 200 OK`;
    }

    if (formats.includes("html")) {
      data.html = `<article><h1>${cleanTitle}</h1><p>Clean extracted HTML content from ${url}.</p></article>`;
    }

    if (formats.includes("links")) {
      data.links = [
        `${url}/about`,
        `${url}/docs`,
        `${url}/pricing`,
        `${url}/contact`,
      ];
    }

    if (formats.includes("screenshot")) {
      data.screenshot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    }

    // Persist scrape log in DB
    db.addScrapeLog({
      workspaceId: body.workspaceId || "25bMf9wr6oN",
      endpoint: "/v1/scrape",
      url,
      status: 200,
      credits: 1,
      time: "Just now",
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process scrape request" },
      { status: 500 }
    );
  }
}
