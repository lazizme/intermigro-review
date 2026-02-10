"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingInput } from "@/components/ui/input";
import { SelectableButtonGroup } from "@/components/ui/selectable-button-group";
import { RangeInput } from "@/components/ui/range-input";
import { FloatingSelect } from "@/components/ui/select";

interface FormData {
  name: string;
  phone: string;
  lastName: string;
  email: string;
  career: string;
  telegram: string;
  education: string;
  income: number;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLead(formData: FormData): boolean {
  const { career, education, income } = formData;

  // Rule: If earnings > 3000, always a lead
  if (income > 3000) {
    return true;
  }

  // Rule: If earnings < 1000, not a lead
  if (income < 1000) {
    return false;
  }

  // Rule: If education is highschool or specialist, not a lead (except > 3000 handled above)
  if (education === "highschool" || education === "specialist") {
    return false;
  }

  // Rule: If career is engineering or medicine AND earnings > 500, is a lead
  if ((career === "engineering" || career === "medicine") && income > 500) {
    return true;
  }

  // Default: not a lead
  return false;
}

function validateMedicineEducation(formData: FormData): string | null {
  // Rule: If career is medicine, must have specialist or higher education
  if (formData.career === "medicine") {
    if (formData.education !== "specialist" && formData.education !== "higher") {
      return "Для медицины требуется специальное или высшее образование";
    }
  }
  return null;
}

export default function HeroForm() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    phone: "",
    lastName: "",
    email: "",
    career: "",
    telegram: "",
    education: "",
    income: 2000,
    privacy: false,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [medicineError, setMedicineError] = React.useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Неверный email";
    }

    const medError = validateMedicineEducation(formData);
    setMedicineError(medError);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !medError;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const lead = isLead(formData);
      console.log("Form Data:", formData);
      console.log("Is Lead:", lead);
    }
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "career" || field === "education") {
      setMedicineError(null);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-x-11 gap-y-7" onSubmit={handleSubmit}>
      <FloatingInput
        type="text"
        label="Имя"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
      />
      <FloatingInput
        type="tel"
        label="Телефон"
        value={formData.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        error={errors.phone}
      />
      <FloatingInput
        type="text"
        label="Фамилия"
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />
      <FloatingInput
        type="email"
        label="E-mail"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
      />
      <FloatingSelect
        label="Карьера"
        value={formData.career}
        onChange={(value) => updateField("career", value)}
        options={[
          { value: "it", label: "IT" },
          { value: "design", label: "Дизайн" },
          { value: "marketing", label: "Маркетинг" },
          { value: "engineering", label: "Инженерия" },
          { value: "medicine", label: "Медицина" },
          { value: "finance", label: "Финансы" },
          { value: "analytics", label: "Аналитика" },
          { value: "art", label: "Сфера искусства" },
          { value: "jurisprudence", label: "Юриспруденция" },
          { value: "entrepreneurship", label: "Предпринимательство" },
          { value: "other", label: "Другое" },
        ]}
      />

      <FloatingInput
        type="text"
        label="Ник в телеграме"
        value={formData.telegram}
        onChange={(e) => updateField("telegram", e.target.value)}
      />

      <div className="col-span-2 sm:col-span-1">
        <SelectableButtonGroup
          label="Образование"
          value={formData.education}
          onChange={(value) => updateField("education", value)}
          options={[
            { value: "highschool", label: "Среднее" },
            { value: "specialist", label: "Спец." },
            { value: "higher", label: "Высшее" },
          ]}
        />
        {medicineError && (
          <span className="mt-1 block text-xs text-red-500">{medicineError}</span>
        )}
      </div>

      <RangeInput
        label="Доход"
        className="col-span-2 sm:col-span-1"
        suffix="€"
        min={0}
        max={10000}
        step={100}
        value={formData.income}
        onChange={(value) => updateField("income", value)}
      />

      <div className="text-gray-medium col-span-2 flex items-start gap-2 text-sm">
        <Checkbox
          id="privacy"
          className="mt-0.5"
          checked={formData.privacy}
          onCheckedChange={(checked) => updateField("privacy", checked === true)}
        />
        <label htmlFor="privacy">
          <span className="font-medium text-black">
            Проинформирован, что по запросу эта информация может быть удалена. Даю согласие с
          </span>
          &nbsp; политикой конфиденциальности
        </label>
      </div>

      <Button
        type="submit"
        className="bg-brand hover:bg-brand/90 col-span-2 h-12 rounded-2xl py-5 text-lg font-medium text-white"
      >
        Записаться на консультацию
      </Button>
    </form>
  );
}
