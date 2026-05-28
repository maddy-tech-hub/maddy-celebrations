import { Sparkles } from "lucide-react";
import { services } from "../../../data/services";
import { useLocation } from "../../../hooks/useLocation";
import { OFFER_DISCOUNT_PERCENTAGE } from "../../../utils/pricing";
import { ServiceGrid } from "../../service/ServiceGrid/ServiceGrid";

export const ServicesSection = () => {
  const { city } = useLocation();
  const filtered = services.filter((service) => service.availableCities.includes(city));
  const isUpcomingCity = ["Chennai", "Mumbai", "Pune"].includes(city);

  return (
    <section id="services" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Decoration Services in {city}</h2>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">
          <Sparkles size={16} />
          {OFFER_DISCOUNT_PERCENTAGE}% off on every order
        </div>
      </div>
      <div className="rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-amber-50 px-5 py-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          Special launch pricing is live. Pick your favorite setup and get a clean {OFFER_DISCOUNT_PERCENTAGE}% discount automatically.
        </p>
      </div>
      {isUpcomingCity ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We are launching soon in {city}. Switch to Bangalore for all services or Hyderabad for birthday packages.
        </div>
      ) : null}
      <ServiceGrid services={filtered} city={city} />
    </section>
  );
};
