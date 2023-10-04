import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/api/_routers/public.router';
import {
  TSuccessResponse,
  buildCreatedResponse,
} from '@/app/api/_utils/build-success-response.util';
import { parseRequestBodyMiddleware } from '@/app/api/_middlewares/parse-request-body.middleware';
import { db } from '@/app/api/_db';
// import { eq, sql } from 'drizzle-orm';
import { TRegisterDto, registerDto } from '../_dto/register.dto';
import { hashPassword } from '../_utils/hash-password.util';
import * as schemas from '../../../_db/schema';
import { getUsernameFromEmail } from '../_utils/get-username-from-email.util';

export type TRegisterResponse = TSuccessResponse<
  unknown,
  {
    message: string;
  }
>;

async function registerHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<TRegisterDto>,
): Promise<NextResponse<TRegisterResponse>> {
  const hashedPassword = await hashPassword(ctx.payload.password);
  const username = getUsernameFromEmail(ctx.payload.email);

  await db.insert(schemas.users).values({
    email: ctx.payload.email,
    password: hashedPassword,
    username,
  });

  /* Here is how you can new values to a jsonb array */
  // await db
  //   .update(schemas.users)
  //   .set({
  //     roles: sql`jsonb_insert(roles, '{-1}', ${schemas.Role.ADMIN}::jsonb, true)`,
  //     // someOtherComplexObjArray: sql`jsonb_insert(roles, '{-1}', ${JSON.stringify(complexObj)}::jsonb)`,
  //   })
  //   .where(eq(schemas.users.id, '01ea2e89-a3fc-43c4-97fc-a83451110cb4'));

  return buildCreatedResponse({
    data: {},
    metadata: {
      message: 'User register successful',
    },
  });
}

const registerRouter = publicRouter<TRegisterDto>()
  .use(parseRequestBodyMiddleware(registerDto))
  .post(registerHandler);

export function POST(
  req: NextRequest,
  ctx: IPublicRequestContext<TRegisterDto>,
) {
  return registerRouter.run(req, ctx);
}
