"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectableButtonGroupProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

function SelectableButtonGroup({
  label,
  options,
  value,
  onChange,
  className,
  error,
}: SelectableButtonGroupProps) {
  const [selected, setSelected] = React.useState(value || "");

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div className={cn("relative flex flex-col gap-3", className)}>
      <span className="text-gray-500">{label}</span>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={cn(
              "rounded-2xl bg-white px-4 py-3 text-xs transition-all md:text-sm xl:text-base",
              selected === option.value
                ? "border-brand text-foreground border"
                : "text-gray-medium border border-transparent",
              error && "border-red-500",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && (
        <span className="absolute right-0 -bottom-5 text-xs text-red-500 lg:text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

export { SelectableButtonGroup };
