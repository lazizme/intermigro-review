"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  label?: string;
}

function SelectTrigger({ className, label, children, ...props }: SelectTriggerProps) {
  return (
    <div className="flex flex-col gap-0">
      {label && <span className="text-gray-400">{label}</span>}
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex w-full items-center justify-between border-0 border-b border-gray-300 bg-transparent pb-2 text-lg transition-colors outline-none",
          "focus:border-gray-400",
          "data-placeholder:text-gray-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="text-brand size-5" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "text-foreground bg-white",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "relative z-50 max-h-[300px] min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-gray-200 shadow-lg",
          className,
        )}
        position={position}
        sideOffset={8}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-3 py-2 text-sm text-gray-500", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-lg outline-none select-none",
        "text-gray-700 transition-colors",
        "focus:text-foreground focus:bg-gray-100",
        "data-[state=checked]:text-foreground data-[state=checked]:bg-gray-100 data-[state=checked]:font-medium",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

interface Option {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

function FloatingSelect({
  label,
  options,
  value: controlledValue,
  onChange,
  className,
  error,
}: FloatingSelectProps) {
  const [internalValue, setInternalValue] = React.useState(controlledValue);
  const hasValue = !!(controlledValue ?? internalValue);

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Select value={controlledValue} onValueChange={handleChange}>
      <div className={cn("relative", className)}>
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          className={cn(
            "flex w-full items-center justify-between border-0 border-b border-gray-300 bg-transparent pt-5 pb-2 text-lg transition-colors outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500"
          )}
        >
          <SelectValue />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="text-brand size-5" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <span
          className={cn(
            "pointer-events-none absolute left-0 text-gray-500 transition-all duration-200 ease-out",
            hasValue ? "top-0 text-sm text-gray-500" : "top-5 text-lg text-gray-400",
          )}
        >
          {label}
        </span>
        {error && (
          <span className="absolute right-0 -bottom-5 text-xs text-red-500 lg:text-sm">
            {error}
          </span>
        )}
      </div>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  FloatingSelect,
};
