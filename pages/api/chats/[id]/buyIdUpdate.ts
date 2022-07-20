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

  if (req.method === "GET") {
    const chats = await client.chat.findMany({
      where: {
        chatRoomId: +id.toString(),
      },
    });

    res.json({ ok: true, chats });
  }

  if (req.method === "POST") {
    const chatRoom = await client.chatRoom.findFirst({
      where: {
        id: +id.toString(),
      },
    });
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
    methods: ["POST", "GET"],
    handler,
  })
);
