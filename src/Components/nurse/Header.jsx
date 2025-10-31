import React from "react";
import { Bell, Search } from "lucide-react";

const NurseHeader = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md px-6 py-3 sticky top-0 z-40">
      <h1 className="text-xl font-semibold text-[#1E88E5]">Welcome Back </h1>

      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-[#1E88E5]"><Search size={22} /></button>
        <button className="relative text-gray-500 hover:text-[#1E88E5]">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default NurseHeader;
