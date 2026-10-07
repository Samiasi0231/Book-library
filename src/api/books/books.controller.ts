import type { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type { IBaseRequest } from "../../types";
import { responsHandler } from "../../utils/helpers";
import * as bookService from "./books.service";
import type { CreateBookInput, UpdateBookInput, ListBooksQuery } from "./books.dto"

export async function create(req: IBaseRequest, res: Response, next: NextFunction) {
  try {
    const input = req.body as CreateBookInput;
    const data = await bookService.createBook(input, req.auth!.sub);
    responsHandler(res, StatusCodes.CREATED, "Book created successfully", data);
  } catch (err) {
    next(err);
  }
}

export async function list(req: IBaseRequest, res: Response, next: NextFunction) {
  try {
    const query = req.query as unknown as ListBooksQuery;
    const data = await bookService.listBooks(query);
    responsHandler(res, StatusCodes.OK, "Books retrieved successfully", data);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: IBaseRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };
    const data = await bookService.getBookById(id);
    responsHandler(res, StatusCodes.OK, "Book retrieved successfully", data);
  } catch (err) {
    next(err);
  }
}

export async function update(req: IBaseRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };
    const input = req.body as UpdateBookInput;
    const data = await bookService.updateBook(id, input);
    responsHandler(res, StatusCodes.OK, "Book updated successfully", data);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: IBaseRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };
    await bookService.deleteBook(id);
    responsHandler(res, StatusCodes.OK, "Book deleted successfully");
  } catch (err) {
    next(err);
  }
}