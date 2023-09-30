import bcrypt from 'bcrypt';

/**
 * Compares a password with a hash
 *
 * @export
 * @param {{
 *   password: string;
 *   hash: string;
 * }} {
 *   password,
 *   hash,
 * }
 * @return {*}  {Promise<boolean>}
 */
export async function comparePassword({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
