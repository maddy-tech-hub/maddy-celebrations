import { services } from "../../../data/services";
import { useLocation } from "../../../hooks/useLocation";
import { ServiceGrid } from "../../service/ServiceGrid/ServiceGrid";

export const ServicesSection = () => {
  const { city } = useLocation();
  const filtered = services.filter((service) => service.availableCities.includes(city));
  const isUpcomingCity = ["Chennai", "Mumbai", "Pune"].includes(city);

  return (
    <section id="services" className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-900">Decoration Services in {city}</h2>
      {isUpcomingCity ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We are launching soon in {city}. Switch to Bangalore for all services or Hyderabad for birthday packages.
        </div>
      ) : null}
      <ServiceGrid services={filtered} city={city} />
    </section>
  );
};
