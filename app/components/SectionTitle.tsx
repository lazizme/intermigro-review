import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-2xl font-bold md:text-3xl lg:text-4xl", className)}>
      {children}
    </h2>
  );
}
