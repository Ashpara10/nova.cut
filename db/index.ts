// db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { env } from "../env";

const pool = new Pool({
  connectionString: env.DATABASE_URL, // Supabase database URL
  connectionTimeoutMillis: 10000, // Timeout after 10s if connection can't be established
  idleTimeoutMillis: 30000,       // Keep idle connections for 30s
  max: 20,                        // Allow up to 20 concurrent connections
});

export const db = drizzle(pool, { schema });
