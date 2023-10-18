import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  inputName: string;
  validationError?: string;
  containerClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ inputName, validationError, containerClassName, ...props }, ref) => (
    <div className={containerClassName}>
      <label htmlFor={inputName} className="flex flex-col items-center">
        {inputName}
        <input
          id={inputName}
          className={clsx(
            'w-full rounded-xl border-2 p-2 px-4 text-black focus:outline-none',
            validationError
              ? 'border-red-500'
              : 'border-grey-300 hover:border-gray-400 focus:border-gray-600',
          )}
          ref={ref}
          {...props}
        />
      </label>
      <p className="ml-1 text-xs text-red-500">{validationError}</p>
    </div>
  ),
);

Input.displayName = 'Input';

Input.defaultProps = {
  validationError: undefined,
  containerClassName: '',
};

export { Input };
