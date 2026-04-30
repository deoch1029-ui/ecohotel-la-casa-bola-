"use client";

import { policies, WHATSAPP_NUMBER, EMAIL, GOOGLE_MAPS_EMBED_URL, MAPS_LINK } from "@/lib/config";
import { DynamicIcon, MapPin, Phone, Mail, Heart, ExternalLink } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

export default function LocationAndPolicies() {
  const { t } = useLanguage();

  return (
    <section id="ubicacion">
      {/* Map + Overlay */}
      <div className="group relative w-full h-[550px] md:h-[600px] overflow-hidden">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          className="absolute inset-0 w-full h-full border-0 sepia-[0.35] saturate-[0.7] brightness-[0.88] contrast-[1.08] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Ecohotel La Casa Bola"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite/60 via-anthracite/30 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="mx-6 md:mx-12 lg:mx-20 max-w-lg pointer-events-auto">
            <div className="bg-white/[0.92] backdrop-blur-2xl p-8 md:p-10 shadow-2xl shadow-black/10 border border-white/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-anthracite">{t("location.title")}</h2>
              </div>
              <div className="w-10 h-0.5 bg-gold mb-6"></div>
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                {t("location.description")}
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-gold text-sm uppercase tracking-wider hover:bg-gold hover:text-white transition-all duration-300"
              >
                {t("location.viewMaps")} <ExternalLink className="w-[15px] h-[15px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div id="politicas" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-anthracite mb-4">{t("policies.title")}</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
              {t("policies.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {policies.map((policy) => (
              <div key={policy.number} className="policy-card border border-gold/15 bg-white p-7 hover:border-gold/40 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/[0.06] flex items-center justify-center text-gold flex-shrink-0">
                    <DynamicIcon name={policy.icon} size={20} />
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-gold/30 font-serif text-xs tracking-wider">{policy.number}</span>
                    <h3 className="font-serif text-lg text-anthracite leading-snug">{policy.title}</h3>
                  </div>
                </div>
                <p className="text-gray-500 font-light leading-relaxed text-[13.5px] pl-[52px]">{policy.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing message */}
      <div className="bg-[#FAF8F4] border-t border-b border-gold/10 py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <Heart className="w-5 h-5 text-gold mx-auto mb-4 opacity-70" />
          <p className="text-gray-600 font-light leading-relaxed text-sm italic">
            {t("policies.closingMessage")}
          </p>
        </div>
      </div>
    </section>
  );
}
