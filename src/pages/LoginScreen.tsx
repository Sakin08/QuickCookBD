import { useState } from "react";
import type { User } from "../types";

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login - check for admin
    if (email === "admin@quickcook.bd" && password === "admin123") {
      onLogin({
        name: "Admin User",
        email: "admin@quickcook.bd",
        phone: "+880 1700-000000",
        address: "QuickCook BD Office, Dhaka",
      });
    } else {
      // Regular user login
      onLogin({
        name: email.includes("@") ? email.split("@")[0] : "User",
        email: email,
        phone: "+880 1700-123456",
        address: "Dhaka, Bangladesh",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <button
          onClick={onBack}
          className="mb-6 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 border border-gray-200 hover:border-orange-300 flex items-center gap-2"
        >
          <span>←</span> <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Back!
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to your QuickCook BD account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-lg"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-black shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-5 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200">
            <p className="text-sm text-orange-900 font-bold mb-2">
              🎯 Demo Accounts:
            </p>
            <div className="space-y-1 text-sm text-orange-800">
              <p className="font-semibold">
                👨‍💼 Admin: <span className="font-mono">admin@quickcook.bd</span>{" "}
                / <span className="font-mono">admin123</span>
              </p>
              <p className="font-semibold">
                👤 User: <span className="font-mono">any email</span> /{" "}
                <span className="font-mono">any password</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
