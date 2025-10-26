import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
// ========== COMPONENTS ==========
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
    { name: "Appointments", icon: <IconCalendarCheck />, path: "doctor-appointments" },
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
              item.name === "Appointments" ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
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
// -------- MAIN CONTENT ----------
const Appointment = () => {
  const localizer = momentLocalizer(moment);

  const [events] = useState([
    {
      title: "Mrs. Sarah Lee - Flu",
      start: new Date(2025, 9, 21, 10, 0),
      end: new Date(2025, 9, 21, 11, 0),
      color: "#80CBC4",
    },
    {
      title: "Mr. Ahmed Nabil - Checkup",
      start: new Date(2025, 9, 22, 12, 0),
      end: new Date(2025, 9, 22, 13, 0),
      color: "#FFCC80",
    },
    {
      title: "Mrs. Mona Saad - Diabetes",
      start: new Date(2025, 9, 23, 9, 0),
      end: new Date(2025, 9, 23, 10, 0),
      color: "#90CAF9",
    },
  ]);

  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date()); 

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: "6px",
      color: "#000",
      border: "none",
      display: "block",
      padding: "4px 8px",
    },
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-[#006d77]">Appointments Calendar</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm h-[80vh]">
            <Calendar
              localizer={localizer}
              events={events}
              date={date}
              onNavigate={(newDate) => setDate(newDate)} // <-- هنا بيتغير التاريخ لما تدوسي على next/back/today
              view={view}
              onView={(newView) => setView(newView)}
              startAccessor="start"
              endAccessor="end"
              views={["month", "week", "day", "agenda"]}
              eventPropGetter={eventStyleGetter}
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
