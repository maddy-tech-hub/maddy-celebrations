import type { SelectHTMLAttributes } from "react";

export const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ className = "", ...props }) => (
  <select
    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 ${className}`}
    {...props}
  />
);
