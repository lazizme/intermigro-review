"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "О нас" },
  { href: "/services", label: "Услуги" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
  { href: "/consultation", label: "Записаться на консультацию" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-colors duration-300 md:px-10 md:py-8 xl:px-16 2xl:px-20 ${
          isScrolled ? "bg-white lg:bg-white/60" : "bg-white lg:bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Intermigro Logo"
            width={166}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger Menu Button */}
        <button
          type="button"
          className="flex items-center justify-center lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 top-[60px] z-40 bg-white transition-all duration-300 ease-out md:top-[76px] lg:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-5">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-lg text-black transition-all hover:bg-gray-100"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateX(0)" : "translateX(-10px)",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
