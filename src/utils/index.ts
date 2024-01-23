import { SanityProductType } from "@/types";

export const formatPrice = (value: number = 0) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const formatRoundingK = (value: number = 0) => {
  if (value < 1000) {
    return value.toString();
  } else {
    const roundedNumber = Math.round(value / 100) / 10;
    return `${roundedNumber.toString()}k`;
  }
};

export const getTotalPriceCart = (products?: SanityProductType[]) => {
  if (!products) {
    return 0;
  }

  const total = products?.reduce(
    (accumulator: number, currentValue: SanityProductType) =>
      accumulator + (currentValue?.quantity || 0) * (currentValue?.price || 0),
    0
  );

  return total;
};

export const getTotalQuantityCart = (products?: SanityProductType[]) => {
  if (!products) {
    return 0;
  }

  const total = products?.reduce(
    (accumulator: number, currentValue: SanityProductType) =>
      accumulator + (currentValue?.quantity || 0),
    0
  );

  return total;
};

export const generateSlug = (inputString: string) => {
  return inputString
    .normalize("NFD") // Normalize to decomposed form (handles diacritical marks)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .trim(); // Trim leading and trailing spaces (if any)
};

export const getAlt = (alt?: string) => {
  if (!alt) {
    return "may-tinh-viet";
  }

  return generateSlug(alt);
};
