import { GuaranteePaperIcon } from "./Icons";

export default function Guarantees() {
  return (
    <section className="px-5 py-10 md:px-20 md:py-16">
      <div className="bg-brand flex justify-center rounded-[2.5rem] pt-20 pb-17 text-white">
        <div className="flex w-1/3 flex-col items-center gap-10 text-center">
          <div>
            <GuaranteePaperIcon />
          </div>
          <div>
            <h2 className="text-[3.25rem] font-medium">Гарантии в договоре</h2>
            <p className="mt-2 text-lg text-white/80">
              Мы гарантируем получение ВНЖ или визы для длительного проживания и поиска работы
              или вернем вам деньги!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
