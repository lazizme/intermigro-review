import { cn } from "@/lib/utils";
import SectionTitle from "./SectionTitle";

export default function ImmigrationOptions() {
  const options = [
    {
      title: "ВНЖ для фрилансеров и удаленных сотрудников и предпринимателей",
      visa_type: "Freiberufler, Remote",
      description:
        "Виза для удаленных специалистов с высшим образованием, бизнесменов или фрилансеров с международными заказами ",
    },
    {
      title: "ВНЖ для квалифицированных специалистов",
      visa_type: "BlueCard, Fachkräfte, Chancenkarte",
      isHighlight: true,
      description:
        "Виза для специалистов с высшим образованием, у которых уже есть предложение о работе от немецкого работодателя или виза для поиска работы в Германии",
    },
    {
      title: "ВНЖ для воссоединения семьи",
      visa_type: "Familiennachzug",
      description: "ВНЖ для супругов и детей резидентов или граждан Германии.",
    },
    {
      title: "Студенческая виза",
      visa_type: "Studentenvisum",
      description:
        "Виза для тех, кто поступает в немецкие вузы, языковые школы или подготовительные колледжи и уже имеет приглашение от образовательного учреждения.",
    },
  ];

  return (
    <section className="px-5 py-10 md:px-20 md:py-16">
      <SectionTitle className="mb-11">
        Какие варианты иммиграции <br /> в Германию наиболее популярны?
      </SectionTitle>

      <div className="flex flex-col gap-2.5">
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-light flex flex-col-reverse justify-between gap-9 rounded-3xl p-5 md:flex-row md:p-8",
              option.isHighlight && "bg-brand",
            )}
          >
            <div className="flex max-w-full flex-col gap-2 md:max-w-7/12">
              <h3 className={cn("text-xl font-semibold", option.isHighlight && "text-white")}>
                {option.title}
              </h3>
              <p className={cn("text-gray-medium", option.isHighlight && "text-white/80")}>
                {option.description}
              </p>
            </div>
            <p
              className={cn(
                "max-w-max text-right text-sm text-black sm:text-base md:text-xl",
                option.isHighlight && "text-white",
              )}
            >
              {option.visa_type}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
