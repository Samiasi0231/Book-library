import type { Response, NextFunction } from "express";
import type { IBaseRequest } from "../types";
import { verifyAccessToken } from "../utils/jwt";
import { UnauthorizedError } from "../utils/app-error";

export function authenticate(
  req: IBaseRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication required");
    }

    const token = header.slice("Bearer ".length);
    const payload = verifyAccessToken(token);

    req.auth = payload;
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired access token"));
  }
}