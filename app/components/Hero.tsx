import Image from "next/image";
import { HeroArrowEnds, HeroArrowStarts } from "./Icons";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="flex gap-12">
      <div className="flex w-1/2 flex-col gap-6 pt-32 pl-20">
        <h1 className="text-[2.5rem]/10 font-bold">
          Начните новую <br /> жизнь в Германии
        </h1>
        <div className="relative h-[400px] w-full max-w-[700px]">
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={700}
            height={400}
            className="h-full w-full rounded-[2.5rem] object-cover"
            priority
          />
          <HeroArrowEnds className="text-brand absolute -top-15 -right-14" />
          <HeroArrowStarts className="text-brand absolute -bottom-8.75 -left-17" />
        </div>
        <p className="text-gray-dark ml-auto w-1/2 text-right">
          Помогаем в релокации и адаптации высококвалифицированным специалистам, фрилансерам и
          предпринимателям
        </p>
      </div>

      <div className="flex w-1/2 flex-col gap-6">
        <div className="bg-gray-light rounded-bl-4xl px-12.5 pt-44 pb-15">
          <div className="mb-16 grid grid-cols-2 items-center gap-4">
            <h2 className="mb-2 text-4xl font-bold">Проконсультируем бесплатно</h2>
            <p className="text-gray-dark text-lg/6 font-medium">
              Ответим на все ваши вопросы и подберем персональную стратегию переезда в Германию
            </p>
          </div>

          <form className="grid grid-cols-2 gap-x-11 gap-y-7">
            <FloatingInput type="text" label="Имя" />
            <FloatingInput type="tel" label="Телефон" />
            <FloatingInput type="text" label="Фамилия" />
            <FloatingInput type="email" label="E-mail" />
            <FloatingInput type="text" label="Страна" />
            <FloatingInput type="text" label="Ник в телеграме" />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 bg-white"
              >
                Telegram
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 bg-white"
              >
                WhatsApp
              </Button>
            </div>

            <div className="text-gray-medium flex items-start gap-2 text-sm">
              <input type="checkbox" id="privacy" className="mt-1" />
              <label htmlFor="privacy">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </label>
            </div>

            <Button className="bg-brand hover:bg-brand/90 h-12 rounded-xl text-white">
              Получить консультацию
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
