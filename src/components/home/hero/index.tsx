import Subject from './subject';
import Visual from './visual';

const content = {
  title: 'Bring everyone together to build better products',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sequi culpa ex, aliquam eos nisi id similique eum ipsam nihil! Harum recusandae velit culpa magni, hic deleniti iure illo itaque.',
};

const button = {
  name: 'Get Started',
  href: '/get-started',
};

export default function Hero() {
  return (
    <section className="container mx-auto mt-10 flex flex-col-reverse items-center px-6 md:flex-row">
      {/* Content Item */}
      <Subject content={content} button={button} />
      {/* Right Item - Image */}
      <Visual />
    </section>
  );
}
