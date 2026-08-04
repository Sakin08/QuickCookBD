import { useState } from "react";
import type { Screen, User, Order, CartItem, WeeklyMeal, Meal, MealSize, SubscriptionType } from "./types";
import { meals } from "./data/meals";
import { sampleReviews } from "./data/reviews";
import { Header } from "./components/Header";
import { HomeScreen } from "./pages/HomeScreen";
import { MealsScreen } from "./pages/MealsScreen";
import { MealDetailScreen } from "./pages/MealDetailScreen";
import { QuantitySelectionScreen } from "./pages/QuantitySelectionScreen";
import { SubscriptionTypeScreen } from "./pages/SubscriptionTypeScreen";
import { CartScreen } from "./pages/CartScreen";
import { generateOrderNumber, calculateMealPrice } from "./utils/pricing";

import chickenCurryImg from "./assets/meals item/chicken-curry-kit.jpg";
import ruiFishImg from "./assets/meals item/rui fish kit.jpg";
import bkashLogo from "./assets/bkash logo.jpeg";
import nagadLogo from "./assets/nagad logo.png";

export default function OrderingSystem() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedSize, setSelectedSize] = useState<MealSize>("500g");
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>("one-time");
  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMeal[]>([
    { day: "Saturday", mealId: null },
    { day: "Sunday", mealId: null },
    { day: "Monday", mealId: null },
    { day: "Tuesday", mealId: null },
    { day: "Wednesday", mealId: null },
    { day: "Thursday", mealId: null },
  ]);
  const [walletBalance, setWalletBalance] = useState(2500);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [useWallet, setUseWallet] = useState(false);

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

  const updateQuantity = (id: number, size: string, quantity: number) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Header
        cartCount={cart.length}
        onCartClick={() => setCurrentScreen("cart")}
        onLogoClick={() => setCurrentScreen("home")}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onLoginClick={() => setCurrentScreen("login")}
        onProfileClick={() => setCurrentScreen("profile")}
        onAdminClick={() => setCurrentScreen("adminDashboard")}
      />

      {currentScreen === "home" && (
        <HomeScreen onBrowse={() => setCurrentScreen("meals")} />
      )}

      {currentScreen === "meals" && (
        <MealsScreen
          meals={meals}
          onSelectMeal={(meal) => {
            setSelectedMeal(meal);
            setCurrentScreen("mealDetail");
          }}
        />
      )}

      {currentScreen === "mealDetail" && selectedMeal && (
        <MealDetailScreen
          meal={selectedMeal}
          onAddToCart={() => setCurrentScreen("quantitySelection")}
          onBack={() => setCurrentScreen("meals")}
        />
      )}

      {currentScreen === "quantitySelection" && selectedMeal && (
        <QuantitySelectionScreen
          meal={selectedMeal}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          onConfirm={() => {
            addToCart(selectedMeal, selectedSize);
            setCurrentScreen("subscriptionType");
          }}
          onBack={() => setCurrentScreen("mealDetail")}
        />
      )}

      {currentScreen === "subscriptionType" && (
        <SubscriptionTypeScreen
          selectedType={subscriptionType}
          onSelectType={setSubscriptionType}
          onContinue={() => {
            if (subscriptionType === "weekly") {
              setCurrentScreen("weeklySelection");
            } else {
              setCurrentScreen("cart");
            }
          }}
          onBack={() => setCurrentScreen("quantitySelection")}
        />
      )}

      {currentScreen === "cart" && (
        <CartScreen
          cart={cart}
          onUpdateQuantity={updateQuantity}
          total={calculateTotal()}
          onContinue={() => setCurrentScreen("wallet")}
          onBack={() => setCurrentScreen("meals")}
          subscriptionType={subscriptionType}
        />
      )}

      {/* TODO: Extract remaining screens to pages/ folder */}
      {/* WeeklySelectionScreen, WalletScreen, DeliveryScreen, PaymentScreen, */}
      {/* ConfirmationScreen, ManageSubscriptionScreen, LoginScreen, ProfileScreen, */}
      {/* OrderTrackingScreen, RateOrderScreen, AdminDashboardScreen */}
      
      {currentScreen === "weeklySelection" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Weekly Selection Screen
            </h2>
            <p className="text-gray-600 mb-6">
              This screen is still in the old OrderingSystem.tsx
            </p>
            <button
              onClick={() => setCurrentScreen("cart")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Cart
            </button>
          </div>
        </div>
      )}

      {currentScreen === "wallet" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Wallet Screen
            </h2>
            <p className="text-gray-600 mb-6">
              Balance: ৳{walletBalance}
            </p>
            <button
              onClick={() => setCurrentScreen("delivery")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Delivery
            </button>
          </div>
        </div>
      )}

      {currentScreen === "delivery" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Delivery Screen
            </h2>
            <button
              onClick={() => setCurrentScreen("payment")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {currentScreen === "payment" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Payment Screen
            </h2>
            <button
              onClick={() => {
                setCurrentOrder({
                  id: generateOrderNumber(),
                  status: "preparing",
                  items: cart,
                  total: calculateTotal(),
                  estimatedDelivery: "2:30 PM Today",
                });
                setCurrentScreen("confirmation");
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {currentScreen === "confirmation" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Order #{currentOrder?.id}
            </p>
            <button
              onClick={() => {
                setCart([]);
                setCurrentScreen("home");
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {currentScreen === "login" && (
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
              Login
            </h2>
            <button
              onClick={() => {
                setCurrentUser({
                  name: "Demo User",
                  email: "demo@quickcook.bd",
                  phone: "01700000000",
                  address: "Dhaka, Bangladesh",
                });
                setIsLoggedIn(true);
                setCurrentScreen("home");
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Demo Login
            </button>
          </div>
        </div>
      )}

      {currentScreen === "profile" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Profile</h2>
            <p className="text-gray-600 mb-4">Name: {currentUser?.name}</p>
            <p className="text-gray-600 mb-6">Email: {currentUser?.email}</p>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
                setCurrentScreen("home");
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {(currentScreen === "manageSubscription" ||
        currentScreen === "orderTracking" ||
        currentScreen === "rateOrder" ||
        currentScreen === "adminDashboard") && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1).replace(/([A-Z])/g, ' $1')}
            </h2>
            <p className="text-gray-600 mb-6">
              This screen needs to be extracted to pages/ folder
            </p>
            <button
              onClick={() => setCurrentScreen("home")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
