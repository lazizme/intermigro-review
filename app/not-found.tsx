import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
      <h1 className="text-8xl font-bold text-brand md:text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-black md:text-3xl">
        Страница не найдена
      </h2>
      <p className="text-gray-dark mt-3 max-w-md text-base md:text-lg">
        К сожалению, запрашиваемая страница не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="bg-brand hover:bg-brand/90 mt-8 inline-flex h-12 items-center justify-center rounded-2xl px-8 text-lg font-medium text-white transition-colors"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
