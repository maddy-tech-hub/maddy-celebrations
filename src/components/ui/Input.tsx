import type { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 ${className}`}
    {...props}
  />
);
