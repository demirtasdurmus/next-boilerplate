import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="container mx-auto p-6">
        {/* Flex container */}
        <div className="flex justify-between">
          {/* Logo */}
          <div className="pt-2">
            <Image src="next.svg" width={150} height={150} alt="Logo" />
          </div>
          {/* Menu Items */}
          <div className="hidden space-x-6 md:flex">
            <a href="/pricing" className="hover:text-blue-400">
              Pricing
            </a>
            <a href="/products" className="hover:text-blue-400">
              Products
            </a>
            <a href="/about" className="hover:text-blue-400">
              About
            </a>
            <a href="/careers" className="hover:text-blue-400">
              Careers
            </a>
            <a href="/community" className="hover:text-blue-400">
              Community
            </a>
          </div>
          {/* Button */}
          <a
            href="/get-started"
            className="baseline hidden rounded-full bg-red-400 p-3 px-6 pt-2 text-white hover:bg-red-200 md:block"
          >
            Get Started
          </a>
          {/* Hamburger Icon */}
          <button
            id="menu-btn"
            className="hamburger block focus:outline-none md:hidden"
            type="button"
          >
            {/* eslint-disable-next-line react/self-closing-comp */}
            <span className="hamburger-top"></span>
            {/* eslint-disable-next-line react/self-closing-comp */}
            <span className="hamburger-middle"></span>
            {/* eslint-disable-next-line react/self-closing-comp */}
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <div
            id="menu"
            className="absolute left-6 right-6 mt-10 hidden flex-col items-center space-y-6 self-end bg-white py-8 font-bold drop-shadow-md sm:w-auto sm:self-center"
          >
            <a href="/pricing">Pricing</a>
            <a href="/product">Product</a>
            <a href="/about">About Us</a>
            <a href="/careers">Careers</a>
            <a href="/community">Community</a>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="container mx-auto mt-10 flex flex-col-reverse items-center space-y-0 px-6 md:flex-row md:space-y-0">
        {/* Left Item */}
        <div className="mb-32 flex flex-col space-y-12 md:w-1/2">
          <h1 className="text-center text-4xl font-bold md:text-left md:text-5xl">
            Bring everyone together to build better products
          </h1>
          <p className="text-black-600 text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            saepe praesentium sequi, corporis quod sed quo! Est mollitia
            accusantium, eaque voluptatibus quia aspernatur reiciendis nemo,
            porro necessitatibus quod doloribus a.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="/get-started"
              className="baseline rounded-full bg-red-400 p-3 px-6 pt-2 text-white hover:bg-red-200"
            >
              Get Started
            </a>
          </div>
        </div>
        {/* Right Item - Image */}
        <div className="md:w-1/2">
          <Image
            src="illustration-intro.svg"
            width={590}
            height={590}
            alt="Logo"
          />
        </div>
      </section>
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
      <footer className="bg-darkBlue">
        {/* Flex Container */}
        <div className="container mx-auto flex flex-col-reverse justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0">
          {/* Logo and Socials */}
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:items-start md:space-y-0">
            {/* Copy Right in small screens */}
            <div className="mx-auto my-6 text-center text-white md:hidden">
              Copyright &copy; 2023 All rights reserved.
            </div>
            {/* Logo */}
            <div>
              <Image
                src="/next-white.svg"
                alt="logo"
                width={200}
                height={200}
              />
            </div>
            {/* Socials */}
            <div className="flex justify-center space-x-4">
              {/* Link 1 */}
              <Image
                src="/icon-facebook.svg"
                alt="facebook"
                width={30}
                height={30}
              />
              {/* Link 2 */}
              <Image
                src="/icon-youtube.svg"
                alt="youtube"
                width={30}
                height={30}
              />
              {/* Link 3 */}
              <Image
                src="/icon-twitter.svg"
                alt="twitter"
                width={30}
                height={30}
              />
              {/* Link 4 */}
              <Image
                src="/icon-pinterest.svg"
                alt="pinterest"
                width={30}
                height={30}
              />
              {/* Link 5 */}
              <Image
                src="/icon-instagram.svg"
                alt="instagram"
                width={30}
                height={30}
              />
            </div>
          </div>
          {/* List Container */}
          <div className="flex justify-around space-x-32">
            {/* List Left */}
            <div className="flex flex-col space-y-3 text-white">
              <a href="/home" className="hover:text-red-200">
                Home
              </a>
              <a href="/pricing" className="hover:text-red-200">
                Pricing
              </a>
              <a href="/products" className="hover:text-red-200">
                Products
              </a>
              <a href="/about" className="hover:text-red-200">
                About
              </a>
            </div>
            {/* List Right */}
            <div className="flex flex-col space-y-3 text-white">
              <a href="/careers" className="hover:text-red-200">
                Careers
              </a>
              <a href="/community" className="hover:text-red-200">
                Community
              </a>
              <a href="/privacy-policy" className="hover:text-red-200">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Input Container */}
          <div className="flex flex-col justify-between">
            <form action="">
              <div className="flex space-x-3">
                <input
                  type="text"
                  className="flex-1 rounded-full px-4 focus:outline-none"
                  placeholder="Updates your inbox"
                />
                <button
                  className="rounded-full bg-red-400 px-6 py-2 text-white hover:bg-red-200 focus:outline-none"
                  type="submit"
                >
                  Go
                </button>
              </div>
            </form>
            {/* Copy right in larger screens */}
            <div className="hidden text-white md:block">
              Copyright &copy; 2023 All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
