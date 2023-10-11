import React from 'react';
import Copyright from './copyright';

export default function InputContainer() {
  return (
    <div className="flex flex-col justify-between">
      {/* Form */}
      <form action="">
        <div className="flex space-x-3">
          <input
            type="text"
            className="flex-1 rounded-full px-4 py-2 focus:outline"
            placeholder="Write here"
          />
          <button
            type="submit"
            className="focus;outline-none focus:bg-red-2 rounded-full bg-red-400 px-6 py-2 text-white hover:bg-red-300"
          >
            Go
          </button>
        </div>
      </form>
      {/* Copy right in larger screens */}
      <Copyright className="hidden text-white md:block" />
    </div>
  );
}
