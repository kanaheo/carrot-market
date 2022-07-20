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
    body: { chat },
  } = req;

  const chatRoom = await client.chatRoom.findUnique({
    where: {
      id: +id.toString(),
    },
  });
  if (chatRoom) {
    const newChat = await client.chat.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        chatRoom: {
          connect: {
            id: +id.toString(),
          },
        },
        chatContent: chat,
        product: {
          connect: {
            id: chatRoom?.productId,
          },
        },
      },
    });

    // TODO post exists check !! ( product, fav )

    res.json({
      ok: true,
      answer: newChat,
    });

    res.status(200).end();
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
