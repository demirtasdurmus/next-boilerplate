import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  title: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};

export default function ImageLoader({
  width,
  height,
  src,
  title,
  className = '',
}: Props) {
  // example src https://picsum.photos/300/200?random=9
  const [url, query] = src.split('?') || [];
  const mainUrl = url?.slice(0, url.lastIndexOf('/') - 3) || '';
  const newSrc = mainUrl ? `${mainUrl}/${width}/${height}?${query}` : '';

  return (
    <Image
      width={width}
      height={height}
      src={newSrc}
      className={clsx('rounded-lg', className)}
      loader={() => newSrc}
      alt={title}
      unoptimized
      priority
    />
  );
}
