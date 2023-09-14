import client from "@/app/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // 연습삼아 500에러를 일부로 ~
    const data = await req.json();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return new NextResponse("Error content", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // 개발자 툴 보면 status정보나옴
    return new NextResponse("Error content", { status: 500 });
  }
}
