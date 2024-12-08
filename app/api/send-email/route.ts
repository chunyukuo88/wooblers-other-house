import {NextRequest, NextResponse} from "next/server";
import {postEmailParamsToLambda} from "./utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subject, message, userEmail } = body;

  if (!subject || !message || !userEmail) {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  const headers = { authorization: req.headers.get("authorization") || "" };

  const response = await postEmailParamsToLambda({
    subject,
    message,
    userEmail,
    headers,
  });

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
