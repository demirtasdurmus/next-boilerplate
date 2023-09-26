import { NextResponse } from 'next/server';

export type TSuccessResponse<TData = unknown, TMetadata = unknown> = {
  data: TData;
  metadata: TMetadata;
};

export function buildSuccessResponse<TData = unknown, TMetadata = unknown>({
  status,
  data,
  metadata,
}: {
  status: number;
  data: TData;
  metadata: TMetadata;
}): NextResponse<TSuccessResponse<TData, TMetadata>> {
  return new NextResponse(
    JSON.stringify({
      data,
      metadata,
    } satisfies TSuccessResponse<TData, TMetadata>),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export function buildOkResponse<TData = unknown, TMetadata = unknown>({
  data,
  metadata,
}: {
  data: TData;
  metadata?: TMetadata;
}) {
  return buildSuccessResponse({
    status: 200,
    data,
    metadata: metadata || { message: 'success' },
  });
}

export function buildOkResponseWithMessage<TMetadata = unknown>(
  metadata?: TMetadata,
) {
  return buildSuccessResponse({
    status: 200,
    metadata: metadata || { message: 'success' },
    data: {},
  });
}

export function buildCreatedResponse<TData = unknown, TMetadata = unknown>({
  data,
  metadata,
}: {
  data: TData;
  metadata?: TMetadata;
}) {
  return buildSuccessResponse({
    status: 201,
    data,
    metadata: metadata || { message: 'created' },
  });
}
