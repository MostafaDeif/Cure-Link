import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, MapPin } from "lucide-react";

export default function NurseProfileUser({ nursesData }) {
  const navigate = useNavigate();
  const { nurseName } = useParams();
  const nurse = nursesData.find((n) => n.name === nurseName);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [comments, setComments] = useState([
    { name: "Sara", comment: "Great nurse, very caring!" },
    { name: "Omar", comment: "Very professional and kind." },
  ]);
  const [newComment, setNewComment] = useState("");

  // Form state
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    notes: "",
  });

  if (!nurse) return <p className="p-6 text-red-500">Nurse not found</p>;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const availableSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  const handleBook = () => {
    const { fullName, phone } = bookingForm;
    if (!fullName || !phone) return alert("Please fill your name and phone");
    if (!selectedDate) return alert("Please select a date");
    if (!selectedSlot) return alert("Please select a time slot");

    alert(`Appointment booked with ${nurse.name}:
    Date: ${selectedDate.toDateString()}
    Time: ${selectedSlot}
    Name: ${fullName}
    Phone: ${phone}
    Notes: ${bookingForm.notes}`);

    // Reset
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingForm({ fullName: "", phone: "", notes: "" });
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { name: "Anonymous", comment: newComment }]);
      setNewComment("");
    }
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 md:px-20 lg:px-32 font-sans">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <button
          className="rounded-full p-2 hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <img
          src={nurse.imageUrl}
          alt={nurse.name}
          className="h-32 w-32 rounded-lg object-cover shadow-md border-2 border-blue-300"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{nurse.name}</h1>
          <p className="text-blue-700 font-medium">{nurse.specialty}</p>
          <div className="flex items-center gap-3 mt-2">
            <Star className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
            <span className="font-semibold text-gray-700">{nurse.rating}</span>
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-gray-500">{nurse.distance}</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <section className="mb-6 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Select a Date
        </h2>
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          >
            &lt;
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {currentMonth.toLocaleString("default", { month: "long" })} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
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

      {/* Slots & Booking Form */}
      {selectedDate && (
        <section className="mb-6 p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select a Time Slot & Fill Your Details
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
          {/* Booking Form */}
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={bookingForm.fullName}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, fullName: e.target.value })
              }
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, phone: e.target.value })
              }
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <textarea
              placeholder="Additional Notes"
              value={bookingForm.notes}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, notes: e.target.value })
              }
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleBook}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Book Nurse
          </button>
        </section>
      )}

      {/* Comments Section */}
      <section className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Patient Comments
        </h2>
        <div className="space-y-4 mb-4">
          {comments.map((c, idx) => (
            <div key={idx} className="p-4 bg-blue-50 rounded-xl shadow-sm">
              <p className="font-semibold text-gray-700">{c.name}</p>
              <p className="text-gray-600">{c.comment}</p>
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
