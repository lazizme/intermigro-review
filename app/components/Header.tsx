"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
  { href: "#consultation", label: "Записаться на консультацию" },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`relative w-full ${isMenuOpen ? "bg-brand z-50 lg:bg-transparent" : "z-10 bg-transparent"}`}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-4 md:px-10 md:py-6 xl:px-16 2xl:px-20">
          <Link href="/" className="flex items-center">
            <Image
              src={isMenuOpen ? "/logo-white.png" : "/logo.png"}
              alt="Intermigro Logo"
              width={166}
              height={40}
              priority
              className="h-8 w-auto md:h-10 lg:hidden"
            />
            <Image
              src="/logo.svg"
              alt="Intermigro Logo"
              width={166}
              height={40}
              priority
              className="hidden h-8 w-auto md:h-10 lg:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="hover:text-brand cursor-pointer text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Burger Menu Button */}
          <button
            type="button"
            className={`flex items-center justify-center lg:hidden ${isMenuOpen ? "text-white" : "text-black"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`bg-brand fixed inset-0 top-[60px] z-40 flex flex-col justify-end transition-all duration-300 ease-out md:top-[76px] lg:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-5 pb-10">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-lg text-white transition-all hover:bg-white/10"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateX(0)" : "translateX(-10px)",
              }}
              onClick={(e) => {
                scrollToSection(e, link.href);
                setIsMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
