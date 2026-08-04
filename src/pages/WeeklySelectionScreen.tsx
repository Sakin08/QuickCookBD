import type { Meal, WeeklyMeal } from "../types";

interface WeeklySelectionScreenProps {
  meals: Meal[];
  weeklyMeals: WeeklyMeal[];
  onUpdateDay: (day: string, mealId: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function WeeklySelectionScreen({
  meals,
  weeklyMeals,
  onUpdateDay,
  onContinue,
  onBack,
}: WeeklySelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/40">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                📅 Plan Your
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Weekly Meals
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Select a meal for each day of the week
            </p>
          </div>

          <div className="space-y-8 mb-10">
            {weeklyMeals.map((day) => (
              <div
                key={day.day}
                className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 hover:border-orange-300 transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-sm">
                    {day.day.charAt(0)}
                  </span>
                  {day.day}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {meals.map((meal) => (
                    <div
                      key={meal.id}
                      onClick={() => onUpdateDay(day.day, meal.id)}
                      className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                        day.mealId === meal.id
                          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg scale-105"
                          : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md hover:scale-102"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-24 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform"
                        />
                        {day.mealId === meal.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-bold text-gray-900 line-clamp-2">
                        {meal.name}
                      </div>
                      <div className="text-xs text-orange-600 font-semibold mt-1">
                        {meal.namebn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onContinue}
            disabled={weeklyMeals.some((d) => !d.mealId)}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Continue to Cart</span>
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
