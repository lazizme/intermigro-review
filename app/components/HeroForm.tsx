"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingInput } from "@/components/ui/input";
import { FloatingPhoneInput } from "@/components/ui/phone-input";
import { SelectableButtonGroup } from "@/components/ui/selectable-button-group";
import { RangeInput } from "@/components/ui/range-input";
import { FloatingSelect } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  lastName: string;
  email: string;
  career: string;
  careerOther: string;
  telegram: string;
  education: string;
  income: number;
  privacy: boolean;
  // UTM parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  privacy?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLead(formData: FormData): boolean {
  const { career, education, income } = formData;

  // Rule: If earnings > 3000, always a lead (regardless of career/education)
  if (income > 3000) {
    return true;
  }

  // Rule: If earnings < 1000, not a lead
  if (income < 1000) {
    return false;
  }

  // Rule: Higher education + income >= 1000 = lead (any career)
  if (education === "higher" && income >= 1000) {
    return true;
  }

  // Rule: Medicine + specialist education + income > 500 = lead
  if (career === "medicine" && education === "specialist" && income > 500) {
    return true;
  }

  // Rule: Engineering + income > 500 = lead
  if (career === "engineering" && income > 500) {
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
    careerOther: "",
    telegram: "",
    education: "",
    income: 0,
    privacy: false,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [medicineError, setMedicineError] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isLeadResult, setIsLeadResult] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Capture UTM parameters from URL on component mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utmData: Partial<FormData> = {};

      const utm_source = urlParams.get("utm_source");
      const utm_medium = urlParams.get("utm_medium");
      const utm_campaign = urlParams.get("utm_campaign");
      const utm_content = urlParams.get("utm_content");
      const utm_term = urlParams.get("utm_term");

      if (utm_source) utmData.utm_source = utm_source;
      if (utm_medium) utmData.utm_medium = utm_medium;
      if (utm_campaign) utmData.utm_campaign = utm_campaign;
      if (utm_content) utmData.utm_content = utm_content;
      if (utm_term) utmData.utm_term = utm_term;

      if (Object.keys(utmData).length > 0) {
        setFormData((prev) => ({ ...prev, ...utmData }));
        console.log("UTM parameters captured:", utmData);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.phone) {
      newErrors.phone = "Телефон обязателен";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Неверный email";
    }

    if (!formData.privacy) {
      newErrors.privacy = "Необходимо согласие";
    }

    const medError = validateMedicineEducation(formData);
    setMedicineError(medError);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !medError;
  };

  const trackConversions = () => {
    // Yandex Metrika
    if (typeof window !== "undefined" && typeof (window as any).ym !== "undefined") {
      (window as any).ym(91677080, "reachGoal", "sendform");
    }

    // Google Ads Conversion
    if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-11223285171/p6pUCO_owuYbELP61ucp",
        value: 0,
        currency: "EUR",
      });
    }

    // Meta Pixel - с защитой от AdBlock
    if (typeof window !== "undefined" && typeof (window as any).fbq !== "undefined") {
      (window as any).fbq("track", "SubmitApplication", {
        content_name: "Consultation Request",
      });
      (window as any).fbq("trackCustom", "ConsultationSubmitted");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const lead = isLead(formData);
      console.log("Form Data:", formData);
      console.log("Is Lead:", lead);
      setIsLeadResult(lead);

      // If qualified lead, send to Kommo CRM
      if (lead) {
        try {
          const response = await fetch("/api/submit-lead", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            console.error("Failed to submit lead to CRM");
          } else {
            console.log("Lead successfully submitted to CRM");

            // Track conversions ONLY for qualified leads that successfully reached CRM
            trackConversions();
          }
        } catch (error) {
          console.error("Error submitting lead:", error);
        }
      }

      setIsSubmitting(false);
      setModalOpen(true);
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
    <form
      className="grid grid-cols-2 gap-x-5 gap-y-4 md:gap-x-7 md:gap-y-6 lg:gap-x-9 lg:gap-y-6 xl:gap-x-11 xl:gap-y-7"
      onSubmit={handleSubmit}
    >
      <FloatingInput
        type="text"
        label="Имя"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
      />
      <FloatingInput
        type="text"
        label="Фамилия"
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />
      <FloatingPhoneInput
        label="Телефон"
        value={formData.phone}
        onChange={(value) => updateField("phone", value)}
        error={errors.phone}
        defaultCountry="DE"
      />
      <FloatingInput
        type="email"
        label="E-mail"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
      />
      <FloatingSelect
        label="Профессия"
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

      {formData.career === "other" && (
        <FloatingInput
          type="text"
          label="Укажите вашу профессию"
          value={formData.careerOther}
          onChange={(e) => updateField("careerOther", e.target.value)}
        />
      )}

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
            { value: "highschool", label: "Школа" },
            { value: "specialist", label: "Сред. спец." },
            { value: "higher", label: "Высшее" },
          ]}
        />
        {medicineError && <span className="mt-1 block text-xs text-red-500">{medicineError}</span>}
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

      <div className="relative col-span-2">
        <div className="text-gray-medium flex items-start gap-2 text-sm">
          <Checkbox
            id="privacy"
            className={`mt-0.5 ${errors.privacy ? "border-red-500 data-[state=unchecked]:border-red-500" : ""}`}
            checked={formData.privacy}
            onCheckedChange={(checked) => updateField("privacy", checked === true)}
          />
          <label htmlFor="privacy">
            <span className="font-medium text-black">
              Проинформирован, что по запросу эта информация может быть удалена. Даю согласие с
            </span>
            &nbsp;
            <Link href="/privacy-policy" className="text-brand hover:underline">
              политикой конфиденциальности
            </Link>
          </label>
        </div>
        {errors.privacy && (
          <span className="absolute -bottom-5 left-0 text-xs text-red-500 lg:text-sm">
            {errors.privacy}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand hover:bg-brand/90 col-span-2 h-12 rounded-2xl py-5 text-lg font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "Отправка..." : "Записаться на консультацию"}
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className={cn(
            "mx-auto w-11/12 text-black sm:w-auto",
            isLeadResult ? "bg-[#BFFF76]" : "bg-[#E6D0BE]",
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isLeadResult ? "Ваша заявки отправлена!" : "Спасибо за заполнение анкеты!"}
            </DialogTitle>
            <DialogDescription className="text-black">
              {isLeadResult
                ? "Наш миграционный консультант свяжется с вами в ближайшее время по телефону или в Telegram / WhatsApp"
                : "К сожалению, на данный момент ваш профиль не соответствует критериям программ, с которыми мы работаем. Требования к высшему образованию и доходу выше 1000 евро являются обязательными"}
            </DialogDescription>
          </DialogHeader>
          {/* <DialogFooter>
            <Button
              onClick={() => setModalOpen(false)}
              className={
                isLeadResult
                  ? "bg-brand hover:bg-brand/90 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            >
              Закрыть
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </form>
  );
}
