import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getSessionUser } from "@/lib/auth/session";

const LOGO_PATH = path.join(process.cwd(), "public", "company-logo.txt");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionUser(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    if (!fs.existsSync(LOGO_PATH)) return res.status(200).json({ logo: null });
    const logo = fs.readFileSync(LOGO_PATH, "utf-8");
    return res.status(200).json({ logo });
  }

  if (req.method === "POST") {
    const { logo } = req.body as { logo?: string };
    if (!logo) return res.status(400).json({ error: "Logo is required" });
    fs.writeFileSync(LOGO_PATH, logo, "utf-8");
    return res.status(200).json({ logo });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
