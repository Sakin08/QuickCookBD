import type { SubscriptionType } from "../types";

interface SubscriptionTypeScreenProps {
  selectedType: SubscriptionType;
  onSelectType: (type: SubscriptionType) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function SubscriptionTypeScreen({
  selectedType,
  onSelectType,
  onContinue,
  onBack,
}: SubscriptionTypeScreenProps) {
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
