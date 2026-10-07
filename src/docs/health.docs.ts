export const healthDocs = {
  "/health": {
    get: {
      tags: ["Health"],
      summary: "Check API health",
      description:
        "Returns the current health status of the Book Library API.",
      responses: {
        200: {
          description: "API is running successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "ok",
              },
            },
          },
        },
      },
    },
  },
};