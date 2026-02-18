"use client";

import * as React from "react";
import Image from "next/image";
import { HeroArrowEnds, HeroArrowStarts } from "./Icons";
import HeroForm from "./HeroForm";

export default function Hero() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setTimeout(() => setIsLoaded(true), 100);
  };

  return (
    <section className="mx-auto -mt-[60px] flex max-w-[2000px] flex-col gap-0 overflow-hidden md:-mt-[88px] lg:flex-row lg:gap-12 xl:gap-15 2xl:gap-20">
      <div
        className={`flex w-full flex-col gap-4 px-5 pt-20 transition-all duration-1000 ease-out sm:pt-24 md:px-8 md:pl-20 lg:w-1/2 lg:gap-6 lg:pt-40 lg:pr-0 ${
          isLoaded ? "lg:translate-x-0 lg:scale-100" : "lg:translate-x-1/2 lg:scale-125"
        }`}
      >
        <h1 className="mx-auto w-3/4 text-2xl/7 font-bold lg:w-full lg:text-3xl xl:text-[2.5rem]/10">
          Начните новую <br /> жизнь в Германии
        </h1>

        <p className="text-gray-dark mx-auto w-3/4 text-base lg:hidden">
          Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
          предпринимателям.
        </p>

        {/* Mobile Image - with arrows built-in */}
        <div className="mx-auto -ml-0.5 w-11/12 lg:hidden">
          <Image
            src="/hero_sm.png"
            alt="Иммиграционные услуги Intermigro - консультация по переезду в Германию"
            width={700}
            height={500}
            className="h-auto w-full"
            priority
            onLoad={handleImageLoad}
          />
        </div>

        {/* Desktop Image - with positioned arrows */}
        <div className="relative mx-auto hidden w-full max-w-[700px] lg:mx-0 lg:block">
          <div className="relative h-[400px]">
            <Image
              src="/hero.png"
              alt="Иммиграционные услуги Intermigro - консультация по переезду в Германию"
              width={700}
              height={400}
              className="h-full w-full rounded-[2.5rem] object-cover"
              priority
              onLoad={handleImageLoad}
            />
            <HeroArrowEnds className="text-brand absolute -top-15 -right-14 md:scale-85 2xl:scale-100" />
            <HeroArrowStarts className="text-brand absolute -bottom-11 -left-17 md:scale-85 xl:-bottom-8.75 2xl:scale-100" />
          </div>
          {/* Description - shows on desktop after image */}
          <p
            className={`text-gray-dark mt-4 ml-auto w-1/2 text-right transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
          >
            Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
            предпринимателям
          </p>
        </div>
      </div>

      <div
        className={`flex w-full flex-col gap-6 transition-all duration-1000 ease-out lg:w-7/12 xl:w-6/12 ${
          isLoaded ? "translate-x-0 opacity-100" : "lg:translate-x-full lg:opacity-0"
        }`}
      >
        <div className="bg-gray-light mt-0 rounded-[2.5rem] px-5 pt-10 pb-10 min-[2000px]:rounded-br-4xl md:px-8 lg:mt-0 lg:rounded-t-none lg:rounded-bl-4xl lg:px-6 lg:pt-[min(12rem,15dvh)] xl:px-10 2xl:px-12.5">
          <div className="mb-3 flex flex-col gap-2 sm:mb-8 lg:mb-16 lg:grid lg:grid-cols-2 lg:gap-4 xl:items-center">
            <h2 className="text-2xl font-bold xl:text-[1.75rem] 2xl:text-[2rem]/10">
              Проконсультируем бесплатно
            </h2>
            <p className="text-gray-dark text-xs font-medium md:text-sm lg:text-base xl:text-lg/6">
              Ответим на все ваши вопросы и подберем персональную стратегию переезда в Германию
            </p>
          </div>

          <HeroForm />
        </div>
      </div>
    </section>
  );
}
