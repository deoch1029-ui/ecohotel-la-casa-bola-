export const BRAND_LOGO_URL =
  "https://raw.githubusercontent.com/deoch1029-ui/ecohotel-la-casa-bola-/refs/heads/main/logo%20casa%20bola.svg";

export const HERO_IMAGE_URL = "/images/hero.png";

export const WHATSAPP_NUMBER = "593987908530";
export const EMAIL = "ecohotelcasabola@gmail.com";
export const INSTAGRAM = "@lacasabola";
export const INSTAGRAM_URL = "https://www.instagram.com/lacasabola/";
export const FACEBOOK_URL = "https://www.facebook.com/share/18ggNNEFp7/";
export const TIKTOK_URL = "https://www.tiktok.com/@lacasabola?is_from_webapp=1&sender_device=pc";
export const MAPS_LINK = "https://maps.app.goo.gl/PSNLLNd1xGcNhcNX7";

export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Ecohotel+La+Casa+Bola+Guayllabamba+Ecuador&z=15&t=&ie=UTF8&iwloc=A&output=embed";

export const EVENTS_IMAGE_URL = "/images/events.jpg";

export const PLACEHOLDER_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23e8e4dc"><rect width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif" font-size="13">Imagen no disponible</text></svg>'
  );

export interface Room {
  id: number;
  name: string;
  price: number;
  desc: string;
  longDescription: string;
  priceNote: string;
  hasExtraNote: boolean;
  extraNote: string;
  images: string[];
  services: { icon: string; label: string }[];
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Habitación 1",
    price: 45,
    desc: "Ambiente natural y privado. Decoración romántica opcional.",
    longDescription:
      "Un espacio acogedor y tranquilo para parejas que buscan desconectarse y vivir la naturaleza. Cuenta con todo lo necesario para una estadía cómoda y privada. Su diseño circular maximiza la entrada de luz natural a través de grandes ventanales, creando un ambiente íntimo que respira con el valle.",
    priceNote: "$45 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r1-1.png",
      "/images/rooms/r1-2.png",
      "/images/rooms/r1-3.png",
      "/images/rooms/r1-4.png",
      "/images/rooms/r1-5.png",
      "/images/rooms/r1-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi de Alta Velocidad" },
      { icon: "BedDouble", label: "Cama Matrimonial" },
      { icon: "Trees", label: "Vista al Jardín" },
      { icon: "Droplets", label: "Baño Privado con Ducha" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 2,
    name: "Habitación 2",
    price: 45,
    desc: "Ambiente natural y privado. Decoración romántica opcional.",
    longDescription:
      "Un espacio acogedor y tranquilo para parejas que buscan desconectarse y vivir la naturaleza. Su diseño esférico, con amplios ventanales que enmarcan la vegetación circundante, crea una sensación de inmersión total en el entorno natural del valle de Guayllabamba.",
    priceNote: "$45 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r2-1.png",
      "/images/rooms/r2-2.png",
      "/images/rooms/r2-3.png",
      "/images/rooms/r2-4.png",
      "/images/rooms/r2-5.png",
      "/images/rooms/r2-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi Estándar" },
      { icon: "BedDouble", label: "Cama Matrimonial" },
      { icon: "Droplets", label: "Baño Privado" },
      { icon: "Trees", label: "Vista a la Naturaleza" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 3,
    name: "Habitación 3",
    price: 60,
    desc: "Ambiente natural y privado. Decoración romántica opcional.",
    longDescription:
      "Un espacio acogedor y tranquilo para parejas que buscan desconectarse y vivir la naturaleza. Su diseño de techo inclinado con estructura de madera y acero negro le da un carácter de refugio rústico-moderno. Las grandes ventanas enmarcan el paisaje verde del valle.",
    priceNote: "$60 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r3-1.png",
      "/images/rooms/r3-2.png",
      "/images/rooms/r3-3.png",
      "/images/rooms/r3-4.png",
      "/images/rooms/r3-5.png",
      "/images/rooms/r3-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi de Alta Velocidad" },
      { icon: "BedDouble", label: "Cama King Size" },
      { icon: "Trees", label: "Ambiente Natural y Privado" },
      { icon: "Droplets", label: "Baño Privado" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 4,
    name: "Habitación 4",
    price: 60,
    desc: "La opción perfecta para quienes buscan desconectarse del ruido de la ciudad.",
    longDescription:
      "Esta habitación destaca por sus amplios ventanales con cortinas en tonos tierra que enmarcan vistas panorámicas del valle. La decoración combina la calidez de la madera con textiles de estampados tropicales que evocan la naturaleza del entorno.",
    priceNote: "$60 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r4-1.png",
      "/images/rooms/r4-2.png",
      "/images/rooms/r4-3.png",
      "/images/rooms/r4-4.png",
      "/images/rooms/r4-5.png",
      "/images/rooms/r4-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi de Alta Velocidad" },
      { icon: "BedDouble", label: "Cama Matrimonial" },
      { icon: "Mountain", label: "Vista Panorámica" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
      { icon: "Droplets", label: "Baño Privado" },
    ],
  },
  {
    id: 5,
    name: "Habitación 5",
    price: 60,
    desc: "La opción perfecta para quienes buscan desconectarse del ruido de la ciudad.",
    longDescription:
      "Esta habitación se distingue por sus amplios ventanales curvos de piso a techo que enmarcan una vista espectacular de las montañas. El interior combina paredes blancas con vigas negras, una cama con cabecera acolchada y acabados en mármol en el baño privado.",
    priceNote: "$60 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r5-1.png",
      "/images/rooms/r5-2.png",
      "/images/rooms/r5-3.png",
      "/images/rooms/r5-4.png",
      "/images/rooms/r5-5.png",
      "/images/rooms/r5-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi de Alta Velocidad" },
      { icon: "BedDouble", label: "Cama Matrimonial" },
      { icon: "Mountain", label: "Vista Panorámica a las Montañas" },
      { icon: "Droplets", label: "Baño Privado con Acabados en Mármol" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 6,
    name: "Habitación 6",
    price: 80,
    desc: "Hidromasaje Privado, Champán Incluido. Decoración romántica opcional.",
    longDescription:
      "La opción perfecta para quienes buscan desconectarse del ruido de la ciudad. Esta suite combina la arquitectura esférica con un hidromasaje privado y una botella de champán de bienvenida para brindar por el atardecer en el valle.",
    priceNote: "$80 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r6-1.png",
      "/images/rooms/r6-2.png",
      "/images/rooms/r6-3.png",
      "/images/rooms/r6-4.png",
      "/images/rooms/r6-5.png",
      "/images/rooms/r6-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi Premium" },
      { icon: "Bath", label: "Hidromasaje Privado" },
      { icon: "Wine", label: "Botella de Champán Incluida" },
      { icon: "BedDouble", label: "Cama Queen Size" },
      { icon: "Mountain", label: "Vista Panorámica al Valle" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 7,
    name: "Habitación 7",
    price: 80,
    desc: "Hidromasaje Privado, Champán Incluido. Decoración romántica opcional.",
    longDescription:
      "La opción perfecta para quienes buscan desconectarse del ruido de la ciudad. Esta suite ofrece una orientación distinta que garantiza privacidad y vistas únicas hacia la cordillera. Cuenta con hidromasaje privado climatizado disponible las 24 horas y una botella de champán de bienvenida.",
    priceNote: "$80 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r7-1.png",
      "/images/rooms/r7-2.png",
      "/images/rooms/r7-3.png",
      "/images/rooms/r7-4.png",
      "/images/rooms/r7-5.png",
      "/images/rooms/r7-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi Premium" },
      { icon: "Bath", label: "Hidromasaje Privado" },
      { icon: "Wine", label: "Botella de Champán Incluida" },
      { icon: "BedDouble", label: "Cama Queen Size" },
      { icon: "Mountain", label: "Vista Panorámica" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
  {
    id: 8,
    name: "Habitación 8",
    price: 80,
    desc: "Hidromasaje Privado, Champán Incluido. Decoración romántica opcional.",
    longDescription:
      "Ubicada en el punto más alto del complejo, esta habitación combina el diseño de techo inclinado de madera con un jacuzzi privado y una botella de champán de bienvenida. Los amplios ventanales enmarcan una vista panorámica de montañas y vegetación.",
    priceNote: "$80 USD por pareja",
    hasExtraNote: true,
    extraNote: "Decoración romántica disponible por un valor adicional. Consultar al momento de la reserva.",
    images: [
      "/images/rooms/r8-1.png",
      "/images/rooms/r8-2.png",
      "/images/rooms/r8-3.png",
      "/images/rooms/r8-4.png",
      "/images/rooms/r8-5.png",
      "/images/rooms/r8-6.png",
    ],
    services: [
      { icon: "Wifi", label: "WiFi Premium" },
      { icon: "Bath", label: "Hidromasaje Privado" },
      { icon: "Wine", label: "Botella de Champán Incluida" },
      { icon: "BedDouble", label: "Cama Queen Size" },
      { icon: "Eye", label: "Mejor Vista 360°" },
      { icon: "Heart", label: "Decoración Romántica Opcional" },
    ],
  },
];

export interface Policy {
  number: string;
  title: string;
  icon: string;
  text: string;
}

export const policies: Policy[] = [
  {
    number: "01",
    title: "Objetos Personales",
    icon: "PackageX",
    text: "El establecimiento no se responsabiliza por objetos personales olvidados, extraviados o dejados en habitaciones o áreas comunes. Los objetos encontrados serán resguardados por un período máximo de 15 días.",
  },
  {
    number: "02",
    title: "Daños o Pérdidas",
    icon: "ShieldCheck",
    text: "El hotel no se hace responsable por pérdidas, robos o daños a pertenencias personales dentro de las instalaciones. Se recomienda mantener sus objetos de valor bajo su custodia.",
  },
  {
    number: "03",
    title: "Uso de Instalaciones",
    icon: "Home",
    text: "El uso de habitaciones, hidromasaje, áreas verdes, parqueadero y demás espacios es responsabilidad exclusiva del huésped. Los menores de edad deben estar bajo supervisión permanente de un adulto.",
  },
  {
    number: "04",
    title: "Accidentes",
    icon: "AlertTriangle",
    text: "El establecimiento no se responsabiliza por accidentes ocasionados por el uso indebido de las instalaciones o por el incumplimiento de las normas internas.",
  },
  {
    number: "05",
    title: "Daños a la Propiedad",
    icon: "Scale",
    text: "Cualquier daño ocasionado a mobiliario, equipos, lencería o infraestructura del hotel deberá ser cubierto por el huésped responsable.",
  },
  {
    number: "06",
    title: "Ingreso de Visitantes",
    icon: "Users",
    text: "El ingreso de personas adicionales debe ser previamente informado y autorizado por administración. El hotel no se responsabiliza por situaciones derivadas del ingreso de terceros no registrados.",
  },
  {
    number: "07",
    title: "Fuerza Mayor",
    icon: "Zap",
    text: "El hotel no será responsable por interrupciones en los servicios ocasionadas por causas externas o de fuerza mayor, tales como cortes de energía, fallas en servicios públicos o eventos naturales.",
  },
  {
    number: "08",
    title: "Normas de Convivencia",
    icon: "Handshake",
    text: "Se solicita respeto por el descanso de otros huéspedes y el cuidado de las instalaciones. El incumplimiento de estas normas podrá dar lugar a la finalización anticipada de la estadía sin derecho a reembolso.",
  },
];

export interface EventType {
  icon: string;
  title: string;
}

export const events: EventType[] = [
  { icon: "Heart", title: "Bodas Boutique" },
  { icon: "Camera", title: "Sesiones de Fotos" },
  { icon: "Mountain", title: "Retiros" },
  { icon: "Users", title: "Eventos Corporativos" },
];

export const NAV_LINKS = [
  { label: "Habitaciones", href: "#habitaciones" },
  { label: "Reservar", href: "#reservas" },
  { label: "Eventos", href: "#eventos" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Políticas", href: "#politicas" },
  { label: "FAQ", href: "#faq" },
];

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "¿Cuáles son los precios de las habitaciones?",
    answer: "Tenemos 3 rangos de precios por pareja por noche: Habitaciones 1 y 2 a $45 USD (estándar), Habitaciones 3, 4 y 5 a $60 USD (confort), y Habitaciones 6, 7 y 8 a $80 USD (con hidromasaje privado y champán incluido). Decoración romántica disponible con costo adicional.",
  },
  {
    id: 2,
    question: "¿Cómo llego al hotel desde Quito?",
    answer: "Estamos ubicados en el sector Guayllabamba, vía Pueblo Viejo, a aproximadamente 35 minutos de Quito. Puedes llegar en vehículo propio o taxi. Te recomendamos usar Google Maps buscando 'Ecohotel La Casa Bola' para obtener la ruta exacta.",
  },
  {
    id: 3,
    question: "¿Las habitaciones tienen hidromasaje/jacuzzi?",
    answer: "Sí, nuestras Habitaciones 6, 7 y 8 cuentan con hidromasaje/jacuzzi privado climatizado disponible las 24 horas, además de una botella de champán de bienvenida incluida en el precio.",
  },
  {
    id: 4,
    question: "¿Puedo solicitar decoración romántica?",
    answer: "¡Por supuesto! Todas nuestras habitaciones tienen disponible decoración romántica por un valor adicional. Solo indícalo al momento de tu reserva por WhatsApp y nosotros nos encargamos del resto.",
  },
  {
    id: 5,
    question: "¿Aceptan mascotas?",
    answer: "Para consultas sobre el ingreso de mascotas, te recomendamos contactarnos directamente por WhatsApp al +593 98 790 8530 para confirmar las condiciones y disponibilidad.",
  },
  {
    id: 6,
    question: "¿Cómo puedo hacer una reserva?",
    answer: "Puedes reservar directamente desde nuestro sitio web usando el calendario de reservas, o contactarnos por WhatsApp al +593 98 790 8530. Nuestro equipo confirmará la disponibilidad de las fechas solicitadas.",
  },
  {
    id: 7,
    question: "¿Cuál es la política de cancelación?",
    answer: "Las políticas de cancelación se coordinan directamente con nuestro equipo al momento de la reserva. Te recomendamos contactarnos por WhatsApp para conocer los detalles según tu fecha y tipo de reserva.",
  },
  {
    id: 8,
    question: "¿Realizan eventos?",
    answer: "¡Sí! Organizamos bodas boutique, sesiones de fotos, retiros y eventos corporativos. Contamos con espacios rodeados de naturaleza y una arquitectura única. Contáctanos por WhatsApp para cotizar tu evento.",
  },
  {
    id: 9,
    question: "¿Tienen estacionamiento?",
    answer: "Sí, contamos con parqueadero gratuito para todos nuestros huéspedes dentro de las instalaciones del hotel.",
  },
  {
    id: 10,
    question: "¿Cuál es el horario de check-in y check-out?",
    answer: "El horario de check-in y check-out se coordina directamente con nuestro equipo por WhatsApp para brindarte la mejor atención y flexibilidad según disponibilidad.",
  },
];
