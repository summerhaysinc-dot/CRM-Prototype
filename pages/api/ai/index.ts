import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionUser } from "@/lib/auth/session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  return res.status(200).json({ response: "AI response placeholder" });
}
