import bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt
 * @see https://www.npmjs.com/package/bcrypt
 *
 * @export
 * @param {string} password
 * @return {*}  {Promise<string>}
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
