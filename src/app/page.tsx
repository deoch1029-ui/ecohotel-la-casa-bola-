import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import RoomsSection from "@/components/rooms";
import BookingSection from "@/components/booking";
import EventsSection from "@/components/events";
import LocationAndPolicies from "@/components/location";
import FAQSection from "@/components/faq";
import Footer from "@/components/footer";
import BolaChat from "@/components/chatbot";
import ErrorBoundary from "@/components/error-boundary";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <main>
            <Navbar />
            <Hero />
            <RoomsSection />
            <BookingSection />
            <EventsSection />
            <LocationAndPolicies />
            <FAQSection />
            <Footer />
            <BolaChat />
          </main>
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}
