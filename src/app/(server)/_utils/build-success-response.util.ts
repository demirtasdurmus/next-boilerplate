import { NextResponse } from 'next/server';

export type TSuccessResponse<TData = unknown, TMeta = unknown> = {
  data: TData;
  meta: TMeta;
};

export function buildSuccessResponse<TData = unknown, TMeta = unknown>({
  status,
  data,
  meta,
}: {
  status: number;
  data: TData;
  meta: TMeta;
}): NextResponse<TSuccessResponse<TData, TMeta>> {
  return new NextResponse(
    JSON.stringify({
      data,
      meta,
    } satisfies TSuccessResponse<TData, TMeta>),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export function buildOkResponse<TData = unknown, TMeta = unknown>({
  data,
  meta,
}: {
  data: TData;
  meta: TMeta;
}) {
  return buildSuccessResponse({
    status: 200,
    data,
    meta,
  });
}

export function buildOkResponseWithMessage<TMeta = unknown>(meta?: TMeta) {
  return buildSuccessResponse({
    status: 200,
    meta: meta || { message: 'success' },
    data: {},
  });
}

export function buildCreatedResponse<TData = unknown, TMeta = unknown>({
  data,
  meta,
}: {
  data: TData;
  meta: TMeta;
}) {
  return buildSuccessResponse({
    status: 201,
    data,
    meta,
  });
}
