"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { rooms, type Room, WHATSAPP_NUMBER, PLACEHOLDER_SVG } from "@/lib/config";
import { DynamicIcon, X, ChevronLeft, ChevronRight, MessageCircle, CalendarDays, Camera, Heart } from "@/components/icons";

/* ─── RoomCard ─── */
function RoomCard({
  room,
  onSelect,
}: {
  room: Room;
  onSelect: (r: Room) => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(room)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(room);
        }
      }}
      aria-label={`Ver detalles de ${room.name}`}
      className="group bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={room.images[0]}
          alt={`${room.name} - Ecohotel La Casa Bola`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_SVG; }}
        />
        <div className="absolute top-4 right-4 bg-[#F9F7F2]/90 backdrop-blur-sm px-3 py-1">
          <span className="text-gold font-serif font-semibold">${room.price}</span>
        </div>
        {room.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center space-x-1">
            <Camera className="w-3 h-3" /><span>{room.images.length}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl text-anthracite mb-2">{room.name}</h3>
        <p className="text-gray-600 font-light text-sm leading-relaxed mb-4 flex-grow">{room.desc}</p>
        <div className="flex items-center text-xs uppercase tracking-widest text-gold font-medium mt-auto">
          Ver detalles <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </article>
  );
}

/* ─── RoomModal ─── */
function RoomModal({
  room,
  onClose,
}: {
  room: Room;
  onClose: () => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") setCurrentImg((i) => (i > 0 ? i - 1 : room.images.length - 1));
      if (e.key === "ArrowRight") setCurrentImg((i) => (i < room.images.length - 1 ? i + 1 : 0));
    };
    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [room.images.length]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onCloseRef.current();
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrentImg((i) => (i < room.images.length - 1 ? i + 1 : 0));
      else setCurrentImg((i) => (i > 0 ? i - 1 : room.images.length - 1));
    }
    touchStartX.current = null;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me interesa reservar "${room.name}" (${room.priceNote}). ¿Tienen disponibilidad?`
  )}`;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 animate-fade-in"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${room.name}`}
        tabIndex={-1}
        className="relative bg-white w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden"
        style={{ animation: "slideUp 0.4s ease-out" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white text-anthracite transition-colors shadow-sm" aria-label="Cerrar">
          <X className="w-6 h-6" />
        </button>

        {/* Image gallery */}
        <div className="w-full md:w-3/5 bg-gray-100 flex flex-col relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex-grow relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
            <img
              src={room.images[currentImg]}
              alt={`${room.name} vista ${currentImg + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_SVG; }}
            />
            {room.images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => (i > 0 ? i - 1 : room.images.length - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 hover:bg-white text-anthracite rounded-full transition-colors backdrop-blur-sm" aria-label="Imagen anterior">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => (i < room.images.length - 1 ? i + 1 : 0)); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 hover:bg-white text-anthracite rounded-full transition-colors backdrop-blur-sm" aria-label="Imagen siguiente">
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {currentImg + 1} / {room.images.length}
                </div>
              </>
            )}
          </div>
          {room.images.length > 1 && (
            <div className="h-20 bg-white border-t border-gray-100 flex items-center justify-center space-x-2 overflow-x-auto p-2 hide-scroll">
              {room.images.map((img, idx) => (
                <button key={idx} onClick={() => setCurrentImg(idx)} className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${currentImg === idx ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`} aria-label={`Ver imagen ${idx + 1}`}>
                  <img src={img} alt={`Miniatura ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-2/5 flex flex-col h-full overflow-y-auto bg-white">
          <div className="p-8 md:p-12">
            <h2 className="font-serif text-3xl md:text-4xl text-anthracite mb-1">{room.name}</h2>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-2xl font-serif text-gold">${room.price}</span>
              <span className="text-sm text-gray-500 font-light">/ noche por pareja</span>
            </div>
            <div className="w-12 h-0.5 bg-gold mb-8"></div>
            <p className="text-gray-600 font-light leading-relaxed mb-8 text-lg">{room.longDescription}</p>

            <h4 className="font-serif text-xl text-anthracite mb-6">Amenidades</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {room.services.map((service, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-gray-700">
                  <span className="text-gold flex-shrink-0"><DynamicIcon name={service.icon} size={20} /></span>
                  <span className="text-sm font-medium">{service.label}</span>
                </div>
              ))}
            </div>

            {room.hasExtraNote && (
              <div className="flex items-start space-x-3 bg-gold/5 border border-gold/20 rounded-lg p-4 mb-8">
                <Heart className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gold/80 leading-relaxed">{room.extraNote}</p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
              <a href="#reservas" onClick={onClose} className="flex items-center justify-center w-full py-3 border border-anthracite text-anthracite hover:bg-anthracite hover:text-white font-medium transition-colors text-sm uppercase tracking-widest gap-2">
                <CalendarDays className="w-4 h-4" /> Ver disponibilidad
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium transition-colors rounded shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                <MessageCircle className="w-5 h-5 mr-2" /> Reservar por WhatsApp
              </a>
              <p className="text-center text-xs text-gray-400">* Precios por pareja. Sujeto a confirmación de disponibilidad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Rooms Section ─── */
export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <section id="habitaciones" className="py-24 px-6 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-anthracite mb-4">Nuestras Habitaciones</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
          ))}
        </div>
      </div>
      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </section>
  );
}
