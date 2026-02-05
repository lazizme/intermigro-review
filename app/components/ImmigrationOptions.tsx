export default function ImmigrationOptions() {
  const options = [
    {
      type: "ВНЖ для фрилансеров и временных сотрудников и предпринимателей",
      visa: "Freelance Visa, Kurzarbeit",
    },
    {
      type: "ВНЖ для наёмных/удалённых сотрудников",
      visa: "Blue Card, Fachkraft, Chancenkarte",
    },
    {
      type: "ВНЖ для воссоединения семьи",
      visa: "Familiennachzug",
    },
    {
      type: "Студенческая виза",
      visa: "Studentenvisum",
    },
  ];

  return (
    <section className="container mx-auto px-20 py-16">
      <h2 className="mb-8 text-3xl font-bold">
        Какие варианты иммиграции
        <br />в Германию наиболее популярны?
      </h2>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-light">
              <th className="px-6 py-4 text-left font-medium text-gray-medium">Тип иммиграции</th>
              <th className="px-6 py-4 text-left font-medium text-gray-medium">Виза/Статус</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4">{option.type}</td>
                <td className="px-6 py-4 text-brand">{option.visa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
