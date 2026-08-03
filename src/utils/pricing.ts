import type { MealSize } from "../types";

export const getSizeMultiplier = (size: MealSize): number => {
  const multipliers: Record<MealSize, number> = {
    "500g": 0.7,
    "1kg": 1,
    "2kg": 1.8,
  };
  return multipliers[size] || 1;
};

export const calculateMealPrice = (basePrice: number, size: MealSize): number => {
  return Math.round(basePrice * getSizeMultiplier(size));
};

export const generateOrderNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `QC-${year}-${randomNum}`;
};

export const formatCurrency = (amount: number): string => {
  return `৳${amount.toLocaleString()}`;
};
