import client from "@/app/libs/server/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const client2 = await client.user.create({
    data: {
      email: "hasdfi22cc",
      name: "nnasdfn22cc",
    },
  });

  return NextResponse.json({ ok: true, data: client2 });
}
