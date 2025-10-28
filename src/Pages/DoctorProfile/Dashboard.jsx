import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
// ===== ICONS =====
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
const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
// ===== SIDEBAR =====
const Sidebar = ({ isOpen, toggleSidebar }) => {
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
        CureLink
        <button onClick={() => toggleSidebar(false)} className="text-gray-600 hover:text-gray-900 text-2xl">
          ×
        </button>
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
            onClick={() => {
              navigate(item.path);
              toggleSidebar(false);
            }}
                className={`flex items-center w-full text-left px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-[#E0F2F1] hover:text-[#006d77] ${
              item.name === "Dashboard" ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
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
// ===== HEADER =====
const Header = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition-transform hover:scale-110"
        >
          <IconMenu />
        </button>
      )}
      <div className="flex items-center space-x-6 ml-auto">
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
// ===== STAT CARD =====
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);
// ===== UPCOMING APPOINTMENTS =====
const UpcomingAppointments = () => {
  const appointments = [
    { name: "Mr. John Adel", time: "Oct 26, 2025", status: "Confirmed" },
    { name: "Ms. Sarah Adam", time: "2:30 PM", status: "Pending" },
    { name: "Mr. Seif Eldeen", time: "4:00 PM", status: "Pending" },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        <a href="/doctor-appointments" className="text-sm text-[#006d77] hover:underline">
          View All
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-4 pr-3 font-medium text-gray-800">{appt.name}</td>
                <td className="py-4 px-3 text-gray-500">{appt.time}</td>
                <td className="py-4 pl-3 text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// ===== CLINIC DETAILS =====
const ClinicDetails = () => {
  const position = [30.0269, 31.2118];
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[300px]">
          <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Cairo University Hospital </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Clinic Details</h3>
          <p className="font-semibold text-gray-700">Hospital: Cairo University Hospital</p>
          <p className="text-sm text-gray-600 mt-2">Address: Giza, Egypt</p>
          <p className="text-sm text-gray-600 mt-1">Phone: (02) 35676105</p>
          <p className="text-sm text-gray-600 mt-1">Email: info@cu-hospital.com</p>
          <p className="text-sm text-gray-600 mt-4">Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};
// ==== QUICK ACTIONS =====
const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <button
          onClick={() => navigate("/doctor-patients")}
          className="w-full bg-[#006d77] text-white py-3 rounded-lg font-semibold hover:bg-[#004f52] transition-colors"
        >
          + Add Appointment
        </button>
        <button
          onClick={() => navigate("/doctor-patients")}
          className="w-full mt-3 bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          View Patient Records
        </button>
      </div>
    </div>
  );
};
// ===== MAIN DASHBOARD =====
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (value) => {
    setSidebarOpen(value);
  };
  return (
    <div className="flex bg-gray-100 min-h-screen transition-all duration-500">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSidebar={() => toggleSidebar(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 transition-all duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Today's Appointments" value="14" />
            <StatCard title="Total Patients" value="856" />
            <StatCard title="Completed This Week" value="72" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <UpcomingAppointments />
              <ClinicDetails />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
