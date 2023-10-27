import { DrizzleClient } from './drizzle-client';

const { db } = new DrizzleClient(process.env.DATABASE_URL);

export { db };
