import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get("fc_session")?.value ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ authenticated: false, error: "Invalid or expired session" }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
    },
    teamId: payload.teamId,
  });
}
