"use client";

import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from "./Icons";

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

export default function Footer() {
  return (
    <footer>
      <div className="bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-12 xl:px-16 xl:py-12 2xl:px-20 2xl:py-16">
          {/* Row 1: Logo + Social */}
          <div className="flex w-full items-center justify-between gap-5 lg:col-span-5 lg:w-auto lg:gap-22">
            <Image
              src="/logo.png"
              alt="Intermigro Logo"
              width={262}
              height={63}
              className="h-7.5 w-auto lg:h-15"
            />

            <div className="flex gap-2 text-black">
              <Link
                href="http://instagram.com/intermigro"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-lg p-2.5"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/emigro.berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-lg p-2.5"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.tiktok.com/@intermigro?_t=8jHEsFvjEKj&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-lg p-2.5"
              >
                <TikTokIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/intermigro/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-lg p-2.5"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>

          {/* Row 1: Navigation */}
          <nav className="hidden items-center gap-5 text-base font-medium text-black lg:col-span-5 lg:col-start-8 lg:flex xl:col-span-4 xl:col-start-9 xl:gap-10">
            <a href="#about" className="text-nowrap" onClick={(e) => scrollToSection(e, "#about")}>
              О нас
            </a>
            <a href="#services" onClick={(e) => scrollToSection(e, "#services")}>
              Услуги
            </a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, "#reviews")}>
              Отзывы
            </a>
            <a href="#contacts" onClick={(e) => scrollToSection(e, "#contacts")}>
              Контакты
            </a>
            <a href="#consultation" onClick={(e) => scrollToSection(e, "#consultation")}>
              Сервисы
            </a>
          </nav>

          {/* Divider */}
          <div className="my-2.5 h-px w-full bg-[#DEDEDE] lg:col-span-12"></div>

          {/* Row 2: Phone/Email + Address - side by side on mobile, separate grid cells on desktop */}
          <div className="flex justify-between gap-6 lg:contents">
            <div className="flex flex-col gap-1.5 lg:col-span-3 lg:col-start-8 lg:row-start-3 xl:col-span-2 xl:col-start-9">
              <a href="tel:+493046690566" className="text-base font-medium text-black">
                +49 304 669 05 66
              </a>
              <a href="mailto:contact@intermigro.com" className="text-base font-medium text-black">
                contact@intermigro.com
              </a>
            </div>
            <div className="flex flex-col gap-1.5 lg:col-span-2 lg:col-start-11 lg:row-start-3">
              <p className="text-gray-dark text-base font-medium">
                Адрес: Klingsorstraße 105B, 12203 Berlin, Germany
              </p>
            </div>
          </div>

          {/* Row 2: Partnership - last on mobile, left on desktop */}
          <div className="flex flex-col gap-1.5 lg:col-span-5 lg:col-start-1 lg:row-start-3">
            <p className="text-gray-dark text-base font-medium">
              По вопросам сотрудничества и&nbsp;партнерств:
            </p>
            <p className="text-base font-medium text-black">contact@intermigro.com</p>
          </div>
        </div>
      </div>
      <div className="bg-brand">
        <div className="mx-auto flex max-w-screen-2xl flex-col-reverse items-center justify-between gap-9.5 px-5 py-3 font-medium text-white lg:flex-row lg:px-20 lg:py-5">
          <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:gap-13">
            <p className="text-nowrap">© Intermigro 2026</p>
            <p className="text-[10px] lg:text-xs">
              Emigro UG (haftungsbeschränkt) Klingsorstr.105b 12203 Berlin Bundesland: Berlin
              Deutschland Geschäftsführer: Vladislav Pinskij HRB: 250535 B Amtsgericht: Berlin
              Charlottenburg E-Mail: contact@emigro.de Steuernummer: 29/277/32378 Ust.-Nr.:
              DE360037967
            </p>
          </div>
          <div className="flex w-full justify-between gap-6 text-sm lg:w-auto lg:text-base">
            <Link href="/impressum">Impressum</Link>
            <Link href="/privacy-policy" className="text-nowrap">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
