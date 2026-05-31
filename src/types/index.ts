export type City = "Bangalore" | "Chennai" | "Hyderabad" | "Mumbai" | "Pune";

export type ServiceCategory =
  | "Birthday"
  | "Anniversary"
  | "Baby Shower"
  | "Welcome Baby"
  | "Engagement"
  | "House Warming"
  | "Romantic Setup"
  | "Kids Activities"
  | "Corporate Events";

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  startingPrice: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  packageInclusions: string[];
  addOns?: Array<{
    title: string;
    price: number;
  }>;
  pricingNote?: string;
  serviceHighlights: string[];
  availableCities: City[];
}
