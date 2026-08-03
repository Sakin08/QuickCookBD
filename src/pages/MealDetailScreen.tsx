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
  // Get reviews for this meal
  const mealReviews = getReviewsByMealId(meal.id).slice(0, 3);

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
