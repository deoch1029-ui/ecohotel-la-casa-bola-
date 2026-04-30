"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, X, Send } from "@/components/icons";
import { WHATSAPP_NUMBER } from "@/lib/config";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "¿Cuánto cuesta la habitación con jacuzzi?",
  "¿Cómo llego desde Quito?",
  "¿Aceptan mascotas?",
  "¿Tienen disponibilidad este fin de semana?",
];

function generateLocalResponse(text: string): string {
  const q = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (q.includes("precio") || q.includes("cuesta") || q.includes("valor") || q.includes("tarifa") || q.includes("costo") || q.includes("cuanto")) {
    return "Tenemos 3 rangos de precios por pareja/noche:\n\n• Habitaciones 1 y 2: $45 USD (estándar)\n• Habitaciones 3, 4 y 5: $60 USD (confort)\n• Habitaciones 6, 7 y 8: $80 USD (con hidromasaje/jacuzzi y champán incluido)\n\n✨ Decoración romántica opcional con costo adicional. ¿Te interesa alguna en particular?";
  }
  if (q.includes("jacuzzi") || q.includes("hidromasaje") || q.includes("spa") || q.includes("champ") || q.includes("burbuja")) {
    return "Nuestras Habitaciones 6, 7 y 8 ($80 USD/noche) cuentan con hidromasaje/jacuzzi privado y una botella de champán de bienvenida. 🥂✨ ¿Deseas reservar alguna de ellas?";
  }
  if (q.includes("ubicacion") || q.includes("direccion") || q.includes("llegar") || q.includes("quito") || q.includes("donde") || q.includes("lejos")) {
    return "Estamos en el sector Guayllabamba, vía Pueblo Viejo, a solo 35 minutos de Quito. 📍 Puedes ver el mapa exacto en la sección de Ubicación de esta página.";
  }
  if (q.includes("mascota") || q.includes("perro") || q.includes("mascotas") || q.includes("gato") || q.includes("animal")) {
    return "Para consultas sobre el ingreso de mascotas, te recomiendo escribirle directamente al dueño por WhatsApp para confirmar las condiciones. 🐾\n\n📱 https://wa.me/" + WHATSAPP_NUMBER;
  }
  if (q.includes("disponibilidad") || q.includes("reservar") || q.includes("fecha") || q.includes("fin de semana") || q.includes("semana santa") || q.includes("feriado")) {
    return "Para confirmar disponibilidad de fechas específicas, lo mejor es usar nuestro sistema de reservas en la página o escribirle al dueño por WhatsApp. 📅\n\n📱 https://wa.me/" + WHATSAPP_NUMBER;
  }
  if (q.includes("evento") || q.includes("boda") || q.includes("matrimonio") || q.includes("foto") || q.includes("corporativo") || q.includes("cumplea") || q.includes("fiesta")) {
    return "¡Sí! Hacemos bodas boutique, sesiones de fotos, retiros y eventos corporativos. 🎉 Para cotizar y revisar disponibilidad, escríbenos por WhatsApp:\n\n📱 https://wa.me/" + WHATSAPP_NUMBER;
  }
  if (q.includes("wifi") || q.includes("internet") || q.includes("conexion")) {
    return "¡Sí! Todas nuestras habitaciones cuentan con WiFi. Las estándar tienen WiFi de alta velocidad y las suites premium tienen WiFi Premium. 📶";
  }
  if (q.includes("contacto") || q.includes("telefono") || q.includes("email") || q.includes("correo") || q.includes("whatsapp") || q.includes("instagram")) {
    return "Puedes contactarnos por:\n📞 WhatsApp: +593 98 790 8530\n✉️ Email: ecohotelcasabola@gmail.com\n📱 Instagram: @lacasabola";
  }
  if (q.includes("check-in") || q.includes("entrada") || q.includes("check-out") || q.includes("salida") || q.includes("hora")) {
    return "El horario de check-in y check-out se coordina directamente por WhatsApp para darte la mejor atención. 🕒 Escríbenos al +593 98 790 8530.";
  }
  if (q.includes("decoracion") || q.includes("romantica") || q.includes("romantico") || q.includes("aniversario") || q.includes("sorpresa") || q.includes("petalos")) {
    return "¡Claro! Todas las habitaciones tienen decoración romántica opcional por un valor adicional. 💖 Para agregarla, solo indícalo al momento de tu reserva por WhatsApp.\n\n📱 https://wa.me/" + WHATSAPP_NUMBER;
  }
  if (q.includes("hola") || q.includes("buenas") || q.includes("hey") || q.includes("saludos")) {
    return "¡Hola! 🌿 Bienvenido a La Casa Bola. ¿En qué puedo ayudarte? Puedo contarte sobre nuestras habitaciones, precios, eventos o ubicación.";
  }
  if (q.includes("gracias") || q.includes("genial") || q.includes("perfecto")) {
    return "¡Con mucho gusto! 😊 Si necesitas algo más, aquí estoy. O si prefieres atención personalizada, puedes escribir al WhatsApp: +593 98 790 8530";
  }
  return "No tengo esa información en mi sistema, pero no te preocupes. 🌿 Puedes escribirle directamente al dueño por WhatsApp y te ayudará encantado:\n\n📱 https://wa.me/" + WHATSAPP_NUMBER;
}

const STORAGE_KEY = "bola-chat-history";

export default function BolaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (parsed.length > 0) return parsed;
      }
    } catch { /* ignore */ }
    return [
      { role: "assistant", content: "¡Hola! Soy Bola 🌿, tu asistente del Ecohotel La Casa Bola. ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestras habitaciones, precios, ubicación o cualquier duda que tengas. 😊" },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20))); } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback((overrideText: string | null = null) => {
    const text = (overrideText || input).trim().slice(0, 500);
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = generateLocalResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 600 + Math.random() * 800);
  }, [input, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const showQuickReplies = messages.length <= 3 && messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end" style={{ maxWidth: isOpen ? "380px" : "auto", width: isOpen ? "90vw" : "auto" }}>
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-3"
          style={{ height: "520px", width: "100%", animation: "slideUp 0.4s ease-out" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-anthracite text-white">
            <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold leading-none">Bola ✨</p>
              <p className="text-xs text-white/60 mt-0.5">Asistente de La Casa Bola</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors flex-shrink-0" aria-label="Cerrar chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-messages p-4 space-y-3 bg-[#F9F7F2]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} chat-msg-anim`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bola"}`}
                  style={{ whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start chat-msg-anim">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div className="chat-bubble-bola px-4 py-3 flex gap-1.5 items-center">
                  <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block"></span>
                  <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block"></span>
                  <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && (
            <div className="px-3 py-2 flex gap-2 overflow-x-auto hide-scroll bg-white border-t border-gray-50">
              {QUICK_REPLIES.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs bg-[#F9F7F2] border border-gold/20 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition-all duration-200 whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors bg-[#F9F7F2] text-anthracite"
              disabled={loading}
              maxLength={500}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${input.trim() && !loading ? "bg-gold text-white hover:bg-[#a0874f] shadow-md" : "bg-gray-100 text-gray-300"}`}
              aria-label="Enviar mensaje">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="bg-anthracite text-white p-4 rounded-full shadow-xl hover:bg-[#3d3d3d] transition-all transform hover:scale-105 flex items-center justify-center relative"
        aria-label={isOpen ? "Cerrar asistente Bola" : "Abrir asistente Bola"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">IA</span>
          </span>
        )}
      </button>
    </div>
  );
}
