import React from "react";
import { User, CheckCircle, Clock, MessageCircle } from "lucide-react";

export default function NurseDashboardContent() {
  const stats = [
    {
      title: "Patients Today",
      value: 8,
      icon: <User className="text-blue-600 w-6 h-6" />,
    },
    {
      title: "Completed Visits",
      value: 5,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Upcoming Appointments",
      value: 3,
      icon: <Clock className="text-orange-500 w-6 h-6" />,
    },
  ];

  const appointments = [
    {
      id: 1,
      patient: "Ahmed Ali",
      service: "Wound Dressing",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Sara Youssef",
      service: "Injection",
      time: "12:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Omar Hassan",
      service: "Blood Pressure Check",
      time: "3:00 PM",
      status: "Upcoming",
    },
  ];

  const notifications = [
    "New appointment request from Mona Khaled",
    "You completed a visit for Ahmed Ali",
    "Tomorrow’s schedule has 4 visits",
  ];

  const feedbacks = [
    {
      id: 1,
      patient: "Ahmed Ali",
      comment: "Thank you for your kindness and care!",
      rating: 5,
    },
    {
      id: 2,
      patient: "Sara Youssef",
      comment: "Very professional and punctual.",
      rating: 4,
    },
    {
      id: 3,
      patient: "Omar Hassan",
      comment: "Helpful, but came 10 minutes late.",
      rating: 3,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <h1 className="text-2xl font-semibold mb-2">Welcome back, Nurse Menna</h1>
      <p className="text-gray-500 mb-6">
        Here’s your schedule and updates for today.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Today's Appointments</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Service</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{appt.patient}</td>
                  <td className="p-3">{appt.service}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appt.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">
                      View
                    </button>
                    <button className="text-green-600 hover:underline text-sm">
                      Mark Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <ul className="space-y-3">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500 text-sm text-gray-700"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🩵 Recent Feedback Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-600 w-6 h-6" />
          <h2 className="text-lg font-semibold">Recent Feedback</h2>
        </div>
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border-b pb-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{fb.patient}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${
                        i < fb.rating ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{fb.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
