import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side Environment Variables Schema.
   * These variables will not be exposed to the client.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Upstash QStash
    QSTASH_URL: z.string().url("QSTASH_URL must be a valid URL"),
    QSTASH_TOKEN: z.string().min(1, "QSTASH_TOKEN is required"),
    QSTASH_CURRENT_SIGNING_KEY: z.string().min(1, "QSTASH_CURRENT_SIGNING_KEY is required"),
    QSTASH_NEXT_SIGNING_KEY: z.string().min(1, "QSTASH_NEXT_SIGNING_KEY is required"),
    BYPASS_QSTASH: z.preprocess((val) => val === "true" || val === "1" || val === true, z.boolean()).default(false),

    // Upstash Redis Rest
    UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL must be a valid URL"),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN is required"),
    REDIS_URL: z.string().min(1, "REDIS_URL is required"),

    // Database
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    // Remotion AWS Lambda / S3
    REMOTION_AWS_ACCESS_KEY_ID: z.string().min(1, "REMOTION_AWS_ACCESS_KEY_ID is required"),
    REMOTION_AWS_SECRET_ACCESS_KEY: z.string().min(1, "REMOTION_AWS_SECRET_ACCESS_KEY is required"),
    REMOTION_SERVE_URL: z.string().url("REMOTION_SERVE_URL must be a valid URL"),
    REMOTION_FUNCTION_NAME: z.string().min(1, "REMOTION_FUNCTION_NAME is required"),
    REMOTION_APP_REGION: z.string().min(1, "REMOTION_APP_REGION is required"),

    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
    BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),

    // Google OAuth
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),

    // Supabase Server Integration
    SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
    SUPABASE_ACCESS_KEY_ID: z.string().min(1, "SUPABASE_ACCESS_KEY_ID is required"),
    SUPABASE_SECRET_ACCESS_KEY: z.string().min(1, "SUPABASE_SECRET_ACCESS_KEY is required"),

    // AI Providers & Tools
    ASSEMBLYAI_API_KEY: z.string().min(1, "ASSEMBLYAI_API_KEY is required"),
    ELEVENLABS_API_KEY: z.string().min(1, "ELEVENLABS_API_KEY is required"),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
    OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
    FIRECRAWL_API_KEY: z.string().min(1, "FIRECRAWL_API_KEY is required"),
    FISH_API_KEY: z.string().min(1, "FISH_API_KEY is required"),

    // Social Media Platforms
    X_BEARER_TOKEN: z.string().min(1, "X_BEARER_TOKEN is required"),
    YOUTUBE_CLIENT_ID: z.string().min(1, "YOUTUBE_CLIENT_ID is required"),
    YOUTUBE_CLIENT_SECRET: z.string().min(1, "YOUTUBE_CLIENT_SECRET is required"),

    // Dodo Payments
    DODO_PAYMENTS_API_KEY: z.string().min(1, "DODO_PAYMENTS_API_KEY is required"),
    DODO_PAYMENTS_WEBHOOK_SECRET: z.string().min(1, "DODO_PAYMENTS_WEBHOOK_SECRET is required"),
    DODO_PAYMENTS_ENVIRONMENT: z.enum(["test_mode", "live_mode"]).default("test_mode"),
    DODO_PAYMENTS_RETURN_URL: z.string().url("DODO_PAYMENTS_RETURN_URL must be a valid URL"),

    // Dodo Payments Product & Pack IDs
    DODO_CREATOR_PRODUCT_ID: z.string().min(1, "DODO_CREATOR_PRODUCT_ID is required"),
    DODO_PRO_PRODUCT_ID: z.string().min(1, "DODO_PRO_PRODUCT_ID is required"),
    DODO_STUDIO_PRODUCT_ID: z.string().min(1, "DODO_STUDIO_PRODUCT_ID is required"),
    DODO_PACK_SMALL_PRODUCT_ID: z.string().min(1, "DODO_PACK_SMALL_PRODUCT_ID is required"),
    DODO_PACK_MEDIUM_PRODUCT_ID: z.string().min(1, "DODO_PACK_MEDIUM_PRODUCT_ID is required"),
    DODO_PACK_LARGE_PRODUCT_ID: z.string().min(1, "DODO_PACK_LARGE_PRODUCT_ID is required"),

    // Modal Sandboxes
    MODAL_TOKEN_ID: z.string().min(1, "MODAL_TOKEN_ID is required"),
    MODAL_TOKEN_SECRET: z.string().min(1, "MODAL_TOKEN_SECRET is required"),

    // Cloudflare R2 / S3 Storage
    R2_ACCOUNT_ID: z.string().min(1, "R2_ACCOUNT_ID is required"),
    R2_ACCESS_KEY_ID: z.string().min(1, "R2_ACCESS_KEY_ID is required"),
    R2_SECRET_ACCESS_KEY: z.string().min(1, "R2_SECRET_ACCESS_KEY is required"),
    R2_BUCKET: z.string().min(1, "R2_BUCKET is required"),
    S3_URL: z.string().url("S3_URL must be a valid URL"),

    // Cloudflare Worker
    CF_WORKER_URL: z.string().url("CF_WORKER_URL must be a valid URL"),
    CF_WORKER_AUTH: z.string().min(1, "CF_WORKER_AUTH is required"),
  },

  /**
   * Client-side Environment Variables Schema.
   * To expose these to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL"),
    NEXT_PUBLIC_API_URL: z.string().url("NEXT_PUBLIC_API_URL must be a valid URL").optional(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL").optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables destructured for Next.js bundling.
   * Next.js statically replaces process.env.NEXT_PUBLIC_* references,
   * so they must be explicitly mapped here.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  /**
   * Treat empty string environment variables as undefined.
   * This ensures that optional variables and default values work correctly.
   */
  emptyStringAsUndefined: true,

  /**
   * Bypasses environment variable validation if the SKIP_ENV_VALIDATION env var is set.
   * Useful during Docker builds or automated tests where env vars might not be present.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Custom validation error handler.
   * Throws detailed and descriptive build-time/runtime errors.
   */
  onValidationError: (issues) => {
    console.error("\n❌ INVALID ENVIRONMENT VARIABLES CONFIGURATION:");
    for (const issue of issues) {
      console.error(`   👉 [${issue.path?.join(".") || "unknown"}] Validation Error: ${issue.message}`);
    }
    console.error("\nPlease update your environment configuration (e.g., .env or deployment settings) and restart.\n");
    throw new Error(
      `Environment validation failed for: ${issues.map((i) => i.path?.join(".") || "unknown").join(", ")}`
    );
  },
});
