import React from 'react';

type Props = {
  order: string;
  title: string;
  paragraph: string;
};

export default function ListItem({ order, title, paragraph }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-0 md:space-x-6">
      {/* Heading */}
      <div className="rounded-l-full bg-red-300 md:bg-transparent">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-red-500 px-4 py-2 text-white md:py-1">
            {order}
          </div>
          <h3 className="font-bold md:mb-4 md:hidden">{title}</h3>
        </div>
      </div>
      {/* Paragraph */}
      <div>
        {/* This part is added to fix the display issue with heading tag in md+ screens */}
        <h3 className="mb-4 hidden text-lg font-bold md:block">{title}</h3>
        <p className="">{paragraph}</p>
      </div>
    </div>
  );
}
