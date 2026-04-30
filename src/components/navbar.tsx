"use client";

import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS, BRAND_LOGO_URL, WHATSAPP_NUMBER } from "@/lib/config";
import { Menu, X, MessageCircle } from "@/components/icons";

function BrandTitle({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 transition-colors duration-300 ${scrolled ? "text-anthracite" : "text-white drop-shadow-md"}`}>
      <img
        src={BRAND_LOGO_URL}
        alt="Logo Ecohotel La Casa Bola"
        width={40}
        height={40}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover brand-logo-ring flex-shrink-0"
      />
      <span className="font-serif text-[22px] md:text-2xl font-semibold tracking-tight">La Casa Bola</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    setTimeout(() => {
      document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const navClasses = `fixed w-full z-40 transition-all duration-300 ease-in-out ${
    scrolled
      ? "bg-[#F9F7F2]/90 backdrop-blur-md shadow-sm py-3 border-b border-gray-100"
      : "bg-transparent py-6"
  }`;

  const linkClasses = (id: string) =>
    `text-sm uppercase tracking-widest transition-colors duration-300 ${
      scrolled
        ? activeSection === id ? "text-gold" : "text-anthracite/70 hover:text-gold"
        : activeSection === id ? "text-gold" : "text-white/90 hover:text-gold"
    }`;

  const ctaClasses = `px-5 py-2 text-sm transition-all duration-300 ${
    scrolled
      ? "border-anthracite text-anthracite hover:bg-anthracite hover:text-white"
      : "border-white text-white hover:bg-white hover:text-anthracite"
  }`;

  return (
    <nav className={navClasses} aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
        <BrandTitle scrolled={scrolled} />
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={linkClasses(link.href.replace("#", ""))}>
              {link.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`border ${ctaClasses}`}
          >
            WhatsApp
          </a>
        </div>
        <button
          className={`md:hidden transition-colors duration-300 ${scrolled ? "text-anthracite" : "text-white drop-shadow-md"}`}
          onClick={toggleMenu}
          aria-label="Menú"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={closeMenu}></div>
          <div className="absolute top-full left-0 w-full bg-[#F9F7F2] border-b border-gray-200 py-6 px-6 flex flex-col space-y-4 md:hidden shadow-xl text-anthracite z-40">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="text-lg font-serif">
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-gold font-medium"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </>
      )}
    </nav>
  );
}
