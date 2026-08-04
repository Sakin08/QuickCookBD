import type { User } from "../types";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onAdminClick: () => void;
}

export function Header({
  cartCount,
  onCartClick,
  onLogoClick,
  isLoggedIn,
  isAdmin,
  currentUser,
  onLoginClick,
  onProfileClick,
  onAdminClick,
}: HeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b-2 border-orange-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onLogoClick}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-orange-400/50 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="text-3xl relative z-10">🍳</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 bg-clip-text text-transparent tracking-tight flex items-center gap-1.5">
                QuickCook
                <span className="text-lg">🇧🇩</span>
              </h1>
              <p className="text-xs text-gray-600 font-bold tracking-wide">
                ✨ Fresh Meals, Zero Prep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onAdminClick}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
              >
                <span className="flex items-center gap-2">
                  🔧 <span>Admin</span>
                </span>
              </button>
            )}

            {isLoggedIn && currentUser ? (
              <button
                onClick={onProfileClick}
                className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 border-2 border-orange-200 text-sm"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-black shadow-md text-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-gray-200 text-sm"
              >
                🔐 Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black shadow-lg animate-pulse border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
