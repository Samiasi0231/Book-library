import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number()
    .default(4000),

  FRONTEND_URL: z
    .string()
    .url()
    .default("http://localhost:5173"),

  ALLOWED_ORIGINS: z
    .string()
    .optional(),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required"),

  ACCESS_TOKEN_SECRET: z
    .string()
    .min(
      32,
      "ACCESS_TOKEN_SECRET must be at least 32 characters",
    ),

  REFRESH_TOKEN_SECRET: z
    .string()
    .min(
      32,
      "REFRESH_TOKEN_SECRET must be at least 32 characters",
    ),

  SMTP_HOST: z
    .string()
    .min(1, "SMTP_HOST is required"),

  SMTP_PORT: z.coerce
    .number()
    .default(465),

  SMTP_SECURE: z
    .string()
    .transform((value) => value === "true")
    .default("true"),

  SMTP_USER: z
    .string()
    .email("SMTP_USER must be a valid email"),

  SMTP_PASSWORD: z
    .string()
    .min(1, "SMTP_PASSWORD is required"),

  SMTP_FROM_NAME: z
    .string()
    .min(1)
    .default("Book Library"),

  SMTP_FROM_EMAIL: z
    .string()
    .email("SMTP_FROM_EMAIL must be a valid email"),

  PASSWORD_RESET_URL: z
    .string()
    .url()
    .default("http://localhost:5173/reset-password"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");

  console.error(
    parsed.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsed.data;

export const isProd =
  env.NODE_ENV === "production";