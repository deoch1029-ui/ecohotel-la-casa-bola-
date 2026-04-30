"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { Sparkles, X, Send, RotateCcw } from "@/components/icons";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { useLanguage } from "@/lib/i18n";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "bola-chat-history";

// Stable empty array reference to avoid infinite re-renders in useSyncExternalStore
const EMPTY_MESSAGES: ChatMessage[] = [];

// In-memory cache for fast access within the same render
let chatCache: ChatMessage[] | null = null;
const chatListeners = new Set<() => void>();

function notifyChatListeners() {
  chatListeners.forEach((l) => l());
}

function getMessagesFromStorage(): ChatMessage[] {
  if (chatCache !== null) return chatCache;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (parsed.length > 0) {
        chatCache = parsed;
        return parsed;
      }
    }
  } catch { /* ignore */ }
  return EMPTY_MESSAGES;
}

function saveMessagesToStorage(msgs: ChatMessage[]) {
  chatCache = msgs;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-20)));
  } catch { /* ignore */ }
  notifyChatListeners();
}

function subscribeToChat(callback: () => void): () => void {
  chatListeners.add(callback);
  return () => { chatListeners.delete(callback); };
}

function getChatSnapshot(): ChatMessage[] {
  return getMessagesFromStorage();
}

function getChatServerSnapshot(): ChatMessage[] {
  return EMPTY_MESSAGES;
}

export default function BolaChat() {
  const { t } = useLanguage();
  const persistedMessages = useSyncExternalStore(subscribeToChat, getChatSnapshot, getChatServerSnapshot);

  // Compute full messages: use persisted or show greeting
  const messages = persistedMessages.length > 0
    ? persistedMessages
    : [{ role: "assistant" as const, content: t("chat.greeting") }];

  const getQuickReplies = useCallback(() => [
    t("chat.quick1"),
    t("chat.quick2"),
    t("chat.quick3"),
    t("chat.quick4"),
  ], [t]);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearChat = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    chatCache = null;
    notifyChatListeners();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const generateLocalResponse = useCallback((text: string): string => {
    const q = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (q.includes("precio") || q.includes("cuesta") || q.includes("valor") || q.includes("tarifa") || q.includes("costo") || q.includes("cuanto") || q.includes("price") || q.includes("cost") || q.includes("how much")) {
      return t("chat.price");
    }
    if (q.includes("jacuzzi") || q.includes("hidromasaje") || q.includes("spa") || q.includes("champ") || q.includes("burbuja") || q.includes("hot tub") || q.includes("whirlpool")) {
      return t("chat.jacuzzi");
    }
    if (q.includes("ubicacion") || q.includes("direccion") || q.includes("llegar") || q.includes("quito") || q.includes("donde") || q.includes("lejos") || q.includes("location") || q.includes("direction") || q.includes("get there") || q.includes("how to get") || q.includes("where")) {
      return t("chat.location");
    }
    if (q.includes("mascota") || q.includes("perro") || q.includes("mascotas") || q.includes("gato") || q.includes("animal") || q.includes("pet") || q.includes("dog") || q.includes("cat")) {
      return t("chat.pets") + WHATSAPP_NUMBER;
    }
    if (q.includes("disponibilidad") || q.includes("reservar") || q.includes("fecha") || q.includes("fin de semana") || q.includes("semana santa") || q.includes("feriado") || q.includes("availability") || q.includes("book") || q.includes("reserve") || q.includes("weekend")) {
      return t("chat.availability") + WHATSAPP_NUMBER;
    }
    if (q.includes("evento") || q.includes("boda") || q.includes("matrimonio") || q.includes("foto") || q.includes("corporativo") || q.includes("cumplea") || q.includes("fiesta") || q.includes("event") || q.includes("wedding") || q.includes("photo") || q.includes("corporate") || q.includes("party")) {
      return t("chat.events") + WHATSAPP_NUMBER;
    }
    if (q.includes("wifi") || q.includes("internet") || q.includes("conexion") || q.includes("connection")) {
      return t("chat.wifi");
    }
    if (q.includes("contacto") || q.includes("telefono") || q.includes("email") || q.includes("correo") || q.includes("whatsapp") || q.includes("instagram") || q.includes("contact") || q.includes("phone")) {
      return t("chat.contact");
    }
    if (q.includes("check-in") || q.includes("entrada") || q.includes("check-out") || q.includes("salida") || q.includes("hora") || q.includes("check in") || q.includes("check out") || q.includes("time")) {
      return t("chat.checkin");
    }
    if (q.includes("decoracion") || q.includes("romantica") || q.includes("romantico") || q.includes("aniversario") || q.includes("sorpresa") || q.includes("petalos") || q.includes("romantic") || q.includes("decoration") || q.includes("anniversary") || q.includes("surprise")) {
      return t("chat.romantic") + WHATSAPP_NUMBER;
    }
    if (q.includes("hola") || q.includes("buenas") || q.includes("hey") || q.includes("saludos") || q.includes("hello") || q.includes("hi")) {
      return t("chat.greeting2");
    }
    if (q.includes("gracias") || q.includes("genial") || q.includes("perfecto") || q.includes("thank") || q.includes("great") || q.includes("perfect")) {
      return t("chat.thanks");
    }
    return t("chat.unknown") + WHATSAPP_NUMBER;
  }, [t]);

  const sendMessage = useCallback((overrideText: string | null = null) => {
    const text = (overrideText || input).trim().slice(0, 500);
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const currentPersisted = getMessagesFromStorage();
    const withUser = [...currentPersisted, userMsg];
    saveMessagesToStorage(withUser);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = generateLocalResponse(text);
      const assistantMsg: ChatMessage = { role: "assistant", content: reply };
      const withReply = [...withUser, assistantMsg];
      saveMessagesToStorage(withReply);
      setLoading(false);
    }, 600 + Math.random() * 800);
  }, [input, loading, generateLocalResponse]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const showQuickReplies = messages.length <= 3 && messages[messages.length - 1]?.role === "assistant";

  const quickReplies = getQuickReplies();

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
              <p className="font-serif text-sm font-semibold leading-none">{t("chat.bolaName")}</p>
              <p className="text-xs text-white/60 mt-0.5">{t("chat.bolaRole")}</p>
            </div>
            <button onClick={clearChat} className="text-white/60 hover:text-white transition-colors flex-shrink-0" title={t("chat.newChat")} aria-label={t("chat.newChat")}>
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors flex-shrink-0" aria-label={t("chat.close")}>
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
              {quickReplies.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs bg-[#F9F7F2] border border-gold/20 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition-all duration-200 whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Privacy notice */}
          <div className="px-4 py-1 bg-white">
            <p className="text-[10px] text-gray-400 text-center">{t("chat.private")}</p>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t("chat.placeholder")}
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
        aria-label={isOpen ? t("chat.close") : t("chat.open")}
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
