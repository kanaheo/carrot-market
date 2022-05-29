import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "kkana",
      ...payload,
    },
    update: {},
  });

  console.log(user);

  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) {
  //     console.log("user is ! ");
  //   }
  //   if (!user) {
  //     console.log("no user !! let's create user");
  //     user = await client.user.create({
  //       data: {
  //         name: "kkana",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) {
  //     console.log("user is ! ");
  //   }
  //   if (!user) {
  //     console.log("no user !! let's create user");
  //     user = await client.user.create({
  //       data: {
  //         name: "kkana",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  return res.status(200).end();
}

export default withHandler("POST", handler);
