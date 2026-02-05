export default function ClientReviews() {
  const reviews = [
    {
      name: "Александр",
      role: "IT-специалист",
      text: "Благодаря команде Intermigro я получил Blue Card за 3 месяца. Профессиональный подход на всех этапах!",
    },
    {
      name: "Мария",
      role: "Дизайнер",
      text: "Оформили фриланс-визу быстро и без лишних хлопот. Очень довольна результатом!",
    },
    {
      name: "Дмитрий",
      role: "Предприниматель",
      text: "Открыл бизнес в Германии с помощью Intermigro. Команда помогла на каждом шаге.",
    },
    {
      name: "Елена",
      role: "Врач",
      text: "Получила признание диплома и рабочую визу. Спасибо за поддержку!",
    },
    {
      name: "Сергей",
      role: "Инженер",
      text: "Переехал всей семьей. Процесс воссоединения прошёл гладко благодаря профессионалам.",
    },
  ];

  return (
    <section className="container mx-auto px-20 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Отзывы наших клиентов</h2>
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
            ←
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
            →
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex w-64 shrink-0 flex-col rounded-2xl border border-gray-200 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-medium">{review.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-dark">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {[1, 2, 3].map((dot) => (
          <button
            key={dot}
            className={`h-2 w-2 rounded-full ${dot === 1 ? "bg-brand" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
