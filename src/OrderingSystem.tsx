import { useState } from "react";
import chickenCurryImg from "./assets/meals item/chicken-curry-kit.jpg";
import beefCurryImg from "./assets/meals item/chicken curry.jpg";
import chickenRoastImg from "./assets/meals item/chicken roast kit.jpg";
import beefKalaBhunaImg from "./assets/meals item/beef kala vuna kit.jpg";
import ruiFishImg from "./assets/meals item/rui fish kit.jpg";
import chingriMalaiImg from "./assets/meals item/Chingri Malai Curry Kit.jpeg";
import vegetableCurryImg from "./assets/meals item/mix vegitable kit.jpeg";
import pastaImg from "./assets/meals item/pasta kit.webp";
import grilledChickenImg from "./assets/meals item/griled chicken kit.jpeg";
import bkashLogo from "./assets/bkash logo.jpeg";
import nagadLogo from "./assets/nagad logo.png";

interface Meal {
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

interface CartItem extends Meal {
  quantity: number;
  selectedSize: "500g" | "1kg" | "2kg";
  price: number;
}

interface WeeklyMeal {
  day: string;
  mealId: number | null;
}

interface Review {
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

type Screen =
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

const meals: Meal[] = [
  {
    id: 1,
    name: "Chicken Curry Kit",
    namebn: "মুরগির তরকারি",
    description: "Pre-marinated chicken with authentic Bangladeshi spices",
    basePrice: 450,
    image: chickenCurryImg,
    prepTime: "20 min",
    servings: "2-3 people",
    tags: ["Popular", "Spicy"],
    ingredients: ["Chicken 500g", "Onions", "Spice mix", "Curry base"],
    rating: 4.8,
    totalReviews: 127,
  },
  {
    id: 2,
    name: "Beef Curry Kit",
    namebn: "গরুর তরকারি",
    description: "Tender beef pieces with rich Bengali curry gravy",
    basePrice: 680,
    image: beefCurryImg,
    prepTime: "35 min",
    servings: "2-3 people",
    tags: ["Premium", "Rich"],
    ingredients: ["Beef 500g", "Curry spices", "Onions", "Ghee"],
    rating: 4.6,
    totalReviews: 89,
  },
  {
    id: 3,
    name: "Chicken Roast Kit",
    namebn: "মুরগির রোস্ট",
    description: "Traditional Bengali wedding-style chicken roast",
    basePrice: 520,
    image: chickenRoastImg,
    prepTime: "25 min",
    servings: "2-3 people",
    tags: ["Special", "Festive"],
    ingredients: ["Chicken 500g", "Roast masala", "Yogurt", "Fried onions"],
    rating: 4.9,
    totalReviews: 156,
  },
  {
    id: 4,
    name: "Beef Kala Bhuna Kit",
    namebn: "গরুর কালা ভুনা",
    description: "Chittagong-style dark roasted beef specialty",
    basePrice: 750,
    image: beefKalaBhunaImg,
    prepTime: "40 min",
    servings: "2-3 people",
    tags: ["Signature", "Spicy"],
    ingredients: ["Beef 500g", "Kala bhuna spices", "Dark masala", "Ghee"],
    rating: 4.9,
    totalReviews: 203,
  },
  {
    id: 5,
    name: "Rui Fish Curry Kit",
    namebn: "রুই মাছের ঝোল",
    description: "Traditional Bengali fish curry with Rui fish",
    basePrice: 580,
    image: ruiFishImg,
    prepTime: "25 min",
    servings: "2-3 people",
    tags: ["Traditional", "Healthy"],
    ingredients: ["Fresh Rui fish", "Turmeric", "Mustard oil", "Curry spices"],
    rating: 4.7,
    totalReviews: 98,
  },
  {
    id: 6,
    name: "Chingri Malai Curry Kit",
    namebn: "চিংড়ি মালাই তরকারি",
    description: "Creamy prawn curry with coconut milk",
    basePrice: 850,
    image: chingriMalaiImg,
    prepTime: "20 min",
    servings: "2-3 people",
    tags: ["Premium", "Creamy"],
    ingredients: ["Large prawns", "Coconut milk", "Malai", "Special spices"],
    rating: 5.0,
    totalReviews: 178,
  },
  {
    id: 7,
    name: "Vegetable Curry Kit",
    namebn: "সবজির তরকারি",
    description: "Mixed seasonal vegetables in Bengali-style curry",
    basePrice: 380,
    image: vegetableCurryImg,
    prepTime: "18 min",
    servings: "2-3 people",
    tags: ["Vegetarian", "Healthy"],
    ingredients: ["Mixed vegetables", "Panch phoron", "Mustard oil", "Spices"],
    rating: 4.5,
    totalReviews: 72,
  },
  {
    id: 9,
    name: "Pasta Kit",
    namebn: "পাস্তা",
    description: "Italian pasta with Bengali-style masala twist",
    basePrice: 350,
    image: pastaImg,
    prepTime: "12 min",
    servings: "1-2 people",
    tags: ["Fusion", "Kids Favorite"],
    ingredients: ["Pasta", "Masala sauce", "Vegetables", "Cheese"],
    rating: 4.4,
    totalReviews: 64,
  },
  {
    id: 10,
    name: "Grilled Chicken Healthy Kit",
    namebn: "গ্রিল্ড চিকেন",
    description: "Low-oil grilled chicken with herbs and salad",
    basePrice: 480,
    image: grilledChickenImg,
    prepTime: "18 min",
    servings: "1-2 people",
    tags: ["Healthy", "Low-cal"],
    ingredients: ["Chicken breast", "Herbs", "Salad mix", "Healthy marinade"],
    rating: 4.6,
    totalReviews: 83,
  },
];

// Sample reviews for demo - organized by mealId (3 reviews per meal)
const sampleReviews: Review[] = [
  // Chicken Curry Kit (id: 1)
  {
    id: "R001",
    mealId: 1,
    orderId: "QC-2026-045",
    userName: "Tasnim Rahman",
    userLocation: "Gulshan, Dhaka",
    rating: 5,
    comment:
      "অসাধারণ! ঘরে বসে রেস্টুরেন্টের স্বাদ পেলাম। মুরগির তরকারি কিটটি দারুণ ছিল। সব কিছু প্রি-কাট এবং মসলা দেওয়া থাকায় রান্না করা খুব সহজ হয়েছে।",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R002",
    mealId: 1,
    orderId: "QC-2026-132",
    userName: "Rafi Ahmed",
    userLocation: "Dhanmondi, Dhaka",
    rating: 5,
    comment:
      "Fresh ingredients and authentic taste. The chicken was perfectly marinated. Cooked it in just 20 minutes!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R003",
    mealId: 1,
    orderId: "QC-2026-089",
    userName: "Nusrat Jahan",
    userLocation: "Banani, Dhaka",
    rating: 4,
    comment:
      "Very good quality. Taste was excellent but portion could be slightly bigger. Overall highly recommended!",
    date: "3 days ago",
    verified: true,
  },

  // Beef Curry Kit (id: 2)
  {
    id: "R004",
    mealId: 2,
    orderId: "QC-2026-156",
    userName: "Kamal Hossain",
    userLocation: "Motijheel, Dhaka",
    rating: 5,
    comment:
      "গরুর মাংস একদম নরম এবং তরকারি দারুণ হয়েছে! মসলাগুলো perfect ছিল। আবার অর্ডার করবো।",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R005",
    mealId: 2,
    orderId: "QC-2026-198",
    userName: "Farhana Akter",
    userLocation: "Bashundhara, Dhaka",
    rating: 4,
    comment:
      "Beef was tender and flavorful. Cooking was easy with all ingredients prepped. Great for busy weeknights!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R006",
    mealId: 2,
    orderId: "QC-2026-223",
    userName: "Arif Rahman",
    userLocation: "Lalmatia, Dhaka",
    rating: 5,
    comment:
      "Best beef curry kit I've tried! The spice blend is authentic and the quality of meat is excellent.",
    date: "3 days ago",
    verified: true,
  },

  // Chicken Roast Kit (id: 3)
  {
    id: "R007",
    mealId: 3,
    orderId: "QC-2026-267",
    userName: "Sumaiya Islam",
    userLocation: "Mohammadpur, Dhaka",
    rating: 5,
    comment:
      "একদম বিয়ে বাড়ির স্টাইল চিকেন রোস্ট হয়েছে! গেস্টরা অনেক প্রশংসা করেছে। QuickCook ধন্যবাদ!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R008",
    mealId: 3,
    orderId: "QC-2026-289",
    userName: "Tanvir Hasan",
    userLocation: "Khilgaon, Dhaka",
    rating: 5,
    comment:
      "Wedding-style roast at home! The yogurt marinade and fried onions made it perfect. Family loved it!",
    date: "4 days ago",
    verified: true,
  },
  {
    id: "R009",
    mealId: 3,
    orderId: "QC-2026-301",
    userName: "Rehana Begum",
    userLocation: "Mirpur DOHS, Dhaka",
    rating: 5,
    comment:
      "Outstanding quality! The roast masala is perfectly balanced. Will definitely order again for special occasions.",
    date: "1 week ago",
    verified: true,
  },

  // Beef Kala Bhuna Kit (id: 4)
  {
    id: "R010",
    mealId: 4,
    orderId: "QC-2026-201",
    userName: "Mahmud Hassan",
    userLocation: "Uttara, Dhaka",
    rating: 5,
    comment:
      "কালা ভুনা একদম চিটাগাং স্টাইল হয়েছে! মসলার ব্যালেন্স পারফেক্ট। পরিবারের সবার খুব পছন্দ হয়েছে।",
    date: "4 days ago",
    verified: true,
  },
  {
    id: "R011",
    mealId: 4,
    orderId: "QC-2026-334",
    userName: "Shahed Alam",
    userLocation: "Chittagong",
    rating: 5,
    comment:
      "Being from Chittagong, I'm very particular about Kala Bhuna. This is authentic! Best kit I've ordered.",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R012",
    mealId: 4,
    orderId: "QC-2026-356",
    userName: "Nasrin Sultana",
    userLocation: "Baridhara, Dhaka",
    rating: 5,
    comment:
      "Rich, dark, and full of flavor! The beef was so tender. This is now my go-to meal kit!",
    date: "6 days ago",
    verified: true,
  },

  // Rui Fish Curry Kit (id: 5)
  {
    id: "R013",
    mealId: 5,
    orderId: "QC-2026-378",
    userName: "Laboni Das",
    userLocation: "Segunbagicha, Dhaka",
    rating: 5,
    comment:
      "মাছটা একদম fresh ছিল! ঝোল দারুণ হয়েছে। মাছ প্রেমীদের জন্য পারফেক্ট কিট।",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R014",
    mealId: 5,
    orderId: "QC-2026-392",
    userName: "Rashid Khan",
    userLocation: "Purana Paltan, Dhaka",
    rating: 4,
    comment:
      "Fresh Rui fish and good spices. Traditional Bengali taste. Would love slightly more fish pieces.",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R015",
    mealId: 5,
    orderId: "QC-2026-401",
    userName: "Ayesha Siddiqua",
    userLocation: "Green Road, Dhaka",
    rating: 5,
    comment:
      "Authentic Bengali fish curry! The mustard oil flavor was perfect. Highly recommended!",
    date: "1 week ago",
    verified: true,
  },

  // Chingri Malai Curry Kit (id: 6)
  {
    id: "R016",
    mealId: 6,
    orderId: "QC-2026-178",
    userName: "Sadia Karim",
    userLocation: "Mirpur, Dhaka",
    rating: 5,
    comment:
      "Chingri Malai Curry was absolutely delicious! Fresh prawns and the coconut milk base was perfect. Worth every taka!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R017",
    mealId: 6,
    orderId: "QC-2026-445",
    userName: "Imran Ahmed",
    userLocation: "Banani, Dhaka",
    rating: 5,
    comment:
      "চিংড়ি একদম বড় সাইজের এবং ফ্রেশ! মালাই কারি রেস্টুরেন্ট কোয়ালিটি হয়েছে। Loved it!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R018",
    mealId: 6,
    orderId: "QC-2026-467",
    userName: "Jannatul Ferdous",
    userLocation: "Gulshan, Dhaka",
    rating: 5,
    comment:
      "Premium quality prawns! The malai curry was creamy and rich. Perfect for special dinners!",
    date: "4 days ago",
    verified: true,
  },

  // Vegetable Curry Kit (id: 7)
  {
    id: "R019",
    mealId: 7,
    orderId: "QC-2026-489",
    userName: "Mithila Roy",
    userLocation: "Shantinagar, Dhaka",
    rating: 5,
    comment:
      "Vegetables were super fresh! পাঁচফোড়ন এর সুগন্ধ দারুণ ছিল। Healthy এবং tasty!",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R020",
    mealId: 7,
    orderId: "QC-2026-512",
    userName: "Farhan Mahmud",
    userLocation: "Tejgaon, Dhaka",
    rating: 4,
    comment:
      "Great vegetarian option! Fresh seasonal vegetables and good spice mix. Quick and healthy meal.",
    date: "6 days ago",
    verified: true,
  },
  {
    id: "R021",
    mealId: 7,
    orderId: "QC-2026-534",
    userName: "Sharmin Akter",
    userLocation: "Eskaton, Dhaka",
    rating: 5,
    comment:
      "Love this healthy option! Perfect for meatless days. The panch phoron adds authentic Bengali flavor.",
    date: "1 week ago",
    verified: true,
  },

  // Pasta Kit (id: 9)
  {
    id: "R022",
    mealId: 9,
    orderId: "QC-2026-556",
    userName: "Rafsan Chowdhury",
    userLocation: "Mohakhali, Dhaka",
    rating: 4,
    comment:
      "বাচ্চারা খুব পছন্দ করেছে! Bengali spices এর সাথে pasta একদম unique combination।",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R023",
    mealId: 9,
    orderId: "QC-2026-578",
    userName: "Nadia Islam",
    userLocation: "Uttara Sector 7, Dhaka",
    rating: 5,
    comment:
      "My kids absolutely love this! Fusion done right. Quick to make and delicious!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R024",
    mealId: 9,
    orderId: "QC-2026-601",
    userName: "Tahmid Rahman",
    userLocation: "Bashundhara R/A, Dhaka",
    rating: 4,
    comment:
      "Interesting fusion! The masala sauce with pasta works surprisingly well. Kids friendly option.",
    date: "4 days ago",
    verified: true,
  },

  // Grilled Chicken Healthy Kit (id: 10)
  {
    id: "R025",
    mealId: 10,
    orderId: "QC-2026-623",
    userName: "Fahmida Noor",
    userLocation: "Dhanmondi 27, Dhaka",
    rating: 5,
    comment:
      "Perfect for my diet plan! Low oil, high protein। Chicken breast was tender and herbs were fresh!",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R026",
    mealId: 10,
    orderId: "QC-2026-645",
    userName: "Azizul Haque",
    userLocation: "Banani DOHS, Dhaka",
    rating: 5,
    comment:
      "Great healthy option! Grilled chicken was perfectly seasoned. The salad mix was fresh and crispy.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R027",
    mealId: 10,
    orderId: "QC-2026-667",
    userName: "Sabrina Khan",
    userLocation: "Gulshan 1, Dhaka",
    rating: 4,
    comment:
      "Healthy and tasty! Perfect for fitness conscious people. Would love more protein options like this.",
    date: "5 days ago",
    verified: true,
  },
];

export default function OrderingSystem() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedSize, setSelectedSize] = useState<"500g" | "1kg" | "2kg">(
    "500g",
  );
  const [subscriptionType, setSubscriptionType] = useState<
    "one-time" | "weekly"
  >("one-time");
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
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null>(null);
  const [currentOrder, setCurrentOrder] = useState<{
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
  } | null>(null);

  const [useWallet, setUseWallet] = useState(false);

  const getSizeMultiplier = (size: string) => {
    if (size === "500g") return 0.7;
    if (size === "1kg") return 1;
    if (size === "2kg") return 1.8;
    return 1;
  };

  const addToCart = (meal: Meal, size: "500g" | "1kg" | "2kg") => {
    const price = Math.round(meal.basePrice * getSizeMultiplier(size));
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
        <PaymentScreen
          cart={cart}
          total={calculateTotal()}
          useWallet={useWallet}
          walletBalance={walletBalance}
          subscriptionType={subscriptionType}
          onConfirm={() => {
            // Create order for tracking
            const orderNumber = `QC-${new Date().getFullYear()}-${Math.floor(
              Math.random() * 1000,
            )
              .toString()
              .padStart(3, "0")}`;
            const deliveryDate = new Date();
            deliveryDate.setHours(deliveryDate.getHours() + 2);

            setCurrentOrder({
              id: orderNumber,
              status: "preparing",
              items: cart,
              total: calculateTotal(),
              estimatedDelivery: deliveryDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
            });

            setCurrentScreen("confirmation");
          }}
          onBack={() => setCurrentScreen("delivery")}
        />
      )}

      {currentScreen === "confirmation" && (
        <ConfirmationScreen
          subscriptionType={subscriptionType}
          onViewSubscription={() => setCurrentScreen("manageSubscription")}
          onBackHome={() => {
            setCart([]);
            setCurrentScreen("home");
          }}
        />
      )}

      {currentScreen === "manageSubscription" && (
        <ManageSubscriptionScreen
          weeklyMeals={weeklyMeals}
          meals={meals}
          onBack={() => setCurrentScreen("home")}
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

            // Create a demo order for tracking (delivered status for demo)
            setCurrentOrder({
              id: `QC-2026-${Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0")}`,
              status: "delivered",
              items: [
                {
                  id: 1,
                  name: "Chicken Curry Kit",
                  namebn: "মুরগির তরকারি",
                  description:
                    "Pre-marinated chicken with authentic Bangladeshi spices",
                  basePrice: 450,
                  image: chickenCurryImg,
                  prepTime: "20 min",
                  servings: "2-3 people",
                  tags: ["Popular", "Spicy"],
                  ingredients: [
                    "Chicken 500g",
                    "Onions",
                    "Spice mix",
                    "Curry base",
                  ],
                  quantity: 2,
                  selectedSize: "1kg",
                  price: 450,
                  rating: 4.8,
                  totalReviews: 127,
                },
                {
                  id: 5,
                  name: "Rui Fish Curry Kit",
                  namebn: "রুই মাছের ঝোল",
                  description: "Traditional Bengali fish curry with Rui fish",
                  basePrice: 580,
                  image: ruiFishImg,
                  prepTime: "25 min",
                  servings: "2-3 people",
                  tags: ["Traditional", "Healthy"],
                  ingredients: [
                    "Fresh Rui fish",
                    "Turmeric",
                    "Mustard oil",
                    "Curry spices",
                  ],
                  quantity: 1,
                  selectedSize: "1kg",
                  price: 580,
                  rating: 4.7,
                  totalReviews: 98,
                },
              ],
              total: 1480,
              estimatedDelivery: "2:30 PM Today",
            });

            setCurrentScreen("home");
          }}
          onBack={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "profile" && isLoggedIn && currentUser && (
        <ProfileScreen
          user={currentUser}
          onUpdateUser={setCurrentUser}
          onOrderTracking={() => setCurrentScreen("orderTracking")}
          onLogout={() => {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setCurrentUser(null);
            setCurrentScreen("home");
          }}
          onBack={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "orderTracking" && currentOrder && (
        <OrderTrackingScreen
          order={currentOrder}
          onBack={() => setCurrentScreen("profile")}
          onRateOrder={() => setCurrentScreen("rateOrder")}
        />
      )}

      {currentScreen === "rateOrder" && currentOrder && (
        <RateOrderScreen
          order={currentOrder}
          onBack={() => setCurrentScreen("orderTracking")}
          onSubmitReview={(mealId, rating, comment) => {
            // In a real app, this would save to database
            console.log("Review submitted:", { mealId, rating, comment });
          }}
        />
      )}

      {currentScreen === "adminDashboard" && isAdmin && (
        <AdminDashboardScreen onBack={() => setCurrentScreen("home")} />
      )}
    </div>
  );
}

// Header Component
function Header({
  cartCount,
  onCartClick,
  onLogoClick,
  isLoggedIn,
  isAdmin,
  currentUser,
  onLoginClick,
  onProfileClick,
  onAdminClick,
}: {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUser: {
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onAdminClick: () => void;
}) {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onLogoClick}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-3xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                QuickCook BD
              </h1>
              <p className="text-xs text-orange-100 font-medium">
                Fresh Meals, Zero Prep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={onAdminClick}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                🔧 Admin
              </button>
            )}

            {isLoggedIn && currentUser ? (
              <button
                onClick={onProfileClick}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>👤</span>
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                🔐 Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative bg-white text-orange-600 px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Home Screen
function HomeScreen({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(255, 237, 213, 0.3) 0%, rgba(255, 214, 165, 0.2) 100%),
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 165, 0, 0.03) 35px, rgba(255, 165, 0, 0.03) 70px)
          `,
        }}
      />

      {/* Decorative Food Icons */}
      <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl transform -rotate-12">
          🍛
        </div>
        <div className="absolute top-20 right-20 text-7xl transform rotate-12">
          🥘
        </div>
        <div className="absolute bottom-20 left-20 text-9xl transform rotate-45">
          🍳
        </div>
        <div className="absolute bottom-10 right-10 text-7xl transform -rotate-12">
          🥗
        </div>
        <div className="absolute top-1/2 left-1/4 text-6xl transform -rotate-45">
          🍲
        </div>
        <div className="absolute top-1/3 right-1/4 text-8xl transform rotate-6">
          🥙
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Growth Metrics Banner */}
        <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-black mb-1">📈 30%</div>
              <div className="text-sm font-medium opacity-90">
                Monthly Growth
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div>
              <div className="text-3xl font-black mb-1">50+</div>
              <div className="text-sm font-medium opacity-90">Meals/Day</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div>
              <div className="text-3xl font-black mb-1">2M+</div>
              <div className="text-sm font-medium opacity-90">
                Target Market
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div>
              <div className="text-3xl font-black mb-1">৳500Cr+</div>
              <div className="text-sm font-medium opacity-90">Market Size</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16 bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-orange-100">
          <div className="inline-block mb-4">
            <span className="text-6xl">🍽️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Fresh Ingredients.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Zero Prep.
            </span>
          </h1>
          <p className="text-2xl text-orange-600 font-bold mb-3">
            Ready in 20 Minutes ⚡
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Authentic Bangladeshi meal kits with pre-cut, pre-marinated
            ingredients delivered fresh to your doorstep
          </p>
          <button
            onClick={onBrowse}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-pulse"
          >
            Browse Meal Kits →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "⏱️",
              title: "Save Time",
              desc: "Pre-cut & marinated ingredients",
              gradient: "from-blue-50 to-blue-100",
            },
            {
              icon: "🥘",
              title: "Authentic Taste",
              desc: "Traditional Bangladeshi recipes",
              gradient: "from-orange-50 to-orange-100",
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Same-day delivery available",
              gradient: "from-green-50 to-green-100",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center border border-white`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-4">
              <span className="text-2xl">⭐</span>
              <span className="font-black text-orange-600 text-xl">4.9/5</span>
              <span className="text-gray-600">from 2,500+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-orange-600 mb-1">
                2,500+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600 mb-1">
                50,000+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Meals Delivered
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600 mb-1">
                4.9/5
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600 mb-1">
                98%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Would Recommend
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Meals Screen
function MealsScreen({
  meals,
  onSelectMeal,
}: {
  meals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-black text-gray-900 mb-8">
        🍱 Available Meal Kits
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => onSelectMeal(meal)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {meal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-orange-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {meal.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{meal.namebn}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {meal.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>⏱️ {meal.prepTime}</span>
                <span>👥 {meal.servings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">
                  ৳{meal.basePrice}
                </span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Meal Detail Screen
function MealDetailScreen({
  meal,
  onAddToCart,
  onBack,
}: {
  meal: Meal;
  onAddToCart: () => void;
  onBack: () => void;
}) {
  // Get reviews for this meal
  const mealReviews = sampleReviews
    .filter((r) => r.mealId === meal.id)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back to Meals
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {meal.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/95 px-4 py-2 rounded-full text-sm font-bold text-orange-600 shadow-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {meal.name}
            </h1>
            <p className="text-xl text-gray-500 mb-4">{meal.namebn}</p>

            {/* Overall Rating */}
            {meal.rating && meal.totalReviews && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${i < Math.floor(meal.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    {meal.rating}
                  </div>
                  <div className="text-sm text-gray-600">
                    {meal.totalReviews} reviews
                  </div>
                </div>
              </div>
            )}

            <p className="text-lg text-gray-700 mb-8">{meal.description}</p>

            <div className="flex gap-8 mb-8 text-center">
              <div>
                <div className="text-3xl mb-1">⏱️</div>
                <div className="text-sm font-semibold text-gray-600">
                  {meal.prepTime}
                </div>
              </div>
              <div>
                <div className="text-3xl mb-1">👥</div>
                <div className="text-sm font-semibold text-gray-600">
                  {meal.servings}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                📦 What's Included:
              </h3>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                <div className="text-sm text-gray-500 mb-1">Starting from</div>
                <div className="text-4xl font-black text-orange-600">
                  ৳{meal.basePrice}
                </div>
              </div>
              <button
                onClick={onAddToCart}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Select Size →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {mealReviews.length > 0 && (
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-gray-900">
              ⭐ Customer Reviews
            </h2>
            <button
              className="bg-orange-100 text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-200 transition-all"
              onClick={() =>
                alert("Please order and receive this meal to write a review!")
              }
            >
              ✍️ Write a Review
            </button>
          </div>

          <div className="space-y-4">
            {mealReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {review.userName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {review.userLocation}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{review.date}</div>
                </div>
              </div>
            ))}
          </div>

          {meal.totalReviews && meal.totalReviews > 3 && (
            <div className="mt-6 text-center">
              <button className="text-orange-600 font-bold hover:text-orange-700 transition-all">
                View all {meal.totalReviews} reviews →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Quantity Selection Screen
function QuantitySelectionScreen({
  meal,
  selectedSize,
  onSizeChange,
  onConfirm,
  onBack,
}: {
  meal: Meal;
  selectedSize: string;
  onSizeChange: (size: "500g" | "1kg" | "2kg") => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const sizes = [
    {
      value: "500g",
      label: "500g",
      servings: "1-2 people",
      price: Math.round(meal.basePrice * 0.7),
    },
    {
      value: "1kg",
      label: "1kg",
      servings: "2-3 people",
      price: meal.basePrice,
    },
    {
      value: "2kg",
      label: "2kg",
      servings: "4-6 people",
      price: Math.round(meal.basePrice * 1.8),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          🍽️ Select Portion Size
        </h2>
        <p className="text-gray-600 mb-8">
          Choose the right size for your family
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {sizes.map((size) => (
            <div
              key={size.value}
              onClick={() => onSizeChange(size.value as any)}
              className={`p-6 rounded-2xl cursor-pointer transition-all border-4 ${
                selectedSize === size.value
                  ? "border-orange-500 bg-orange-50 shadow-xl scale-105"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">
                  {size.label}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {size.servings}
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  ৳{size.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Add to Cart & Continue →
        </button>
      </div>
    </div>
  );
}

// Subscription Type Screen
function SubscriptionTypeScreen({
  selectedType,
  onSelectType,
  onContinue,
  onBack,
}: {
  selectedType: string;
  onSelectType: (type: "one-time" | "weekly") => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          📋 Choose Your Plan
        </h2>
        <p className="text-gray-600 mb-8">
          Select how you'd like to receive your meals
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => onSelectType("one-time")}
            className={`p-8 rounded-2xl cursor-pointer transition-all border-4 ${
              selectedType === "one-time"
                ? "border-orange-500 bg-orange-50 shadow-xl"
                : "border-gray-200 bg-white hover:border-orange-300"
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <input
                type="radio"
                checked={selectedType === "one-time"}
                onChange={() => {}}
                className="mt-1 w-5 h-5 text-orange-600"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  One-Time Order
                </h3>
                <p className="text-gray-600 mb-4">
                  Order once, pay once. Perfect for trying out.
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> No commitment
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Full menu access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Fast delivery
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">Example:</div>
              <div className="text-lg font-bold text-gray-900">
                ৳450 <span className="text-sm font-normal">per meal</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectType("weekly")}
            className={`relative p-8 rounded-2xl cursor-pointer transition-all border-4 ${
              selectedType === "weekly"
                ? "border-orange-500 bg-orange-50 shadow-xl"
                : "border-gray-200 bg-white hover:border-orange-300"
            }`}
          >
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              SAVE 10% 💰
            </div>
            <div className="flex items-start gap-3 mb-4">
              <input
                type="radio"
                checked={selectedType === "weekly"}
                onChange={() => {}}
                className="mt-1 w-5 h-5 text-orange-600"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Weekly Subscription
                </h3>
                <p className="text-gray-600 mb-4">
                  6 meals per week. Save ৳270 weekly!
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 10% discount on all
                meals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Flexible scheduling
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Skip or pause anytime
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Priority delivery
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">You pay:</div>
              <div className="text-lg font-bold text-orange-600">
                ৳405{" "}
                <span className="text-sm font-normal text-gray-600">
                  per meal
                </span>
                <span className="ml-2 line-through text-gray-400 text-sm">
                  ৳450
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Calculator */}
        {selectedType === "weekly" && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="text-center">
              <h3 className="text-xl font-black text-green-900 mb-3">
                💰 Your Savings with Weekly Subscription
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-black text-green-600 mb-1">
                    ৳270
                  </div>
                  <div className="text-sm text-gray-700">Saved per Week</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-green-600 mb-1">
                    ৳1,080
                  </div>
                  <div className="text-sm text-gray-700">Saved per Month</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-green-600 mb-1">
                    ৳12,960
                  </div>
                  <div className="text-sm text-gray-700">Saved per Year</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-green-800 font-medium">
                🎉 Plus: Priority support & exclusive menu access!
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// Weekly Selection Screen
function WeeklySelectionScreen({
  meals,
  weeklyMeals,
  onUpdateDay,
  onContinue,
  onBack,
}: {
  meals: Meal[];
  weeklyMeals: WeeklyMeal[];
  onUpdateDay: (day: string, mealId: number) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          📅 Plan Your Weekly Meals
        </h2>
        <p className="text-gray-600 mb-8">
          Select a meal for each day of the week
        </p>

        <div className="space-y-6 mb-8">
          {weeklyMeals.map((day) => (
            <div
              key={day.day}
              className="border-2 border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {day.day}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => onUpdateDay(day.day, meal.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      day.mealId === meal.id
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <div className="text-sm font-semibold text-gray-900">
                      {meal.name}
                    </div>
                    <div className="text-xs text-gray-500">{meal.namebn}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          disabled={weeklyMeals.some((d) => !d.mealId)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Cart →
        </button>
      </div>
    </div>
  );
}

// Cart Screen
function CartScreen({
  cart,
  onUpdateQuantity,
  total,
  onContinue,
  onBack,
  subscriptionType,
}: {
  cart: CartItem[];
  onUpdateQuantity: (id: number, size: string, quantity: number) => void;
  total: number;
  onContinue: () => void;
  onBack: () => void;
  subscriptionType: string;
}) {
  const discount = subscriptionType === "weekly" ? 0.1 : 0;
  const deliveryFee = 100;
  const discountAmount = Math.round(total * discount);
  const finalTotal = total - discountAmount + deliveryFee;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back to Meals
      </button>

      <h2 className="text-3xl font-black text-gray-900 mb-8">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={onBack}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            Browse Meals
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.namebn} • {item.selectedSize}
                  </p>
                  <p className="text-orange-600 font-bold">
                    ৳{item.price} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1,
                      )
                    }
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 font-bold hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1,
                      )
                    }
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 font-bold hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">৳{total}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount * 100}%)</span>
                  <span className="font-semibold">-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold">৳{deliveryFee}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600">৳{finalTotal}</span>
              </div>
            </div>
            <button
              onClick={onContinue}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Continue to Wallet →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Wallet Screen
function WalletScreen({
  balance,
  useWallet,
  onToggleWallet,
  total,
  onContinue,
  onBack,
}: {
  balance: number;
  useWallet: boolean;
  onToggleWallet: () => void;
  total: number;
  onContinue: () => void;
  onBack: () => void;
}) {
  const walletPayment = useWallet ? Math.min(balance, total) : 0;
  const remaining = useWallet ? Math.max(0, total - balance) : total;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          💰 QuickCook Wallet
        </h2>
        <p className="text-gray-600 mb-8">
          Manage your wallet balance and payment
        </p>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Available Balance</div>
              <div className="text-4xl font-black">৳{balance}</div>
            </div>
            <div className="text-6xl">💳</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold transition">
              + Add Money
            </button>
            <button className="bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold transition">
              Transactions
            </button>
            <button className="bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold transition">
              Rewards
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 cursor-pointer transition">
            <input
              type="checkbox"
              checked={useWallet}
              onChange={onToggleWallet}
              className="w-6 h-6 text-orange-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-gray-900 mb-1">
                Use Wallet Balance
              </div>
              <div className="text-sm text-gray-600">
                Pay with your QuickCook wallet
              </div>
            </div>
          </label>
        </div>

        {useWallet && (
          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Payment Breakdown</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Order Total</span>
                <span className="font-semibold">৳{total}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Wallet Payment</span>
                <span className="font-semibold">-৳{walletPayment}</span>
              </div>
              {remaining > 0 && (
                <div className="flex justify-between text-orange-600 font-bold">
                  <span>Remaining to Pay</span>
                  <span>৳{remaining}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Continue to Delivery →
        </button>
      </div>
    </div>
  );
}

// Delivery Screen
function DeliveryScreen({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          📍 Delivery Information
        </h2>
        <p className="text-gray-600 mb-8">Enter your delivery details</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Complete Address
            </label>
            <textarea
              placeholder="House/Flat, Road, Area"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition">
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Time
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition">
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 8 PM)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}

// Payment Screen
function PaymentScreen({
  cart,
  total,
  useWallet,
  walletBalance,
  subscriptionType,
  onConfirm,
  onBack,
}: {
  cart: CartItem[];
  total: number;
  useWallet: boolean;
  walletBalance: number;
  subscriptionType: string;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const [selectedPayment, setSelectedPayment] = useState("bkash");
  const discount = subscriptionType === "weekly" ? 0.1 : 0;
  const deliveryFee = 100;
  const discountAmount = Math.round(total * discount);
  const subtotal = total - discountAmount + deliveryFee;
  const walletPayment = useWallet ? Math.min(walletBalance, subtotal) : 0;
  const finalTotal = subtotal - walletPayment;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              💳 Payment Method
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* bKash */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                  selectedPayment === "bkash"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "bkash"}
                  onChange={() => setSelectedPayment("bkash")}
                  className="w-5 h-5 text-orange-600"
                />
                <img
                  src={bkashLogo}
                  alt="bKash"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-semibold text-gray-900">bKash</span>
              </label>

              {/* Nagad */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                  selectedPayment === "nagad"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "nagad"}
                  onChange={() => setSelectedPayment("nagad")}
                  className="w-5 h-5 text-orange-600"
                />
                <img
                  src={nagadLogo}
                  alt="Nagad"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-semibold text-gray-900">Nagad</span>
              </label>

              {/* Card */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                  selectedPayment === "card"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "card"}
                  onChange={() => setSelectedPayment("card")}
                  className="w-5 h-5 text-orange-600"
                />
                <span className="text-2xl">💳</span>
                <span className="font-semibold text-gray-900">
                  Credit/Debit Card
                </span>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                  selectedPayment === "cod"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                  className="w-5 h-5 text-orange-600"
                />
                <span className="text-2xl">💵</span>
                <span className="font-semibold text-gray-900">
                  Cash on Delivery
                </span>
              </label>
            </div>

            {selectedPayment === "card" && (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">
          <h3 className="text-xl font-black text-gray-900 mb-6">
            📦 Order Summary
          </h3>

          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} ({item.selectedSize}) × {item.quantity}
                </span>
                <span className="font-semibold text-gray-900">
                  ৳{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-gray-700 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">৳{total}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discount * 100}%)</span>
                <span className="font-semibold">-৳{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold">৳{deliveryFee}</span>
            </div>
            {useWallet && walletPayment > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>Wallet Payment</span>
                <span className="font-semibold">-৳{walletPayment}</span>
              </div>
            )}
          </div>

          <div className="border-t-2 border-gray-200 pt-4 mb-6">
            <div className="flex justify-between text-2xl font-black">
              <span className="text-gray-900">Total</span>
              <span className="text-orange-600">৳{finalTotal}</span>
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Confirm Order →
          </button>
        </div>
      </div>
    </div>
  );
}

// Confirmation Screen
function ConfirmationScreen({
  subscriptionType,
  onViewSubscription,
  onBackHome,
}: {
  subscriptionType: string;
  onViewSubscription: () => void;
  onBackHome: () => void;
}) {
  const orderNumber = `QC${Math.floor(Math.random() * 100000)}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>

        <h2 className="text-4xl font-black text-green-600 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. You'll receive a confirmation SMS shortly.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-4">Order Details</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-bold">#{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-bold">Today, 6:00 PM - 8:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Plan Type:</span>
              <span className="font-bold capitalize">
                {subscriptionType === "weekly"
                  ? "Weekly Subscription"
                  : "One-Time Order"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {subscriptionType === "weekly" && (
            <button
              onClick={onViewSubscription}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Manage Subscription →
            </button>
          )}
          <button
            onClick={onBackHome}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl text-lg font-bold hover:border-orange-500 hover:text-orange-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Manage Subscription Screen
function ManageSubscriptionScreen({
  weeklyMeals,
  meals,
  onBack,
}: {
  weeklyMeals: WeeklyMeal[];
  meals: Meal[];
  onBack: () => void;
}) {
  const getMeal = (id: number | null) => meals.find((m) => m.id === id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              📊 Manage Subscription
            </h2>
            <p className="text-gray-600">
              View and manage your weekly meal plan
            </p>
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
            ✓ Active
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Next Delivery</div>
            <div className="text-3xl font-black mb-2">Saturday, Aug 3</div>
            <div className="text-sm opacity-90">6:00 PM - 8:00 PM</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-sm text-gray-600 mb-1">Weekly Savings</div>
            <div className="text-3xl font-black text-green-600 mb-2">৳450</div>
            <div className="text-sm text-gray-600">
              With 10% subscription discount
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          📅 Your Weekly Plan
        </h3>
        <div className="space-y-4 mb-8">
          {weeklyMeals.map((day) => {
            const meal = getMeal(day.mealId);
            return (
              <div
                key={day.day}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-300 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <div className="font-bold text-gray-900">{day.day}</div>
                  </div>
                  {meal ? (
                    <>
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">
                          {meal.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {meal.namebn}
                        </div>
                      </div>
                      <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-600 transition">
                        Change
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 text-gray-400">No meal selected</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 hover:border-orange-500 hover:text-orange-600 transition">
            Skip Next Week
          </button>
          <button className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 hover:border-orange-500 hover:text-orange-600 transition">
            Pause Subscription
          </button>
          <button className="bg-white border-2 border-red-200 px-6 py-3 rounded-xl font-bold text-red-600 hover:border-red-500 hover:bg-red-50 transition">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}

// Login Screen
function LoginScreen({
  onLogin,
  onBack,
}: {
  onLogin: (user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login - check for admin
    if (email === "admin@quickcook.bd" && password === "admin123") {
      onLogin({
        name: "Admin User",
        email: "admin@quickcook.bd",
        phone: "+880 1700-000000",
        address: "QuickCook BD Office, Dhaka",
      });
    } else {
      // Regular user login
      onLogin({
        name: email.includes("@") ? email.split("@")[0] : "User",
        email: email,
        phone: "+880 1700-123456",
        address: "Dhaka, Bangladesh",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Sign in to your QuickCook BD account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-800 font-medium">Demo Accounts:</p>
          <p className="text-xs text-orange-700 mt-1">
            Admin: admin@quickcook.bd / admin123
            <br />
            User: any email / any password
          </p>
        </div>
      </div>
    </div>
  );
}

// Profile Screen
function ProfileScreen({
  user,
  onUpdateUser,
  onOrderTracking,
  onLogout,
  onBack,
}: {
  user: { name: string; email: string; phone: string; address: string };
  onUpdateUser: (user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => void;
  onOrderTracking: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back to Home
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-black text-gray-900">My Profile</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={editedUser.address}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg">
                  {user.address}
                </p>
              )}
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button
                onClick={onOrderTracking}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                📦 Track My Order
              </button>

              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                🛒 Browse Meals
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-4">Account</h3>

            <button
              onClick={onLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Order Tracking Screen
function OrderTrackingScreen({
  order,
  onBack,
  onRateOrder,
}: {
  order: {
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
  };
  onBack: () => void;
  onRateOrder?: () => void;
}) {
  const statusSteps = [
    {
      key: "preparing",
      label: "Preparing",
      icon: "📋",
      desc: "Getting your ingredients ready",
    },
    {
      key: "cooking",
      label: "Cooking",
      icon: "🍳",
      desc: "Preparing your meal kit",
    },
    {
      key: "packed",
      label: "Packed",
      icon: "📦",
      desc: "Packaged and ready to ship",
    },
    {
      key: "out-for-delivery",
      label: "Out for Delivery",
      icon: "🚚",
      desc: "On the way to you",
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: "✅",
      desc: "Enjoy your meal!",
    },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.key === order.status);
  };

  const currentStepIndex = getCurrentStepIndex();
  const isDelivered = order.status === "delivered";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back to Profile
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">Order #{order.id}</p>
          <p className="text-orange-600 font-medium">
            {isDelivered
              ? "Delivered successfully!"
              : `Estimated delivery: ${order.estimatedDelivery}`}
          </p>
        </div>

        {/* Delivered - Rate Your Meal Banner */}
        {isDelivered && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-green-900 mb-2">
                  🎉 Order Delivered!
                </h3>
                <p className="text-green-700 mb-3">
                  We hope you enjoyed your meal! Please share your experience.
                </p>
              </div>
              <button
                onClick={onRateOrder}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
              >
                ⭐ Rate Your Meal
              </button>
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="mb-8">
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="flex items-center mb-6 last:mb-0"
                >
                  {/* Timeline Line */}
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-16 ${
                        index < currentStepIndex
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                      style={{ zIndex: 1 }}
                    />
                  )}

                  {/* Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl relative z-10 ${
                      isCompleted
                        ? isCurrent && !isDelivered
                          ? "bg-orange-500 text-white animate-pulse"
                          : "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Status Info */}
                  <div className="ml-4">
                    <h3
                      className={`font-bold ${isCompleted ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {step.label}
                    </h3>
                    <p
                      className={`text-sm ${isCompleted ? "text-gray-600" : "text-gray-400"}`}
                    >
                      {step.desc}
                    </p>
                    {isCurrent && !isDelivered && (
                      <p className="text-orange-600 font-medium text-sm mt-1">
                        Currently in progress...
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="border-t pt-8">
          <h3 className="text-xl font-black text-gray-900 mb-4">
            Order Details
          </h3>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="font-medium">
                    {item.name} ({item.selectedSize})
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-bold">৳{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-black">Total</p>
              <p className="text-xl font-black text-orange-600">
                ৳{order.total}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 p-4 bg-orange-50 rounded-lg">
          <h4 className="font-bold text-orange-800 mb-2">Need Help?</h4>
          <p className="text-orange-700 text-sm mb-3">
            Contact our support team if you have any questions about your order.
          </p>
          <div className="flex gap-4">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-700 transition-all">
              📞 Call Support
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-all">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Rate Order Screen
function RateOrderScreen({
  order,
  onBack,
  onSubmitReview,
}: {
  order: {
    id: string;
    items: CartItem[];
    total: number;
  };
  onBack: () => void;
  onSubmitReview: (mealId: number, rating: number, comment: string) => void;
}) {
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const currentMeal = order.items[selectedMealIndex];
  const isLastMeal = selectedMealIndex === order.items.length - 1;

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    if (comment.trim().length < 10) {
      alert("Please write at least 10 characters in your review!");
      return;
    }

    onSubmitReview(currentMeal.id, rating, comment);

    // Move to next meal or finish
    if (isLastMeal) {
      alert("Thank you for your reviews! 🎉");
      onBack();
    } else {
      setSelectedMealIndex(selectedMealIndex + 1);
      setRating(0);
      setHoveredRating(0);
      setComment("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-gray-900">
              Rate Your Meal
            </h1>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {selectedMealIndex + 1} of {order.items.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((selectedMealIndex + 1) / order.items.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Meal Info */}
        <div className="mb-8 p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
          <div className="flex items-center gap-4">
            <img
              src={currentMeal.image}
              alt={currentMeal.name}
              className="w-24 h-24 object-cover rounded-xl shadow-md"
            />
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">
                {currentMeal.name}
              </h2>
              <p className="text-gray-600">{currentMeal.namebn}</p>
              <p className="text-sm text-gray-500 mt-1">
                Size: {currentMeal.selectedSize} • Qty: {currentMeal.quantity}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How would you rate this meal?
          </h3>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transform transition-all hover:scale-125 focus:outline-none"
              >
                <span
                  className={`text-6xl ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ⭐
                </span>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center mt-4 text-lg font-medium text-orange-600">
              {rating === 5 && "Outstanding! 🎉"}
              {rating === 4 && "Great! 😊"}
              {rating === 3 && "Good 👍"}
              {rating === 2 && "Could be better 😐"}
              {rating === 1 && "Not satisfied 😞"}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Share your experience
          </h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you loved about this meal, or how we can improve... (minimum 10 characters)"
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none text-gray-700"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              {comment.length < 10
                ? `${10 - comment.length} more characters needed`
                : "Looking good! ✓"}
            </p>
            <p className="text-sm text-gray-400">{comment.length}/500</p>
          </div>
        </div>

        {/* Tips */}
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            💡 Tips for a helpful review:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Comment on the freshness and quality of ingredients</li>
            <li>• Mention the taste and authenticity of flavors</li>
            <li>• Share how easy it was to prepare</li>
            <li>• Let others know if portions were adequate</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {selectedMealIndex > 0 && (
            <button
              onClick={() => {
                setSelectedMealIndex(selectedMealIndex - 1);
                setRating(0);
                setComment("");
              }}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              ← Previous Meal
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || comment.trim().length < 10}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLastMeal ? "Submit Reviews 🎉" : "Next Meal →"}
          </button>
        </div>

        {/* Skip Option */}
        <div className="mt-4 text-center">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
// Admin Dashboard Screen
function AdminDashboardScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "meals" | "customers"
  >("overview");

  // Mock data for dashboard
  const dashboardStats = {
    totalOrders: 1247,
    totalRevenue: 487650,
    activeCustomers: 342,
    avgOrderValue: 391,
    monthlyGrowth: 30,
    deliverySuccessRate: 98.5,
    customerSatisfaction: 4.9,
    activeSubscribers: 156,
  };

  // Revenue growth data (last 6 months)
  const revenueGrowth = [
    { month: "Jul", revenue: 245000 },
    { month: "Aug", revenue: 298000 },
    { month: "Sep", revenue: 352000 },
    { month: "Oct", revenue: 398000 },
    { month: "Nov", revenue: 442000 },
    { month: "Dec", revenue: 487650 },
  ];

  // Unit Economics
  const unitEconomics = {
    costPerKit: 250,
    avgSellingPrice: 450,
    grossMargin: 200,
    marginPercent: 44,
    cac: 150,
    ltv: 3500,
    ltvCacRatio: 23,
  };

  const recentOrders = [
    {
      id: "QC-2025-001",
      customer: "Ahmed Rahman",
      total: 850,
      status: "preparing",
      time: "10:30 AM",
    },
    {
      id: "QC-2025-002",
      customer: "Fatima Khan",
      total: 650,
      status: "cooking",
      time: "10:15 AM",
    },
    {
      id: "QC-2025-003",
      customer: "Saiful Islam",
      total: 420,
      status: "out-for-delivery",
      time: "9:45 AM",
    },
    {
      id: "QC-2025-004",
      customer: "Rashida Begum",
      total: 380,
      status: "delivered",
      time: "9:20 AM",
    },
  ];

  const popularMeals = [
    { name: "Chicken Curry Kit", orders: 89, revenue: 40050 },
    { name: "Beef Kala Bhuna Kit", orders: 67, revenue: 50250 },
    { name: "Chingri Malai Curry Kit", orders: 54, revenue: 45900 },
    { name: "Vegetable Curry Kit", orders: 43, revenue: 16340 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back to Home
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">QuickCook BD Management Console</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: "overview", label: "Overview", icon: "📊" },
              { key: "orders", label: "Orders", icon: "🛒" },
              { key: "meals", label: "Meals", icon: "🍽️" },
              { key: "customers", label: "Customers", icon: "👥" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.key
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {dashboardStats.totalOrders.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <p className="text-green-600 text-sm mt-2 font-semibold">
                ↗ +{dashboardStats.monthlyGrowth}% from last month
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    ৳{dashboardStats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <p className="text-green-600 text-sm mt-2">
                ↗ +18% from last month
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Customers
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {dashboardStats.activeCustomers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <p className="text-blue-600 text-sm mt-2 font-semibold">
                {dashboardStats.activeSubscribers} Subscribers
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Order Value
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    ৳{dashboardStats.avgOrderValue}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <p className="text-green-600 text-sm mt-2 font-semibold">
                ↗ +5% from last month
              </p>
            </div>
          </div>

          {/* Additional Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-black text-green-600 mb-1">
                  {dashboardStats.deliverySuccessRate}%
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Delivery Success Rate
                </div>
                <div className="text-xs text-green-700 mt-2">
                  ⭐ Industry Leading
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-black text-orange-600 mb-1">
                  {dashboardStats.customerSatisfaction}/5
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Customer Satisfaction
                </div>
                <div className="text-xs text-orange-700 mt-2">
                  ⭐⭐⭐⭐⭐ Excellent
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-1">
                  {dashboardStats.monthlyGrowth}%
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Monthly Growth Rate
                </div>
                <div className="text-xs text-blue-700 mt-2">
                  📈 Accelerating
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Growth Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-black text-gray-900 mb-6">
              Revenue Growth (Last 6 Months)
            </h3>
            <div className="space-y-4">
              {revenueGrowth.map((data, index) => {
                const maxRevenue = Math.max(
                  ...revenueGrowth.map((d) => d.revenue),
                );
                const widthPercent = (data.revenue / maxRevenue) * 100;
                const growth =
                  index > 0
                    ? (
                        ((data.revenue - revenueGrowth[index - 1].revenue) /
                          revenueGrowth[index - 1].revenue) *
                        100
                      ).toFixed(1)
                    : 0;

                return (
                  <div key={data.month} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700 w-12">
                        {data.month}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ৳{data.revenue.toLocaleString()}
                      </span>
                      {index > 0 && (
                        <span className="text-xs font-medium text-green-600 w-16 text-right">
                          +{growth}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unit Economics */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              💼 Unit Economics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Cost per Kit
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ৳{unitEconomics.costPerKit}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Avg Selling Price
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ৳{unitEconomics.avgSellingPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-100 border-2 border-green-300 rounded-lg">
                  <span className="text-sm font-bold text-green-800">
                    Gross Margin
                  </span>
                  <span className="text-lg font-black text-green-700">
                    ৳{unitEconomics.grossMargin} ({unitEconomics.marginPercent}
                    %)
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Customer Acq. Cost (CAC)
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ৳{unitEconomics.cac}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Lifetime Value (LTV)
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ৳{unitEconomics.ltv.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-100 border-2 border-blue-300 rounded-lg">
                  <span className="text-sm font-bold text-blue-800">
                    LTV / CAC Ratio
                  </span>
                  <span className="text-lg font-black text-blue-700">
                    {unitEconomics.ltvCacRatio}x 🎯
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-green-700">
                  ✓ Strong Unit Economics:
                </span>{" "}
                LTV/CAC ratio of {unitEconomics.ltvCacRatio}x indicates
                excellent customer value and sustainable growth potential.
                Industry benchmark is 3-5x.
              </p>
            </div>
          </div>

          {/* Recent Orders and Popular Meals */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">৳{order.total}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "out-for-delivery"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "cooking"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Meals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Popular Meals
              </h3>
              <div className="space-y-4">
                {popularMeals.map((meal, index) => (
                  <div
                    key={meal.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{meal.name}</p>
                        <p className="text-sm text-gray-600">
                          {meal.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ৳{meal.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== "overview" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h3>
          <p className="text-gray-600">
            This section is under development. Full functionality coming soon!
          </p>
        </div>
      )}
    </div>
  );
}
