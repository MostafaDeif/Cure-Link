import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/JustLogo.jpg";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../Context/LanguageContext.jsx";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext"; // ← تم إضافة هذا

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  // Cart items count
  const { getTotalItems } = useCart(); // ← تم إضافة هذا
  const totalItems = getTotalItems(); // ← تم إضافة هذا

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    const onAuthChange = () => {
      try {
        const s = localStorage.getItem("user");
        setUser(s ? JSON.parse(s) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-change", onAuthChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-change", onAuthChange);
    };
  }, []);

  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const toggleLang = () => setLanguage(language === "en" ? "ar" : "en");

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-[9999]">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto object-contain cursor-pointer"
        />
        <span className="text-xl font-semibold text-[#426287]">CureLink</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <Link to="/">{t("nav.home")}</Link>
        <Link to="/about">{t("nav.about")}</Link>
        <Link to="/services">{t("nav.services")}</Link>
        <Link to="/articles">{t("nav.articles")}</Link>

        <button onClick={toggleLang} className="px-3 py-1 border rounded text-sm">
          {language === "en" ? "ع" : "EN"}
        </button>

        {user ? (
          <Link
            to="/user"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <span className="inline-block h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=426287&color=fff`
                }
                alt="User Profile"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-medium text-gray-700">
              {user.name || t("nav.profile")}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            {t("nav.login")}
          </Link>
        )}

        {/* Cart icon on desktop */}
        {totalItems > 0 && (
          <button
            onClick={() => navigate("/cart")}
            aria-label="Go to cart"
            className="ml-2 p-2 rounded-full hover:bg-gray-100 transition"
            type="button"
          >
            <ShoppingCart size={20} />
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 sm:hidden">

        {totalItems > 0 && (
          <button
            onClick={() => navigate("/cart")}
            aria-label="Go to cart"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            type="button"
          >
            <ShoppingCart size={18} />
          </button>
        )}

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="p-2"
        >
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-[9999]`}
      >
        <Link to="/" onClick={() => setOpen(false)}>{t("nav.home")}</Link>
        <Link to="/about" onClick={() => setOpen(false)}>{t("nav.about")}</Link>
        <Link to="/services" onClick={() => setOpen(false)}>{t("nav.services")}</Link>
        <Link to="/articles" onClick={() => setOpen(false)}>{t("nav.articles")}</Link>

        <div className="w-full flex items-center justify-between mt-2">
          <button
            onClick={() => {
              toggleLang();
              setOpen(false);
            }}
            className="px-3 py-2 text-sm border rounded"
          >
            {language === "en" ? "ع" : "EN"}
          </button>

          {totalItems > 0 && (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/cart");
              }}
              aria-label="Go to cart"
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
              type="button"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingCart size={16} />
                <span>Cart</span>
              </span>
            </button>
          )}
        </div>

        {user ? (
          <Link
            to="/user"
            className="block px-3 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            {user.name || "Profile"}
          </Link>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
