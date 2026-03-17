import type { NextApiRequest } from "next";
import { verifyToken, type SessionUser } from "@/lib/auth/jwt";

export function getSessionUser(req: NextApiRequest): SessionUser | null {
  const token = req.cookies.auth_token;
  if (!token) return null;
  return verifyToken(token);
}
