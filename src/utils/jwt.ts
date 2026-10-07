import jwt from "jsonwebtoken";

import { env } from "./config";

export interface TokenPayload {
  sub: string;
  type: "user";
}

export function signAccessToken(
  payload: TokenPayload,
) {
  return jwt.sign(
    payload,
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
}

export function signRefreshToken(
  payload: TokenPayload,
) {
  return jwt.sign(
    payload,
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

export function verifyAccessToken(
  token: string,
) {
  return jwt.verify(
    token,
    env.ACCESS_TOKEN_SECRET,
  ) as TokenPayload;
}

export function verifyRefreshToken(
  token: string,
) {
  return jwt.verify(
    token,
    env.REFRESH_TOKEN_SECRET,
  ) as TokenPayload;
}