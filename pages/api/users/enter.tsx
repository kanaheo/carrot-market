import mail from "@sendgrid/mail";
import twilio from "twilio";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
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
            name: "kkana",
            ...user,
          },
        },
      },
    },
  });
  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const email = await mail.send({
  //     from: "stalvede7@naver.com", // 보내는 사람
  //     to: "stalvede7@naver.com", // 받는사람
  //     subject: "your kkana shop verification email",
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(email);
  // }
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
