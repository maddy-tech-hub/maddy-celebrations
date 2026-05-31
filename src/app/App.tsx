import { Building2, Check, Gift, Landmark, MapPin, MessageCircle, X } from "lucide-react";
import type { ElementType } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { FloatingSupportWidgets } from "../components/widgets/FloatingSupportWidgets";
import { LocationProvider } from "../contexts/LocationProvider";
import { cities } from "../data/cities";
import { useLocation } from "../hooks/useLocation";
import type { City } from "../types";
import { AppRoutes } from "../routes/AppRoutes";
import { appImages } from "../data/images";

const cityMeta: Record<City, { icon: ElementType; note: string }> = {
  Bangalore: { icon: Building2, note: "Full service available" },
  Chennai: { icon: Landmark, note: "Launching soon" },
  Hyderabad: { icon: Building2, note: "Birthday services live" },
  Mumbai: { icon: Landmark, note: "Launching soon" },
};

const Header = () => {
  const { city, setCity } = useLocation();
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE || "918904502073";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Irasah Events, I need decoration service details.")}`;
  const selectCity = (nextCity: City) => {
    setCity(nextCity);
    setIsCityPickerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/92 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <img src={appImages.brand.headerLogo} alt="Irasah Events" className="h-10 w-auto shrink-0 object-contain sm:h-12 lg:h-14" />
            <div className="hidden min-w-0 border-l border-slate-200 pl-3 md:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700">Irasah Events</p>
              <p className="mt-0.5 hidden text-xs font-medium text-slate-500 lg:block">Decor, artists & celebration experiences</p>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#special-services"
              className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 transition hover:border-amber-300 hover:bg-white md:inline-flex"
            >
              <Gift size={15} />
              Special Services
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 sm:inline-flex"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setIsCityPickerOpen(true)}
              className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition hover:bg-rose-50/60"
              aria-label={`Change city. Current city is ${city}`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-slate-900 transition group-hover:bg-rose-100 group-hover:text-rose-700">
                <MapPin size={21} strokeWidth={1.7} />
              </span>
              <span className="text-sm font-bold text-slate-900 sm:text-base">{city}</span>
            </button>
          </div>
        </div>
      </header>

      {isCityPickerOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md"
          onClick={() => setIsCityPickerOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-rose-100 bg-[#fffaf7] shadow-2xl shadow-rose-950/25"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute -left-16 -top-20 h-48 w-48 rounded-full bg-rose-200/50 blur-3xl" />
            <div className="absolute -right-16 top-10 h-44 w-44 rounded-full bg-amber-200/60 blur-3xl" />
            <button
              type="button"
              onClick={() => setIsCityPickerOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm transition hover:bg-rose-50 hover:text-rose-700"
              aria-label="Close city picker"
            >
              <X size={18} />
            </button>
            <div className="relative px-5 pb-3 pt-5 text-center sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-rose-600">Irasah Events</p>
              <h2 className="mt-1.5 text-xl font-semibold text-slate-950 sm:text-2xl">Choose your celebration city</h2>
              <p className="mt-1 text-xs text-slate-600">Pick the city where our decorators should arrive.</p>
            </div>
            <div className="relative grid gap-2.5 px-4 pb-5 sm:grid-cols-2 sm:px-5">
              {cities.map((item) => {
                const Icon = cityMeta[item].icon;
                const isSelected = item === city;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectCity(item)}
                    className={`group relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected
                        ? "border-rose-200 bg-white shadow-md shadow-rose-100/70"
                        : "border-white bg-white/70 hover:border-rose-100 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-105 ${
                        isSelected ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${isSelected ? "text-rose-700" : "text-slate-900"}`}>{item}</span>
                      <span className="mt-0.5 block text-[11px] font-medium text-slate-500">{cityMeta[item].note}</span>
                    </span>
                    <span
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected ? "border-rose-600 bg-rose-600 text-white" : "border-rose-100 bg-white text-transparent"
                      }`}
                    >
                      <Check size={12} />
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-rose-100 bg-white/70 px-5 py-3 text-center text-[11px] font-medium text-slate-500">
              Planning outside these cities? WhatsApp us for custom event support.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const App = () => (
  <BrowserRouter>
    <LocationProvider>
      <Header />
      <AppRoutes />
      <FloatingSupportWidgets />
    </LocationProvider>
  </BrowserRouter>
);
