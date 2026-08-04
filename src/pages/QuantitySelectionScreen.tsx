import type { Meal, MealSize } from "../types";
import { calculateMealPrice } from "../utils/pricing";

interface QuantitySelectionScreenProps {
  meal: Meal;
  selectedSize: MealSize;
  onSizeChange: (size: MealSize) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function QuantitySelectionScreen({
  meal,
  selectedSize,
  onSizeChange,
  onConfirm,
  onBack,
}: QuantitySelectionScreenProps) {
  const sizes = [
    {
      value: "500g" as MealSize,
      label: "500g",
      servings: "1-2 people",
      price: calculateMealPrice(meal.basePrice, "500g"),
      icon: "👤",
    },
    {
      value: "1kg" as MealSize,
      label: "1kg",
      servings: "2-3 people",
      price: calculateMealPrice(meal.basePrice, "1kg"),
      icon: "👥",
      badge: "Popular",
    },
    {
      value: "2kg" as MealSize,
      label: "2kg",
      servings: "4-6 people",
      price: calculateMealPrice(meal.basePrice, "2kg"),
      icon: "👨‍👩‍👧‍👦",
      badge: "Best Value",
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <button
          onClick={onBack}
          className="mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Select Your
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Portion Size
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the right size for your family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {sizes.map((size) => (
              <div
                key={size.value}
                onClick={() => onSizeChange(size.value)}
                className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedSize === size.value
                    ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-2xl scale-105"
                    : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-xl hover:scale-102"
                }`}
              >
                {size.badge && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {size.badge}
                  </div>
                )}
                <div className="text-center">
                  <div className="text-5xl mb-4">{size.icon}</div>
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    {size.label}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mb-5 bg-gray-50 px-3 py-1.5 rounded-lg inline-block">
                    {size.servings}
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    ৳{size.price}
                  </div>
                </div>
                {selectedSize === size.value && (
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onConfirm}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Add to Cart & Continue</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </div>
  );
}
