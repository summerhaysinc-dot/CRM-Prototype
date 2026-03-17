import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().min(1)
});

export const messageSchema = z.object({
  contactId: z.string().uuid(),
  message: z.string().min(1),
  direction: z.enum(["inbound", "outbound"])
});

export const simpleNameSchema = z.object({
  name: z.string().min(1)
});
