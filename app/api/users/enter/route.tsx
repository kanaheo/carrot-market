import client from "@/app/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log(data.email);
  return NextResponse.json({ ok: true });
}
