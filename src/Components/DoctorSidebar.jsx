import React from "react";
import { useNavigate } from "react-router-dom";
import { IconLayoutDashboard, IconCalendarCheck, IconUsers, IconUser } from "./icons";

export default function DoctorSidebar({ isOpen, toggleSidebar, activeName }) {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, path: "/doctor-dashboard" },
    { name: "Appointments", icon: <IconCalendarCheck />, path: "/doctor-appointments" },
    { name: "Patients", icon: <IconUsers />, path: "/doctor-patients" },
    { name: "Profile", icon: <IconUser />, path: "/doctor-profile" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-500 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 text-3xl font-bold text-[#006d77] flex justify-between items-center border-b">
        <button onClick={() => navigate("/doctor-dashboard")} className="cursor-pointer">
          CureLink
        </button>
        <button onClick={() => toggleSidebar(false)} className="text-gray-600 hover:text-gray-900 text-2xl">
          ×
        </button>
      </div>
      <div className="p-6 text-center border-b">
        <img
          src="https://placehold.co/96x96/E0E7FF/4F46E5?text=DR"
          alt="Doctor Profile"
          className="w-24 h-24 rounded-full mx-auto mb-3 cursor-pointer"
          onClick={() => {
            navigate("/doctor-profile");
            toggleSidebar(false);
          }}
        />
        <h2 className="text-lg font-semibold">Dr. Mohamed Ahmad</h2>
        <p className="text-sm text-gray-500">Cairo University Hospital</p>
      </div>
      <nav className="flex-1 mt-6 px-4">
        {navItems.map((item) => {
          const isActive = activeName === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                toggleSidebar(false);
              }}
              className={`flex items-center w-full text-left px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-[#E0F2F1] hover:text-[#006d77] ${
                isActive ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}


