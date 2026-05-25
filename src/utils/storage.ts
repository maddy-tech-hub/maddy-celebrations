import type { City } from "../types";

const LOCATION_KEY = "maddy-celebrations-city";

export const getStoredCity = (): City | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(LOCATION_KEY);
  return value as City | null;
};

export const setStoredCity = (city: City) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCATION_KEY, city);
};
