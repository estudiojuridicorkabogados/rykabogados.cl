import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string().min(1),
    DISABLE_CACHE: z.string().default("false"),
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: z.string().min(1),
    CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
    RECAPTCHA_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(["local", "production"]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
});
