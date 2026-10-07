import type {
  Response,
  NextFunction,
} from "express";

import { StatusCodes } from "http-status-codes";

import type { IBaseRequest } from "../../types";

import { responsHandler } from "../../utils/helpers";

import * as authService from "./auth.service";

import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./auth.dto";

export async function register(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = req.body as RegisterInput;

    const data = await authService.register(input);

    responsHandler(
      res,
      StatusCodes.CREATED,
      "Account created successfully",
      data,
    );
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = req.body as LoginInput;

    const data = await authService.login(input);

    responsHandler(
      res,
      StatusCodes.OK,
      "Logged in successfully",
      data,
    );
  } catch (err) {
    next(err);
  }
}

export async function me(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await authService.getCurrentUser(
      req.auth!.sub,
    );

    responsHandler(
      res,
      StatusCodes.OK,
      "User profile retrieved",
      data,
    );
  } catch (err) {
    next(err);
  }
}

export async function refresh(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } =
      req.body as RefreshTokenInput;

    const data =
      await authService.refresh(refreshToken);

    responsHandler(
      res,
      StatusCodes.OK,
      "Access token refreshed successfully",
      data,
    );
  } catch (err) {
    next(err);
  }
}

export async function logout(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } =
      req.body as RefreshTokenInput;

    await authService.logout(refreshToken);

    responsHandler(
      res,
      StatusCodes.OK,
      "Logged out successfully",
    );
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const input =
      req.body as ForgotPasswordInput;

    await authService.forgotPassword(input);

    responsHandler(
      res,
      StatusCodes.OK,
      "If an account exists with that email, a password reset link has been sent",
    );
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(
  req: IBaseRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const input =
      req.body as ResetPasswordInput;

    await authService.resetPassword(input);

    responsHandler(
      res,
      StatusCodes.OK,
      "Password reset successfully",
    );
  } catch (err) {
    next(err);
  }
}