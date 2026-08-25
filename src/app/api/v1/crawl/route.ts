import { NextRequest, NextResponse } from "next/server";
import { CrawlRequestSchema } from "@/lib/schemas/api";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CrawlRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid crawl request", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { url, limit } = parsed.data;
    const workspaceId = body.workspaceId || "25bMf9wr6oN";

    const job = db.createCrawlJob(workspaceId, url, limit);

    db.addScrapeLog({
      workspaceId,
      endpoint: "/v1/crawl",
      url,
      status: 200,
      credits: 1,
      time: "Just now",
    });

    return NextResponse.json({
      success: true,
      id: job.id,
      url: job.url,
      status: job.status,
      total: job.total,
      completed: job.completed,
      creditsUsed: job.creditsUsed,
      createdAt: job.createdAt,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
