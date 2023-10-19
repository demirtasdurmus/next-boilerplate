import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../_db';
import { examples } from '../../_db/schema';
import { parseRequestBodyMiddleware } from '../../_middlewares/parse-request-body.middleware';
import { parseRequestQueryParamsMiddleware } from '../../_middlewares/parse-request-query-params.middleware';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../_routers/public.router';
import {
  TSuccessResponse,
  buildCreatedResponse,
  buildOkResponse,
} from '../../_utils/build-success-response.util';
import {
  TCreateExampleDto,
  createExampleDto,
} from './_schemas/create-example.dto';
import { TGetExamplesDto, getExamplesDto } from './_schemas/get-examples.dto';

export type TCreateExampleResponse = TSuccessResponse<
  {
    id: string;
    title: string;
    description: string | null;
  },
  {
    message: string;
  }
>;
export type TGetExamplesResponse = TSuccessResponse<
  {
    id: string;
    title: string;
    description: string | null;
  }[],
  {
    message: string;
  }
>;

async function createExampleHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<TCreateExampleDto>,
): Promise<NextResponse<TCreateExampleResponse>> {
  const data = await db.insert(examples).values(ctx.payload).returning();

  return buildCreatedResponse({
    data: data[0],
  });
}

async function getExamplesHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetExamplesDto>,
): Promise<NextResponse<TGetExamplesResponse>> {
  const offset = (ctx.queryParams.page - 1) * ctx.queryParams.limit;

  const data = await db
    .select()
    .from(examples)
    .limit(ctx.queryParams.limit)
    .offset(offset);

  return buildOkResponse({
    data,
  });
}

const createRouter = publicRouter<TCreateExampleDto>()
  .use(parseRequestBodyMiddleware(createExampleDto))
  .post(createExampleHandler);

const getAllRouter = publicRouter<unknown, unknown, TGetExamplesDto>()
  .use(parseRequestQueryParamsMiddleware(getExamplesDto))
  .get(getExamplesHandler);

export function POST(
  req: NextRequest,
  ctx: IPublicRequestContext<TCreateExampleDto>,
) {
  return createRouter.run(req, ctx);
}

export function GET(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetExamplesDto>,
) {
  return getAllRouter.run(req, ctx);
}
