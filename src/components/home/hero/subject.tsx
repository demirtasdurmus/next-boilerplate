import React from 'react';
import LinkButton from '../link-button';

type Props = {
  content: {
    title: string;
    description: string;
  };
  button: {
    name: string;
    href: string;
  };
};

export default function Subject({ content, button }: Props) {
  return (
    <div className="flex flex-col gap-12 md:w-1/2">
      <h1 className="text-center text-4xl font-bold md:text-left md:text-5xl">
        {content.title}
      </h1>
      <p className="text-black-600 text-center md:text-left">
        {content.description}
      </p>
      <div className="flex justify-center md:justify-start">
        <LinkButton href={button.href} name={button.name} />
      </div>
    </div>
  );
}
