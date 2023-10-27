import { ilike, or, sql } from 'drizzle-orm';
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

export type TCreateExampleResponse = TSuccessResponse<{
  id: string;
  title: string;
  description: string | null;
}>;

export type TGetExamplesResponse = TSuccessResponse<
  {
    id: string;
    title: string;
    description: string | null;
  }[],
  {
    page: number;
    totalPages: number;
    hasMore: boolean;
  }
>;

async function createExampleHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<TCreateExampleDto>,
): Promise<NextResponse<TCreateExampleResponse>> {
  const data = await db.insert(examples).values(ctx.payload).returning();

  return buildCreatedResponse({
    data: data[0],
    meta: undefined,
  });
}

async function getExamplesHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetExamplesDto>,
): Promise<NextResponse<TGetExamplesResponse>> {
  const offset = (ctx.queryParams.page - 1) * ctx.queryParams.limit;

  const data = await db
    .select({
      id: examples.id,
      title: examples.title,
      description: examples.description,
    })
    .from(examples)
    .where(
      or(
        ilike(examples.title, `%${ctx.queryParams.q}%`),
        ilike(examples.description, `%${ctx.queryParams.q}%`),
      ),
    )
    .limit(ctx.queryParams.limit)
    .offset(offset);

  const [{ count }] = (await db.execute(
    sql`SELECT COUNT(id) FROM examples WHERE title ILIKE ${`%${ctx.queryParams.q}%`} OR description ILIKE ${`%${ctx.queryParams.q}%`}`,
  )) as { count: number }[];

  return buildOkResponse({
    data,
    meta: {
      page: ctx.queryParams.page,
      totalPages: Math.ceil(count / ctx.queryParams.limit),
      hasMore: count > offset + ctx.queryParams.limit,
    },
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
