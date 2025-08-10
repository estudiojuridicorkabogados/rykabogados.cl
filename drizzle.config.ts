import { env } from "./src/lib/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema",
  dialect: "postgresql",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL as string,
  }
} satisfies Config;