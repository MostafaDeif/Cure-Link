import React, { useState } from "react";
import { Star, Clock, User, Activity, Pill, Phone } from "lucide-react";

export default function NurseAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    {
      id: 1,
      date: "2025-11-27",
      time: "09:00 AM",
      patient: "Ahmed Ali",
      phone: "01012345678",
      task: "Vitals Check",
      type: "Checkup",
      status: "Completed",
      notes: "BP slightly elevated.",
    },
    {
      id: 2,
      date: "2025-11-27",
      time: "11:00 AM",
      patient: "Sara Mohamed",
      phone: "01087654321",
      task: "Medication Admin",
      type: "Medication",
      status: "Upcoming",
    },
    {
      id: 3,
      date: "2025-11-27",
      time: "02:00 PM",
      patient: "Omar Hassan",
      phone: "01011223344",
      task: "Dressing Change",
      type: "Procedure",
      status: "Upcoming",
    },
    {
      id: 4,
      date: "2025-11-28",
      time: "08:30 AM",
      patient: "Mona Adel",
      phone: "01022334455",
      task: "Blood Sugar Check",
      type: "Checkup",
      status: "Upcoming",
    },
    {
      id: 5,
      date: "2025-11-28",
      time: "10:00 AM",
      patient: "Ali Farouk",
      phone: "01033445566",
      task: "Vitals Check",
      type: "Checkup",
      status: "Completed",
      notes: "Stable patient.",
    },
    {
      id: 6,
      date: "2025-11-28",
      time: "01:00 PM",
      patient: "Laila Sami",
      phone: "01044556677",
      task: "Medication Admin",
      type: "Medication",
      status: "Upcoming",
    },
    {
      id: 7,
      date: "2025-11-29",
      time: "03:00 PM",
      patient: "Hassan Omar",
      phone: "01055667788",
      task: "Therapy Review",
      type: "Therapy",
      status: "Upcoming",
    },
    {
      id: 8,
      date: "2025-11-29",
      time: "09:30 AM",
      patient: "Fatima Nasser",
      phone: "01066778899",
      task: "Vitals Check",
      type: "Checkup",
      status: "Completed",
      notes: "BP normal.",
    },
    {
      id: 9,
      date: "2025-11-30",
      time: "10:30 AM",
      patient: "Youssef Taha",
      phone: "01077889900",
      task: "Medication Admin",
      type: "Medication",
      status: "Upcoming",
    },
    {
      id: 10,
      date: "2025-11-30",
      time: "12:00 PM",
      patient: "Sara Khaled",
      phone: "01088990011",
      task: "Blood Sugar Check",
      type: "Checkup",
      status: "Upcoming",
    },
  ];

  const groupedByDate = appointments.reduce((acc, app) => {
    if (!acc[app.date]) acc[app.date] = [];
    acc[app.date].push(app);
    return acc;
  }, {});

  const statusColors = {
    Completed: "bg-green-50 border-green-200 hover:bg-green-50",
    Upcoming: "bg-blue-50 border-blue-200 hover:bg-blue-50",
    Missed: "bg-red-50 border-red-200 hover:bg-red-50",
  };

  const dailyCardColor = "bg-[#F5F7FA]";

  const typeIcons = {
    Checkup: <Activity size={16} className="text-blue-600" />,
    Medication: <Pill size={16} className="text-purple-600" />,
    Procedure: <User size={16} className="text-orange-600" />,
    Therapy: <Star size={16} className="text-yellow-500" />,
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 sm:p-8 font-sans w-full overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Nurse Schedule
      </h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        All upcoming and completed appointments for the month
      </p>

      <div className="flex flex-col gap-4 w-full">
        {Object.keys(groupedByDate).map((date) => (
          <div
            key={date}
            className={`rounded-2xl shadow border border-gray-200 p-4 sm:p-6 transition transform hover:scale-102 hover:shadow-md ${dailyCardColor} w-full`}
          >
            <h2 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
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
                  className={`flex-1 min-w-[150px] rounded-xl border p-3 cursor-pointer transition transform hover:scale-105 hover:shadow-lg flex flex-col gap-1 ${
                    statusColors[ev.status]
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {typeIcons[ev.type]}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {ev.time}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    {ev.task}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">
                    {ev.patient}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    Status: {ev.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-3">
            <h2 className="text-xl font-bold mb-2">
              {selectedAppointment.task}
            </h2>

            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              <span className="font-medium">{selectedAppointment.patient}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} className="text-green-600" />
              <span>{selectedAppointment.phone || "N/A"}</span>
            </div>

            <p>
              <strong>Time:</strong> {selectedAppointment.time}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Type:</strong> {selectedAppointment.type}
            </p>

            {selectedAppointment.notes && (
              <p className="mt-2 italic text-gray-600 border-t pt-2">
                "{selectedAppointment.notes}"
              </p>
            )}

            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
