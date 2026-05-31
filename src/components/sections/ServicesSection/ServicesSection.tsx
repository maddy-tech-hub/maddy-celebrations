import { Gift, Sparkles, WandSparkles } from "lucide-react";
import { services } from "../../../data/services";
import { useLocation } from "../../../hooks/useLocation";
import { OFFER_DISCOUNT_PERCENTAGE } from "../../../utils/pricing";
import { ServiceGrid } from "../../service/ServiceGrid/ServiceGrid";

const SPECIAL_SERVICES_CATEGORY = "Special Services";

export const ServicesSection = () => {
  const { city } = useLocation();
  const filtered = services.filter((service) => service.availableCities.includes(city));
  const decorationServices = filtered.filter((service) => service.category !== SPECIAL_SERVICES_CATEGORY);
  const specialServices = filtered.filter((service) => service.category === SPECIAL_SERVICES_CATEGORY);
  const isUpcomingCity = ["Chennai", "Mumbai"].includes(city);

  return (
    <section id="services" className="space-y-10">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              <Sparkles size={14} />
              Celebration decor
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Decoration Services in {city}</h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">
            <Gift size={16} />
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
        <ServiceGrid services={decorationServices} city={city} />
      </div>

      {specialServices.length ? (
        <section id="special-services" className="overflow-hidden rounded-[2rem] border border-amber-200 bg-slate-950 p-4 shadow-2xl shadow-slate-900/15 sm:p-6">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-amber-100 via-white to-rose-100 p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-rose-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-amber-300/40 blur-3xl" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  <WandSparkles size={14} />
                  Special Services
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Add activities guests actually remember
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                  Bring in live artists, playful craft counters, and party activities as premium add-ons to your celebration.
                </p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-xs font-bold uppercase text-rose-700">Launch offer</p>
                <p className="text-2xl font-black text-slate-950">{OFFER_DISCOUNT_PERCENTAGE}% OFF</p>
              </div>
            </div>
            <div className="relative mt-6">
              <ServiceGrid services={specialServices} city={city} variant="special" badgeLabel="Special Service" />
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
};
