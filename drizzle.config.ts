import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/connection/db/schema/index.ts",
    out: "./src/connection/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;