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
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onLogoClick}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-3xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                QuickCook BD
              </h1>
              <p className="text-xs text-orange-100 font-medium">
                Fresh Meals, Zero Prep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={onAdminClick}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                🔧 Admin
              </button>
            )}

            {isLoggedIn && currentUser ? (
              <button
                onClick={onProfileClick}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>👤</span>
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                🔐 Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative bg-white text-orange-600 px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
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
