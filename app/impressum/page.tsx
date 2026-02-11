import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Intermigro",
  description: "Impressum - Юридическая информация о компании Intermigro",
};

export default function ImpressumPage() {
  return (
    <main className="bg-white text-black">
      <div className="px-5 pt-28 pb-16 md:px-10 md:pt-36 lg:px-20 lg:pt-40 xl:px-32 2xl:px-40">
        <Link
          href="/"
          className="text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          ← Вернуться на главную
        </Link>

        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="mb-4 text-xl font-bold">Angaben gemäß § 5 TMG</h2>
            <div className="text-gray-dark space-y-2">
              <p>
                <strong>Emigro UG (haftungsbeschränkt)</strong>
              </p>
              <p>Klingsorstraße 105B</p>
              <p>12203 Berlin</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Vertreten durch</h2>
            <p className="text-gray-dark">Geschäftsführer: Vladislav Pinskij</p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Kontakt</h2>
            <div className="text-gray-dark space-y-2">
              <p>
                Telefon:{" "}
                <a href="tel:+493046690566" className="text-brand hover:underline">
                  +49 304 669 05 66
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:contact@intermigro.com" className="text-brand hover:underline">
                  contact@intermigro.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Registereintrag</h2>
            <div className="text-gray-dark space-y-2">
              <p>Eintragung im Handelsregister</p>
              <p>Registergericht: Amtsgericht Berlin Charlottenburg</p>
              <p>Registernummer: HRB 250535 B</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Umsatzsteuer-ID</h2>
            <div className="text-gray-dark space-y-2">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE360037967
              </p>
              <p>Steuernummer: 29/277/32378</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Streitschlichtung</h2>
            <p className="text-gray-dark mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-gray-dark">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Haftung für Inhalte</h2>
            <p className="text-gray-dark">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Haftung für Links</h2>
            <p className="text-gray-dark">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Urheberrecht</h2>
            <p className="text-gray-dark">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
