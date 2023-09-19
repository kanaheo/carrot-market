import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

// email sms test~
// mail.setApiKey(process.env.SENDGRID_KEY!);
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
    const user = phone ? { phone: +phone } : email ? { email } : "";
    if (!user)
      return new NextResponse("Error content", {
        status: 400,
      });
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await client.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...user,
            },
            create: {
              name: "kknkkm",
              ...user,
            },
          },
        },
      },
    });

    // if (phone) {
    //   const message = await twilioClient.messages.create({
    //     messagingServiceSid: process.env.TWILIO_MSID,
    //     // to: phone 원래는 이런 이름으로 !!! phone를 적어서 보낼 사람에게 보내야함 !
    //     to: process.env.MY_PHONE!,
    //     body: `Your Login token is ${payload}`,
    //   });
    // }
    // if (email) {
    //   const email = await mail.send({
    //     from: "stalvede0421@gmail.com",
    //     to: "stalvede0421@gmail.com",
    //     subject: "Your Carrot Market Verification Email",
    //     text: `Your token is ${payload}`,
    //     html: `<strong>Your token is ${payload}</strong>`,
    //   });
    // }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error content", {
      status: 500,
    });
  }
}
