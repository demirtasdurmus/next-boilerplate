'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get('showDialog');

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  useEffect(() => {
    if (showDialog === 'y') {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  if (showDialog !== 'y') return null;

  return (
    <dialog
      ref={dialogRef}
      className="top-50 left-50 -translate-x-50 -translate-y-50 fixed z-10  rounded-xl backdrop:bg-gray-800/50"
    >
      {/* Flex wrapper Div */}
      <div className="flex w-[500px] flex-col">
        {/* Title and Close Button */}
        <div className="mb-4 flex flex-row justify-between bg-blue-200 px-5 pt-2">
          <h1 className="text-2xl">{title}</h1>
          <button
            onClick={closeDialog}
            type="button"
            className="mb-2 h-8 w-8 cursor-pointer rounded border-none bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-400"
          >
            X
          </button>
        </div>
        {/* Body and Success Button */}
        <div className="px-5 pb-6">
          {children}
          <div className="mt-2 flex flex-row justify-end">
            <button
              onClick={clickOk}
              type="button"
              className="rounded border-none bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-400"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
