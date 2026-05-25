import { createContext } from "react";
import type { City } from "../types";

interface LocationContextType {
  city: City;
  setCity: (city: City) => void;
}

export const LocationContext = createContext<LocationContextType | null>(null);
