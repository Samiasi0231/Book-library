import { Router } from "express";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import {
  createBookSchema,
  updateBookSchema,
  listBooksQuerySchema,
  bookIdParamsSchema,
} from "./books.dto";
import * as bookController from "./books.controller";

const router = Router();

router.use(authenticate);

router.get("/", validate({ query: listBooksQuerySchema }), bookController.list);
router.get("/:id", validate({ params: bookIdParamsSchema }), bookController.getOne);
router.post("/", validate({ body: createBookSchema }), bookController.create);
router.patch(
  "/:id",
  validate({ params: bookIdParamsSchema, body: updateBookSchema }),
  bookController.update
);
router.delete("/:id", validate({ params: bookIdParamsSchema }), bookController.remove);

export default router;