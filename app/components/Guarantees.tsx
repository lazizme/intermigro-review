import { GuaranteePaperIcon } from "./Icons";

export default function Guarantees() {
  return (
    <section className="py-10 md:py-16">
      <div className="bg-brand flex justify-center rounded-[2.5rem] px-5 pt-15 pb-10 text-white md:px-10 md:pt-20 md:pb-17">
        <div className="flex w-full flex-col items-center gap-10 text-center lg:w-2/3 2xl:w-5/12">
          <GuaranteePaperIcon className="w-20 md:w-30 lg:w-auto" />
          <div>
            <h2 className="text-3xl font-medium sm:text-4xl md:text-[3.25rem]">
              Гарантии в договоре
            </h2>
            <p className="mt-2 text-lg text-white/80">
              Мы гарантируем получение долгосрочной визы / ВНЖ или вернем вам деньги!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
