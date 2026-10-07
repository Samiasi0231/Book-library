import { Router } from "express";

import { validate } from "../../middleware/validate";

import { authenticate } from "../../middleware/authenticate";

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.dto";

import * as authController from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  authController.login,
);

router.post(
  "/refresh",
  validate({ body: refreshTokenSchema }),
  authController.refresh,
);

router.post(
  "/logout",
  validate({ body: refreshTokenSchema }),
  authController.logout,
);

router.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validate({ body: resetPasswordSchema }),
  authController.resetPassword,
);

router.get(
  "/me",
  authenticate,
  authController.me,
);

export default router;