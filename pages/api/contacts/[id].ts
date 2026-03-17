import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/utils/validators";
import { getSessionUser } from "@/lib/auth/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const id = String(req.query.id || "");

  if (req.method === "PUT") {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

    const updated = await prisma.contact.update({ where: { id }, data: parsed.data });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.contact.delete({ where: { id } });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
