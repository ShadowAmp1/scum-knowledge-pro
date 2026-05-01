import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scum-knowledge-pro.onrender.com"),
  title: "SCUM DB PRO — база знаний по SCUM",
  description: "Оружие, обвесы, лут, обычные и заброшенные бункеры, карты уровней, интерактивная карта и гайды по SCUM.",
  keywords: ["SCUM", "SCUM база знаний", "SCUM оружие", "SCUM бункеры", "SCUM карта"],
  openGraph: {
    title: "SCUM DB PRO",
    description: "PRO база знаний по игре SCUM: оружие, обвесы, лут, бункеры, карта и гайды.",
    type: "website"
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
