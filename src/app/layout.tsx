import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://scumdbpro.duckdns.org";
const siteName = "SCUM DB PRO";
const siteTitle = "SCUM DB PRO — база знаний по SCUM";
const siteDescription =
  "Оружие, обвесы, лут, обычные и заброшенные бункеры, карты уровней, интерактивная карта, гайды и трекеры по SCUM.";
const previewImage = `${siteUrl}/og-image.png?v=10`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "SCUM",
    "SCUM DB PRO",
    "SCUM база знаний",
    "SCUM оружие",
    "SCUM обвесы",
    "SCUM бункеры",
    "SCUM карта",
    "SCUM гайды",
    "SCUM лут"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: previewImage,
        secureUrl: previewImage,
        width: 1200,
        height: 630,
        alt: "SCUM DB PRO — оружие, лут, бункеры, карта и гайды"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "gaming"
};

export const viewport: Viewport = {
  themeColor: "#16f2b3",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-black text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
