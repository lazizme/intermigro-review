export default function UsefulInfo() {
  const articles = [
    {
      title: "Как переехать в другую страну: решения и другие популярные вопросы",
      tag: "Forbes",
      color: "bg-blue-500",
    },
    {
      title: "Стартапы в Германии: инвестиции, гранты, государственная поддержка",
      tag: "Forbes",
      color: "bg-orange-400",
    },
    {
      title: "Как найти удалённую работу за границу: Германия и Blue Card",
      tag: null,
      color: "bg-gray-300",
    },
    {
      title: "Как переехать в Германию с семьей: детальная инструкция",
      tag: null,
      color: "bg-brand",
    },
    {
      title: "Какой бизнес в Германии наиболее востребован и прибылен",
      tag: null,
      color: "bg-yellow-400",
    },
    {
      title: "Секреты немецкого образования: почему оно считается одним из лучших в мире",
      tag: "Forbes",
      color: "bg-gray-300",
    },
  ];

  return (
    <section className="container mx-auto px-20 py-16">
      <h2 className="mb-8 text-3xl font-bold">Полезная информация</h2>

      <div className="grid grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="group cursor-pointer">
            <div className={`mb-4 h-48 rounded-2xl ${article.color}`}>
              {article.tag && (
                <span className="m-4 inline-block rounded-lg bg-white px-3 py-1 text-sm font-medium">
                  {article.tag}
                </span>
              )}
            </div>
            <h3 className="font-medium transition-colors group-hover:text-brand">{article.title}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="rounded-full border border-gray-300 px-8 py-3 font-medium transition-colors hover:bg-gray-light">
          Смотреть все статьи
        </button>
      </div>
    </section>
  );
}
