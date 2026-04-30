import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import RoomsSection from "@/components/rooms";
import BookingSection from "@/components/booking";
import EventsSection from "@/components/events";
import LocationAndPolicies from "@/components/location";
import Footer from "@/components/footer";
import BolaChat from "@/components/chatbot";
import ErrorBoundary from "@/components/error-boundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <main>
        <Navbar />
        <Hero />
        <RoomsSection />
        <BookingSection />
        <EventsSection />
        <LocationAndPolicies />
        <Footer />
        <BolaChat />
      </main>
    </ErrorBoundary>
  );
}
