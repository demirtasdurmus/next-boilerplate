import * as dotenv from 'dotenv';
import { logger } from '../../_utils/logger.util';
import { hashPassword } from '../../api/auth/_utils/hash-password.util';
import { DrizzleClient } from '../drizzle-client';
import * as schemas from '../schema';

dotenv.config({ path: '.env.local' });

const { db } = new DrizzleClient(process.env.DATABASE_URL);

// create 20 random word array
const words = [
  'abruptly',
  'absurd',
  'abyss',
  'affix',
  'askew',
  'avenue',
  'awkward',
  'axiom',
  'azure',
  'bagpipes',
  'bandwagon',
  'banjo',
  'bayou',
  'beekeeper',
  'bikini',
  'blitz',
  'blizzard',
  'boggle',
  'bookworm',
  'boxcar',
];

// create a function to get a random number between 0 and 20
const getRandomNumber = (to: number) => Math.floor(Math.random() * to);

// create an array of 20 with random text and images uris from picsum
const examples = Array.from({ length: 20 }, (_, i) => ({
  title: `${words[getRandomNumber(20)]} ${words[getRandomNumber(20)]}`,
  description: `Description will be a little bit longer`,
  imageUrl: `https://picsum.photos/300/200?random=${i + 1}`,
}));

(async function seed() {
  await db.delete(schemas.examples);
  await db.delete(schemas.users);

  const [userOne] = await db
    .insert(schemas.users)
    .values([
      {
        username: 'john',
        email: 'john@email.com',
        password: await hashPassword('Password123!'),
      },
      {
        username: 'jane',
        email: 'jane@email.com',
        password: await hashPassword('Password123!'),
      },
    ])
    .returning();

  await db.insert(schemas.examples).values(
    examples.map((example) => ({
      ...example,
      userId: userOne.id,
    })),
  );
})()
  .then(() => {
    logger.info('Seed completed');
    process.exit(0);
  })
  .catch((err) => {
    logger.error(`Seed failed: ${err.message}`);
    process.exit(1);
  });
