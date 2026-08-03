import { useState } from "react";
import type { CartItem, Meal, MealSize } from "../types";
import { calculateMealPrice } from "../utils/pricing";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (meal: Meal, size: MealSize) => {
    const price = calculateMealPrice(meal.basePrice, size);
    const existing = cart.find(
      (item) => item.id === meal.id && item.selectedSize === size
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === meal.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...meal, quantity: 1, selectedSize: size, price }]);
    }
  };

  const updateQuantity = (id: number, size: MealSize, quantity: number) => {
    if (quantity === 0) {
      setCart(
        cart.filter((item) => !(item.id === id && item.selectedSize === size))
      );
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => setCart([]);

  return {
    cart,
    addToCart,
    updateQuantity,
    calculateTotal,
    clearCart,
  };
};
