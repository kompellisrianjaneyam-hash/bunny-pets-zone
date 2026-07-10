import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-[#D59A3A] text-white hover:bg-[#C3872E] shadow-lg hover:shadow-xl",

    secondary:
      "border border-[#E5E5E5] bg-white text-[#1E1E1E] hover:bg-[#F8F8F8]",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={cn(base, variants[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}