import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  avatar: string;
  name: string;
  quote: string;
  isHidden: boolean;
};

export default function TestimonialItem({
  avatar,
  name,
  quote,
  isHidden,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-6 rounded-lg bg-blue-100 p-6 md:w-1/3',
        isHidden ? 'hidden md:flex' : '',
      )}
    >
      <Image
        width={500}
        height={500}
        src={avatar}
        alt={name}
        className="-mt-14 w-16"
      />
      <h5 className="text-lg font-bold">{name}</h5>
      <p className="text-sm">{quote}</p>
    </div>
  );
}
