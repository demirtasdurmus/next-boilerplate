import Footer from '@/components/footer';
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
      <section id="features">
        {/* Flex container */}
        <div className="container mx-auto mt-10 flex flex-col space-y-12 px-4 md:flex-row md:space-y-0">
          {/* What is Different? */}
          <div>
            <div className="flex flex-col space-y-12 md:w-1/2">
              <h2 className="max-w-md text-center text-4xl font-bold">
                What is different about Manage?
              </h2>
              <p className="text-center md:text-left">
                Manage provides all the functionality your team needs, without
                the complexity. Our software is tailor-made for modern digital
                product teams.
              </p>
            </div>
          </div>
          {/* Numbered List */}
          <div className="flex flex-col space-y-8 md:w-1/2">
            {/* List Item 1 */}
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0">
              {/* Heading */}
              <div className="rounded-l-full bg-red-300 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-red-500 px-4 py-2 text-white md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Track company-wide progress
                  </h3>
                </div>
              </div>
              {/* Paragraph */}
              <div>
                {/* This part is added to fix the display issue with heading tag in md+ screens */}
                <h3 className="mb-4 hidden text-lg font-bold md:block">
                  Track company-wide progress
                </h3>
                <p className="">
                  See how your day-to-day tasks fit into the wider vision. Go
                  from tracking progress at the milestone level all the way down
                  to the smallest of details. Never lose sight of the bigger
                  picture again.
                </p>
              </div>
            </div>
            {/* List Item 2 */}
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0">
              {/* Heading */}
              <div className="rounded-l-full bg-red-300 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-red-500 px-4 py-2 text-white md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Advanced built-in reports
                  </h3>
                </div>
              </div>
              {/* Paragraph */}
              <div>
                {/* This part is added to fix the display issue with heading tag in md+ screens */}
                <h3 className="mb-4 hidden text-lg font-bold md:block">
                  Advanced built-in reports
                </h3>
                <p className="">
                  Set internal delivery estimates and track progress toward
                  company goals. Our customizable dashboard helps you build out
                  the reports you need to keep key stakeholders informed.
                </p>
              </div>
            </div>
            {/* List Item 3 */}
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0">
              {/* Heading */}
              <div className="rounded-l-full bg-red-300 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-red-500 px-4 py-2 text-white md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Everything you need in one place
                  </h3>
                </div>
              </div>
              {/* Paragraph */}
              <div>
                {/* This part is added to fix the display issue with heading tag in md+ screens */}
                <h3 className="mb-4 hidden text-lg font-bold md:block">
                  Everything you need in one place
                </h3>
                <p className="">
                  Stop jumping from one service to another to communicate, store
                  files, track tasks and share documents. Manage offers an
                  all-in-one team productivity solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
