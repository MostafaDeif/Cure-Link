import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import logo from "../../assets/JustLogo.jpg";
import DoctorImg from "../../assets/doctor image.jpg";

const NurseHeader = ({ toggleSidebar }) => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-blue-950 shadow-sm border-b border-blue-800 px-4 sm:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button className="sm:hidden text-white" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <img
          src={logo}
          alt="Logo"
          className="w-[45px] h-[35px] sm:w-[50px] sm:h-[40px]"
        />
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search patients, medications..."
            className="w-full bg-white border border-gray-200 rounded-[10px] py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="text-right">
          <p className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
            Nurse David Lee, RN
          </p>
        </div>
        <img
          src={DoctorImg}
          alt="Nurse Avatar"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 object-cover"
        />
      </div>
    </header>
  );
};

export default NurseHeader;
