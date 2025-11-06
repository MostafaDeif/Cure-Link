import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDoctor from "../../Components/HeaderDoctor";
import DoctorSidebar from "../../Components/DoctorSidebar";
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
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} activeName="Dashboard" />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <HeaderDoctor toggleSidebar={() => toggleSidebar(true)} sidebarOpen={sidebarOpen} />
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
