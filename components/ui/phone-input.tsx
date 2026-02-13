"use client";

import * as React from "react";
import PhoneInput, { getCountries } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

// Get all countries except Uzbekistan
const allowedCountries = getCountries().filter((country) => country !== "UZ");

interface FloatingPhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  defaultCountry?: "DE" | "RU" | "US";
}

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(
        "w-full border-0 bg-transparent text-lg outline-none",
        props.className
      )}
    />
  );
});
CustomInput.displayName = "CustomInput";

function FloatingPhoneInput({
  label,
  value,
  onChange,
  error,
  className,
  defaultCountry = "DE",
}: FloatingPhoneInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <label className="pointer-events-none absolute top-0 left-0 text-sm text-gray-500">
        {label}
      </label>
      <div
        className={cn(
          "flex w-full items-center gap-2 border-0 border-b border-gray-300 pt-5 pb-2 transition-colors",
          isFocused && "border-gray-400",
          error && "border-red-500"
        )}
      >
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          countries={allowedCountries}
          value={value}
          onChange={(val) => onChange(val || "")}
          inputComponent={CustomInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="phone-input-wrapper w-full"
        />
      </div>
      {error && (
        <span className="absolute right-0 -bottom-5 text-xs text-red-500 lg:text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

export { FloatingPhoneInput };
