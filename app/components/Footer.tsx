import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto px-20">
        <div className="flex justify-between">
          <div>
            <Image
              src="/logo.svg"
              alt="Intermigro Logo"
              width={166}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-gray-medium">
              Платформа для управления иммиграционным процессом в Германию
            </p>

            <div className="mt-6 flex gap-4">
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light">
                <span className="text-sm">f</span>
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light">
                <span className="text-sm">in</span>
              </Link>
            </div>
          </div>

          <div className="flex gap-20">
            <div>
              <h4 className="mb-4 font-semibold">О нас</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-medium">
                <li><Link href="#">Компания</Link></li>
                <li><Link href="#">Услуги</Link></li>
                <li><Link href="#">Отзывы</Link></li>
                <li><Link href="#">Контакты</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Услуги</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-medium">
                <li><Link href="#">Blue Card</Link></li>
                <li><Link href="#">Фриланс-виза</Link></li>
                <li><Link href="#">Бизнес-иммиграция</Link></li>
                <li><Link href="#">Воссоединение семьи</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Контакты</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-medium">
                <li>+49 123 456 7890</li>
                <li>info@intermigro.com</li>
                <li>Berlin, Germany</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 text-sm text-gray-medium">
          <p>© 2024 Intermigro. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="#">Политика конфиденциальности</Link>
            <Link href="#">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
