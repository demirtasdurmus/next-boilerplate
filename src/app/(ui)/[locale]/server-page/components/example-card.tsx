'use client';

import ImageLoader from '@/components/shared/image-loader';
import Link from 'next/link';

type Props = {
  idx: number;
  id: string;
  title: string;
  imageUri: string;
  width: number;
  height: number;
};

export default function ExampleCard({
  idx,
  id,
  title,
  imageUri,
  width,
  height,
}: Props) {
  return (
    /* Card Body */
    <Link
      href={`server-page/${id}`}
      className="rounded-lg border-2 bg-gray-200 p-3"
    >
      {/* Image */}
      <ImageLoader
        title={title}
        width={width}
        height={height}
        src={
          imageUri || `https://picsum.photos/${width}/${height}?random=${idx}`
        }
      />
      {/* Title */}
      <p className="mt-2">{title}</p>
    </Link>
  );
}
