export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <article className={`rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/60 ${className}`}>{children}</article>
);
