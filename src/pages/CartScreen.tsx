import type { CartItem, SubscriptionType } from "../types";

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, size: string, quantity: number) => void;
  total: number;
  onContinue: () => void;
  onBack: () => void;
  subscriptionType: SubscriptionType;
}

export function CartScreen({
  cart,
  onUpdateQuantity,
  total,
  onContinue,
  onBack,
  subscriptionType,
}: CartScreenProps) {
  const discount = subscriptionType === "weekly" ? 0.1 : 0;
  const deliveryFee = 100;
  const discountAmount = Math.round(total * discount);
  const finalTotal = total - discountAmount + deliveryFee;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all font-semibold text-gray-600 hover:text-orange-600"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Meals
        </button>
        {cart.length > 0 && (
          <span className="text-sm font-semibold text-gray-400">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-1">Your Cart</h2>
      <p className="text-gray-400 font-medium mb-8">Review your meals before checkout</p>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl font-bold text-gray-800 mb-1">Your cart is empty</p>
          <p className="text-gray-400 mb-8">Add some delicious meals to get started</p>
          <button
            onClick={onBack}
            className="bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/25 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 transition-all"
          >
            Browse Meals
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">{item.namebn}</p>
                  <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {item.selectedSize}
                  </span>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:gap-2">
                  <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-600 hover:text-orange-600 active:scale-95 transition-all"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-600 hover:text-orange-600 active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-gray-900">
                      ৳{item.price * item.quantity}
                    </div>
                    <div className="text-xs text-gray-400">৳{item.price} each</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">
            <h3 className="text-lg font-black text-gray-900 mb-5">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">৳{total}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center bg-green-50 -mx-2 px-2 py-1.5 rounded-lg">
                  <span className="text-green-700 font-medium">
                    Weekly discount ({discount * 100}%)
                  </span>
                  <span className="font-bold text-green-700">
                    −৳{discountAmount}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-500">
                <span>Delivery fee</span>
                <span className="font-semibold text-gray-900">৳{deliveryFee}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 my-4" />

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-orange-600">
                ৳{finalTotal}
              </span>
            </div>

            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl text-base font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Continue to Wallet →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}