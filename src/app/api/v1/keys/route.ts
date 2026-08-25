import { NextRequest, NextResponse } from "next/server";
import { CreateKeyRequestSchema } from "@/lib/schemas/api";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") || "25bMf9wr6oN";
    const keys = db.getApiKeys(workspaceId);

    return NextResponse.json({
      success: true,
      keys,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateKeyRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid key name", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name } = parsed.data;
    const workspaceId = body.workspaceId || "25bMf9wr6oN";

    const newKey = db.createApiKey(workspaceId, name);

    return NextResponse.json(
      {
        success: true,
        key: newKey,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing key ID" }, { status: 400 });
    }

    const deleted = db.deleteApiKey(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "API key revoked" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
