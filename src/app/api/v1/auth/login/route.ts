import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    let user = db.findUserByEmail(email);

    // If demo user doesn't exist, create on demand
    if (!user) {
      const name = email.split("@")[0];
      user = db.createUser({
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        passwordHash: "demo_hash",
      });
    }

    const teamId = "25bMf9wr6oN";
    const token = signJwt({
      userId: user.id,
      email: user.email,
      name: user.name,
      teamId,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      teamId,
      token,
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: "fc_session",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
