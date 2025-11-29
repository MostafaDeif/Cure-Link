import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { nursesData } from "../Nurse/nurseData";
import { Star, Clock, User, Activity, Pill, Phone } from "lucide-react";
import { FaCheckCircle, FaNotesMedical } from "react-icons/fa";

export default function NurseAppointments() {
  const { id } = useParams();
  const nurse = nursesData.find((n) => n.id === Number(id));
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  if (!nurse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-rose-600 text-lg font-semibold">Nurse not found.</p>
      </div>
    );
  }
  const appointments = nurse?.appointments || [];
  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg font-medium">
          No appointments found for {nurse.name}.
        </p>
      </div>
    );
  }
  const groupedByDate = appointments.reduce((acc, app) => {
    if (!acc[app.date]) acc[app.date] = [];
    acc[app.date].push(app);
    return acc;
  }, {});
  const statusColors = {
    Completed: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    Upcoming: "bg-sky-50 border-sky-200 hover:bg-sky-100",
    Missed: "bg-rose-50 border-rose-200 hover:bg-rose-100",
  };
  const statusIconColors = {
    Completed: "text-emerald-600",
    Upcoming: "text-sky-600",
    Missed: "text-rose-600",
  };
  const typeIcons = {
    Checkup: <Activity size={16} className="text-sky-500" />,
    Medication: <Pill size={16} className="text-indigo-500" />,
    Procedure: <User size={16} className="text-amber-500" />,
    Therapy: <Star size={16} className="text-emerald-500" />,
  };
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans w-full overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
        Nurse Schedule
      </h1>
      <p className="text-slate-600 mb-6 text-sm sm:text-base">
        All upcoming and completed appointments for the month
      </p>
      <div className="flex flex-col gap-4 w-full">
        {Object.keys(groupedByDate)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => (
            <div
              key={date}
              className="rounded-2xl bg-white shadow border border-slate-200 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg w-full"
            >
              <h2 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h2>
              <div className="flex flex-wrap gap-3 w-full">
                {groupedByDate[date].map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedAppointment(ev)}
                    className={`flex-1 min-w-[150px] rounded-xl border p-3 cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col gap-1 ${
                      statusColors[ev.status]
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {typeIcons[ev.type] || <Activity size={16} />}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        {ev.time}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                      {ev.task}
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm">
                      {ev.patientName || ev.patient}
                    </div>
                    <div className="text-slate-500 text-xs sm:text-sm">
                      Status: {ev.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              {typeIcons[selectedAppointment.type] || (
                <User size={20} className="text-sky-500" />
              )}
              <h2 className="text-xl font-bold text-slate-800 break-words">
                {selectedAppointment.name ||
                  selectedAppointment.patient ||
                  "Unknown Patient"}
              </h2>
            </div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <Phone size={20} className="text-sky-500" />
              <span className="text-slate-700">
                {selectedAppointment.phone ||
                  selectedAppointment.patientPhone ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <Clock size={20} className="text-slate-500" />
              <span>{selectedAppointment.time}</span>
            </div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              {typeIcons[selectedAppointment.type] || <Activity size={20} />}
              <span>{selectedAppointment.type}</span>
            </div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <FaCheckCircle
                size={18}
                className={statusIconColors[selectedAppointment.status]}
              />
              <span>{selectedAppointment.status}</span>
            </div>
            {selectedAppointment.notes && (
              <div className="flex items-start gap-3 border-t border-slate-200 pt-3 mt-3">
                <FaNotesMedical className="text-amber-500 mt-1" />
                <p className="italic text-slate-600 break-words">
                  "{selectedAppointment.notes}"
                </p>
              </div>
            )}
            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
