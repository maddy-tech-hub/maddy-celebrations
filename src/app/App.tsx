import { ChevronDown, MapPin } from "lucide-react";
import { BrowserRouter } from "react-router-dom";
import { Select } from "../components/ui/Select";
import { FloatingSupportWidgets } from "../components/widgets/FloatingSupportWidgets";
import { LocationProvider } from "../contexts/LocationProvider";
import { cities } from "../data/cities";
import { useLocation } from "../hooks/useLocation";
import type { City } from "../types";
import { AppRoutes } from "../routes/AppRoutes";
import { appImages } from "../data/images";

const Header = () => {
  const { city, setCity } = useLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-2 sm:px-6">
        <img src={appImages.brand.headerLogo} alt="Irasah Events" className="h-12 w-auto shrink-0 object-contain sm:h-14 lg:h-16" />
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm">
            <MapPin size={14} />
          </span>
          <div className="relative">
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value as City)}
              className="min-w-40 appearance-none rounded-xl border-0 bg-transparent py-2 pl-2 pr-8 text-sm font-semibold text-slate-800"
            >
              {cities.map((item) => <option key={item}>{item}</option>)}
            </Select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
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
