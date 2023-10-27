import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { InternalServerError } from '../_errors/internal-server.error';
import * as schema from './schema';

export class DrizzleClient {
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
