import React, { useState } from "react";
import Header from "../../Components/nurse/Header";
import Sidebar from "../../Components/nurse/Sidebar";
import { Outlet } from "react-router-dom";

export default function NurseLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block lg:w-56 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed left-0 top-0 w-64 h-full bg-[#1e4ed8] text-white shadow-lg p-6">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 pt-[80px]">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
