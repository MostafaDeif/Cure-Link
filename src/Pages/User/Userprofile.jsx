import React, { useState, useEffect, useContext } from "react";
import "./index.css";

// Sidebar
import Sidebar from "./Sidebar/Sidebar";

// Sections
import ProfileSection from "./Sections/ProfileSection";
import VisitsSection from "./Sections/VisitsSection";
import OrdersSection from "./Sections/OrdersSection";
import FavoritesSection from "./Sections/FavoritesSection";
import SettingsSection from "./Sections/SettingsSection";

// Product Card
import ProductCardUser from "../../Components/ProductCardUser";

const User = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // Sync auth state from storage across tabs
  useEffect(() => {
    const onAuth = () => {
      try {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener("auth-change", onAuth);
    window.addEventListener("storage", onAuth);

    return () => {
      window.removeEventListener("auth-change", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row gap-6 bg-gray-50 p-2 md:p-4 rounded-xl"
      dir={currentUser?.language === 'ar' ? 'rtl' : document.documentElement.lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ minHeight: "80vh" }}
    >
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentUser={currentUser}
      />

      {/* Dynamic Content */}
      <div className="w-full md:w-3/4 theSpace p-4 rounded-lg shadow bg-white">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "visits" && <VisitsSection />}
        {activeSection === "orders" && <OrdersSection />}
        {activeSection === "favorites" && (
          <FavoritesSection ProductCardUser={ProductCardUser} />
        )}
        {activeSection === "settings" && <SettingsSection />}
      </div>
    </div>
  );
};

export default User;
