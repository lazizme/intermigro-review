"use client";

import * as React from "react";
import Image from "next/image";
import { HeroArrowEnds, HeroArrowStarts } from "./Icons";
import HeroForm from "./HeroForm";

export default function Hero() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = () => {
    // Small delay after image loads to ensure smooth animation start
    setTimeout(() => setIsLoaded(true), 100);
  };

  return (
    <section className="flex flex-col gap-6 overflow-hidden lg:flex-row lg:gap-10 xl:gap-15 2xl:gap-20">
      <div
        className={`flex w-full flex-col gap-4 px-5 pt-24 transition-all duration-1000 ease-out md:px-8 lg:w-1/2 lg:gap-6 lg:pt-32 lg:pr-0 2xl:pl-20 ${
          isLoaded ? "lg:translate-x-0 lg:scale-100" : "lg:translate-x-1/2 lg:scale-125"
        }`}
      >
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-[2.5rem]/10">
          Начните новую <br /> жизнь в Германии
        </h1>

        <p className="text-gray-dark text-base lg:hidden">
          Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
          предпринимателям
        </p>

        <div className="relative mx-auto w-full max-w-[500px] md:max-w-none lg:mx-0 lg:max-w-[700px]">
          <div className="relative h-[280px] md:h-[350px] lg:h-[400px]">
            <Image
              src="/hero.png"
              alt="Hero Image"
              width={700}
              height={400}
              className="h-full w-full rounded-[2rem] object-cover lg:rounded-[2.5rem]"
              priority
              onLoad={handleImageLoad}
            />
            <HeroArrowEnds className="text-brand absolute -top-10 -right-2 scale-75 md:-top-12 md:-right-8 md:scale-90 lg:-top-15 lg:-right-14 lg:scale-100" />
            <HeroArrowStarts className="text-brand absolute -bottom-6 -left-2 scale-75 md:-bottom-7 md:-left-10 md:scale-90 lg:-bottom-8.75 lg:-left-17 lg:scale-100" />
          </div>
          {/* Description - shows on desktop after image */}
          <p
            className={`text-gray-dark mt-4 ml-auto hidden w-1/2 text-right transition-all duration-1000 ease-out lg:block ${
              isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
          >
            Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
            предпринимателям
          </p>
        </div>
      </div>

      <div
        className={`flex w-full flex-col gap-6 transition-all duration-1000 ease-out lg:w-1/2 ${
          isLoaded ? "translate-x-0 opacity-100" : "lg:translate-x-full lg:opacity-0"
        }`}
      >
        <div className="bg-gray-light mt-8 rounded-[2.5rem] px-5 pt-10 pb-10 md:px-8 lg:mt-0 lg:rounded-t-none lg:rounded-bl-4xl lg:px-6 lg:pt-44 lg:pb-15 xl:px-10 2xl:px-12.5">
          <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:grid lg:grid-cols-2 lg:gap-4 xl:items-center">
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-4xl">
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
