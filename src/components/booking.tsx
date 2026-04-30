"use client";

import { useState, useMemo } from "react";
import { rooms, type Room, WHATSAPP_NUMBER } from "@/lib/config";
import { ChevronLeft, ChevronRight, MessageCircle, CalendarDays } from "@/components/icons";

const MONTHS_ES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DAYS_ES = ["Do","Lu","Ma","Mi","Ju","Vi","Sa"];

function formatDate(date: Date): string {
  return `${date.getDate()} de ${MONTHS_ES[date.getMonth()]} de ${date.getFullYear()}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(d: Date, start: Date, end: Date) {
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
}

export default function BookingSection() {
  const sortedRooms = useMemo(() => [...rooms].sort((a, b) => a.price - b.price), []);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRoomId, setSelectedRoomId] = useState(sortedRooms[0].id);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"in" | "out">("in");
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [guestName, setGuestName] = useState("");

  const room = sortedRooms.find((r) => r.id === selectedRoomId) || sortedRooms[0];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const total = nights * room.price;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (day: number) => {
    const clicked = new Date(viewYear, viewMonth, day);
    clicked.setHours(0, 0, 0, 0);
    if (clicked < today) return;

    if (selecting === "in" || (checkIn && checkOut)) {
      setCheckIn(clicked);
      setCheckOut(null);
      setSelecting("out");
    } else {
      if (clicked <= checkIn!) {
        setCheckIn(clicked);
        setCheckOut(null);
        setSelecting("out");
      } else {
        setCheckOut(clicked);
        setSelecting("in");
      }
    }
  };

  const getDayClass = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    let cls = "cal-day w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm rounded-full cursor-pointer select-none font-light ";
    if (d < today) { cls += "cal-disabled text-gray-300 "; return cls; }
    if ((checkIn && sameDay(d, checkIn)) || (checkOut && sameDay(d, checkOut))) { cls += "cal-selected font-semibold "; return cls; }
    if (checkIn && checkOut && isInRange(d, checkIn, checkOut)) { cls += "cal-in-range "; return cls; }
    if (sameDay(d, today)) { cls += "font-semibold text-gold "; }
    return cls;
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const handleConfirm = () => {
    if (!checkIn || !checkOut) return;
    setStep(2);
  };

  const handleSendWhatsApp = () => {
    const nombre = guestName.trim() || "huésped";
    const msg = `🏡 *SOLICITUD DE RESERVA - La Casa Bola*\n\n👤 Nombre: ${nombre}\n🛏️ Habitación: ${room.name}\n📅 Check-in: ${formatDate(checkIn!)}\n📅 Check-out: ${formatDate(checkOut!)}\n🌙 Noches: ${nights}\n💰 Total estimado: $${total} USD\n\n¿Tienen disponibilidad para estas fechas?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="reservas" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-anthracite mb-4">Reserva tu Estadía</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-500 font-light max-w-xl mx-auto">Selecciona tu habitación, las fechas que deseas y te enviaremos la confirmación por WhatsApp.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Room selector + Calendar */}
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-medium">Selecciona tu habitación</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto hide-scroll">
                    {sortedRooms.map((r) => (
                      <button key={r.id} onClick={() => setSelectedRoomId(r.id)}
                        className={`w-full text-left px-4 py-3 border text-sm transition-all duration-200 flex justify-between items-center ${selectedRoomId === r.id ? "border-gold bg-gold/5 text-anthracite" : "border-gray-100 hover:border-gold/40 text-gray-600"}`}>
                        <span className="font-medium">{r.name}</span>
                        <span className={`font-serif font-semibold ${selectedRoomId === r.id ? "text-gold" : "text-gray-400"}`}>${r.price}/noche</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-1 hover:text-gold transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="font-serif text-anthracite font-semibold">{MONTHS_ES[viewMonth]} {viewYear}</span>
                    <button onClick={nextMonth} className="p-1 hover:text-gold transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="grid grid-cols-7 mb-2">
                    {DAYS_ES.map((d) => (
                      <div key={d} className="w-8 h-7 md:w-9 md:h-7 flex items-center justify-center text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1">
                    {cells.map((day, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        {day ? (
                          <div className={getDayClass(day)} onClick={() => handleDayClick(day)}>{day}</div>
                        ) : (
                          <div className="w-8 h-8 md:w-9 md:h-9" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-4 font-light">
                    {!checkIn ? "Selecciona la fecha de entrada" : !checkOut ? "Selecciona la fecha de salida" : "Rango seleccionado ✓"}
                  </p>
                </div>
              </div>

              {/* Right: Summary */}
              <div className="flex flex-col">
                <div className="bg-white border border-gray-100 p-6 shadow-sm flex-grow">
                  <h3 className="font-serif text-xl text-anthracite mb-4">Resumen de tu estadía</h3>
                  <div className="w-10 h-0.5 bg-gold mb-6"></div>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-500">Habitación</span>
                      <span className="text-sm font-medium text-anthracite text-right max-w-[55%]">{room.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Precio por noche</span>
                      <span className="text-sm font-serif text-gold font-semibold">${room.price} USD</span>
                    </div>
                    <div className="border-t border-gray-50 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Check-in</span>
                        <span className={`text-sm font-medium ${checkIn ? "text-anthracite" : "text-gray-300"}`}>{checkIn ? formatDate(checkIn) : "—"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Check-out</span>
                        <span className={`text-sm font-medium ${checkOut ? "text-anthracite" : "text-gray-300"}`}>{checkOut ? formatDate(checkOut) : "—"}</span>
                      </div>
                    </div>
                    {nights > 0 && (
                      <div className="border-t border-gray-50 pt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Noches</span>
                          <span className="text-sm font-medium text-anthracite">{nights}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-anthracite">Total estimado</span>
                          <span className="text-xl font-serif text-gold font-semibold">${total} USD</span>
                        </div>
                        <p className="text-xs text-gray-400">*Precio por pareja. Sujeto a confirmación de disponibilidad.</p>
                      </div>
                    )}
                  </div>
                  <div className="relative overflow-hidden h-32 mb-6">
                    <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <button
                    onClick={handleConfirm}
                    disabled={!checkIn || !checkOut}
                    className={`w-full py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 ${checkIn && checkOut ? "bg-[#B89B62] text-white hover:bg-[#a0874f] shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    Continuar con la reserva
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto bg-white border border-gray-100 p-8 shadow-sm" style={{ animation: "slideUp 0.4s ease-out" }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-anthracite mb-2">Confirma tu reserva</h3>
                <p className="text-sm text-gray-500 font-light">Tu solicitud se enviará por WhatsApp y nuestro equipo confirmará la disponibilidad.</p>
              </div>
              <div className="bg-[#F9F7F2] p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Habitación</span>
                  <span className="font-medium text-anthracite">{room.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-medium text-anthracite">{checkIn ? formatDate(checkIn) : ""}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-medium text-anthracite">{checkOut ? formatDate(checkOut) : ""}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span className="font-semibold text-anthracite">Total estimado</span>
                  <span className="font-serif text-gold font-semibold text-lg">${total} USD</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Tu nombre (opcional)</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="¿Cómo te llamas?"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-anthracite focus:outline-none focus:border-gold transition-colors bg-white"
                />
              </div>
              <button onClick={handleSendWhatsApp}
                className="flex items-center justify-center w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium transition-colors shadow-lg text-sm uppercase tracking-widest gap-2 mb-3">
                <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
              </button>
              <button onClick={() => setStep(1)} className="w-full py-3 text-sm text-gray-400 hover:text-anthracite transition-colors">
                ← Volver al calendario
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
