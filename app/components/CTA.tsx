import HeroForm from "./HeroForm";

export default function CTA() {
  return (
    <section className="relative mt-20 lg:mt-50">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div
          className="h-[340px] w-full bg-center text-center max-md:bg-size-[150%_150%] max-md:bg-position-[center_0] md:h-[500px] md:bg-cover lg:h-[700px] lg:text-left"
          style={{ backgroundImage: "url(/cta_cover.png)" }}
        >
          <h2 className="mt-8 ml-0 text-[2rem]/9 font-bold text-black md:text-[2.5rem]/10 lg:mt-28 lg:ml-32 lg:text-3xl xl:text-[3rem]/12 2xl:text-[3.5rem]/14">
            Узнайте свои
            <br />
            шансы на успех!
          </h2>
        </div>

        <div className="-mt-8 w-full lg:absolute lg:-top-21 lg:right-10 lg:w-7/12 xl:right-18 xl:w-1/2 2xl:right-21">
          <div className="bg-gray-light rounded-[2.5rem] px-5 pt-10 pb-5 md:px-8 lg:mt-0 lg:rounded-[2.5rem] lg:px-12.5 lg:py-12.5">
            <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-4">
              <h2 className="text-2xl font-bold md:text-3xl lg:mb-2">Проконсультируем бесплатно</h2>
              <p className="text-gray-dark text-base font-medium lg:text-lg/6">
                Ответим на все ваши вопросы и подберем персональную стратегию переезда в Германию
              </p>
            </div>

            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}
