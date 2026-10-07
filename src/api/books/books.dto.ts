import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  author: z.string().trim().min(1, "Author is required").max(255),
  publishedDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "publishedDate must be in YYYY-MM-DD format"),
});
export type CreateBookInput = z.infer<typeof createBookSchema>;

export const updateBookSchema = createBookSchema.partial();
export type UpdateBookInput = z.infer<typeof updateBookSchema>;

export const listBooksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(), // matches against title or author
});
export type ListBooksQuery = z.infer<typeof listBooksQuerySchema>;

export const bookIdParamsSchema = z.object({
  id: z.string().uuid("Invalid book id"),
});