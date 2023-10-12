import React from 'react';

type Props = {
  title: string;
  description: string;
};

export default function Intro({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-12 md:w-1/2">
      <h2 className="max-w-md text-center text-4xl font-bold">{title}</h2>
      <p className="text-center md:text-left">{description}</p>
    </div>
  );
}
