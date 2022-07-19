import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  }
  if (req.method === "GET") {
    const chatRoom = await client.chatRoom.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
        chat: {
          select: {
            chatContent: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        buyUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      where: {
        OR: [
          {
            buyUserId: user?.id,
            NOT: [
              {
                chat: {
                  none: {},
                },
              },
            ],
          },
          {
            createdById: user?.id,
            NOT: [
              {
                chat: {
                  none: {},
                },
              },
            ],
          },
        ],
      },
    });
    res.json({ ok: true, chatRoom });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
