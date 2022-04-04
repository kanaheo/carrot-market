import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

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

  // const token = await client.token

  console.log(user);

  // 아래 것을 더 쉽게 하는 upsert

  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     console.log("User Create !!");
  //     user = await client.user.create({
  //       data: {
  //         name: "Annonymous",
  //         email,
  //       },
  //     });
  //   } else {
  //     console.log("user found!");
  //     console.log(user);
  //   }
  // }

  // // phone
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (!user) {
  //     console.log("User Create !!");
  //     user = await client.user.create({
  //       data: {
  //         name: "Annonymous",
  //         phone: +phone,
  //       },
  //     });
  //   } else {
  //     console.log("user found!");
  //     console.log(user);
  //   }
  // }

  return res.status(200).end();
}

export default withHandler("POST", handler);
