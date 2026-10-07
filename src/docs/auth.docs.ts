export const authDocs = {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],

      summary: "Register a new user",

      description:
        "Creates a new Book Library account using the user's name, email, and password.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },

            example: {
              name: "Samuel Asime",
              email: "samuel@example.com",
              password: "Password123",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Account created successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Account created successfully",
                data: {
                  user: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    name: "Samuel Asime",
                    email: "samuel@example.com",
                    createdAt: "2026-10-07T10:00:00.000Z",
                    updatedAt: "2026-10-07T10:00:00.000Z",
                  },
                },
              },
            },
          },
        },

        409: {
          description: "An account with this email already exists",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "An account with this email already exists",
              },
            },
          },
        },

        422: {
          description: "Validation error",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Validation error",
              },
            },
          },
        },
      },
    },
  },

  "/api/auth/login": {
    post: {
      tags: ["Authentication"],

      summary: "Login",

      description:
        "Authenticates a user and returns an access token and refresh token.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },

            example: {
              email: "samuel@example.com",
              password: "Password123",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Logged in successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Logged in successfully",
                data: {
                  user: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    name: "Samuel Asime",
                    email: "samuel@example.com",
                  },

                  accessToken: "eyJhbGciOiJIUzI1NiIs...",
                  refreshToken: "eyJhbGciOiJIUzI1NiIs...",
                },
              },
            },
          },
        },

        401: {
          description: "Incorrect email or password",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Incorrect email or password",
              },
            },
          },
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/auth/refresh": {
    post: {
      tags: ["Authentication"],

      summary: "Refresh access token",

      description:
        "Generates a new access token using a valid refresh token.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshTokenRequest",
            },

            example: {
              refreshToken: "eyJhbGciOiJIUzI1NiIs...",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Access token refreshed successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Access token refreshed successfully",
                data: {
                  accessToken: "eyJhbGciOiJIUzI1NiIs...",
                },
              },
            },
          },
        },

        401: {
          description: "Invalid or expired refresh token",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid or expired refresh token",
              },
            },
          },
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      tags: ["Authentication"],

      summary: "Logout",

      description:
        "Invalidates the provided refresh token and logs the user out.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshTokenRequest",
            },

            example: {
              refreshToken: "eyJhbGciOiJIUzI1NiIs...",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Logged out successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Logged out successfully",
              },
            },
          },
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/auth/forgot-password": {
    post: {
      tags: ["Authentication"],

      summary: "Request password reset",

      description:
        "Sends a password reset link to the user's email address if the account exists.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ForgotPasswordRequest",
            },

            example: {
              email: "samuel@example.com",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Password reset request processed",

          content: {
            "application/json": {
              example: {
                success: true,
                message:
                  "If an account exists with that email, a password reset link has been sent",
              },
            },
          },
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/auth/reset-password": {
    post: {
      tags: ["Authentication"],

      summary: "Reset password",

      description:
        "Resets a user's password using a valid password reset token.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResetPasswordRequest",
            },

            example: {
              token: "7e2a8e7c9f3a...",
              password: "NewPassword123",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Password reset successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Password reset successfully",
              },
            },
          },
        },

        400: {
          description: "Invalid or expired password reset token",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid or expired password reset token",
              },
            },
          },
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/auth/me": {
    get: {
      tags: ["Authentication"],

      summary: "Get current user",

      description:
        "Returns the profile of the currently authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "User profile retrieved",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "User profile retrieved",
                data: {
                  user: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    name: "Samuel Asime",
                    email: "samuel@example.com",
                    createdAt: "2026-10-07T10:00:00.000Z",
                    updatedAt: "2026-10-07T10:00:00.000Z",
                  },
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid or expired access token",
              },
            },
          },
        },
      },
    },
  },
};