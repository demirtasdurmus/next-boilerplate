'use client';

import { HashLoader } from 'react-spinners';

export default function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <HashLoader size={80} />
    </div>
  );
}
