import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/utils/validators";
import { getSessionUser } from "@/lib/auth/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(contacts);
  }

  if (req.method === "POST") {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

    const contact = await prisma.contact.create({ data: parsed.data });
    return res.status(201).json(contact);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
