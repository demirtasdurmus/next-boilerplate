import Footer from '@/components/footer';
import Cta from '@/components/home/cta';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Testimonials from '@/components/home/testimonials';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </>
  );
}
