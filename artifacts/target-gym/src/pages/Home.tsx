import { useState } from "react";
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
import BookingModal from "@/components/gym/BookingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");

  const openBooking = (service = "") => {
    setBookingService(service);
    setBookingOpen(true);
  };

  return (
    <>
      <Navbar onBook={() => openBooking()} />
      <main>
        <HeroSection onBook={() => openBooking()} />
        <StatsSection />
        <AboutSection onBook={() => openBooking()} />
        <ServicesSection onBook={openBooking} />
        <GallerySection />
        <TrainersSection onBook={() => openBooking()} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer onBook={() => openBooking()} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultService={bookingService}
      />
    </>
  );
}
