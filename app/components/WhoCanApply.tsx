import SectionTitle from "./SectionTitle";

export default function WhoCanApply() {
  const categories = [
    {
      title: "Высококвалифицированные специалисты",
      description: "IT-специалисты, инженеры, врачи, учёные и другие профессионалы",
    },
    {
      title: "Фрилансеры и самозанятые",
      description: "Дизайнеры, разработчики, консультанты и другие независимые специалисты",
    },
    {
      title: "Предприниматели",
      description: "Владельцы бизнеса, стартаперы и инвесторы",
    },
    {
      title: "Студенты",
      description: "Поступающие в немецкие вузы и языковые школы",
    },
  ];

  return (
    <section className="px-20 py-16">
      <SectionTitle className="mb-12">
        Кто может претендовать
        <br />
        на легальный статус
        <br />в Германии?
      </SectionTitle>

      <div className="grid grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-gray-light flex gap-4 rounded-2xl p-6">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gray-300"></div>
            <div>
              <h3 className="mb-2 font-semibold">{category.title}</h3>
              <p className="text-gray-medium text-sm">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
