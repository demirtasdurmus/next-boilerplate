import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found in env');
}

export default {
  schema: './src/app/api/_db/schema.ts',
  out: './src/app/api/_db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
