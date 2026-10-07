export const booksDocs = {
  "/api/books": {
    get: {
      tags: ["Books"],

      summary: "Get all books",

      description:
        "Returns a list of books. Authentication is required.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "search",
          in: "query",
          required: false,

          description:
            "Search books by title or author.",

          schema: {
            type: "string",
          },

          example: "Things Fall Apart",
        },

        {
          name: "category",
          in: "query",
          required: false,

          description:
            "Filter books by category.",

          schema: {
            type: "string",
          },

          example: "Fiction",
        },

        {
          name: "limit",
          in: "query",
          required: false,

          description:
            "Maximum number of books to return.",

          schema: {
            type: "integer",
            minimum: 1,
            default: 20,
          },

          example: 20,
        },

        {
          name: "skip",
          in: "query",
          required: false,

          description:
            "Number of books to skip for pagination.",

          schema: {
            type: "integer",
            minimum: 0,
            default: 0,
          },

          example: 0,
        },
      ],

      responses: {
        200: {
          description: "Books retrieved successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Books retrieved successfully",
                data: {
                  books: [
                    {
                      id: "550e8400-e29b-41d4-a716-446655440000",
                      title: "Things Fall Apart",
                      author: "Chinua Achebe",
                      description: "A classic Nigerian novel.",
                      publishedDate: "1958-06-17",
                      category: "Fiction",
                      createdAt: "2026-10-07T10:00:00.000Z",
                      updatedAt: "2026-10-07T10:00:00.000Z",
                    },
                  ],

                  total: 1,
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized",
        },

        422: {
          description: "Invalid query parameters",
        },
      },
    },

    post: {
      tags: ["Books"],

      summary: "Create a book",

      description:
        "Creates a new book. Authentication is required.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateBookRequest",
            },

            example: {
              title: "Things Fall Apart",
              author: "Chinua Achebe",
              description: "A classic Nigerian novel.",
              publishedDate: "1958-06-17",
              category: "Fiction",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Book created successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Book created successfully",
                data: {
                  book: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    title: "Things Fall Apart",
                    author: "Chinua Achebe",
                    description: "A classic Nigerian novel.",
                    publishedDate: "1958-06-17",
                    category: "Fiction",
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
        },

        422: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/books/{id}": {
    get: {
      tags: ["Books"],

      summary: "Get a book by ID",

      description:
        "Returns a single book using its unique ID.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,

          description:
            "The unique ID of the book.",

          schema: {
            type: "string",
            format: "uuid",
          },

          example:
            "550e8400-e29b-41d4-a716-446655440000",
        },
      ],

      responses: {
        200: {
          description: "Book retrieved successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Book retrieved successfully",
                data: {
                  book: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    title: "Things Fall Apart",
                    author: "Chinua Achebe",
                    description: "A classic Nigerian novel.",
                    publishedDate: "1958-06-17",
                    category: "Fiction",
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
        },

        404: {
          description: "Book not found",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Book not found",
              },
            },
          },
        },

        422: {
          description: "Invalid book ID",
        },
      },
    },

    patch: {
      tags: ["Books"],

      summary: "Update a book",

      description:
        "Updates an existing book. Only the provided fields are updated.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,

          description:
            "The unique ID of the book.",

          schema: {
            type: "string",
            format: "uuid",
          },

          example:
            "550e8400-e29b-41d4-a716-446655440000",
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateBookRequest",
            },

            example: {
              title: "Things Fall Apart - Updated",
              category: "Classic Fiction",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Book updated successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Book updated successfully",
                data: {
                  book: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    title: "Things Fall Apart - Updated",
                    author: "Chinua Achebe",
                    description: "A classic Nigerian novel.",
                    publishedDate: "1958-06-17",
                    category: "Classic Fiction",
                    createdAt: "2026-10-07T10:00:00.000Z",
                    updatedAt: "2026-10-07T11:00:00.000Z",
                  },
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized",
        },

        404: {
          description: "Book not found",
        },

        422: {
          description: "Validation error",
        },
      },
    },

    delete: {
      tags: ["Books"],

      summary: "Delete a book",

      description:
        "Deletes an existing book using its unique ID.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,

          description:
            "The unique ID of the book.",

          schema: {
            type: "string",
            format: "uuid",
          },

          example:
            "550e8400-e29b-41d4-a716-446655440000",
        },
      ],

      responses: {
        200: {
          description: "Book deleted successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Book deleted successfully",
              },
            },
          },
        },

        401: {
          description: "Unauthorized",
        },

        404: {
          description: "Book not found",
        },

        422: {
          description: "Invalid book ID",
        },
      },
    },
  },
};