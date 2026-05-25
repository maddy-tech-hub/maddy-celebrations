import { useMemo, useState } from "react";
import { cities } from "../data/cities";
import type { City } from "../types";
import { getStoredCity, setStoredCity } from "../utils/storage";
import { LocationContext } from "./LocationContext";

export const LocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [city, setCityState] = useState<City>(() => getStoredCity() ?? cities[0]);

  const setCity = (value: City) => {
    setCityState(value);
    setStoredCity(value);
  };

  const value = useMemo(() => ({ city, setCity }), [city]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
