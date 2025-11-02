import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Users, User, Settings, LogOut } from "lucide-react";

const NurseSidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/nursing/nurse_dashboard" },
    { name: "Appointments", icon: <Calendar size={18} />, path: "/nursing/nurse_appointments" },
    { name: "Patients", icon: <Users size={18} />, path: "/nursing/nurse_patients" },
    { name: "Profile", icon: <User size={18} />, path: "/nursing/nurse_profile" },
  ];

  return (
    <aside className="flex flex-col h-[calc(100vh-80px)] mt-[80px] w-56 md:w-52 sm:w-44 bg-[#1e4ed8] text-white px-4 py-6 shadow-lg transition-all duration-300">
      {/* Menu Buttons */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-transparent border border-white/30 text-white"
                  : "hover:bg-blue-500/60 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Buttons */}
      <div className="mt-10 border-t border-blue-400 pt-4 space-y-2">
        <NavLink
          to="/nursing/nurse_settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/60 transition-all"
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/logout"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/60 transition-all"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default NurseSidebar;
