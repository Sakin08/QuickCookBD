import type { Meal } from "../types";
import { MealCard } from "../components/MealCard";

interface MealsScreenProps {
  meals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}

export function MealsScreen({ meals, onSelectMeal }: MealsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
              🍽️ Our Menu
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Our
            </span>{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Meal Kits
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All ingredients pre-cut, pre-marinated, and ready to cook.
            <br />
            <span className="font-semibold text-orange-600">
              Restaurant quality in just 20 minutes!
            </span>
          </p>
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {meals.map((meal, index) => (
            <div
              key={meal.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MealCard meal={meal} onSelect={onSelectMeal} />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 rounded-3xl p-12 text-white shadow-2xl animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🌟
              </div>
              <h3 className="font-bold text-2xl mb-3">Premium Quality</h3>
              <p className="text-orange-50 leading-relaxed">
                Fresh ingredients sourced daily from trusted suppliers
              </p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🔥
              </div>
              <h3 className="font-bold text-2xl mb-3">Easy Cooking</h3>
              <p className="text-orange-50 leading-relaxed">
                Pre-marinated and pre-cut for hassle-free cooking
              </p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                💯
              </div>
              <h3 className="font-bold text-2xl mb-3">Authentic Taste</h3>
              <p className="text-orange-50 leading-relaxed">
                Traditional recipes perfected by expert Bengali chefs
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
