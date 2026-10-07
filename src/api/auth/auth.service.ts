import { and, eq } from "drizzle-orm";
import crypto from "node:crypto";

import { db } from "../../connection/db";

import {
  users,
  refreshTokens,
  passwordResetTokens,
} from "../../connection/db/schema";

import {
  hashPassword,
  comparePassword,
  toSafeUser,
} from "../../utils/helpers";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} from "../../utils/app-error";

import {
  sendPasswordResetEmail,
} from "../../utils/email";

import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./auth.dto";

export async function register(
  input: RegisterInput,
) {
  const existing =
    await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

  if (existing) {
    throw new ConflictError(
      "An account with this email already exists",
    );
  }

  const passwordHash =
    await hashPassword(input.password);

  const [user] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      password: passwordHash,
    })
    .returning();

  return {
    user: toSafeUser(user),
  };
}

export async function login(
  input: LoginInput,
) {
  const user =
    await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

  if (!user) {
    throw new UnauthorizedError(
      "Incorrect email or password",
    );
  }

  const validPassword =
    await comparePassword(
      input.password,
      user.password,
    );

  if (!validPassword) {
    throw new UnauthorizedError(
      "Incorrect email or password",
    );
  }

  const payload = {
    sub: user.id,
    type: "user" as const,
  };

  const accessToken =
    signAccessToken(payload);

  const refreshToken =
    signRefreshToken(payload);

  await db.insert(refreshTokens).values({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000,
    ),
  });

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken,
  };
}

export async function getCurrentUser(
  userId: string,
) {
  const user =
    await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

  if (!user) {
    throw new UnauthorizedError(
      "Account no longer exists",
    );
  }

  return {
    user: toSafeUser(user),
  };
}

export async function refresh(
  refreshToken: string,
) {
  try {
    const payload =
      verifyRefreshToken(refreshToken);

    const storedToken =
      await db.query.refreshTokens.findFirst({
        where: eq(
          refreshTokens.token,
          refreshToken,
        ),
      });

    if (!storedToken) {
      throw new UnauthorizedError(
        "Refresh token is invalid",
      );
    }

    if (
      storedToken.expiresAt <
      new Date()
    ) {
      await db
        .delete(refreshTokens)
        .where(
          eq(
            refreshTokens.token,
            refreshToken,
          ),
        );

      throw new UnauthorizedError(
        "Refresh token has expired",
      );
    }

    const accessToken =
      signAccessToken({
        sub: payload.sub,
        type: payload.type,
      });

    return {
      accessToken,
    };
  } catch (error) {
    if (
      error instanceof UnauthorizedError
    ) {
      throw error;
    }

    throw new UnauthorizedError(
      "Invalid or expired refresh token",
    );
  }
}

export async function logout(
  refreshToken: string,
) {
  await db
    .delete(refreshTokens)
    .where(
      eq(
        refreshTokens.token,
        refreshToken,
      ),
    );

  return {
    success: true,
  };
}

export async function forgotPassword(
  input: ForgotPasswordInput,
) {
  const user =
    await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

  /*
   * We deliberately return the same response
   * whether the email exists or not.
   */
  if (!user) {
    return;
  }

  /*
   * Remove previous reset tokens
   * for this user.
   */
  await db
    .delete(passwordResetTokens)
    .where(
      eq(
        passwordResetTokens.userId,
        user.id,
      ),
    );

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + 60 * 60 * 1000,
  );

  await db
    .insert(passwordResetTokens)
    .values({
      userId: user.id,
      token: resetToken,
      expiresAt,
    });

  await sendPasswordResetEmail(
    user.email,
    resetToken,
  );
}

export async function resetPassword(
  input: ResetPasswordInput,
) {
  const resetToken =
    await db.query.passwordResetTokens.findFirst(
      {
        where: eq(
          passwordResetTokens.token,
          input.token,
        ),
      },
    );

  if (!resetToken) {
    throw new BadRequestError(
      "Invalid or expired password reset token",
    );
  }

  if (
    resetToken.expiresAt < new Date()
  ) {
    await db
      .delete(passwordResetTokens)
      .where(
        eq(
          passwordResetTokens.id,
          resetToken.id,
        ),
      );

    throw new BadRequestError(
      "Password reset token has expired",
    );
  }

  const passwordHash =
    await hashPassword(input.password);

  await db
    .update(users)
    .set({
      password: passwordHash,
      updatedAt: new Date(),
    })
    .where(
      eq(
        users.id,
        resetToken.userId,
      ),
    );

  /*
   * Delete the token so it cannot
   * be used again.
   */
  await db
    .delete(passwordResetTokens)
    .where(
      eq(
        passwordResetTokens.id,
        resetToken.id,
      ),
    );

  /*
   * Log the user out of existing
   * sessions after changing password.
   */
  await db
    .delete(refreshTokens)
    .where(
      eq(
        refreshTokens.userId,
        resetToken.userId,
      ),
    );
}