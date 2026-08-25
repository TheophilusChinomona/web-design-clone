import { NextRequest, NextResponse } from "next/server";
import { MapRequestSchema } from "@/lib/schemas/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MapRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid map request", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { url, search, limit } = parsed.data;
    const base = url.replace(/\/$/, "");

    const mockPaths = [
      "",
      "/about",
      "/docs",
      "/docs/api",
      "/docs/quickstart",
      "/pricing",
      "/blog",
      "/blog/introducing-v2",
      "/contact",
      "/careers",
      "/terms",
      "/privacy",
    ];

    let links = mockPaths.map((p) => `${base}${p}`);

    if (search) {
      links = links.filter((l) => l.toLowerCase().includes(search.toLowerCase()));
    }

    links = links.slice(0, limit);

    return NextResponse.json({
      success: true,
      links,
      total: links.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
