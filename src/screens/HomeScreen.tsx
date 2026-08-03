interface HomeScreenProps {
  onBrowse: () => void;
}

export function HomeScreen({ onBrowse }: HomeScreenProps) {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(255, 237, 213, 0.3) 0%, rgba(255, 214, 165, 0.2) 100%),
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 165, 0, 0.03) 35px, rgba(255, 165, 0, 0.03) 70px)
          `,
        }}
      />

      {/* Decorative Food Icons */}
      <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl transform -rotate-12">
          🍛
        </div>
        <div className="absolute top-20 right-20 text-7xl transform rotate-12">
          🥘
        </div>
        <div className="absolute bottom-20 left-20 text-9xl transform rotate-45">
          🍳
        </div>
        <div className="absolute bottom-10 right-10 text-7xl transform -rotate-12">
          🥗
        </div>
        <div className="absolute top-1/2 left-1/4 text-6xl transform -rotate-45">
          🍲
        </div>
        <div className="absolute top-1/3 right-1/4 text-8xl transform rotate-6">
          🥙
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight">
              <span className="text-orange-600">Authentic</span> Bengali Meals
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-700">
              Ready in <span className="text-orange-500">20 Minutes</span>
            </p>
          </div>

          {/* Value Propositions */}
          <div className="flex flex-wrap justify-center gap-6 py-8">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border-2 border-orange-100">
              <div className="text-4xl mb-2">🥘</div>
              <p className="font-bold text-gray-800">Pre-cut Ingredients</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border-2 border-orange-100">
              <div className="text-4xl mb-2">⚡</div>
              <p className="font-bold text-gray-800">20-Min Cooking</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border-2 border-orange-100">
              <div className="text-4xl mb-2">🚚</div>
              <p className="font-bold text-gray-800">Same Day Delivery</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border-2 border-orange-100">
              <div className="text-4xl mb-2">✨</div>
              <p className="font-bold text-gray-800">Restaurant Quality</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onBrowse}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl hover:shadow-orange-300 hover:scale-105 transition-all duration-300 border-4 border-white"
          >
            🛒 Browse Meal Kits
          </button>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-orange-600">2,500+</div>
              <div className="text-sm font-semibold text-gray-600">
                Happy Customers
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-orange-600">50,000+</div>
              <div className="text-sm font-semibold text-gray-600">
                Meals Delivered
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-orange-600">4.9/5</div>
              <div className="text-sm font-semibold text-gray-600">Rating</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-orange-600">98.5%</div>
              <div className="text-sm font-semibold text-gray-600">
                On-Time Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
