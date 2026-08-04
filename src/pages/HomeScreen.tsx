interface HomeScreenProps {
  onBrowse: () => void;
}

export function HomeScreen({ onBrowse }: HomeScreenProps) {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)]" />
      </div>

      {/* Floating Food Icons */}
      <div className="absolute inset-0 z-0 opacity-[0.07] overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl transform -rotate-12 animate-float">
          🍛
        </div>
        <div className="absolute top-20 right-20 text-7xl transform rotate-12 animate-float-delayed">
          🥘
        </div>
        <div className="absolute bottom-20 left-20 text-9xl transform rotate-45 animate-float">
          🍳
        </div>
        <div className="absolute bottom-10 right-10 text-7xl transform -rotate-12 animate-float-delayed">
          🥗
        </div>
        <div className="absolute top-1/2 left-1/4 text-6xl transform -rotate-45 animate-float">
          🍲
        </div>
        <div className="absolute top-1/3 right-1/4 text-8xl transform rotate-6 animate-float-delayed">
          🥙
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-10">
          {/* Hero Section */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                🎉 Now Serving in Dhaka
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Authentic
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Bengali Meals
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-700">
              Ready in{" "}
              <span className="text-orange-500 underline decoration-wavy">
                20 Minutes
              </span>{" "}
              ⚡
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pre-cut ingredients, pre-marinated perfection. Experience
              restaurant-quality Bengali cuisine at home.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 animate-fade-in-delayed">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-6 py-6 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                🥘
              </div>
              <p className="font-bold text-gray-800 text-sm">
                Pre-cut
                <br />
                Ingredients
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-6 py-6 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <p className="font-bold text-gray-800 text-sm">
                20-Min
                <br />
                Cooking
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-6 py-6 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                🚚
              </div>
              <p className="font-bold text-gray-800 text-sm">
                Same Day
                <br />
                Delivery
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-6 py-6 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <p className="font-bold text-gray-800 text-sm">
                Restaurant
                <br />
                Quality
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-delayed">
            <button
              onClick={onBrowse}
              className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-14 py-6 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-105 transition-all duration-300 border-4 border-white/20"
            >
              <span className="flex items-center gap-3">
                <span>🛒</span>
                <span>Browse Meal Kits</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 animate-fade-in-delayed">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                2,500+
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-2">
                Happy Customers
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                50,000+
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-2">
                Meals Delivered
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-2">
                Rating
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                98.5%
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-2">
                On-Time Delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate)); }
          50% { transform: translateY(-20px) rotate(var(--rotate)); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
          --rotate: -12deg;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
          --rotate: 12deg;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}
