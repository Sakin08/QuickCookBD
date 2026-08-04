import type { Meal } from "../types";

interface MealCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

export function MealCard({ meal, onSelect }: MealCardProps) {
  return (
    <div
      onClick={() => onSelect(meal)}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-300 hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          {meal.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/95 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>
        {meal.rating && (
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="font-bold text-sm text-gray-900">
              {meal.rating}
            </span>
            <span className="text-gray-500 text-xs">({meal.totalReviews})</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {meal.name}
          </h3>
          <p className="text-sm text-orange-500 font-semibold">{meal.namebn}</p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {meal.description}
        </p>

        <div className="flex items-center justify-between text-sm pt-2">
          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span>⏱️</span>
            <span className="font-medium">{meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span>🍽️</span>
            <span className="font-medium">{meal.servings}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-3xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              ৳{meal.basePrice}
            </span>
            <span className="text-xs text-gray-500 ml-1">from</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(meal);
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
          >
            Order Now →
          </button>
        </div>
      </div>
    </div>
  );
}
