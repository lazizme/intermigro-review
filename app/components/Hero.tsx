import Image from "next/image";
import { HeroArrowEnds, HeroArrowStarts } from "./Icons";
import HeroForm from "./HeroForm";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row lg:gap-12">
      {/* Left side - Title, Image, Description */}
      <div className="flex w-full flex-col gap-4 px-5 pt-24 md:px-8 lg:w-1/2 lg:gap-6 lg:pt-32 lg:pr-0 lg:pl-20">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-[2.5rem]/10">
          Начните новую <br /> жизнь в Германии
        </h1>

        {/* Description - shows on mobile before image */}
        <p className="text-gray-dark text-base lg:hidden">
          Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
          предпринимателям
        </p>

        <div className="relative mx-auto h-[280px] w-full max-w-[500px] md:h-[350px] lg:mx-0 lg:h-[400px] lg:max-w-[700px]">
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={700}
            height={400}
            className="h-full w-full rounded-[2rem] object-cover lg:rounded-[2.5rem]"
            priority
          />
          <HeroArrowEnds className="text-brand absolute -top-10 -right-2 scale-75 md:-top-12 md:-right-8 md:scale-90 lg:-top-15 lg:-right-14 lg:scale-100" />
          <HeroArrowStarts className="text-brand absolute -bottom-6 -left-2 scale-75 md:-bottom-7 md:-left-10 md:scale-90 lg:-bottom-8.75 lg:-left-17 lg:scale-100" />
        </div>

        {/* Description - shows on desktop after image */}
        <p className="text-gray-dark ml-auto hidden w-1/2 text-right lg:block">
          Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
          предпринимателям
        </p>
      </div>

      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        <div className="bg-gray-light mt-8 rounded-[2.5rem] px-5 pt-10 pb-10 md:px-8 lg:mt-0 lg:rounded-t-none lg:rounded-bl-4xl lg:px-12.5 lg:pt-44 lg:pb-15">
          <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-4">
            <h2 className="text-2xl font-bold md:text-3xl lg:mb-2 lg:text-4xl">
              Проконсультируем бесплатно
            </h2>
            <p className="text-gray-dark text-base font-medium lg:text-lg/6">
              Ответим на все ваши вопросы и подберем персональную стратегию переезда в Германию
            </p>
          </div>

          <HeroForm />
        </div>
      </div>
    </section>
  );
}
