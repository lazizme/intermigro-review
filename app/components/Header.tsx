import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-white/75 p-8">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Intermigro Logo"
          width={166}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </Link>

      <nav className="flex items-center gap-8">
        <Link href="/about" className="text-black">
          О нас
        </Link>
        <Link href="/services" className="text-black">
          Услуги
        </Link>
        <Link href="/reviews" className="text-black">
          Отзывы
        </Link>
        <Link href="/contacts" className="text-black">
          Контакты
        </Link>
        <Link href="/consultation" className="text-black">
          Записаться на консультацию
        </Link>
      </nav>
    </header>
  );
}
