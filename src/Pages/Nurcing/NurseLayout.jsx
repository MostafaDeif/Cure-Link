import React from "react";
import Header from "../../Components/nurse/Header";
import Sidebar from "../../Components/nurse/Sidebar";
import { Outlet } from "react-router-dom";

export default function NurseLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
