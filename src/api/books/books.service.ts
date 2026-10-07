import { count, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../../connection/db";
import { books } from "../../connection/db/schema";
import { NotFoundError } from "../../utils/app-error";
import type { CreateBookInput, UpdateBookInput, ListBooksQuery } from "./books.dto";

export async function createBook(input: CreateBookInput, userId: string) {
  const [book] = await db
    .insert(books)
    .values({
      title: input.title,
      author: input.author,
      publishedDate: input.publishedDate,
      createdBy: userId,
    })
    .returning();

  return { book };
}

export async function listBooks(query: ListBooksQuery) {
  const { page, limit, search } = query;
  const offset = (page - 1) * limit;

  const where = search
    ? or(ilike(books.title, `%${search}%`), ilike(books.author, `%${search}%`))
    : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db.query.books.findMany({
      where,
      orderBy: desc(books.createdAt),
      limit,
      offset,
    }),
    db.select({ total: count() }).from(books).where(where),
  ]);

  return {
    books: rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getBookById(id: string) {
  const book = await db.query.books.findFirst({ where: eq(books.id, id) });
  if (!book) throw new NotFoundError("Book not found");
  return { book };
}

export async function updateBook(id: string, input: UpdateBookInput) {
  await getBookById(id); // 404s if missing

  const [book] = await db
    .update(books)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(books.id, id))
    .returning();

  return { book };
}

export async function deleteBook(id: string) {
  await getBookById(id);  
  await db.delete(books).where(eq(books.id, id));
}