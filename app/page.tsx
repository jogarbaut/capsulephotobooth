import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  );
}
