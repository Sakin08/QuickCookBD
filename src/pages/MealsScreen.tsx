import type { Meal } from "../types";
import { MealCard } from "../components/MealCard";

interface MealsScreenProps {
  meals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}

export function MealsScreen({ meals, onSelectMeal }: MealsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-3">
            🍽️ Our <span className="text-orange-600">Meal Kits</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All ingredients pre-cut, pre-marinated, and ready to cook.
            Restaurant quality in just 20 minutes!
          </p>
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onSelect={onSelectMeal} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
              <p className="text-orange-100">
                Fresh ingredients sourced daily from trusted suppliers
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-bold text-xl mb-2">Easy Cooking</h3>
              <p className="text-orange-100">
                Pre-marinated and pre-cut for hassle-free cooking
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-bold text-xl mb-2">Authentic Taste</h3>
              <p className="text-orange-100">
                Traditional recipes perfected by expert Bengali chefs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
