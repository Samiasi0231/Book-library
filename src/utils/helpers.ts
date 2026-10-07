import bcrypt from "bcryptjs";
import type { Response } from "express";
import type { User } from "../connection/db/schema/users";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export type SafeUser = Omit<User, "password">;

export function toSafeUser(user: User): SafeUser {
  const { password, ...safe } = user;
  return safe;
}

export function responsHandler(
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null
) {
  return res.status(statusCode).json({ message, data });
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}