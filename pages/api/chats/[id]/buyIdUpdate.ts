import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const chatRoom = await client.chatRoom.findFirst({
    where: {
      id: +id.toString(),
    },
  });

  if (req.method === "POST") {
    if (chatRoom) {
      await client.chatRoom.update({
        where: {
          id: +id.toString(),
        },
        data: {
          buyUserId: user?.id,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
