import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
  await prisma.sequence.delete({ where: { id: String(req.query.id) } });
  return res.status(200).json({ ok: true });
}
