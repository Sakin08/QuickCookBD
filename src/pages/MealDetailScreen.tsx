import type { Meal } from "../types";
import { getReviewsByMealId } from "../data/reviews";

interface MealDetailScreenProps {
  meal: Meal;
  onAddToCart: () => void;
  onBack: () => void;
}

export function MealDetailScreen({
  meal,
  onAddToCart,
  onBack,
}: MealDetailScreenProps) {
  const mealReviews = getReviewsByMealId(meal.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <button
        onClick={onBack}
        className="group mb-6 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all font-semibold text-gray-600 hover:text-orange-600"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        Back to Meals
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-72 md:h-full min-h-[380px]">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {meal.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-orange-600 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              {meal.name}
            </h1>
            <p className="text-lg text-gray-400 mb-4">{meal.namebn}</p>

            {/* Overall Rating */}
            {meal.rating && meal.totalReviews && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < Math.floor(meal.rating!) ? "text-yellow-400" : "text-gray-200"}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <div>
                  <span className="text-lg font-black text-gray-900">
                    {meal.rating}
                  </span>
                  <span className="text-sm text-gray-400 ml-1.5">
                    ({meal.totalReviews} reviews)
                  </span>
                </div>
              </div>
            )}

            <p className="text-gray-600 leading-relaxed mb-6">
              {meal.description}
            </p>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="text-lg">⏱️</span>
                <span className="text-sm font-semibold text-gray-700">
                  {meal.prepTime}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="text-lg">👥</span>
                <span className="text-sm font-semibold text-gray-700">
                  {meal.servings}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                What's Included
              </h3>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-gray-600 text-sm"
                  >
                    <span className="text-orange-500 font-bold mt-0.5">✓</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div>
                <div className="text-xs text-gray-400 font-medium mb-0.5">
                  Starting from
                </div>
                <div className="text-3xl font-black text-orange-600">
                  ৳{meal.basePrice}
                </div>
              </div>
              <button
                onClick={onAddToCart}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Select Size →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {mealReviews.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 className="text-2xl font-black text-gray-900">
              Customer Reviews
            </h2>
            <button
              className="bg-orange-50 text-orange-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors"
              onClick={() =>
                alert("Please order and receive this meal to write a review!")
              }
            >
              Write a Review
            </button>
          </div>

          <div className="space-y-3">
            {mealReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {review.userName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {review.userLocation}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
              </div>
            ))}
          </div>

          {meal.totalReviews && meal.totalReviews > 3 && (
            <div className="mt-6 text-center">
              <button className="text-orange-600 text-sm font-bold hover:text-orange-700 transition-colors">
                View all {meal.totalReviews} reviews →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}