import { BrainIcon, SofaIcon, StarsIcon } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { MastersCapIcon, PaintIcon } from "./Icons";

export default function WhoCanApply() {
  return (
    <section className="py-10 md:py-16">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-7 lg:grid lg:grid-cols-7 lg:gap-5">
          <SectionTitle className="col-span-12 mb-4 lg:col-span-5">
            Кто может претендовать на легальный статус в Германии?
          </SectionTitle>
          <div className="flex flex-col gap-5 lg:col-span-7 lg:grid lg:grid-cols-7 lg:items-center">
            <div className="bg-gray-light order-2 mt-10 flex max-h-max flex-col gap-10 rounded-3xl px-4 py-6 lg:order-0 lg:col-span-3 xl:mt-0 xl:px-6 xl:py-10">
              <div className="flex justify-between gap-3">
                <h2 className="text-base leading-snug font-extrabold lg:text-lg">
                  <span className="inline bg-yellow-300 box-decoration-clone px-0.5 py-0.5">
                    Вы удаленный сотрудник: IT-специалист или фрилансер
                  </span>
                </h2>
                <div className="-mt-2 text-black">
                  <SofaIcon />
                </div>
              </div>
              <p className="text-gray-dark text-xs font-medium md:text-sm">
                Вы работаете удаленно на компанию или выполняете фриланс заказы в области ИТ,
                дизайна, маркетинга, консалтинга и т.д. Вы имеете высшее образование и финансовые
                накопления, а ваш доход превышает 1500 евро в месяц.
              </p>
            </div>
            <div className="relative order-1 col-span-4 flex flex-col gap-5 lg:order-0 lg:grid lg:grid-cols-4">
              <div className="bg-gray-light col-span-4 flex flex-col gap-10 rounded-3xl px-6 py-10">
                <div className="flex justify-between gap-3">
                  <h2 className="text-base leading-snug font-extrabold lg:text-lg">
                    <span className="inline bg-yellow-300 box-decoration-clone px-0.5 py-0.5">
                      Вы квалифицированный специалист
                    </span>
                  </h2>
                  <div className="-mt-2 text-black">
                    <BrainIcon />
                  </div>
                </div>
                <p className="text-gray-dark text-xs font-medium md:text-sm">
                  У Вас есть высшее образование, опыт работы и предложение от работодателя в
                  Германии или вы готовы к поиску заветного оффера. Ваш текущий доход составляет
                  более 1000 евро в месяц.
                </p>
              </div>
              <div className="absolute -bottom-10 col-span-2 max-h-[220px] max-w-1/3 min-w-[140px] overflow-hidden rounded-2xl lg:relative lg:bottom-0 lg:max-h-[320px] lg:max-w-full">
                <Image
                  width={200}
                  height={320}
                  className="h-full w-full object-cover"
                  src="/stanislav.png"
                  alt="Stanislav"
                />
                <div className="absolute bottom-2 left-2 rounded-[2.5rem] bg-white px-4 py-1 shadow-[0_4px_3px_rgba(0,0,0,0.25)]">
                  <p className="text-xs leading-4 font-extrabold text-black md:text-sm">
                    Станислав
                  </p>
                  <p className="text-gray-dark text-xs leading-4 font-medium md:text-sm">
                    Инвестор
                  </p>
                </div>
              </div>
              <div className="bg-brand col-span-2 ml-10 rounded-3xl px-3 pt-5.5 pb-6 lg:ml-0">
                <div className="ml-auto flex w-2/3 flex-col gap-4.5 lg:w-full xl:gap-10">
                  <div className="flex flex-col gap-3">
                    <div className="ml-auto hidden text-white lg:inline-block">
                      <StarsIcon />
                    </div>
                    <h2 className="text-base leading-snug font-extrabold text-white">
                      <span className="inline bg-black box-decoration-clone px-0.5 py-0.5">
                        Вы предприниматель
                      </span>
                    </h2>
                  </div>
                  <p className="text-xs font-medium text-white md:text-sm">
                    У Вас есть высшее образование, опыт работы и предложение от работодателя в
                    Германии или вы готовы к поиску заветного оффера. Ваш текущий доход составляет
                    более 1000 евро в месяц.
                  </p>
                  <div className="ml-auto inline-block text-white lg:hidden">
                    <StarsIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full flex flex-col gap-5 lg:col-span-5">
          <div className="relative grid max-h-max grid-cols-5 gap-5">
            <div
              className="col-span-5 mr-10 flex flex-col justify-between gap-10 rounded-3xl bg-cover bg-center px-3 py-5 sm:col-span-3 sm:mr-0 sm:px-6 sm:py-10"
              style={{ backgroundImage: "url('/liza_review_bg.png')" }}
            >
              <div className="flex justify-between gap-3">
                <h2 className="w-2/3 text-base leading-snug font-extrabold sm:w-full lg:text-lg">
                  <span className="inline bg-black box-decoration-clone px-0.5 py-0.5 text-white">
                    Вы человек искусства
                  </span>
                </h2>
                <div className="-mt-2 text-white">
                  <PaintIcon />
                </div>
              </div>
              <p className="text-gray-dark w-2/3 text-xs font-medium sm:w-full md:text-sm">
                Вы заняты в творческой профессии: кино/видеомонтаж, фотография, блоггерство,
                изобразительное, театральное искусство и т. д.) и имеете высшее образование. Ваш
                доход от 1500 евро в месяц или накопления от 15 000 евро.
              </p>
            </div>
            <div className="absolute right-0 -bottom-10 col-span-2 max-h-[220px] max-w-1/3 min-w-[140px] overflow-hidden rounded-2xl sm:relative sm:bottom-0 sm:max-h-[320px] sm:max-w-full">
              {/* Katerina on mobile, Liza on lg+ */}
              <Image
                width={200}
                height={320}
                className="h-full w-full object-cover lg:hidden"
                src="/katerina.png"
                alt="Катерина"
              />
              <Image
                width={200}
                height={320}
                className="hidden h-full w-full object-cover lg:block"
                src="/liza.png"
                alt="Лиза"
              />
              <div className="absolute bottom-2 left-2 rounded-[2.5rem] bg-white px-2 py-0.5 shadow-[0_4px_3px_rgba(0,0,0,0.25)] sm:px-4 sm:py-1">
                <p className="text-[10px] leading-3 font-extrabold text-black sm:text-xs sm:leading-4 md:text-sm">
                  <span className="lg:hidden">Катерина</span>
                  <span className="hidden lg:inline">Лиза</span>
                </p>
                <p className="text-gray-dark text-[10px] leading-3 font-medium sm:text-xs sm:leading-4 md:text-sm">
                  <span className="lg:hidden">Саунд-дизайнер</span>
                  <span className="hidden lg:inline">Учится на юриста</span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-14 grid grid-cols-5 gap-5 sm:mt-0">
            <div className="absolute -top-1/6 col-span-2 max-h-[280px] max-w-1/2 min-w-[140px] overflow-hidden rounded-2xl sm:relative sm:top-0 sm:max-h-[320px] sm:max-w-full">
              {/* Liza on mobile, Katerina on lg+ */}
              <Image
                width={200}
                height={320}
                className="h-full w-full object-cover lg:hidden"
                src="/liza.png"
                alt="Лиза"
              />
              <Image
                width={200}
                height={320}
                className="hidden h-full w-full object-cover lg:block"
                src="/katerina.png"
                alt="Катерина"
              />
              <div className="absolute bottom-2 left-2 rounded-[2.5rem] bg-white px-2 py-0.5 shadow-[0_4px_3px_rgba(0,0,0,0.25)] sm:px-4 sm:py-1">
                <p className="text-[10px] leading-3 font-extrabold text-black sm:text-xs sm:leading-4 md:text-sm">
                  <span className="lg:hidden">Лиза</span>
                  <span className="hidden lg:inline">Катерина</span>
                </p>
                <p className="text-gray-dark text-[10px] leading-3 font-medium sm:text-xs sm:leading-4 md:text-sm">
                  <span className="lg:hidden">Учится на юриста</span>
                  <span className="hidden lg:inline">Саунд-дизайнер</span>
                </p>
              </div>
            </div>
            <div className="bg-gray-light col-span-5 rounded-3xl px-3 py-5 sm:col-span-3 sm:px-6 sm:py-10">
              <div className="ml-auto flex w-1/2 flex-col items-end justify-between gap-10 sm:ml-0 sm:w-full sm:items-start">
                <div className="flex w-full justify-between gap-3 pl-3 sm:pl-0">
                  <h2 className="text-base leading-snug font-extrabold lg:text-lg">
                    <span className="inline bg-yellow-300 box-decoration-clone px-0.5 py-0.5">
                      Вы студент
                    </span>
                  </h2>
                  <div className="-mt-2 text-black">
                    <MastersCapIcon />
                  </div>
                </div>
                <p className="text-gray-dark pl-3 text-xs font-medium sm:pl-0">
                  Вы владеете хорошим уровнем немецкого или английского языка и можете обеспечить
                  свое финансирование на год в сумме 12000 евро.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
