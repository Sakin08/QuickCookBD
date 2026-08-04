interface WalletScreenProps {
  balance: number;
  useWallet: boolean;
  onToggleWallet: () => void;
  total: number;
  onContinue: () => void;
  onBack: () => void;
}

export function WalletScreen({
  balance,
  useWallet,
  onToggleWallet,
  total,
  onContinue,
  onBack,
}: WalletScreenProps) {
  const walletPayment = useWallet ? Math.min(balance, total) : 0;
  const remaining = useWallet ? Math.max(0, total - balance) : total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                💰 QuickCook
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Wallet
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Manage your wallet balance and payment
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 rounded-3xl p-8 text-white mb-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-sm opacity-90 mb-1 font-semibold">
                  Available Balance
                </div>
                <div className="text-5xl font-black">
                  ৳{balance.toLocaleString()}
                </div>
              </div>
              <div className="text-7xl">💳</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 font-bold transition-all hover:scale-105">
                + Add Money
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 font-bold transition-all hover:scale-105">
                Transactions
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 font-bold transition-all hover:scale-105">
                Rewards
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-500 cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br from-white to-gray-50">
              <input
                type="checkbox"
                checked={useWallet}
                onChange={onToggleWallet}
                className="w-6 h-6 text-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-1 text-lg">
                  Use Wallet Balance
                </div>
                <div className="text-sm text-gray-600">
                  Pay with your QuickCook wallet
                </div>
              </div>
              {useWallet && <div className="text-3xl">✓</div>}
            </label>
          </div>

          {useWallet && (
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-orange-200">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                💰 Payment Breakdown
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between text-lg">
                  <span>Order Total</span>
                  <span className="font-semibold">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Wallet Payment</span>
                  <span>-৳{walletPayment.toLocaleString()}</span>
                </div>
                {remaining > 0 && (
                  <div className="flex justify-between text-orange-600 font-bold text-xl pt-3 border-t-2 border-orange-200">
                    <span>Remaining to Pay</span>
                    <span>৳{remaining.toLocaleString()}</span>
                  </div>
                )}
                {remaining === 0 && (
                  <div className="flex justify-center items-center gap-2 text-green-600 font-bold text-lg pt-3 border-t-2 border-green-200">
                    <span>✓</span>
                    <span>Fully Paid with Wallet</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={onContinue}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl text-xl font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Continue to Delivery</span>
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
