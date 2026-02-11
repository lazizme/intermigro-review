import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Intermigro",
  description: "Impressum - Legal Notice Intermigro",
};

export default function ImpressumPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-28 md:py-36 lg:py-40">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.08)] md:p-12">
        <h1 className="mb-8 text-center text-2xl font-bold text-black md:text-3xl">
          Impressum
        </h1>

        <div className="space-y-6 text-gray-dark">
          <div>
            <p className="text-lg font-semibold text-black">
              Emigro UG (haftungsbeschränkt)
            </p>
            <p>Klingsorstr. 105b</p>
            <p>12203 Berlin</p>
            <p>Deutschland</p>
          </div>

          <div>
            <p>
              <span className="font-medium text-black">Geschäftsführer:</span>{" "}
              Vladislav Pinskij
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium text-black">HRB:</span> 250535 B
            </p>
            <p>
              <span className="font-medium text-black">Amtsgericht:</span> Berlin
              Charlottenburg
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium text-black">E-Mail:</span>{" "}
              <a
                href="mailto:contact@emigro.de"
                className="text-brand hover:underline"
              >
                contact@emigro.de
              </a>
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium text-black">Steuernummer:</span>{" "}
              29/277/32378
            </p>
            <p>
              <span className="font-medium text-black">Ust.-Nr.:</span>{" "}
              DE360037967
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-brand text-sm font-medium hover:underline"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}
