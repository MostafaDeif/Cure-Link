import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faNotesMedical,
  faPills,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const NurseDashboard = () => {
  const todaysAppointments = [
    {
      patient: "Ali Hassan",
      issue: "Blood Pressure",
      time: "9:00 AM",
      type: "Consultation",
      phone: "01012345678",
    },
    {
      patient: "Sara Ahmed",
      issue: "Diabetes Check",
      time: "10:30 AM",
      type: "Follow-up",
      phone: "01087654321",
    },
    {
      patient: "Omar Saleh",
      issue: "Physical Therapy",
      time: "2:00 PM",
      type: "Therapy",
      phone: "01011223344",
    },
    {
      patient: "Nour Khaled",
      issue: "Routine Check",
      time: "3:30 PM",
      type: "Consultation",
      phone: "01022334455",
    },
  ];

  const tasksOverview = [
    { title: "Medication Rounds", completed: 8, total: 10, icon: faPills },
    { title: "Patient Checkups", completed: 5, total: 6, icon: faStethoscope },
    { title: "Follow-ups", completed: 3, total: 4, icon: faNotesMedical },
    { title: "Daily Reports", completed: 4, total: 5, icon: faCalendarDay },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, Nurse
        </h1>
        <p className="text-gray-500 mt-1">Here’s what’s happening today.</p>
      </header>

      {/* Top Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full">
        <StatCard
          title="Today's Appointments"
          value={todaysAppointments.length}
          icon={faCalendarDay}
        />
        <StatCard
          title="Tasks Completed"
          value={tasksOverview.reduce((acc, t) => acc + t.completed, 0)}
          icon={faNotesMedical}
        />
        <StatCard
          title="Active Treatments"
          value={tasksOverview.reduce((acc, t) => acc + t.total, 0)}
          icon={faStethoscope}
        />
        <StatCard
          title="Pending Tasks"
          value={tasksOverview.reduce(
            (acc, t) => acc + (t.total - t.completed),
            0
          )}
          icon={faPills}
        />
      </section>

      {/* Main content */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* LEFT — Today's Schedule */}
        <section className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Today's Schedule
          </h2>
          <div className="divide-y">
            {todaysAppointments.map((item, idx) => (
              <div
                key={idx}
                className="py-4 flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.patient}</p>
                  <p className="text-sm text-gray-500">{item.issue}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Phone: {item.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT — Tasks Completion Overview */}
        <aside className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Tasks Overview
          </h3>
          <div className="space-y-4">
            {tasksOverview.map((task, idx) => {
              const percent = (task.completed / task.total) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={task.icon}
                        className="text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {task.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {task.completed}/{task.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default NurseDashboard;

/* ---------- Helper Component ---------- */
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex items-start gap-4 border w-full">
      <div className="p-3 rounded-lg bg-blue-50">
        <FontAwesomeIcon icon={icon} className="text-blue-700 text-xl" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-2xl font-semibold text-gray-800 mt-1">{value}</h4>
      </div>
    </div>
  );
};
