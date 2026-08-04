import { useState } from "react";
import type {
  Screen,
  User,
  Order,
  CartItem,
  WeeklyMeal,
  Meal,
  MealSize,
  SubscriptionType,
} from "./types";
import { meals } from "./data/meals";
import { Header } from "./components/Header";
import { HomeScreen } from "./pages/HomeScreen";
import { MealsScreen } from "./pages/MealsScreen";
import { MealDetailScreen } from "./pages/MealDetailScreen";
import { QuantitySelectionScreen } from "./pages/QuantitySelectionScreen";
import { SubscriptionTypeScreen } from "./pages/SubscriptionTypeScreen";
import { WeeklySelectionScreen } from "./pages/WeeklySelectionScreen";
import { CartScreen } from "./pages/CartScreen";
import { WalletScreen } from "./pages/WalletScreen";
import { DeliveryScreen } from "./pages/DeliveryScreen";
import { LoginScreen } from "./pages/LoginScreen";
import { generateOrderNumber, calculateMealPrice } from "./utils/pricing";

import bkashLogo from "./assets/bkash logo.jpeg";
import nagadLogo from "./assets/nagad logo.png";

export default function OrderingSystem() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedSize, setSelectedSize] = useState<MealSize>("500g");
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionType>("one-time");
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
      (item) => item.id === meal.id && item.selectedSize === size,
    );
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === meal.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...meal, quantity: 1, selectedSize: size, price }]);
    }
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity === 0) {
      setCart(
        cart.filter((item) => !(item.id === id && item.selectedSize === size)),
      );
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity }
            : item,
        ),
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

      {currentScreen === "weeklySelection" && (
        <WeeklySelectionScreen
          meals={meals}
          weeklyMeals={weeklyMeals}
          onUpdateDay={(day, mealId) => {
            setWeeklyMeals(
              weeklyMeals.map((wm) =>
                wm.day === day ? { ...wm, mealId } : wm,
              ),
            );
          }}
          onContinue={() => setCurrentScreen("cart")}
          onBack={() => setCurrentScreen("subscriptionType")}
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

      {currentScreen === "wallet" && (
        <WalletScreen
          balance={walletBalance}
          useWallet={useWallet}
          onToggleWallet={() => setUseWallet(!useWallet)}
          total={calculateTotal()}
          onContinue={() => setCurrentScreen("delivery")}
          onBack={() => setCurrentScreen("cart")}
        />
      )}

      {currentScreen === "delivery" && (
        <DeliveryScreen
          onContinue={() => setCurrentScreen("payment")}
          onBack={() => setCurrentScreen("wallet")}
        />
      )}

      {currentScreen === "payment" && (
        <PaymentPlaceholder
          onConfirm={() => {
            setCurrentOrder({
              id: generateOrderNumber(),
              status: "preparing",
              items: cart,
              total: calculateTotal(),
              estimatedDelivery: "2:30 PM Today",
            });
            setCurrentScreen("confirmation");
          }}
          onBack={() => setCurrentScreen("delivery")}
        />
      )}

      {currentScreen === "confirmation" && (
        <ConfirmationPlaceholder
          onBackHome={() => {
            setCart([]);
            setCurrentScreen("home");
          }}
          orderId={currentOrder?.id || ""}
        />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onLogin={(userInfo) => {
            setCurrentUser(userInfo);
            setIsLoggedIn(true);
            if (userInfo.email === "admin@quickcook.bd") {
              setIsAdmin(true);
            }
            setCurrentScreen("home");
          }}
          onBack={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "profile" && currentUser && (
        <ProfilePlaceholder
          user={currentUser}
          onLogout={() => {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setCurrentUser(null);
            setCurrentScreen("home");
          }}
          onBack={() => setCurrentScreen("home")}
        />
      )}

      {(currentScreen === "manageSubscription" ||
        currentScreen === "orderTracking" ||
        currentScreen === "rateOrder" ||
        currentScreen === "adminDashboard") && (
        <GenericPlaceholder
          title={currentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      )}
    </div>
  );
}

// Placeholder components with modern design
function PaymentPlaceholder({
  onConfirm,
  onBack,
}: {
  onConfirm: () => void;
  onBack: () => void;
}) {
  const [selectedPayment, setSelectedPayment] = useState("bkash");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                💳 Payment
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Method
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Choose your payment method</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <label
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPayment === "bkash"
                  ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg"
                  : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "bkash"}
                onChange={() => setSelectedPayment("bkash")}
                className="w-6 h-6 text-orange-600"
              />
              <img
                src={bkashLogo}
                alt="bKash"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-gray-900 text-lg">bKash</span>
            </label>

            <label
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPayment === "nagad"
                  ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg"
                  : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "nagad"}
                onChange={() => setSelectedPayment("nagad")}
                className="w-6 h-6 text-orange-600"
              />
              <img
                src={nagadLogo}
                alt="Nagad"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-gray-900 text-lg">Nagad</span>
            </label>

            <label
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPayment === "cash"
                  ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg"
                  : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "cash"}
                onChange={() => setSelectedPayment("cash")}
                className="w-6 h-6 text-orange-600"
              />
              <div className="text-4xl">💵</div>
              <span className="font-bold text-gray-900 text-lg">
                Cash on Delivery
              </span>
            </label>
          </div>

          <button
            onClick={onConfirm}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Confirm Order</span>
              <span className="group-hover:translate-x-1 transition-transform">
                ✓
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPlaceholder({
  onBackHome,
  orderId,
}: {
  onBackHome: () => void;
  orderId: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/40">
          <div className="text-8xl mb-6 animate-bounce">✅</div>
          <h2 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Order Confirmed!
            </span>
          </h2>
          <p className="text-2xl text-gray-600 mb-3">
            Thank you for your order
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Order Number:{" "}
            <span className="font-bold text-orange-600">{orderId}</span>
          </p>
          <button
            onClick={onBackHome}
            className="group bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-10 py-4 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>Back to Home</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePlaceholder({
  user,
  onLogout,
  onBack,
}: {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Phone</div>
              <div className="font-semibold text-gray-900">{user.phone}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Address</div>
              <div className="font-semibold text-gray-900">{user.address}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-red-600 shadow-lg hover:shadow-xl transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function GenericPlaceholder({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/40">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            {title
              .replace(/([A-Z])/g, " $1")
              .trim()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            This screen is under development
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
