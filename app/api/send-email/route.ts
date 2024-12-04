import {NextRequest, NextResponse} from "next/server";
import {postEmailParamsToLambda} from "./utils";

export default async function handler(req: NextRequest) {
  const body = await req.json();
  const { subject, message, userEmail, headers } = body;

  if (!subject || !message || !userEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const response = await postEmailParamsToLambda({ subject, message, userEmail, headers });

  try {
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
    return NextResponse.json({ success: "發送成功" });
  } catch (e) {
    console.error("API 路有故障:", e);
    return NextResponse.json({ error: "内部錯誤" }, { status: 500 });
  }
}
