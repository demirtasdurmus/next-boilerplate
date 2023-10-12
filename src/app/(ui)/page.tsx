import Footer from '@/components/footer';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Navbar from '@/components/navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Features */}
      <Features />
      {/* Testimonials */}
      <section id="testimonials">
        <div className="mx-auto mt-32 max-w-6xl px-5 text-center">
          {/* Heading */}
          <h2 className="text-center text-4xl font-bold">
            What is Different About Manage?
          </h2>
          {/* Testimonials */}
          <div className="mt-24 flex flex-col md:flex-row md:space-x-6">
            {/* Testimonial One */}
            <div className="flex flex-col items-center space-y-6 rounded-lg bg-blue-100 p-6 md:w-1/3">
              <Image
                width={500}
                height={500}
                src="/avatar-girl-1.png"
                alt="avatar-girl-1"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Girl One</h5>
              <p className="text-sm">
                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated.”
              </p>
            </div>
            {/* Testimonial Two */}
            <div className="hidden flex-col items-center space-y-6 rounded-lg bg-blue-100 p-6 md:flex md:w-1/3">
              <Image
                width={500}
                height={500}
                src="/avatar-girl-2.png"
                alt="avatar-girl-2"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Girl Two</h5>
              <p className="text-sm">
                “We have been able to cancel so many other subscriptions since
                using Manage. There is no more cross-channel confusion and
                everyone is much more focused.”
              </p>
            </div>
            {/* Testimonial Three */}
            <div className="hidden flex-col items-center space-y-6 rounded-lg bg-blue-100 p-6 md:flex md:w-1/3">
              <Image
                width={500}
                height={500}
                src="/avatar-man-1.png"
                alt="avatar-man-1"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Man One</h5>
              <p className="text-sm">
                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated.”
              </p>
            </div>
          </div>
          {/* Button */}
          <div className="my-16">
            <a
              href="/get-started"
              className="baseline rounded-full bg-red-400 p-3 px-6 pt-2 text-white hover:bg-red-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section id="cta" className="bg-red-400">
        {/* Flex Container */}
        <div className="container mx-auto flex flex-col items-center justify-between space-y-12 px-6 py-24 md:flex-row md:space-y-0 md:py-12">
          {/* Heading */}
          <h2 className="text-center text-5xl font-bold leading-tight text-white md:max-w-xl md:text-left md:text-4xl">
            Simplify how your team works today
          </h2>
          {/* Button */}
          <div className="">
            <a
              href="/get-started"
              className="baseline rounded-full bg-white p-3 px-6 pt-2 text-red-300 shadow-2xl hover:bg-gray-900"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
