import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTA() {
  return (
    <section className="bg-brand py-16 text-white">
      <div className="container mx-auto flex items-center justify-between px-20">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold">
            Узнайте свои
            <br />
            шансы на успех!
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20"></div>
            <div className="h-12 w-12 rounded-full bg-white/20"></div>
            <div className="h-12 w-12 rounded-full bg-white/20"></div>
          </div>
        </div>

        <div className="w-96 rounded-3xl bg-white p-6 text-black">
          <p className="mb-4 text-sm text-gray-medium">
            Проконсультируем бесплатно
          </p>

          <form className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Ваше имя"
              className="h-11 rounded-xl border-gray-200 px-4"
            />
            <Input
              type="tel"
              placeholder="Телефон"
              className="h-11 rounded-xl border-gray-200 px-4"
            />
            <Button className="h-11 rounded-xl bg-brand text-white hover:bg-brand/90">
              Получить консультацию
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
