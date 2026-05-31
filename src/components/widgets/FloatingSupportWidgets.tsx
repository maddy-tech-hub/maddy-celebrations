import { MessageCircle } from "lucide-react";

export const FloatingSupportWidgets = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE || "918904502073";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Irasah Events, I need decoration service details.")}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-5 sm:right-6">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/35 transition hover:bg-emerald-700 sm:px-4"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
};
