import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),

  email: z
    .string()
    .email("Invalid email format")
    .max(100)
    .transform((val) => val.toLowerCase().trim()),

  message: z
    .string()
    .min(5, "Message too short")
    .max(1000, "Message too long")
});

export const subscriberSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .max(100)
    .transform((val) => val.toLowerCase().trim())
});
