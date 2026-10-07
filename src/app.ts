import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "./utils/config";
import { swaggerSpec } from "./utils/swagger";
import authRoutes from "./api/auth/auth.routes";
import bookRoutes from "./api/books/books.routes";

import {
  notFoundHandler,
  errorHandler,
} from "./middleware/error-handler";

export const app = express();


app.use(helmet());


const allowedOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS
      .split(",")
      .map((origin) => origin.trim())
  : [env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ok",
  });
});


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Book Library API Docs",
  }),
);

app.get("/api-docs.json", (_req, res) => {
  res.json(swaggerSpec);
});


app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);


app.use(notFoundHandler);


app.use(errorHandler);