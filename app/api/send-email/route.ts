import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  const body = await req.json();
  const { subject, message, userEmail } = body;

  if (!subject || !message || !userEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
}
