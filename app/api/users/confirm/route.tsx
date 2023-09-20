import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { token } = await req.json();
    console.log(token);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error content", {
      status: 500,
    });
  }
}
