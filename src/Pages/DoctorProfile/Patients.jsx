import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ========== ICONS ==========
const IconLayoutDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const IconCalendarCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);
const IconUserCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);
// -------- SIDEBAR ----------
const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, path: "/doctor-dashboard" },
    { name: "Appointments", icon: <IconCalendarCheck />, path: "/doctor-appointments" },
    { name: "Patients", icon: <IconUsers />, path: "/doctor-patients" },
    { name: "Profile", icon: <IconUser />, path: "/doctor-profile" },
  ];
  return (
    <div className="w-64 bg-white shadow-lg flex-col hidden lg:flex">
      <div
        onClick={() => navigate("/doctor-dashboard")}
        className="p-6 text-3xl font-bold text-[#006d77] cursor-pointer"
      >
        CureLink
      </div>
      <div className="p-6 text-center border-b">
        <img
          src="https://placehold.co/96x96/E0E7FF/4F46E5?text=DR"
          alt="Doctor Profile"
          className="w-24 h-24 rounded-full mx-auto mb-3 cursor-pointer"
          onClick={() => navigate("/doctor-profile")}
        />
        <h2 className="text-lg font-semibold">Dr. Mohamed Ahmad</h2>
        <p className="text-sm text-gray-500">Cairo University Hospital</p>
      </div>
      <nav className="flex-1 mt-6 px-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center w-full text-left px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-[#E0F2F1] hover:text-[#006d77] ${
              item.name === "Patients" ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
// -------- HEADER ----------
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700">
          <IconSearch />
        </button>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/doctor-profile")}
        >
          <IconUserCircle />
        </button>
      </div>
    </header>
  );
};
// -------- PATIENTS PAGE ----------
const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const patients = [
    { name: "John Smith", id: "ID-00123", lastVisit: "Oct 22, 2025", status: "Inactive" },
    { name: "Ms. Sarah Lee", id: "ID-00245", lastVisit: "Oct 22, 2025", status: "Active" },
    { name: "L. Smith Lee", id: "ID-00312", lastVisit: "Oct 22, 2025", status: "Inactive" },
    { name: "David Brown", id: "ID-00456", lastVisit: "Oct 22, 2025", status: "Active" },
    { name: "Mr. Ahmed Nabil", id: "ID-00459", lastVisit: "Oct 26, 2025", status: "Active" },
    { name: "Mrs. Mona Saad ", id: "ID-00561", lastVisit: "Nov 22, 2025", status: "Active" },
     { name: "John Adel", id: "ID-00256", lastVisit: "Oct 26, 2025", status: "Active" },
  ];
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
  <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Patients</h1>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                />
                <button className="bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#004f52]">
                  + Add New Patient
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-[#E0F2F1] text-[#006d77]">
                  <tr>
                    <th className="text-left py-3 px-4">Patient Name</th>
                    <th className="text-left py-3 px-4">Patient ID</th>
                    <th className="text-left py-3 px-4">Last Visit</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition duration-200">
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4">{p.id}</td>
                      <td className="py-3 px-4">{p.lastVisit}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            p.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => navigate("")}
                          className="text-[#006d77] hover:underline"
                        >
                          View Record
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                        No patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Patients;
