import React, { useState } from "react";
import Sidebar from "../../Components/nurse/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export default function NurseLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-900 p-6 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}

      {/* Content */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${open ? "ml-64" : "ml-0"}
        `}
      >
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="fixed top-4 left-4 z-50 bg-gray-100 text-gray-900 p-2 rounded-md hover:bg-gray-200 transition shadow-md"
          >
            <Menu />
          </button>
        )}

        <main className="pt-16 px-4 sm:px-8 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
