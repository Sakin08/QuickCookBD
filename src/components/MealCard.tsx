import type { Meal } from "../types";

interface MealCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

export function MealCard({ meal, onSelect }: MealCardProps) {
  return (
    <div
      onClick={() => onSelect(meal)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-400 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {meal.tags.map((tag) => (
            <span
              key={tag}
              className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {meal.rating && (
          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="font-bold text-sm">{meal.rating}</span>
            <span className="text-gray-500 text-xs">({meal.totalReviews})</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{meal.name}</h3>
          <p className="text-sm text-orange-600 font-semibold">{meal.namebn}</p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span>⏱️ {meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>🍽️ {meal.servings}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-2xl font-black text-orange-600">
              ৳{meal.basePrice}
            </span>
            <span className="text-xs text-gray-500 ml-1">from</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(meal);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors text-sm"
          >
            Order Now →
          </button>
        </div>
      </div>
    </div>
  );
}
