import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from './app/api/(modules)/auth/_constants/auth-cookie-name.constant';
import { verifyJWT } from './app/api/(modules)/auth/_utils/verify-jwt.util';

const authPaths = ['/login', '/register'];
const privatePaths = ['/profile'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthPath = authPaths.includes(path);
  const isPrivatePath = privatePaths.includes(path);
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  // if the incoming request is to a private path
  if (isPrivatePath) {
    // if no token, redirect to login page with proper error message
    if (!token) {
      return NextResponse.redirect(
        new URL(
          `/login?${new URLSearchParams({ error: 'no-auth-token-provided' })}`,
          req.url,
        ),
      );
    }

    // validate token
    const { valid } = await verifyJWT<{ sub: string }>(token);

    // if token is invalid, redirect to login page with proper error message
    if (!valid) {
      return NextResponse.redirect(
        new URL(
          `/login?${new URLSearchParams({ error: 'invalid-auth-token' })}`,
          req.url,
        ),
      );
    }
    // if token is valid, continue to the private path
    return NextResponse.next();
  }

  // if the incoming request is to an auth path
  if (isAuthPath) {
    // if there is a token, and the token is valid, redirect to home page
    if (token) {
      const { valid } = await verifyJWT<{ sub: string }>(token);
      if (valid) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    // if there is no token, continue to the auth path
    return NextResponse.next();
  }

  // if the incoming request is to public paths other than auth paths
  return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/register'],
};
