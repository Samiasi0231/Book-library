import swaggerJSDoc from "swagger-jsdoc";

import { authDocs } from "../docs/auth.docs";
import { booksDocs } from "../docs/books.docs";
import { healthDocs } from "../docs/health.docs";


const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Book Library API",
      version: "1.0.0",
      description:
        "REST API for managing users, authentication, and books in the Book Library application.",
    },

    servers: [
      {
        url: "http://localhost:4000",
        description: "Local development server",
      },
    ],

    tags: [
        {
    name: "Health",
    description: "API health check",
  },
      {
        name: "Authentication",
        description: "User authentication and account security",
      },
      {
        name: "Books",
        description: "Book management operations",
      },
      {
        name: "Users",
        description: "User management operations",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter your access token. Example: Bearer eyJhbGciOiJIUzI1NiIs...",
        },
      },

      schemas: {
        User: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },

            name: {
              type: "string",
              example: "Samuel Asime",
            },

            email: {
              type: "string",
              format: "email",
              example: "samuel@example.com",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:00:00.000Z",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:00:00.000Z",
            },
          },
        },

        Book: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },

            title: {
              type: "string",
              example: "Things Fall Apart",
            },

            author: {
              type: "string",
              example: "Chinua Achebe",
            },

            description: {
              type: "string",
              nullable: true,
              example: "A classic Nigerian novel.",
            },

            publishedDate: {
              type: "string",
              format: "date",
              nullable: true,
              example: "1958-06-17",
            },

            category: {
              type: "string",
              example: "Fiction",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:00:00.000Z",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:00:00.000Z",
            },
          },
        },

        RegisterRequest: {
          type: "object",

          required: ["name", "email", "password"],

          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 255,
              example: "Samuel Asime",
            },

            email: {
              type: "string",
              format: "email",
              example: "samuel@example.com",
            },

            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "Password123",
            },
          },
        },

        LoginRequest: {
          type: "object",

          required: ["email", "password"],

          properties: {
            email: {
              type: "string",
              format: "email",
              example: "samuel@example.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },

        RefreshTokenRequest: {
          type: "object",

          required: ["refreshToken"],

          properties: {
            refreshToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },

        ForgotPasswordRequest: {
          type: "object",

          required: ["email"],

          properties: {
            email: {
              type: "string",
              format: "email",
              example: "samuel@example.com",
            },
          },
        },

        ResetPasswordRequest: {
          type: "object",

          required: ["token", "password"],

          properties: {
            token: {
              type: "string",
              example: "7e2a8e7c9f3a...",
            },

            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "NewPassword123",
            },
          },
        },

        CreateBookRequest: {
          type: "object",

          required: ["title", "author", "category"],

          properties: {
            title: {
              type: "string",
              maxLength: 255,
              example: "Things Fall Apart",
            },

            author: {
              type: "string",
              maxLength: 255,
              example: "Chinua Achebe",
            },

            description: {
              type: "string",
              nullable: true,
              example: "A classic Nigerian novel.",
            },

            publishedDate: {
              type: "string",
              format: "date",
              nullable: true,
              example: "1958-06-17",
            },

            category: {
              type: "string",
              maxLength: 100,
              example: "Fiction",
            },
          },
        },

        UpdateBookRequest: {
          type: "object",

          properties: {
            title: {
              type: "string",
              maxLength: 255,
              example: "Things Fall Apart",
            },

            author: {
              type: "string",
              maxLength: 255,
              example: "Chinua Achebe",
            },

            description: {
              type: "string",
              nullable: true,
              example: "Updated book description.",
            },

            publishedDate: {
              type: "string",
              format: "date",
              nullable: true,
              example: "1958-06-17",
            },

            category: {
              type: "string",
              maxLength: 100,
              example: "Classic Fiction",
            },
          },
        },

        ErrorResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: false,
            },

            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },

        ValidationErrorResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: false,
            },

            message: {
              type: "string",
              example: "Validation error",
            },

            errors: {
              type: "object",
              example: {
                fieldErrors: {
                  email: ["Invalid email address"],
                },
              },
            },
          },
        },
      },
    },

    paths: {
      ...authDocs,
      ...booksDocs,
      ...healthDocs
    },
  },

  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);