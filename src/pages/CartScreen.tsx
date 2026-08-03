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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition font-semibold text-gray-700"
      >
        ← Back to Meals
      </button>

      <h2 className="text-3xl font-black text-gray-900 mb-8">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={onBack}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            Browse Meals
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.namebn} • {item.selectedSize}
                  </p>
                  <p className="text-orange-600 font-bold">
                    ৳{item.price} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1,
                      )
                    }
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 font-bold hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1,
                      )
                    }
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 font-bold hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">৳{total}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount * 100}%)</span>
                  <span className="font-semibold">-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold">৳{deliveryFee}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600">৳{finalTotal}</span>
              </div>
            </div>
            <button
              onClick={onContinue}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Continue to Wallet →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
