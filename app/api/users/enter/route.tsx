import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // 연습삼아 500에러를 일부로 ~
    const data = await req.json();
    return NextResponse.json({ ok: true });
  } catch (err) {
    // 개발자 툴 보면 status정보나옴 statusText를 이용해서 커스텀도 가능
    return new NextResponse("Error content", {
      status: 500,
      statusText: "Error!!",
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, phone } = await req.json();
    const payload = phone ? { phone: +phone } : { email };
    const token = await client.token.create({
      data: {
        payload: "1234121",
        user: {
          connectOrCreate: {
            where: {
              ...payload,
            },
            create: {
              name: "kknkkm",
              ...payload,
            },
          },
        },
      },
    });

    console.log(token);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error content", {
      status: 500,
    });
  }
}
