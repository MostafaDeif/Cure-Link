import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import HeaderDoctor from "../../Components/HeaderDoctor";
import DoctorSidebar from "../../Components/DoctorSidebar";

// ===== MAIN CONTENT =====
const Appointment = () => {
  const localizer = momentLocalizer(moment);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const toggleSidebar = (value) => {
    setSidebarOpen(value);
  };
  const events = [
    { title: "Mrs. Sarah Lee - Flu", start: new Date(2025, 9, 21, 10, 0), end: new Date(2025, 9, 21, 11, 0), color: "#80CBC4" },
    { title: "Mr. Ahmed Nabil - Checkup", start: new Date(2025, 9, 22, 12, 0), end: new Date(2025, 9, 22, 13, 0), color: "#FFCC80" },
    { title: "Mrs. Mona Saad - Diabetes", start: new Date(2025, 9, 23, 9, 0), end: new Date(2025, 9, 23, 10, 0), color: "#90CAF9" },
  ];
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
    <div className="flex bg-gray-100 min-h-screen transition-all duration-500">
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} activeName="Appointments" />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <HeaderDoctor toggleSidebar={() => toggleSidebar(true)} sidebarOpen={sidebarOpen} className="fixed top-0 left-0 right-0 z-30" />
<main
  className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 transition-all duration-500 mt-16"
>
          <h1 className="text-2xl font-bold mb-6 text-[#006d77]">Appointments Calendar</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm h-[80vh]">
            <Calendar
              localizer={localizer}
              events={events}
              date={date}
              onNavigate={(newDate) => setDate(newDate)}
              view={view}
              onView={(newView) => setView(newView)}
              startAccessor="start"
              endAccessor="end"
              views={["month", "week", "day", "agenda"]}
              eventPropGetter={eventStyleGetter}
              style={{ height: "100%" }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointment;
