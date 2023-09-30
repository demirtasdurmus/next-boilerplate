import { jwtVerify } from 'jose';

/**
 * Verifies a JWT token
 *
 * @export
 * @template T
 * @param {string} token
 * @return {*}  {(Promise<{ valid: boolean; data: T | null }>)}
 */
export async function verifyJWT<T>(
  token: string,
): Promise<{ valid: boolean; data: T | null }> {
  try {
    const data = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    return { valid: true, data: data as T };
  } catch (error) {
    return { valid: false, data: null };
  }
}
