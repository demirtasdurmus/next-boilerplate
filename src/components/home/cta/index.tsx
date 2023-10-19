import Link from 'next/link';

const ctaContent = {
  title: 'Simplify how your team works today',
  button: {
    name: 'Get Started',
    href: '/get-started',
  },
};

export default function Cta() {
  return (
    <div className="bg-red-400">
      <div className="container mx-auto mt-16 flex flex-col items-center justify-between gap-12 px-6 py-24 md:flex-row md:gap-0 md:py-12">
        <h2 className="text-center text-4xl font-bold text-white md:max-w-xl md:text-left md:text-5xl">
          {ctaContent.title}
        </h2>
        <Link
          href={ctaContent.button.href}
          className="rounded-full bg-white p-3 px-6 pt-3 text-red-300 shadow-2xl hover:bg-gray-900"
        >
          {ctaContent.button.name}
        </Link>
      </div>
    </div>
  );
}
