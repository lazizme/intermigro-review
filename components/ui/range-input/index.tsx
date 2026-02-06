"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import "./range-input.css";

interface RangeInputProps {
  label: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  formatValue?: (value: number) => string;
}

function RangeInput({
  label,
  suffix = "€",
  min = 0,
  max = 10000,
  step = 100,
  value: controlledValue,
  onChange,
  className,
  formatValue = (v) => v.toLocaleString("ru-RU"),
}: RangeInputProps) {
  const [value, setValue] = React.useState(controlledValue ?? min);

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value.replace(/\s/g, ""), 10);
    if (!isNaN(num)) {
      handleChange(Math.min(max, Math.max(min, num)));
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-gray-500">{label}</span>
      <div className="relative">
        <div className="rounded-2xl bg-transparent pb-1.5">
          <div className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3">
            <Input
              type="text"
              value={formatValue(value)}
              onChange={handleInputChange}
              className="h-auto flex-1 border-0 bg-transparent p-0 text-lg font-medium shadow-none outline-none"
            />
            <span className="text-gray-medium shrink-0">{suffix}</span>
          </div>
        </div>

        <div className="absolute right-0 -bottom-3 left-0 px-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="range-slider w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export { RangeInput };
