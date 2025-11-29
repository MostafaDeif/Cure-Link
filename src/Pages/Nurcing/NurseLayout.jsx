import React, { useState } from "react";
import Sidebar from "../../Components/nurse/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export default function NurseLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex relative">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 p-6 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>
      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-40" />
      )}
      {/* Main content */}
      <main
        className={`
          flex-1 transition-transform duration-300 min-h-screen px-4 sm:px-8
          ${open ? "translate-x-64" : "translate-x-0"}
        `}
      >
        {/* Open Sidebar Button */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="fixed top-4 left-4 p-2 rounded-md shadow-md z-50"
          >
            <Menu />
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
}
