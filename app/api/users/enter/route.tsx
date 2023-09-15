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
    // upsert란 ? where로 user가 없으면 create하거나 user를 update를 하려고 ~ 결과적으로 return 값은 user
    const user = await client.user.upsert({
      where: {
        ...payload,
      },
      create: {
        name: "kknkkm",
        ...payload,
      },
      update: {},
    });

    console.log(user);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error content", {
      status: 500,
    });
  }
}
