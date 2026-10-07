import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";

interface ValidateSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validate(schemas: ValidateSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          message: formatZodError(result.error),
          data: null,
        });
      }
      req.body = result.data;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          message: formatZodError(result.error),
          data: null,
        });
      }
      req.query = result.data as typeof req.query;
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          message: formatZodError(result.error),
          data: null,
        });
      }
      req.params = result.data as typeof req.params;
    }

    next();
  };
}

function formatZodError(error: import("zod").ZodError): string {
  const issue = error.issues[0];
  const path = issue.path.join(".");
  return path ? `${path}: ${issue.message}` : issue.message;
}