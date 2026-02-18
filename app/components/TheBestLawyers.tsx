import { ScalesIcon, ResponsiveScalesIcon } from "./Icons";

export default function TheBestLawyers() {
  return (
    <section className="relative pb-10 md:pb-16">
      <div className="bg-gray-light flex flex-col gap-6 rounded-[2.5rem] px-6 py-10 md:grid md:grid-cols-3 md:items-center md:gap-4 md:py-0 lg:px-8 xl:px-16">
        <ResponsiveScalesIcon className="text-brand absolute -top-4 -right-[14.5px] shrink-0 scale-75 md:hidden" />
        <h2 className="w-2/3 text-xl font-medium md:w-auto md:py-12.5 lg:text-2xl xl:text-3xl">
          Лучшие адвокаты и аккредитованные представители
        </h2>
        <p className="text-gray-medium text-base font-medium md:py-12.5 lg:text-lg xl:text-xl">
          Наши иммиграционные специалисты имеют{" "}
          <span className="font-semibold text-black">
            опыт работы в немецких консульствах и посольствах,
          </span>{" "}
          и как никто знают все внутренние процессы
        </p>
        <div className="hidden justify-center md:flex">
          <ScalesIcon />
        </div>
      </div>
    </section>
  );
}
