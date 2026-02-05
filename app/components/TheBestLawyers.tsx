import { ScalesIcon } from "./Icons";

export default function TheBestLawyers() {
  return (
    <section className="px-5 py-10 md:px-20 md:py-16">
      <div className="bg-gray-light grid grid-cols-3 items-center rounded-[2.5rem] px-16">
        <h2 className="py-12.5 text-3xl font-medium">
          Лучшие адвокаты и аккредитованные представители
        </h2>
        <p className="text-gray-medium py-12.5 text-lg font-medium">
          Все наши иммиграционные специалисты имеют &nbsp;
          <span className="font-semibold text-black">
            опыт работы в немецких государственных ведомствах
          </span>
          &nbsp; и как никто знают все внутренние процессы
        </p>
        <div className="flex justify-center">
          <ScalesIcon />
        </div>
      </div>
    </section>
  );
}
