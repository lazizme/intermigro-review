import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Intermigro",
  description: "Политика конфиденциальности и обработки персональных данных Intermigro",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-black">
      <div className="px-5 pt-28 pb-16 md:px-10 md:pt-36 lg:px-20 lg:pt-40 xl:px-32 2xl:px-40">
        <Link
          href="/"
          className="text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          ← Вернуться на главную
        </Link>

        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="mb-4 text-xl font-bold">1. Общие положения</h2>
            <p className="text-gray-dark mb-4">
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
              обработки и защиты персональных данных пользователей сайта intermigro.com (далее —
              «Сайт»), принадлежащего компании Emigro UG (haftungsbeschränkt) (далее — «Компания»,
              «мы», «нас»).
            </p>
            <p className="text-gray-dark">
              Используя Сайт, вы соглашаетесь с условиями данной Политики. Если вы не согласны с
              условиями Политики, пожалуйста, не используйте Сайт.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">2. Контактные данные оператора</h2>
            <div className="text-gray-dark space-y-2">
              <p>
                <strong>Компания:</strong> Emigro UG (haftungsbeschränkt)
              </p>
              <p>
                <strong>Адрес:</strong> Klingsorstraße 105B, 12203 Berlin, Germany
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@intermigro.com" className="text-brand hover:underline">
                  contact@intermigro.com
                </a>
              </p>
              <p>
                <strong>Телефон:</strong>{" "}
                <a href="tel:+493046690566" className="text-brand hover:underline">
                  +49 304 669 05 66
                </a>
              </p>
              <p>
                <strong>HRB:</strong> 250535 B
              </p>
              <p>
                <strong>Amtsgericht:</strong> Berlin Charlottenburg
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">3. Какие данные мы собираем</h2>
            <p className="text-gray-dark mb-4">Мы можем собирать следующие персональные данные:</p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>Имя и фамилия</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона</li>
              <li>Никнейм в Telegram</li>
              <li>Информация о карьере и образовании</li>
              <li>Информация о доходах</li>
              <li>IP-адрес и данные о браузере</li>
              <li>Cookies и аналитические данные</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">4. Цели обработки данных</h2>
            <p className="text-gray-dark mb-4">Мы обрабатываем ваши персональные данные для:</p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>Предоставления консультационных услуг по иммиграции</li>
              <li>Связи с вами по вопросам наших услуг</li>
              <li>Персонализации вашего опыта использования Сайта</li>
              <li>Улучшения качества наших услуг</li>
              <li>Выполнения юридических обязательств</li>
              <li>Аналитики и статистики посещаемости</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">5. Правовые основания обработки</h2>
            <p className="text-gray-dark mb-4">
              Мы обрабатываем ваши данные на следующих правовых основаниях в соответствии с GDPR:
            </p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>
                <strong>Согласие (ст. 6(1)(a) GDPR):</strong> Вы дали согласие на обработку данных
                при заполнении формы
              </li>
              <li>
                <strong>Исполнение договора (ст. 6(1)(b) GDPR):</strong> Обработка необходима для
                предоставления наших услуг
              </li>
              <li>
                <strong>Законные интересы (ст. 6(1)(f) GDPR):</strong> Для улучшения наших услуг и
                аналитики
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">6. Cookies и аналитика</h2>
            <p className="text-gray-dark mb-4">Мы используем следующие инструменты аналитики:</p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>
                <strong>Yandex Metrika:</strong> Для анализа поведения пользователей и улучшения
                сайта
              </li>
              <li>
                <strong>Google Ads:</strong> Для отслеживания конверсий рекламных кампаний
              </li>
              <li>
                <strong>Meta Pixel:</strong> Для оптимизации рекламы в социальных сетях
              </li>
            </ul>
            <p className="text-gray-dark mt-4">
              Вы можете отключить cookies в настройках вашего браузера, однако это может повлиять на
              функциональность Сайта.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">7. Передача данных третьим лицам</h2>
            <p className="text-gray-dark mb-4">
              Мы можем передавать ваши данные следующим категориям получателей:
            </p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>CRM-системы для управления клиентскими отношениями</li>
              <li>Аналитические сервисы (Google, Yandex, Meta)</li>
              <li>Хостинг-провайдеры</li>
              <li>Государственные органы при наличии законных оснований</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">8. Сроки хранения данных</h2>
            <p className="text-gray-dark">
              Мы храним ваши персональные данные в течение срока, необходимого для достижения целей
              обработки, или до момента отзыва вами согласия. После этого данные удаляются или
              анонимизируются, за исключением случаев, когда их хранение требуется по закону.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">9. Ваши права</h2>
            <p className="text-gray-dark mb-4">
              В соответствии с GDPR вы имеете следующие права:
            </p>
            <ul className="text-gray-dark list-disc space-y-2 pl-6">
              <li>
                <strong>Право на доступ:</strong> Получить информацию о ваших данных
              </li>
              <li>
                <strong>Право на исправление:</strong> Исправить неточные данные
              </li>
              <li>
                <strong>Право на удаление:</strong> Запросить удаление ваших данных
              </li>
              <li>
                <strong>Право на ограничение обработки:</strong> Ограничить обработку ваших данных
              </li>
              <li>
                <strong>Право на переносимость:</strong> Получить ваши данные в машиночитаемом
                формате
              </li>
              <li>
                <strong>Право на возражение:</strong> Возразить против обработки данных
              </li>
              <li>
                <strong>Право отозвать согласие:</strong> Отозвать ранее данное согласие
              </li>
            </ul>
            <p className="text-gray-dark mt-4">
              Для реализации своих прав свяжитесь с нами по адресу{" "}
              <a href="mailto:contact@intermigro.com" className="text-brand hover:underline">
                contact@intermigro.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">10. Безопасность данных</h2>
            <p className="text-gray-dark">
              Мы принимаем технические и организационные меры для защиты ваших персональных данных
              от несанкционированного доступа, изменения, раскрытия или уничтожения. Это включает
              использование SSL-шифрования, безопасных серверов и ограничение доступа к данным.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">11. Изменения в Политике</h2>
            <p className="text-gray-dark">
              Мы оставляем за собой право изменять данную Политику. Актуальная версия всегда
              доступна на этой странице. Рекомендуем периодически проверять Политику на наличие
              обновлений.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">12. Жалобы</h2>
            <p className="text-gray-dark">
              Если вы считаете, что обработка ваших данных нарушает законодательство о защите
              данных, вы имеете право подать жалобу в надзорный орган. В Германии это Berliner
              Beauftragte für Datenschutz und Informationsfreiheit.
            </p>
          </section>

          <div className="text-gray-dark mt-12 border-t pt-8">
            <p>
              <strong>Дата последнего обновления:</strong> Февраль 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
