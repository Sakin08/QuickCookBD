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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center">
      <div className="max-w-5xl mx-auto px-4 w-full py-8">
        <button
          onClick={onBack}
          className="group mb-6 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all font-semibold text-gray-600 hover:text-orange-600"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-3xl font-black text-gray-900 mb-1">
            Choose Your Plan
          </h2>
          <p className="text-gray-500 mb-8">
            Select how you'd like to receive your meals
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {/* One-Time */}
            <div
              onClick={() => onSelectType("one-time")}
              className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedType === "one-time"
                  ? "border-orange-500 bg-orange-50/50 shadow-md"
                  : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked={selectedType === "one-time"}
                  onChange={() => {}}
                  className="mt-1 w-5 h-5 text-orange-600 accent-orange-600"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    One-Time Order
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Order once, pay once. Perfect for trying out.
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> No commitment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Full menu access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Fast delivery
                </li>
              </ul>
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400 mb-0.5">Example</div>
                <div className="text-lg font-bold text-gray-900">
                  ৳450 <span className="text-sm font-normal text-gray-400">per meal</span>
                </div>
              </div>
            </div>

            {/* Weekly */}
            <div
              onClick={() => onSelectType("weekly")}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedType === "weekly"
                  ? "border-orange-500 bg-orange-50/50 shadow-md"
                  : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm"
              }`}
            >
              <div className="absolute top-5 right-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                SAVE 10%
              </div>
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked={selectedType === "weekly"}
                  onChange={() => {}}
                  className="mt-1 w-5 h-5 text-orange-600 accent-orange-600"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Weekly Subscription
                  </h3>
                  <p className="text-gray-500 text-sm">
                    6 meals per week. Save ৳270 weekly!
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> 10% discount on all meals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Flexible scheduling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Skip or pause anytime
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Priority delivery
                </li>
              </ul>
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400 mb-0.5">You pay</div>
                <div className="text-lg font-bold text-orange-600">
                  ৳405{" "}
                  <span className="text-sm font-normal text-gray-400">per meal</span>
                  <span className="ml-2 line-through text-gray-300 text-sm">
                    ৳450
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Calculator */}
          {selectedType === "weekly" && (
            <div className="mb-8 bg-green-50/60 border border-green-100 rounded-2xl p-6">
              <div className="text-center">
                <h3 className="text-lg font-black text-green-900 mb-4">
                  Your Savings with Weekly Subscription
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-green-600">
                      ৳270
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Per Week</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-green-600">
                      ৳1,080
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Per Month</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-green-600">
                      ৳12,960
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Per Year</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-green-700 font-medium">
                  Plus priority support & exclusive menu access
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}