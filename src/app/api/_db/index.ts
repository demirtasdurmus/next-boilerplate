/* eslint-disable no-underscore-dangle */
import postgres from 'postgres';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { InternalServerError } from '../_errors/internal-server.error';

class DrizzleClient {
  private readonly _db: PostgresJsDatabase<typeof schema>;

  constructor(private readonly dbUrl: string | undefined) {
    if (!this.dbUrl) {
      throw new InternalServerError('DATABASE_URL is not set');
    }

    const queryClient = postgres(this.dbUrl, {});
    this._db = drizzle(queryClient, {
      schema,
    });
  }

  get db(): PostgresJsDatabase<typeof schema> {
    return this._db;
  }
}

const { db } = new DrizzleClient(process.env.DATABASE_URL);

export { db };
