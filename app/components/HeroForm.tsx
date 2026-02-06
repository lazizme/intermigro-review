"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingInput } from "@/components/ui/input";
import { SelectableButtonGroup } from "@/components/ui/selectable-button-group";
import { RangeInput } from "@/components/ui/range-input";
import { FloatingSelect } from "@/components/ui/select";

export default function HeroForm() {
  return (
    <form className="grid grid-cols-2 gap-x-11 gap-y-7">
      <FloatingInput type="text" label="Имя" />
      <FloatingInput type="tel" label="Телефон" />
      <FloatingInput type="text" label="Фамилия" />
      <FloatingInput type="email" label="E-mail" />
      <FloatingSelect
        label="Карьера"
        options={[
          { value: "germany", label: "Германия" },
          { value: "austria", label: "Австрия" },
          { value: "switzerland", label: "Швейцария" },
        ]}
      />

      <FloatingInput type="text" label="Ник в телеграме" />

      <SelectableButtonGroup
        className="col-span-2 lg:col-span-1"
        label="Образование"
        options={[
          { value: "highschool", label: "Среднее" },
          { value: "specialist", label: "Специалист" },
          { value: "higher", label: "Высшее" },
        ]}
      />

      <RangeInput
        label="Доход"
        className="col-span-2 lg:col-span-1"
        suffix="€"
        min={0}
        max={10000}
        step={100}
        value={2000}
        onChange={(value) => console.log(value)}
      />

      <div className="text-gray-medium col-span-2 flex items-start gap-2 text-sm">
        <Checkbox id="privacy" className="mt-0.5" />
        <label htmlFor="privacy">
          <span className="font-medium text-black">
            Проинформирован, что по запросу эта информация может быть удалена. Даю согласие с
          </span>
          &nbsp; политикой конфиденциальности
        </label>
      </div>

      <Button className="bg-brand hover:bg-brand/90 col-span-2 h-12 rounded-2xl py-5 text-lg font-medium text-white">
        Записаться на консультацию
      </Button>
    </form>
  );
}
