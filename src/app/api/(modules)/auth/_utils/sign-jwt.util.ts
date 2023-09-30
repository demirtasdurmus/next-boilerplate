import { SignJWT } from 'jose';

interface TSignTokenArgs {
  payload: {
    sub: string;
  };
  options: {
    expiresIn: string;
  };
}

/**
 * Signs a JWT token
 *
 * @export
 * @param {TSignTokenArgs} args
 * @return {*}  {Promise<string>}
 */
export async function signJWT(args: TSignTokenArgs): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const algorithm = 'HS256';
  return new SignJWT(args.payload)
    .setProtectedHeader({ alg: algorithm })
    .setExpirationTime(args.options.expiresIn)
    .setIssuer('https://example.com')
    .setIssuedAt()
    .setSubject(args.payload.sub)
    .sign(secret);
}
