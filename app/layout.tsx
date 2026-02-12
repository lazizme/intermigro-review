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
  title: "Intermigro",
  description: "Платформа для управления иммиграционным процессом",
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
