import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecohotel La Casa Bola | Hotel Esférico en Guayllabamba, Quito",
  description:
    "Ecohotel La Casa Bola - Refugio esférico de lujo minimalista en el valle de Guayllabamba, a 35 minutos de Quito. Habitaciones con hidromasaje, vistas panorámicas y conexión con la naturaleza. Desde $45 USD por pareja.",
  keywords: [
    "ecohotel",
    "La Casa Bola",
    "Guayllabamba",
    "Quito",
    "hotel esférico",
    "hidromasaje",
    "lujo minimalista",
    "naturaleza",
    "Pichincha",
    "Ecuador",
  ],
  authors: [{ name: "Ecohotel La Casa Bola" }],
  creator: "Ecohotel La Casa Bola",
  metadataBase: new URL("https://lacasabola.com"),
  alternates: {
    canonical: "https://lacasabola.com",
    languages: { "es-EC": "https://lacasabola.com" },
  },
  icons: {
    icon: "https://raw.githubusercontent.com/deoch1029-ui/ecohotel-la-casa-bola-/refs/heads/main/logo%20casa%20bola.svg",
    apple: "https://raw.githubusercontent.com/deoch1029-ui/ecohotel-la-casa-bola-/refs/heads/main/logo%20casa%20bola.svg",
  },
  openGraph: {
    title: "Ecohotel La Casa Bola | Lujo Minimalista en la Naturaleza",
    description:
      "Tu refugio esférico en el valle de Guayllabamba. Habitaciones desde $45 USD con hidromasaje, vistas panorámicas y conexión con la naturaleza.",
    url: "https://lacasabola.com",
    siteName: "Ecohotel La Casa Bola",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ecohotel La Casa Bola - Vista exterior de las habitaciones esféricas",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecohotel La Casa Bola | Lujo Minimalista",
    description: "Tu refugio esférico en el valle de Guayllabamba. Habitaciones desde $45 USD.",
    images: [
      "/images/hero.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Ecohotel La Casa Bola",
  description:
    "Refugio esférico de lujo minimalista en el valle de Guayllabamba, a 35 minutos de Quito. Habitaciones con hidromasaje, vistas panorámicas y conexión con la naturaleza.",
  url: "https://lacasabola.com",
  image: "https://lacasabola.com/images/hero.jpg",
  telephone: "+593987908530",
  email: "ecohotelcasabola@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Guayllabamba",
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    addressCountry: "EC",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -0.0625,
    longitude: -78.345,
  },
  priceRange: "$45-$80 USD",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hidromasaje", value: true },
    { "@type": "LocationFeatureSpecification", name: "Vista Panorámica", value: true },
    { "@type": "LocationFeatureSpecification", name: "Decoración Romántica", value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="TU_CODIGO_VERIFICACION" />

        <link
          rel="preload"
          as="image"
          href="/images/hero.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
