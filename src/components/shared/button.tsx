import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { BeatLoader } from 'react-spinners';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: string;
  loading: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ loading, content, ...props }, ref) => (
    <button
      className={clsx(
        'flex h-12 w-full cursor-pointer items-center justify-center rounded-full border-2 border-white  p-2 text-white hover:bg-red-500',
        loading ? 'bg-red-300' : 'bg-red-400',
      )}
      ref={ref}
      {...props}
    >
      {loading ? (
        <BeatLoader color="#f2f2f2" className="" size={12} />
      ) : (
        content
      )}
    </button>
  ),
);

Button.displayName = 'Button';

export { Button };
