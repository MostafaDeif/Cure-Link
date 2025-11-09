import React, { useState } from "react";
import { Star, Filter } from "lucide-react";

export default function NurseAppointments() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState("all");

  const eventsData = [
    {
      day: 2,
      title: "Med Admin",
      color: "green",
      name: "Vitous Praditis",
      visited: true,
      rating: 4,
      feedback: "Very professional and kind.",
    },
    {
      day: 4,
      title: "Med Dist",
      color: "blue",
      name: "Jane Foster",
      visited: false,
    },
    {
      day: 6,
      title: "Vitals Check",
      color: "green",
      name: "Alice Johnson",
      visited: true,
      rating: 5,
      feedback: "Excellent care!",
    },
    {
      day: 8,
      title: "Patient Check",
      color: "orange",
      name: "Bob Smith",
      visited: false,
    },
    {
      day: 10,
      title: "Rounds",
      color: "blue",
      name: "David Kim",
      visited: true,
      rating: 3,
      feedback: "Good but could improve timing.",
    },
    {
      day: 14,
      title: "Med Admin",
      color: "green",
      name: "Grace Hall",
      visited: false,
    },
    {
      day: 18,
      title: "Vitals Check",
      color: "orange",
      name: "Eve Brown",
      visited: true,
      rating: 5,
      feedback: "Amazing service!",
    },
  ];

  const filteredEvents =
    filter === "all"
      ? eventsData
      : filter === "visited"
      ? eventsData.filter((e) => e.visited)
      : eventsData.filter((e) => !e.visited);

  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    events: filteredEvents.filter((ev) => ev.day === i + 1),
  }));

  return (
    <div className="flex-1 bg-[#F8FBFC] p-4 sm:p-8 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Nurse Schedule
        </h1>
        <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
          View upcoming and completed appointments
        </p>

        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-white border border-gray-200 rounded-xl p-2 sm:p-3 shadow-sm">
          <Filter className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
          <select
            className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-700 focus:ring-2 focus:ring-blue-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="visited">Visited</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-7 text-center border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2 sm:py-3">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-700">
            {days.map((d) => (
              <div
                key={d.day}
                className="border border-gray-100 min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 relative hover:bg-gray-50 transition break-words"
              >
                <div className="text-gray-400 font-medium mb-1 text-[10px] sm:text-[12px]">
                  {d.day}
                </div>
                {d.events.map((ev, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedEvent(ev)}
                    className={`rounded-lg px-1 sm:px-2 py-1 mb-1 cursor-pointer transition break-words text-[10px] sm:text-[11px] ${
                      ev.color === "green"
                        ? "bg-green-50 border border-green-300 hover:bg-green-100"
                        : ev.color === "blue"
                        ? "bg-blue-50 border border-blue-300 hover:bg-blue-100"
                        : "bg-orange-50 border border-orange-300 hover:bg-orange-100"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {ev.title}
                    </div>
                    <div className="text-gray-600">{ev.name}</div>
                    {ev.visited ? (
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className={
                              i < ev.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 mt-1 inline-block text-[9px] sm:text-[10px]">
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">
              <strong>Patient:</strong> {selectedEvent.name}
            </p>
            <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">
              <strong>Status:</strong>{" "}
              {selectedEvent.visited ? (
                <span className="text-green-600 font-medium">Visited</span>
              ) : (
                <span className="text-orange-500 font-medium">Upcoming</span>
              )}
            </p>
            {selectedEvent.visited && (
              <>
                <div className="flex items-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < selectedEvent.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic border-t pt-2 text-sm sm:text-base">
                  “{selectedEvent.feedback}”
                </p>
              </>
            )}
            <div className="text-right mt-3 sm:mt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-sm sm:text-base rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
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
