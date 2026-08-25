import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") || "25bMf9wr6oN";
    const workspace = db.getWorkspace(workspaceId);
    const logs = db.getScrapeLogs(workspaceId);

    const creditsRemaining = Math.max(0, workspace.creditsTotal - workspace.creditsUsed);

    return NextResponse.json({
      success: true,
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      plan: workspace.plan,
      creditsUsedThisMonth: workspace.creditsUsed,
      creditsTotal: workspace.creditsTotal,
      creditsRemaining,
      activeBrowsers: 0,
      maxBrowsers: 2,
      successRate: 100,
      recentRequests: logs.slice(0, 10).map((l) => ({
        endpoint: l.endpoint,
        url: l.url,
        status: l.status,
        credits: l.credits,
        time: l.time,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
