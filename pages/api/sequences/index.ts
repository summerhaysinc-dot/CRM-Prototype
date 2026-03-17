import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";
import { simpleNameSchema } from "@/lib/utils/validators";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  if (req.method === "GET") return res.status(200).json(await prisma.sequence.findMany({ orderBy: { createdAt: "desc" } }));
  if (req.method === "POST") {
    const parsed = simpleNameSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    return res.status(201).json(await prisma.sequence.create({ data: parsed.data }));
  }
  return res.status(405).json({ error: "Method not allowed" });
}
