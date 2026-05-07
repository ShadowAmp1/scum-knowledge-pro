import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scumdbpro.duckdns.org"),
  title: {
    default: "SCUM DB PRO — база знаний по SCUM",
    template: "%s | SCUM DB PRO"
  },
  description: "Оружие, обвесы, лут, обычные и заброшенные бункеры, карты уровней, интерактивная карта и гайды по SCUM.",
  keywords: ["SCUM", "SCUM база знаний", "SCUM оружие", "SCUM бункеры", "SCUM карта", "SCUM гайды", "SCUM лут"],
  authors: [{ name: "SCUM DB PRO" }],
  creator: "SCUM DB PRO",
  publisher: "SCUM DB PRO",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://scumdbpro.duckdns.org",
    siteName: "SCUM DB PRO",
    title: "SCUM DB PRO — база знаний по SCUM",
    description: "PRO база знаний по игре SCUM: оружие, обвесы, лут, бункеры, карта и гайды.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SCUM DB PRO - База знаний по SCUM"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SCUM DB PRO — база знаний по SCUM",
    description: "PRO база знаний по игре SCUM: оружие, обвесы, лут, бункеры, карта и гайды.",
    images: ["/og-image.png"]
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
  }
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
