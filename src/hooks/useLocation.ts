import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider");
  }
  return context;
};
