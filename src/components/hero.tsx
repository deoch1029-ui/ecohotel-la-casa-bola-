"use client";

import { useEffect, useState } from "react";
import { HERO_IMAGE_URL, WHATSAPP_NUMBER } from "@/lib/config";
import { ChevronDown, MessageCircle } from "@/components/icons";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Ecohotel La Casa Bola - Vista exterior de las habitaciones esféricas en el valle de Guayllabamba"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h1 className="sr-only">Ecohotel La Casa Bola - Tu refugio esférico en el valle de Guayllabamba</h1>
        <p className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
          Tu refugio esférico en el valle de Guayllabamba
        </p>
        <p className="text-white/90 text-lg md:text-xl mb-10 font-light tracking-wide drop-shadow-md">
          Conexión pura con la naturaleza
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#reservas" className="inline-block bg-[#B89B62] text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#a0874f] transition-colors duration-300 shadow-lg">
            Reservar Ahora
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-anthracite transition-colors duration-300"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-6 h-6 opacity-70" />
      </div>
    </header>
  );
}
