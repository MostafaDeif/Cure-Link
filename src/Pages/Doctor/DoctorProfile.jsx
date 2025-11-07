import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import {ArrowLeft,} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function DoctorProfile({ doctorsData }) {
    const navigate = useNavigate();
  const { doctorName } = useParams();
  const doctor = doctorsData.find((d) => d.name === doctorName);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [comments, setComments] = useState([
    { name: "Sara", comment: "Great doctor, very professional!" },
    { name: "Omar", comment: "Helped me a lot, recommended!" },
  ]);
  const [newComment, setNewComment] = useState("");
  if (!doctor) return <p className="p-6 text-red-500">Doctor not found</p>;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  const availableSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM",
  ];
  const handleBook = () => {
    if (!selectedDate) return alert("Please select a date first");
    if (!selectedSlot) return alert("Please select a time slot first");
    alert(
      `Appointment booked with ${doctor.name} on ${selectedDate.toDateString()} at ${selectedSlot}`
    );
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { name: "Anonymous", comment: newComment }]);
      setNewComment("");
    }
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:px-20 lg:px-32 font-sans">
      {/* Header */}
      <div className="flex items-center mb-6 space-x-6">
                <button className="rounded-full p-2 hover:bg-gray-100" onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-6 w-6 text-gray-800" />
                </button>
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="h-32 w-32 rounded-lg object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
          <p className="text-gray-500">{doctor.specialty}</p>
          <div className="flex items-center mt-2 space-x-2">
            <Star className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
            <span className="font-semibold text-gray-700">{doctor.rating}</span>
          </div>
        </div>
      </div>
      {/* Calendar */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-semibold">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-1">
          {daysArray.map((day, idx) =>
            day ? (
              (() => {
                const thisDate = new Date(year, month, day);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPast = thisDate < today;
                return (
                  <button
                    key={idx}
                    onClick={() => !isPast && setSelectedDate(thisDate)}
                    disabled={isPast}
                    className={`py-2 rounded-lg border transition ${
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === month &&
                      selectedDate?.getFullYear() === year
                        ? "bg-blue-600 text-white"
                        : isPast
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })()
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>
      </section>
      {/* Slots */}
      {selectedDate && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Available Slots for {selectedDate.toDateString()}
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white transition"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            onClick={handleBook}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </section>
      )}
      {/* Comments Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Comments</h2>
        <div className="space-y-4 mb-4">
          {comments.map((c, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl shadow-sm">
              <p className="font-semibold text-gray-700">{c.name}</p>
              <p className="text-gray-500">{c.comment}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </section>
    </div>
  );
}
