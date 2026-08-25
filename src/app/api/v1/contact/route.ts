import { NextRequest, NextResponse } from "next/server";
import { ContactRequestSchema } from "@/lib/schemas/api";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const record = db.createInquiry({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    console.log(`[Contact Form Saved in DB] From: ${name} (${email}) - ID: ${record.id}`);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
      inquiryId: record.id,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
