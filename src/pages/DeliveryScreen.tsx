interface DeliveryScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function DeliveryScreen({ onContinue, onBack }: DeliveryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-6 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                📍 Delivery
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Information
              </span>
            </h2>
            <p className="text-gray-600">Enter your delivery details</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Complete Address *
              </label>
              <textarea
                placeholder="House/Flat, Road, Area"
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  City *
                </label>
                <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-lg bg-white">
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Delivery Time *
                </label>
                <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-lg bg-white">
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Ring the bell, Call before arrival"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-lg"
              />
            </div>
          </div>

          <button
            onClick={onContinue}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Continue to Payment</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </div>
  );
}
