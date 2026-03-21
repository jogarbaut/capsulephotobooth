import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import WhyChooseUs from "@/components/WhyChooseUs"
import Contact from "@/components/Contact"
import WeddingsSection from "@/components/WeddingSection"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WeddingsSection />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
    </main>
  )
}
