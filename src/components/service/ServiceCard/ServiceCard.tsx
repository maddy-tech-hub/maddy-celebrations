import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "../../../types";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
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
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
        <p className="text-sm text-slate-600">{service.shortDescription}</p>
        <p className="text-sm font-semibold text-slate-900">Starting at Rs. {service.startingPrice.toLocaleString()}</p>
        {service.pricingNote ? <p className="text-xs text-slate-500">{service.pricingNote}</p> : null}
        <Link to={`/services/${service.slug}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </Card>
  </motion.div>
);
