import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "../../../types";
import { formatPrice, getSpecialPrice, OFFER_DISCOUNT_PERCENTAGE } from "../../../utils/pricing";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const specialPrice = getSpecialPrice(service.startingPrice);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden p-0">
        <div className="relative">
          <img
            src={service.image}
            alt={service.title}
            className="h-48 w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = "/ring-baloon.png";
            }}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow">
            {service.category}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-rose-600/25">
            {OFFER_DISCOUNT_PERCENTAGE}% OFF
          </span>
        </div>
        <div className="space-y-3 p-5">
          <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
          <p className="text-sm text-slate-600">{service.shortDescription}</p>
          <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-3">
            <p className="text-xs font-bold uppercase text-rose-700">Special celebration price</p>
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
