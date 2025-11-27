import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Users, User } from "lucide-react";

export default function Sidebar({ onClose }) {
  const menu = [
    { name: "Dashboard", path: "/nursing/nurse_dashboard", icon: <Home /> },
    { name: "Appointments", path: "/nursing/nurse_appointments", icon: <Calendar /> },
    { name: "Patients", path: "/nursing/nurse_patients", icon: <Users /> },
    { name: "Profile", path: "/nursing/nurse_profile", icon: <User /> },
  ];

  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-xl min-h-full">
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${
              isActive
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
