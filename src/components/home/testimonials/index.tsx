import React from 'react';
import TestimonialList from './testimonial-list';
import LinkButton from '../link-button';

const testimonials = {
  title: 'What is Different About Us?',
  testimonialList: [
    {
      id: '1',
      avatar: '/avatar-girl-1.png',
      name: 'Girl One',
      quote:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia aliquid, suscipit aperiam veritatis quod praesentium voluptatum nemo laudantium. Ut, repellendus natus molestias facere fugit recusandae alias. Expedita tempore possimus amet.',
    },
    {
      id: '2',
      avatar: '/avatar-girl-2.png',
      name: 'Girl Two',
      quote:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia aliquid, suscipit aperiam veritatis quod praesentium voluptatum nemo laudantium. Ut, repellendus natus molestias facere fugit recusandae alias. Expedita tempore possimus amet.',
    },
    {
      id: '3',
      avatar: '/avatar-man-1.png',
      name: 'Girl Two',
      quote:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia aliquid, suscipit aperiam veritatis quod praesentium voluptatum nemo laudantium. Ut, repellendus natus molestias facere fugit recusandae alias. Expedita tempore possimus amet.',
    },
  ],
};

export default function Testimonials() {
  return (
    <div className="mx-auto mt-32 max-w-6xl px-5 text-center">
      {/* Heading */}
      <h2 className="text-center text-4xl font-bold">{testimonials.title}</h2>
      {/* Testimonial List */}
      <TestimonialList testimonialList={testimonials.testimonialList} />
      {/* Button */}
      <LinkButton name="Get Started" href="/pricing" className="mt-16" />
    </div>
  );
}
