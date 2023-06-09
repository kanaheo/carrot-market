import client from "@/app/libs/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const client2 = await client.user.create({
    data: {
      email: "hasdfi22",
      name: "nnasdfn22",
    },
  });

  return NextResponse.json({ ok: true, data: client2 });
}
