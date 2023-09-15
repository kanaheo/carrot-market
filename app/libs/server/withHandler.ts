import { NextRequest, NextResponse } from "next/server";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextRequest, res: NextResponse) => void,
) {
  return async function (req: NextRequest, res: NextResponse) {
    NextResponse.json({ ok: true });
  };
}
