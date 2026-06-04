import Navbar from "@/components/gym/Navbar";
import HeroSection from "@/components/gym/HeroSection";
import StatsSection from "@/components/gym/StatsSection";
import AboutSection from "@/components/gym/AboutSection";
import ServicesSection from "@/components/gym/ServicesSection";
import GallerySection from "@/components/gym/GallerySection";
import TrainersSection from "@/components/gym/TrainersSection";
import TestimonialsSection from "@/components/gym/TestimonialsSection";
import ContactSection from "@/components/gym/ContactSection";
import Footer from "@/components/gym/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TrainersSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
