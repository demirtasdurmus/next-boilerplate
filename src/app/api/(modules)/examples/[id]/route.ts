import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../../_routers/public.router';
import { parseRequestParamsMiddleware } from '../../../_middlewares/parse-request-params.middleware';
import { TExampleId, exampleIdSchema } from '../_schemas/example-id.schema';
import {
  TUpdateExample,
  updateExampleSchema,
} from '../_schemas/update-example.schema';
import { parseRequestBodyMiddleware } from '../../../_middlewares/parse-request-body.middleware';
import {
  TSuccessResponse,
  buildOkResponseWithMessage,
} from '../../../_utils/build-success-response.util';

export type TGenericResponse = TSuccessResponse<unknown, { message: string }>;

async function getOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleId>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Get one ${req.url}- ${JSON.stringify(ctx.params)}`,
  });
}

async function updateOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<TUpdateExample, TExampleId>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Update one ${req.url}- ${JSON.stringify(
      ctx.params,
    )} - ${JSON.stringify(ctx.payload)}`,
  });
}

async function deleteOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleId>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Delete one ${req.url}- ${JSON.stringify(ctx.params)}`,
  });
}

const getOneRouter = publicRouter<unknown, TExampleId>()
  .use(parseRequestParamsMiddleware(exampleIdSchema))
  .get(getOneHandler);

const updateOneRouter = publicRouter<TUpdateExample, TExampleId>()
  .use(parseRequestParamsMiddleware(exampleIdSchema))
  .use(parseRequestBodyMiddleware(updateExampleSchema))
  .patch(updateOneHandler);

const deleteOneRouter = publicRouter<unknown, TExampleId>()
  .use(parseRequestParamsMiddleware(exampleIdSchema))
  .delete(deleteOneHandler);

export function GET(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleId>,
) {
  return getOneRouter.run(req, ctx);
}

export function PATCH(
  req: NextRequest,
  ctx: IPublicRequestContext<TUpdateExample, TExampleId>,
) {
  return updateOneRouter.run(req, ctx);
}

export function DELETE(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleId>,
) {
  return deleteOneRouter.run(req, ctx);
}
