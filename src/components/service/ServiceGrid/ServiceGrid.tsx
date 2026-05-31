import type { Service } from "../../../types";
import { EmptyState } from "../../ui/EmptyState";
import { ServiceCard } from "../ServiceCard/ServiceCard";

export const ServiceGrid: React.FC<{
  services: Service[];
  city: string;
  variant?: "default" | "special";
  badgeLabel?: string;
}> = ({ services, city, variant = "default", badgeLabel }) => {
  if (!services.length) {
    return (
      <EmptyState
        title={`Launching Soon In ${city}`}
        description="We currently serve Bangalore fully and Hyderabad for birthday services."
      />
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} variant={variant} badgeLabel={badgeLabel} />
      ))}
    </div>
  );
};
