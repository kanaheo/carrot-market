import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: "124124",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "kkana",
            ...payload,
          },
        },
      },
    },
  });

  console.log("token");
  console.log(token);

  return res.status(200).end();
}

export default withHandler("POST", handler);
