import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDoctor from "../../Components/HeaderDoctor";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
// ===== STAT CARD =====
const StatCard = ({ title, value }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-center items-center">
    <p className="text-sm text-gray-500 uppercase tracking-wide">{title}</p>
    <p className="text-4xl font-extrabold text-gray-800 mt-2">{value}</p>
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
      case "Confirmed": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Upcoming Appointments</h3>
        <a href="/doctor-appointments" className="text-sm text-[#006d77] hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appt, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
            <div>
              <p className="font-medium text-gray-800 text-lg">{appt.name}</p>
              <p className="text-sm text-gray-500">{appt.time}</p>
            </div>
            <span className={`px-4 py-1 rounded-full font-semibold text-sm ${getStatusClass(appt.status)}`}>{appt.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
// ===== CLINIC DETAILS =====
const ClinicDetails = () => {
  const position = [30.0269, 31.2118];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Clinic Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 md:h-48 rounded-xl overflow-hidden">
          <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Cairo University Hospital</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold text-gray-800 text-lg">Cairo University Hospital</p>
            <p className="text-sm text-gray-600 mt-1">Giza, Egypt</p>
            <p className="text-sm text-gray-600 mt-1">(02) 35676105</p>
            <p className="text-sm text-gray-600 mt-1">info@cu-hospital.com</p>
          </div>
          <p className="text-sm text-gray-500 mt-3">Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};
// ==== QUICK ACTIONS =====
const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <button onClick={() => navigate('/doctor-patients')} className="w-full py-3 rounded-full bg-[#006d77] text-white font-semibold hover:bg-[#004f52] transition-all duration-300">+ Add Appointment</button>
      <button onClick={() => navigate('/doctor-patients')} className="w-full py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300">View Patient Records</button>
    </div>
  );
};
// ==== DASHBOARD CHARTS =====
const DashboardCharts = () => {
  const data = [
    { day: 'Mon', appointments: 10 },
    { day: 'Tue', appointments: 14 },
    { day: 'Wed', appointments: 12 },
    { day: 'Thu', appointments: 18 },
    { day: 'Fri', appointments: 8 },
  ];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Appointments This Week</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="appointments" stroke="#006d77" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
// ==== RECENT PATIENTS =====
const RecentPatients = () => {
  const patients = [
    { name: 'Ahmed Ali', date: 'Oct 20, 2025' },
    { name: 'Sara Khaled', date: 'Oct 21, 2025' },
    { name: 'Omar Hassan', date: 'Oct 22, 2025' },
    { name: 'Mona Samir', date: 'Oct 23, 2025' },
    { name: 'Youssef Adel', date: 'Oct 24, 2025' },
  ];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Patients</h3>
      <ul className="flex flex-col gap-3">
        {patients.map((patient, idx) => (
          <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
            <span className="font-medium text-gray-800">{patient.name}</span>
            <span className="text-sm text-gray-500">{patient.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// ===== MAIN DASHBOARD =====
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (value) => setSidebarOpen(value);
  return (
    <div className="flex min-h-screen bg-gray-100 transition-all">
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} activeName="Dashboard" />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <HeaderDoctor toggleSidebar={() => toggleSidebar(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DashboardCharts />
            <RecentPatients />
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
