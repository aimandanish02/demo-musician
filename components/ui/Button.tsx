import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  external?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-transform duration-150 active:scale-[0.98]";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent/90",
  secondary:
    "border border-border-strong text-ink hover:border-accent hover:text-accent",
};

export function Button({ href, children, variant = "primary", icon, external }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon}
    </Link>
  );
}
