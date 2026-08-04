import { useState } from "react";

interface DashboardStats {
  totalOrders: number;
  activeSubscriptions: number;
  revenue: number;
  totalCustomers: number;
}

interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: string;
  date: string;
}

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "analytics"
  >("overview");

  // Demo data
  const stats: DashboardStats = {
    totalOrders: 1247,
    activeSubscriptions: 342,
    revenue: 2847500,
    totalCustomers: 856,
  };

  const recentOrders: Order[] = [
    {
      id: "ORD-2024-1247",
      customerName: "Ahmed Hassan",
      items: "Chicken Curry Kit x2, Beef Kala Bhuna x1",
      total: 1850,
      status: "delivered",
      date: "2024-12-15",
    },
    {
      id: "ORD-2024-1246",
      customerName: "Fatima Rahman",
      items: "Weekly Subscription - 5 meals",
      total: 3200,
      status: "out-for-delivery",
      date: "2024-12-15",
    },
    {
      id: "ORD-2024-1245",
      customerName: "Karim Ali",
      items: "Fish Kit x1, Veg Mix x2",
      total: 1450,
      status: "cooking",
      date: "2024-12-15",
    },
    {
      id: "ORD-2024-1244",
      customerName: "Nusrat Jahan",
      items: "Chicken Roast Kit x3",
      total: 2100,
      status: "preparing",
      date: "2024-12-14",
    },
    {
      id: "ORD-2024-1243",
      customerName: "Sabbir Hossain",
      items: "Monthly Subscription - 20 meals",
      total: 12000,
      status: "delivered",
      date: "2024-12-14",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "out-for-delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "cooking":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "preparing":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-6 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back to Home</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  🔧 Admin
                </span>{" "}
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your business operations
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === "overview"
                  ? "text-orange-600 border-b-4 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === "orders"
                  ? "text-orange-600 border-b-4 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === "analytics"
                  ? "text-orange-600 border-b-4 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📈 Analytics
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="text-blue-600 text-3xl mb-2">📦</div>
                  <div className="text-gray-600 text-sm font-semibold mb-1">
                    Total Orders
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    {stats.totalOrders}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                  <div className="text-green-600 text-3xl mb-2">🔄</div>
                  <div className="text-gray-600 text-sm font-semibold mb-1">
                    Active Subscriptions
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    {stats.activeSubscriptions}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="text-orange-600 text-3xl mb-2">💰</div>
                  <div className="text-gray-600 text-sm font-semibold mb-1">
                    Total Revenue
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    ৳{stats.revenue.toLocaleString()}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="text-purple-600 text-3xl mb-2">👥</div>
                  <div className="text-gray-600 text-sm font-semibold mb-1">
                    Total Customers
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    {stats.totalCustomers}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span>📋</span>
                  <span>Recent Orders</span>
                </h3>
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-gray-900">
                              {order.id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                          <div className="text-gray-700 font-semibold mb-1">
                            {order.customerName}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {order.items}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-orange-600">
                            ৳{order.total.toLocaleString()}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {order.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span>📦</span>
                  <span>All Orders</span>
                </h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-gray-900 text-lg">
                              {order.id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                          <div className="text-gray-700 font-bold mb-1">
                            {order.customerName}
                          </div>
                          <div className="text-gray-600">{order.items}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-orange-600">
                            ৳{order.total.toLocaleString()}
                          </div>
                          <div className="text-gray-500">{order.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Sales Chart */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span>📈</span>
                  <span>Sales Trend</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { month: "December", sales: 487500, orders: 142 },
                    { month: "November", sales: 523000, orders: 156 },
                    { month: "October", sales: 445600, orders: 128 },
                    { month: "September", sales: 398200, orders: 115 },
                    { month: "August", sales: 412300, orders: 121 },
                  ].map((data) => (
                    <div
                      key={data.month}
                      className="bg-white rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900">
                          {data.month}
                        </span>
                        <span className="text-orange-600 font-black">
                          ৳{data.sales.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full"
                            style={{ width: `${(data.sales / 600000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 font-semibold">
                          {data.orders} orders
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Meals */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border-2 border-orange-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span>🔥</span>
                  <span>Popular Meals</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Chicken Curry Kit", orders: 342, revenue: 239400 },
                    {
                      name: "Beef Kala Bhuna Kit",
                      orders: 287,
                      revenue: 258300,
                    },
                    {
                      name: "Chingri Malai Curry Kit",
                      orders: 234,
                      revenue: 304200,
                    },
                    { name: "Chicken Roast Kit", orders: 198, revenue: 138600 },
                    { name: "Mix Vegetable Kit", orders: 186, revenue: 111600 },
                  ].map((meal) => (
                    <div
                      key={meal.name}
                      className="bg-white rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">
                            {meal.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {meal.orders} orders
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-orange-600">
                            ৳{meal.revenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
