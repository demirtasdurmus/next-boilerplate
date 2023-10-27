import { db } from '@/app/(server)/_db';
import { examples } from '@/app/(server)/_db/schema';
import { NotFoundError } from '@/app/(server)/_errors/not-found.error';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { parseRequestBodyMiddleware } from '../../../_middlewares/parse-request-body.middleware';
import { parseRequestParamsMiddleware } from '../../../_middlewares/parse-request-params.middleware';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../../_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
  buildOkResponseWithMessage,
} from '../../../_utils/build-success-response.util';
import { TExampleIdDto, exampleIdDto } from '../_schemas/example-id.dto';
import {
  TUpdateExampleDto,
  updateExampleDto,
} from '../_schemas/update-example.dto';

export type TGetExampleByIdResponse = TSuccessResponse<{
  id: string;
  title: string;
  description: string | null;
}>;

export type TGenericResponse = TSuccessResponse<unknown, { message: string }>;

async function getOneById(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleIdDto>,
): Promise<NextResponse<TGetExampleByIdResponse>> {
  const data = await db.query.examples.findFirst({
    where: eq(examples.id, ctx.params.id),
  });

  if (!data) {
    throw new NotFoundError(`Example not found`);
  }

  return buildOkResponse({ data, meta: undefined });
}

async function updateOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<TUpdateExampleDto, TExampleIdDto>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Update one ${req.url}- ${JSON.stringify(
      ctx.params,
    )} - ${JSON.stringify(ctx.payload)}`,
  });
}

async function deleteOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleIdDto>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Delete one ${req.url}- ${JSON.stringify(ctx.params)}`,
  });
}

const getOneRouter = publicRouter<unknown, TExampleIdDto>()
  .use(parseRequestParamsMiddleware(exampleIdDto))
  .get(getOneById);

const updateOneRouter = publicRouter<TUpdateExampleDto, TExampleIdDto>()
  .use(parseRequestParamsMiddleware(exampleIdDto))
  .use(parseRequestBodyMiddleware(updateExampleDto))
  .patch(updateOneHandler);

const deleteOneRouter = publicRouter<unknown, TExampleIdDto>()
  .use(parseRequestParamsMiddleware(exampleIdDto))
  .delete(deleteOneHandler);

export function GET(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleIdDto>,
) {
  return getOneRouter.run(req, ctx);
}

export function PATCH(
  req: NextRequest,
  ctx: IPublicRequestContext<TUpdateExampleDto, TExampleIdDto>,
) {
  return updateOneRouter.run(req, ctx);
}

export function DELETE(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleIdDto>,
) {
  return deleteOneRouter.run(req, ctx);
}
