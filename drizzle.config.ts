import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL ?? 'postgres://default:default@localhost:5432/verceldb',
  },
  verbose: true,
  strict: true,
} satisfies Config;