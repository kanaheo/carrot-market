import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!exists) res.status(404).eventNames();
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save(); // session의 리턴값이 promise await는 promise가 끝날 때까지 기다리라고 지칭함

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "123545125123412431241zxcvzxcvzxvcsdfgasdfasdfasdfasdfasdf",
});
