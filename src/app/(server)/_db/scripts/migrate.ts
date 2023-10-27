import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import drizzleConfig from '../../../../../drizzle.config';
import { InternalServerError } from '../../_errors/internal-server.error';
import { logger } from '../../_utils/logger.util';

dotenv.config({ path: '.env.local' });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new InternalServerError('DATABASE_URL is not set');
}

const migrationClient = postgres(dbUrl, { max: 1 });

migrate(drizzle(migrationClient), {
  migrationsFolder: drizzleConfig.out,
})
  .then(() => {
    logger.info('Migration completed');
    process.exit(0);
  })
  .catch((err) => {
    logger.error(`Migration failed: ${err.message}`);
    process.exit(1);
  });
