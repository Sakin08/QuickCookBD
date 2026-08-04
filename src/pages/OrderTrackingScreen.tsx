import { useState } from "react";

interface TrackingOrder {
  id: string;
  status: "preparing" | "cooking" | "packed" | "out-for-delivery" | "delivered";
  items: string[];
  total: number;
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: string;
  paymentMethod: string;
}

interface OrderTrackingScreenProps {
  onBack: () => void;
}

export function OrderTrackingScreen({ onBack }: OrderTrackingScreenProps) {
  const [selectedOrder, setSelectedOrder] = useState<string>("ORD-2024-1246");

  // Demo orders
  const orders: TrackingOrder[] = [
    {
      id: "ORD-2024-1246",
      status: "out-for-delivery",
      items: ["Chicken Curry Kit x2", "Beef Kala Bhuna x1", "Mix Veg Kit x1"],
      total: 2450,
      orderDate: "2024-12-15 10:30 AM",
      estimatedDelivery: "2024-12-15 06:00 PM",
      deliveryAddress: "House 23, Road 5, Dhanmondi, Dhaka 1209",
      paymentMethod: "bKash",
    },
    {
      id: "ORD-2024-1243",
      status: "delivered",
      items: ["Chingri Malai Curry Kit x2"],
      total: 2600,
      orderDate: "2024-12-14 09:00 AM",
      estimatedDelivery: "2024-12-14 05:00 PM",
      deliveryAddress: "House 23, Road 5, Dhanmondi, Dhaka 1209",
      paymentMethod: "Nagad",
    },
    {
      id: "ORD-2024-1238",
      status: "delivered",
      items: ["Fish Kit x1", "Chicken Roast Kit x2"],
      total: 2050,
      orderDate: "2024-12-13 11:15 AM",
      estimatedDelivery: "2024-12-13 07:00 PM",
      deliveryAddress: "House 23, Road 5, Dhanmondi, Dhaka 1209",
      paymentMethod: "Cash on Delivery",
    },
  ];

  const currentOrder = orders.find((order) => order.id === selectedOrder);

  const getStatusSteps = (status: string) => {
    const steps = [
      "preparing",
      "cooking",
      "packed",
      "out-for-delivery",
      "delivered",
    ];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, index) => ({
      name: step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "preparing":
        return "📋";
      case "cooking":
        return "👨‍🍳";
      case "packed":
        return "📦";
      case "out-for-delivery":
        return "🚚";
      case "delivered":
        return "✅";
      default:
        return "📦";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "cooking":
        return "Cooking";
      case "packed":
        return "Packed";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2 text-sm"
          >
            <span>←</span> <span>Back to Home</span>
          </button>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Order List Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/40">
                <h2 className="text-xl font-black mb-4">
                  <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    📦 My Orders
                  </span>
                </h2>
                <div className="space-y-2">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => setSelectedOrder(order.id)}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm ${
                        selectedOrder === order.id
                          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {getStatusEmoji(order.status)}
                        </span>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-sm">
                            {order.id}
                          </div>
                          <div className="text-xs text-gray-600">
                            {order.orderDate}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="md:col-span-2">
              {currentOrder && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl md:text-4xl font-black">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          Order Tracking
                        </span>
                      </h1>
                      <div className="text-4xl">
                        {getStatusEmoji(currentOrder.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-gray-900">
                        {currentOrder.id}
                      </span>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                          currentOrder.status === "delivered"
                            ? "bg-green-100 text-green-700 border-2 border-green-300"
                            : "bg-orange-100 text-orange-700 border-2 border-orange-300"
                        }`}
                      >
                        {getStatusLabel(currentOrder.status)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="mb-8">
                    <div className="relative">
                      {getStatusSteps(currentOrder.status).map(
                        (step, index) => (
                          <div
                            key={step.name}
                            className="flex items-start mb-6 last:mb-0"
                          >
                            <div className="flex flex-col items-center mr-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 transition-all ${
                                  step.completed
                                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-300"
                                    : "bg-gray-100 text-gray-400 border-gray-300"
                                }`}
                              >
                                {getStatusEmoji(step.name)}
                              </div>
                              {index < 4 && (
                                <div
                                  className={`w-1 h-12 ${
                                    step.completed
                                      ? "bg-orange-500"
                                      : "bg-gray-300"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-2">
                              <div
                                className={`font-bold text-lg ${
                                  step.completed
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {getStatusLabel(step.name)}
                              </div>
                              <div className="text-gray-600 text-sm">
                                {step.active &&
                                currentOrder.status !== "delivered"
                                  ? "In progress..."
                                  : step.completed
                                    ? "Completed"
                                    : "Pending"}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📅</span>
                        <span>Order Date</span>
                      </h3>
                      <p className="text-gray-700">{currentOrder.orderDate}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>🕐</span>
                        <span>Estimated Delivery</span>
                      </h3>
                      <p className="text-gray-700">
                        {currentOrder.estimatedDelivery}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border-2 border-orange-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📍</span>
                        <span>Delivery Address</span>
                      </h3>
                      <p className="text-gray-700">
                        {currentOrder.deliveryAddress}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border-2 border-purple-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>💳</span>
                        <span>Payment Method</span>
                      </h3>
                      <p className="text-gray-700">
                        {currentOrder.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <span>🛒</span>
                      <span>Order Items</span>
                    </h3>
                    <div className="space-y-2 mb-4">
                      {currentOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className="text-orange-500">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-lg">
                        Total Amount
                      </span>
                      <span className="text-3xl font-black text-orange-600">
                        ৳{currentOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact Support */}
                  {currentOrder.status !== "delivered" && (
                    <div className="mt-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
                      <p className="text-gray-700 mb-4">
                        <strong>Need help with your order?</strong>
                      </p>
                      <div className="flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                          📞 Call Support
                        </button>
                        <button className="flex-1 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-orange-300">
                          💬 Live Chat
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Delivered - Rate Order */}
                  {currentOrder.status === "delivered" && (
                    <div className="mt-6 bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 font-bold mb-1">
                            ✅ Order Delivered Successfully!
                          </p>
                          <p className="text-gray-600 text-sm">
                            How was your experience?
                          </p>
                        </div>
                        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                          ⭐ Rate Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
