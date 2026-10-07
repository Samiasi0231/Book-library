import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/app-error";

export function notFoundHandler(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: null,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message, data: null });
  }

  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err instanceof Error ? err.message : "Internal server error",
    data: null,
  });
}