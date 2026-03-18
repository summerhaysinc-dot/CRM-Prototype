import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { prisma } from "@/lib/db/prisma";
import { signToken } from "@/lib/auth/jwt";
import { loginSchema } from "@/lib/utils/validators";

const DEFAULT_ADMIN_EMAIL = "admin@crm.local";
const DEFAULT_ADMIN_PASSWORD = "Password123!";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const normalizedEmail = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;

    let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    // Prototype safety net: keep documented test credentials working even if seed was skipped.
    if (!user && normalizedEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
      user = await prisma.user.create({
        data: {
          email: DEFAULT_ADMIN_EMAIL,
          passwordHash,
          firstName: "Admin",
          lastName: "User",
          role: "admin"
        }
      });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials. Run npm run prisma:seed to create the default user." });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials. Run npm run prisma:seed to reset the default user password." });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });

    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ error: "Unable to sign in" });
  }
}
