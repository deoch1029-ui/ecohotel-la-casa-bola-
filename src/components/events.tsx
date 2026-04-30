"use client";

import { useEffect, useRef, useState } from "react";
import { events, WHATSAPP_NUMBER, EVENTS_IMAGE_URL } from "@/lib/config";
import { DynamicIcon, ArrowRight } from "@/components/icons";

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me interesa cotizar un evento en La Casa Bola. ¿Podrían brindarme más información sobre disponibilidad y precios?"
  )}`;

  return (
    <section id="eventos" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={EVENTS_IMAGE_URL}
            alt="Eventos en La Casa Bola"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite/80 via-anthracite/60 to-anthracite/40"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
          <div className={`max-w-2xl transition-all duration-1000 ease-out ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-gold"></div>
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">Eventos</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">Eventos Especiales</h2>
            <p className="font-serif text-xl md:text-2xl text-white/80 mb-8 italic">El escenario perfecto para tus momentos inolvidables</p>
            <p className="text-white/70 font-light leading-relaxed text-lg mb-12 max-w-xl">
              En La Casa Bola contamos con el espacio ideal para realizar cualquier tipo de celebración, todo rodeado de naturaleza y con una arquitectura única.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {events.map((evt, idx) => (
                <div
                  key={evt.title}
                  className="border border-white/20 bg-white/[0.06] backdrop-blur-sm px-4 py-4 text-center hover:bg-white/[0.12] hover:border-gold/40 transition-all duration-[400ms]"
                  style={{
                    transitionDelay: revealed ? `${idx * 100 + 400}ms` : "0ms",
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(15px)",
                  }}
                >
                  <div className="text-gold mb-2 flex justify-center">
                    <DynamicIcon name={evt.icon} size={20} />
                  </div>
                  <span className="text-white/90 text-sm font-light">{evt.title}</span>
                </div>
              ))}
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#B89B62] text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#a0874f] transition-all duration-300 shadow-lg group"
              style={{
                transitionDelay: revealed ? "900ms" : "0ms",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(15px)",
              }}
            >
              Cotizar mi evento <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
