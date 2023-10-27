import { db } from '@/app/(server)/_db';
import { parseRequestBodyMiddleware } from '@/app/(server)/_middlewares/parse-request-body.middleware';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/(server)/_routers/public.router';
import {
  TSuccessResponse,
  buildCreatedResponse,
} from '@/app/(server)/_utils/build-success-response.util';
import { NextRequest, NextResponse } from 'next/server';
import * as schemas from '../../../_db/schema';
import { TRegisterDto, registerDto } from '../_dto/register.dto';
import { getUsernameFromEmail } from '../_utils/get-username-from-email.util';
import { hashPassword } from '../_utils/hash-password.util';

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
    data: null,
    meta: {
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
