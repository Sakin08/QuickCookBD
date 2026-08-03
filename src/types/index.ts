export interface Meal {
  id: number;
  name: string;
  namebn: string;
  description: string;
  basePrice: number;
  image: string;
  prepTime: string;
  servings: string;
  tags: string[];
  ingredients: string[];
  rating?: number;
  totalReviews?: number;
}

export interface CartItem extends Meal {
  quantity: number;
  selectedSize: "500g" | "1kg" | "2kg";
  price: number;
}

export interface WeeklyMeal {
  day: string;
  mealId: number | null;
}

export interface Review {
  id: string;
  mealId: number;
  orderId: string;
  userName: string;
  userLocation: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  status:
    | "preparing"
    | "cooking"
    | "packed"
    | "out-for-delivery"
    | "delivered";
  items: CartItem[];
  total: number;
  estimatedDelivery: string;
}

export type Screen =
  | "home"
  | "meals"
  | "mealDetail"
  | "quantitySelection"
  | "subscriptionType"
  | "weeklySelection"
  | "cart"
  | "wallet"
  | "delivery"
  | "payment"
  | "confirmation"
  | "manageSubscription"
  | "login"
  | "profile"
  | "orderTracking"
  | "adminDashboard"
  | "rateOrder";

export type SubscriptionType = "one-time" | "weekly";
export type MealSize = "500g" | "1kg" | "2kg";
