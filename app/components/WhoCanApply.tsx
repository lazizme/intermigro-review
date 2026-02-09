import { BrainIcon, SofaIcon, StarsIcon } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { PaintIcon } from "./Icons";

export default function WhoCanApply() {
  return (
    <section className="px-20 py-16">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-7 gap-5 lg:col-span-7">
          <SectionTitle className="col-span-5 mb-4">
            Кто может претендовать на легальный статус в Германии?
          </SectionTitle>
          <div className="col-span-12 grid grid-cols-7 items-center gap-5 lg:col-span-7">
            <div className="bg-gray-light col-span-12 flex max-h-max flex-col gap-10 rounded-3xl px-6 py-10 lg:col-span-3">
              <div className="flex justify-between gap-3">
                <h2 className="text-sm leading-snug font-extrabold md:text-base lg:text-lg">
                  <span className="inline bg-yellow-300 box-decoration-clone px-0.5">
                    Вы удаленный сотрудник: IT-специалист или фрилансер
                  </span>
                </h2>
                <div className="text-black">
                  <SofaIcon />
                </div>
              </div>
              <p className="text-gray-dark text-xs font-medium md:text-sm">
                Вы работаете удаленно на компанию или выполняете фриланс заказы в области ИТ,
                дизайна, маркетинга, консалтинга и т.д. Вы имеете высшее образование и финансовые
                накопления, а ваш доход превышает 1500 евро в месяц.
              </p>
            </div>
            <div className="col-span-4 grid grid-cols-4 gap-5">
              <div className="bg-gray-light col-span-4 flex flex-col gap-10 rounded-3xl px-6 py-10">
                <div className="flex justify-between gap-3">
                  <h2 className="text-sm leading-snug font-extrabold md:text-base lg:text-lg">
                    <span className="inline bg-yellow-300 box-decoration-clone px-0.5">
                      Вы квалифицированный специалист
                    </span>
                  </h2>
                  <div className="text-black">
                    <BrainIcon />
                  </div>
                </div>
                <p className="text-gray-dark text-xs font-medium md:text-sm">
                  У Вас есть высшее образование, опыт работы и предложение от работодателя в
                  Германии или вы готовы к поиску заветного оффера. Ваш текущий доход составляет
                  более 1000 евро в месяц.
                </p>
              </div>
              <div className="relative col-span-2 max-h-[320px] overflow-hidden rounded-2xl">
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
              <div className="bg-brand col-span-2 flex flex-col gap-10 rounded-3xl px-3 pt-3.5 pb-6">
                <div className="flex flex-col gap-3">
                  <div className="ml-auto text-white">
                    <StarsIcon />
                  </div>
                  <h2 className="text-sm leading-snug font-extrabold text-white md:text-base lg:text-lg">
                    <span className="inline bg-black box-decoration-clone px-0.5">
                      Вы предприниматель
                    </span>
                  </h2>
                </div>
                <p className="text-xs font-medium text-white md:text-sm">
                  У Вас есть высшее образование, опыт работы и предложение от работодателя в
                  Германии или вы готовы к поиску заветного оффера. Ваш текущий доход составляет
                  более 1000 евро в месяц.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-5">
          <div className="grid max-h-max grid-cols-5 gap-5">
            <div className="bg-gray-light col-span-3 flex flex-col justify-between gap-10 rounded-3xl px-6 py-10">
              <div className="flex justify-between gap-3">
                <h2 className="text-sm leading-snug font-extrabold md:text-base lg:text-lg">
                  <span className="inline bg-yellow-300 box-decoration-clone px-0.5">
                    Вы человек искусства
                  </span>
                </h2>
                <div className="text-black">
                  <PaintIcon />
                </div>
              </div>
              <p className="text-gray-dark text-xs font-medium md:text-sm">
                Вы заняты в творческой профессии: кино/видеомонтаж, фотография, блоггерство,
                изобразительное, театральное искусство и т. д.) и имеете высшее образование. Ваш
                доход от 1500 евро в месяц или накопления от 15 000 евро.
              </p>
            </div>
            <div className="relative col-span-2 max-h-[320px] overflow-hidden rounded-2xl">
              <Image
                width={200}
                height={320}
                className="h-full w-full object-cover"
                src="/liza.png"
                alt="Stanislav"
              />
              <div className="absolute bottom-2 left-2 rounded-[2.5rem] bg-white px-4 py-1 shadow-[0_4px_3px_rgba(0,0,0,0.25)]">
                <p className="text-xs leading-4 font-extrabold text-black md:text-sm">Лиза</p>
                <p className="text-gray-dark text-xs leading-4 font-medium md:text-sm">
                  Учится на юриста
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <div className="relative col-span-2 max-h-[320px] overflow-hidden rounded-3xl">
              <Image
                width={200}
                height={320}
                className="h-full w-full object-cover"
                src="/katerina.png"
                alt="Stanislav"
              />
              <div className="absolute bottom-2 left-2 rounded-[2.5rem] bg-white px-4 py-1 shadow-[0_4px_3px_rgba(0,0,0,0.25)]">
                <p className="text-xs leading-4 font-extrabold text-black md:text-sm">Катерина</p>
                <p className="text-gray-dark text-xs leading-4 font-medium md:text-sm">
                  Саунд-дизайнер
                </p>
              </div>
            </div>
            <div className="bg-gray-light col-span-3 flex flex-col justify-between gap-10 rounded-3xl px-6 py-10">
              <div className="flex justify-between gap-3">
                <h2 className="text-sm leading-snug font-extrabold md:text-base lg:text-lg">
                  <span className="inline bg-yellow-300 box-decoration-clone px-0.5">
                    Вы студент
                  </span>
                </h2>
                <div className="text-black">
                  <PaintIcon />
                </div>
              </div>
              <p className="text-gray-dark text-xs font-medium md:text-sm">
                Вы владеете хорошим уровнем немецкого или английского языка и можете обеспечить свое
                финансирование на год в сумме 12000 евро.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
