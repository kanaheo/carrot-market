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
  } = req;

  // TODO 만약 record를 쓴다면 ??
  //   await client.record.findMany({
  //     where:{
  //         userId: user?.id,
  //         kind: "Sale"
  //     }
  //   })

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  res.json({
    ok: true,
    sales,
  });

  res.status(200).end();
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
