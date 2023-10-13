import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../../_routers/public.router';
import { parseRequestParamsMiddleware } from '../../../_middlewares/parse-request-params.middleware';
import { TExampleIdDto, exampleIdDto } from '../_schemas/example-id.dto';
import {
  TUpdateExampleDto,
  updateExampleDto,
} from '../_schemas/update-example.dto';
import { parseRequestBodyMiddleware } from '../../../_middlewares/parse-request-body.middleware';
import {
  TSuccessResponse,
  buildOkResponseWithMessage,
} from '../../../_utils/build-success-response.util';

export type TGenericResponse = TSuccessResponse<unknown, { message: string }>;

async function getOneHandler(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, TExampleIdDto>,
): Promise<NextResponse<TGenericResponse>> {
  return buildOkResponseWithMessage({
    message: `Get one ${req.url}- ${JSON.stringify(ctx.params)}`,
  });
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
  .get(getOneHandler);

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
