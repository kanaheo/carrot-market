import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!foundToken) return res.status(404).eventNames();
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save(); // session의 리턴값이 promise await는 promise가 끝날 때까지 기다리라고 지칭함
  // 그리고 다 사용하면 ! 토큰을 유저가 가지고 있을 필요는 없으니까 삭제 !
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler("POST", handler));
