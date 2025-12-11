import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/JustLogo.jpg";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../Context/LanguageContext.jsx";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext"; 

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
  const { getTotalItems } = useCart(); 
  const totalItems = getTotalItems(); 

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
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
          }
        >
          {t("nav.home")}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
          }
        >
          {t("nav.about")}
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
          }
        >
          {t("nav.services")}
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
          }
        >
          {t("nav.articles")}
        </NavLink>

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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="p-2"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16" stroke="#426287" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16 4L4 16" stroke="#426287" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
              <rect width="21" height="1.5" rx=".75" fill="#426287" />
              <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
              <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className={`${open ? "flex" : "hidden"} absolute top-full mt-2 left-0 right-0 bg-white shadow-lg py-3 flex-col items-stretch px-2 text-sm sm:hidden z-[9999] rounded-b-md divide-y divide-gray-100`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "block text-blue-600 font-semibold w-full px-5 py-3"
              : "block text-gray-700 hover:text-blue-600 w-full px-5 py-3"
          }
        >
          {t("nav.home")}
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "block text-blue-600 font-semibold w-full px-5 py-3"
              : "block text-gray-700 hover:text-blue-600 w-full px-5 py-3"
          }
        >
          {t("nav.about")}
        </NavLink>
        <NavLink
          to="/services"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "block text-blue-600 font-semibold w-full px-5 py-3"
              : "block text-gray-700 hover:text-blue-600 w-full px-5 py-3"
          }
        >
          {t("nav.services")}
        </NavLink>
        <NavLink
          to="/articles"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "block text-blue-600 font-semibold w-full px-5 py-3"
              : "block text-gray-700 hover:text-blue-600 w-full px-5 py-3"
          }
        >
          {t("nav.articles")}
        </NavLink>

        <div className="w-full flex items-center justify-between px-3 py-3">
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
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition flex items-center gap-2"
              type="button"
            >
              <ShoppingCart size={16} />
              <span>{t("nav.cart") || "Cart"}</span>
            </button>
          )}
        </div>

        {user ? (
          <Link
            to="/user"
            className="block px-5 py-3 rounded"
            onClick={() => setOpen(false)}
          >
            {user.name || t("nav.profile")}
          </Link>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-5 py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm text-center"
            onClick={() => setOpen(false)}
          >
            {t("nav.login")}
          </Link>
        )}
      </div>
    </nav>
  );
}
