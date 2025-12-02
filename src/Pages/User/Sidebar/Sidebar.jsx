import React from "react";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";

export default function Sidebar({ activeSection, setActiveSection, currentUser }) {
  return (
    <div
      className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow mb-4 md:mb-0 md:ml-5"
      style={{ backgroundColor: "#EBF6FC" }}
    >
      <div className="text-center mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden">
          <img
            src={
              currentUser?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                currentUser?.name || "مصطفى ضيف"
              )}&background=426287&color=fff`
            }
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-semibold text-lg text-gray-700">
          {currentUser?.name || "مصطفى ضيف"}
        </h2>
      </div>

      <ul className="space-y-2 flex md:block justify-between">
        <SidebarItem section="profile" activeSection={activeSection} setActiveSection={setActiveSection} label="ملفي الشخصي" />
        <SidebarItem section="visits" activeSection={activeSection} setActiveSection={setActiveSection} label="الزيارات المنزلية" />
        <SidebarItem section="orders" activeSection={activeSection} setActiveSection={setActiveSection} label="طلباتي" />
        <SidebarItem section="favorites" activeSection={activeSection} setActiveSection={setActiveSection} label="المفضلة" />
        <SidebarItem section="settings" activeSection={activeSection} setActiveSection={setActiveSection} label="الإعدادات" />
      </ul>

      <div className="mt-6 text-center">
        <LogoutButton />
      </div>
    </div>
  );
}
