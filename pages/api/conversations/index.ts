import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";
import { messageSchema } from "@/lib/utils/validators";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const conversations = await prisma.conversation.findMany({
      include: { contact: true },
      orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(conversations);
  }

  if (req.method === "POST") {
    const parsed = messageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const created = await prisma.conversation.create({ data: parsed.data });
    return res.status(201).json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
