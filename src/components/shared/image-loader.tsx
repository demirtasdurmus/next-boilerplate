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
  return (
    <Image
      width={width}
      height={height}
      src={src}
      className={clsx('h-auto w-auto rounded-lg', className)}
      loader={() => src}
      alt={title}
      unoptimized
      priority
    />
  );
}
