import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Home, Calendar, Users, User } from "lucide-react";

export default function Sidebar({ onClose }) {
  const { id } = useParams();

  const menu = [
    {
      name: "Dashboard",
      path: `/nursing/nurse_dashboard/${id}`,
      icon: <Home size={20} />,
    },
    {
      name: "Appointments",
      path: `/nursing/nurse_appointments/${id}`,
      icon: <Calendar size={20} />,
    },
    {
      name: "Patients",
      path: `/nursing/nurse_patients/${id}`,
      icon: <Users size={20} />,
    },
    {
      name: "Profile",
      path: `/nursing/nurse_profile/${id}`,
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 bg-[#F5F7FA] p-4 rounded-2xl min-h-full">
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `
            flex items-center gap-3 px-4 py-3 rounded-xl
            transition-all duration-300
            ${
              isActive
                ? "bg-white text-[#4C6FFF] shadow-md"
                : "text-gray-600 hover:bg-[#E8EDFF] hover:text-[#4C6FFF]"
            }
            `
          }
        >
          <span
            className="
              flex items-center justify-center
              w-9 h-9 rounded-lg
              transition-colors
              group-hover:bg-[#DDE3FF]
            "
          >
            {item.icon}
          </span>
          <span className="font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
