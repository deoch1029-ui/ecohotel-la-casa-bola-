import {
  BRAND_LOGO_URL,
  WHATSAPP_NUMBER,
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TIKTOK_URL,
} from "@/lib/config";
import { Facebook, Instagram, MessageCircle, Phone, Mail } from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-[#F9F7F2] pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand + Social */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Ecohotel La Casa Bola"
                width={44}
                height={44}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover brand-logo-ring flex-shrink-0"
              />
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-anthracite">La Casa Bola</span>
            </div>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              Una experiencia única de lujo minimalista en armonía con el entorno de Guayllabamba.
            </p>
            <div className="flex space-x-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-anthracite hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-anthracite hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-anthracite hover:text-gold transition-colors" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl text-anthracite mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600 font-light">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+593987908530" className="hover:text-gold transition-colors">+593 98 790 8530</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 font-light">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 font-light">
                <span className="text-gold font-serif">@</span>
                <span>{INSTAGRAM}</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-serif text-xl text-anthracite mb-6">¿Dudas?</h4>
            <p className="text-gray-600 font-light text-sm mb-4">
              Escríbenos directamente por WhatsApp o chatea con Bola, nuestra asistente IA.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 border border-anthracite text-anthracite hover:bg-anthracite hover:text-white transition-all text-sm uppercase tracking-widest"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-400 text-xs">© {year} Ecohotel La Casa Bola. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
