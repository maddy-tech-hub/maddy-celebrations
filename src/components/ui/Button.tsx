import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
      variant === "primary"
        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700"
        : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);
