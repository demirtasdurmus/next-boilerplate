import { eq, ilike, or, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../_db';
import { examples, users } from '../../_db/schema';
import { parseRequestBodyMiddleware } from '../../_middlewares/parse-request-body.middleware';
import { parseRequestQueryParamsMiddleware } from '../../_middlewares/parse-request-query-params.middleware';
import {
  IProtectedRequestContext,
  protectedRouter,
} from '../../_routers/protected.router';
import {
  IPublicRequestContext,
  publicRouter,
} from '../../_routers/public.router';
import {
  TSuccessResponse,
  buildCreatedResponse,
  buildOkResponse,
} from '../../_utils/build-success-response.util';
import { generateSlug } from '../../_utils/generate-slug.util';
import {
  TCreateExampleDto,
  createExampleDto,
} from './_schemas/create-example.dto';
import { TGetExamplesDto, getExamplesDto } from './_schemas/get-examples.dto';

export type TCreateExampleResponse = TSuccessResponse<{
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TGetExamplesResponse = TSuccessResponse<
  {
    id: string;
    title: string;
    slug: string;
    imageUrl: string | null;
    user: {
      id: string;
      username: string;
    };
  }[],
  {
    page: number;
    totalPages: number;
    hasMore: boolean;
  }
>;

async function createExampleHandler(
  _req: NextRequest,
  ctx: IProtectedRequestContext<TCreateExampleDto>,
): Promise<NextResponse<TCreateExampleResponse>> {
  const data = await db
    .insert(examples)
    .values({
      ...ctx.payload,
      slug: generateSlug(ctx.payload.title),
      userId: ctx.session.id,
    })
    .returning({
      id: examples.id,
      title: examples.title,
      description: examples.description,
      imageUrl: examples.imageUrl,
      createdAt: examples.createdAt,
      updatedAt: examples.updatedAt,
    });

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
      slug: examples.slug,
      imageUrl: examples.imageUrl,
      user: {
        id: users.id,
        username: users.username,
      },
    })
    .from(examples)
    .where(
      or(
        ilike(examples.title, `%${ctx.queryParams.q}%`),
        ilike(examples.description, `%${ctx.queryParams.q}%`),
      ),
    )
    .innerJoin(users, eq(examples.userId, users.id))
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

const createRouter = protectedRouter<TCreateExampleDto>()
  .use(parseRequestBodyMiddleware(createExampleDto))
  .post(createExampleHandler);

const getAllRouter = publicRouter<unknown, unknown, TGetExamplesDto>()
  .use(parseRequestQueryParamsMiddleware(getExamplesDto))
  .get(getExamplesHandler);

export function POST(
  req: NextRequest,
  ctx: IProtectedRequestContext<TCreateExampleDto>,
) {
  return createRouter.run(req, ctx);
}

export function GET(
  req: NextRequest,
  ctx: IPublicRequestContext<unknown, unknown, TGetExamplesDto>,
) {
  return getAllRouter.run(req, ctx);
}
