import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Calendar, User } from "lucide-react";

const NurseSidebar = () => {
  const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/nursing/nurse_dashboard" },
  { name: "Appointments", icon: <Calendar size={18} />, path: "/nursing/nurse_appointments" },
  { name: "Patients", icon: <Users size={18} />, path: "/nursing/nurse_patients" },
  { name: "Profile", icon: <User size={18} />, path: "/nursing/nurse_profile" },
];


  return (
    <div className="flex flex-col h-screen w-64 bg-[#1E88E5] text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Nurse Panel</h2>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-[#1E88E5]" : "hover:bg-blue-500"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NurseSidebar;
