export const OFFER_DISCOUNT_PERCENTAGE = 10;

export const getSpecialPrice = (price: number) =>
  Math.round(price * (1 - OFFER_DISCOUNT_PERCENTAGE / 100));

export const formatPrice = (price: number) => `Rs. ${price.toLocaleString("en-IN")}`;

