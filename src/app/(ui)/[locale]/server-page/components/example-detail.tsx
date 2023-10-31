'use client';

import { TGetExampleByIdResponse } from '@/app/(server)/api/examples/[id]/route';
import ImageLoader from '@/components/shared/image-loader';

type Props = {
  example: TGetExampleByIdResponse['data'];
};

export default function ExampleDetail({ example }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-5xl">
        {example.title.split(' ').slice(0, -1).join(' ')}
      </h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <ImageLoader
          width={500}
          height={400}
          src={example.imageUrl ?? ''}
          title={example.title}
        />
        <div className="flex flex-col gap-4 rounded-md bg-gray-50 p-4">
          <p className="text-center text-2xl md:text-left">
            {example.description}
          </p>
          <p>Created: {example.createdAt.toLocaleString()}</p>
          <p>Created By: {example.user.username}</p>
        </div>
      </div>
    </div>
  );
}
