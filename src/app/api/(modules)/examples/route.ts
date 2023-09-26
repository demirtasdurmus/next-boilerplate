import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../_routers/public.router';
import { parseRequestBodyMiddleware } from '../../_middlewares/parse-request-body.middleware';
import {
  TCreateExample,
  createExampleSchema,
} from './_schemas/create-example.schema';
import { parseRequestQueryParamsMiddleware } from '../../_middlewares/parse-request-query-params.middleware';
import {
  TGetAllExamples,
  getAllExamplesSchema,
} from './_schemas/get-all-examples.schema';
import {
  TSuccessResponse,
  buildCreatedResponse,
  buildOkResponse,
} from '../../_utils/build-success-response.util';
import { examples } from '../../_db/schema';
import { db } from '../../_db';

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
  ctx: IPublicRequestContext<TCreateExample>,
): Promise<NextResponse<TCreateExampleResponse>> {
  const data = await db.insert(examples).values(ctx.payload).returning();

  return buildCreatedResponse({
    data: data[0],
  });
}

async function getAllExamplesHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetAllExamples>,
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

const createRouter = publicRouter<TCreateExample>()
  .use(parseRequestBodyMiddleware(createExampleSchema))
  .post(createExampleHandler);

const getAllRouter = publicRouter<unknown, unknown, TGetAllExamples>()
  .use(parseRequestQueryParamsMiddleware(getAllExamplesSchema))
  .get(getAllExamplesHandler);

export function POST(
  req: NextRequest,
  ctx: IPublicRequestContext<TCreateExample>,
) {
  return createRouter.run(req, ctx);
}

export function GET(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetAllExamples>,
) {
  return getAllRouter.run(req, ctx);
}
