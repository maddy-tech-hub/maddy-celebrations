import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "../../../types";
import { fallbackServiceImage } from "../../../data/images";
import { formatPrice, getSpecialPrice, OFFER_DISCOUNT_PERCENTAGE } from "../../../utils/pricing";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

type ServiceCardVariant = "default" | "special";

export const ServiceCard: React.FC<{
  service: Service;
  variant?: ServiceCardVariant;
  badgeLabel?: string;
}> = ({ service, variant = "default", badgeLabel }) => {
  const specialPrice = getSpecialPrice(service.startingPrice);
  const isSpecial = variant === "special";

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card
        className={`h-full overflow-hidden p-0 ${
          isSpecial ? "border-amber-200 bg-gradient-to-b from-white via-amber-50/50 to-rose-50/40 shadow-xl shadow-amber-200/25" : ""
        }`}
      >
        <div className="relative">
          <img
            src={service.image}
            alt={service.title}
            className={`${isSpecial ? "h-56" : "h-48"} w-full object-cover`}
            onError={(event) => {
              event.currentTarget.src = fallbackServiceImage;
            }}
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow ${
              isSpecial ? "bg-amber-100 text-amber-900" : "bg-white/90 text-slate-900"
            }`}
          >
            {badgeLabel ?? service.category}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-rose-600/25">
            {OFFER_DISCOUNT_PERCENTAGE}% OFF
          </span>
          {isSpecial ? <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/55 to-transparent" /> : null}
        </div>
        <div className="space-y-3 p-5">
          <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
          <p className="text-sm text-slate-600">{service.shortDescription}</p>
          <div className={`rounded-2xl border p-3 ${isSpecial ? "border-amber-200 bg-white/85" : "border-rose-100 bg-rose-50/70"}`}>
            <p className={`text-xs font-bold uppercase ${isSpecial ? "text-amber-700" : "text-rose-700"}`}>
              {isSpecial ? "Special activity price" : "Special celebration price"}
            </p>
            <div className="mt-1 flex flex-wrap items-end gap-2">
              <span className="text-2xl font-black text-slate-950">{formatPrice(specialPrice)}</span>
              <span className="pb-1 text-sm font-semibold text-slate-400 line-through">
                {formatPrice(service.startingPrice)}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-emerald-700">
              You save {formatPrice(service.startingPrice - specialPrice)} on every order.
            </p>
          </div>
          {service.pricingNote ? <p className="text-xs text-slate-500">{service.pricingNote}</p> : null}
          <Link to={`/services/${service.slug}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};
