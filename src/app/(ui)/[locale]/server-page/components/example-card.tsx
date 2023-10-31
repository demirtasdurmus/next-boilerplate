'use client';

import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import ImageLoader from '@/components/shared/image-loader';
import Link from 'next/link';

type Props = {
  example: TGetExamplesResponse['data'][0];
  width: number;
  height: number;
};

export default function ExampleCard({
  example: { slug, title, imageUrl, user },
  width,
  height,
}: Props) {
  return (
    <Link
      href={`server-page/${slug}`}
      className="rounded-lg border-2 bg-gray-200 p-3"
    >
      {/* Image */}
      <ImageLoader
        title={title}
        width={width}
        height={height}
        src={imageUrl || ''}
      />
      {/* Title */}
      <p className="mt-2">{title}</p>
      {/* User */}
      <div className="mt-2 flex items-center gap-3">
        <div className="h-[20px] w-[20px] rounded-full bg-blue-600">
          {/* For profile image */}
        </div>
        {user.username}
      </div>
    </Link>
  );
}
