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
    },
    {
      value: "1kg" as MealSize,
      label: "1kg",
      servings: "2-3 people",
      price: calculateMealPrice(meal.basePrice, "1kg"),
    },
    {
      value: "2kg" as MealSize,
      label: "2kg",
      servings: "4-6 people",
      price: calculateMealPrice(meal.basePrice, "2kg"),
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
              onClick={() => onSizeChange(size.value)}
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
