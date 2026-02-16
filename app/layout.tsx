import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import AnalyticsScripts from "./components/AnalyticsScripts";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Intermigro - Иммиграция в Германию | Профессиональная помощь в переезде",
  description: "Intermigro - профессиональные услуги по иммиграции в Германию. Помощь в оформлении рабочих виз, воссоединении семьи, получении ВНЖ. Консультация иммиграционных юристов.",
  keywords: "иммиграция в Германию, виза в Германию, ВНЖ Германия, переезд в Германию, иммиграционный адвокат, Blue Card Германия",
  openGraph: {
    title: "Intermigro - Иммиграция в Германию",
    description: "Профессиональные услуги по иммиграции в Германию. Помощь в оформлении виз и получении ВНЖ.",
    url: "https://intermigro.com",
    siteName: "Intermigro",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} min-h-screen bg-white antialiased`}>
        <AnalyticsScripts />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
