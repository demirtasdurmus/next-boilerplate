import React from 'react';
import TestimonialItem from './testimonial-item';

type Props = {
  testimonialList: {
    id: string;
    avatar: string;
    name: string;
    quote: string;
  }[];
};

export default function TestimonialList({ testimonialList }: Props) {
  return (
    <div className="mt-24 flex flex-col gap-6 md:flex-row">
      {testimonialList.map((testimonial, index) => (
        <TestimonialItem
          key={testimonial.id}
          avatar={testimonial.avatar}
          name={testimonial.name}
          quote={testimonial.quote}
          isHidden={index !== 0}
        />
      ))}
    </div>
  );
}
