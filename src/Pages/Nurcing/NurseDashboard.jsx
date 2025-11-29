import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { nursesData } from "../Nurse/nurseData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faNotesMedical,
  faPills,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

export default function NurseDashboard() {
  const { id } = useParams();
  const nurse = nursesData.find((n) => n.id === Number(id));

  const [dashboardData, setDashboardData] = useState({
    todaysAppointments: [],
    tasksOverview: [],
  });

  useEffect(() => {
    if (nurse) {
      const today = new Date().toISOString().split("T")[0];
      const todaysAppointments = nurse.appointments
        .filter((app) => app.date === today)
        .map((app) => ({
          patientName: `Patient ${app.patientId}`,
          task: app.task,
          time: app.time,
          type: app.type,
          status: app.status,
        }));
      const tasksOverview = [
        {
          title: "Tasks Completed",
          completed: nurse.appointments.filter((a) => a.status === "Completed")
            .length,
          total: nurse.appointments.length,
          icon: faNotesMedical,
        },
        {
          title: "Active Treatments",
          completed: nurse.appointments.filter((a) => a.status === "Upcoming")
            .length,
          total: nurse.appointments.length,
          icon: faStethoscope,
        },
        {
          title: "Pending Tasks",
          completed: nurse.appointments.filter((a) => a.status === "Upcoming")
            .length,
          total: nurse.appointments.length,
          icon: faPills,
        },
      ];
      setDashboardData({ todaysAppointments, tasksOverview });
    }
  }, [nurse?.id]);
  if (!nurse)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-100 text-slate-700">
        Nurse not found
      </div>
    );
  const { todaysAppointments, tasksOverview } = dashboardData;

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8 text-slate-800">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <div className="bg-white px-4 sm:px-8 py-5 sm:py-6 rounded-xl mb-8 shadow border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-800 truncate hover:text-slate-700 transition">
          {nurse.name}'s Dashboard
        </h1>
        <p className="text-sm text-slate-500 truncate">Today's Overview</p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Today's Appointments"
          value={todaysAppointments.length}
          icon={faCalendarDay}
        />
        {tasksOverview.map((task, idx) => (
          <StatCard
            key={idx}
            title={task.title}
            value={task.completed}
            icon={task.icon}
          />
        ))}
      </div>
      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Today's Schedule */}
        <section className="bg-white p-6 rounded-xl shadow border border-slate-200 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="divide-y divide-slate-200">
            {todaysAppointments.length === 0 && (
              <p className="text-slate-500 text-sm">
                No appointments for today.
              </p>
            )}
            {todaysAppointments.map((item, idx) => (
              <div
                key={idx}
                className="py-4 flex items-center justify-between hover:bg-slate-50 rounded-lg transition cursor-pointer px-2"
              >
                <div>
                  <p className="font-medium">{item.patientName}</p>
                  <p className="text-sm text-slate-600">{item.task}</p>
                  <p className="text-xs mt-1 text-slate-500">
                    Status: {item.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-700">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks Overview */}
        <aside className="bg-white p-6 rounded-xl shadow border border-slate-200 hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-4">Tasks Overview</h3>
          <div className="space-y-4">
            {tasksOverview.map((task, idx) => {
              const percent = (task.completed / task.total) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={task.icon}
                        className="text-sky-600"
                      />
                      <span className="text-sm font-medium">{task.title}</span>
                    </div>
                    <span className="text-sm">
                      {task.completed}/{task.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-sky-600"
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
}
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg transition-all">
    <div className="p-3 rounded-lg bg-sky-100">
      <FontAwesomeIcon icon={icon} className="text-sky-600 text-xl" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-600">{title}</p>
      <h4 className="text-2xl font-semibold mt-1">{value}</h4>
    </div>
  </div>
);
