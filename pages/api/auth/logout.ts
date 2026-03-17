import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", { path: "/", maxAge: -1, httpOnly: true })
  );
  return res.status(200).json({ ok: true });
}
