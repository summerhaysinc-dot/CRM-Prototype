import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, password } = req.body as {
    firstName?: string;
    lastName?: string;
    password?: string;
  };

  const data: Record<string, string> = {};
  if (firstName) data.firstName = firstName;
  if (lastName) data.lastName = lastName;
  if (password) data.passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({ where: { id: session.id }, data });
  return res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName });
}
