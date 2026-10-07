import type { Request } from "express";
import type { TokenPayload } from "../utils/jwt";

export interface IBaseRequest extends Request {
  auth?: TokenPayload;
}