import React from "react";
import { useNavigate } from "react-router-dom";
import nursesData from "./nurseData";
import { Star, MapPin, ArrowLeft } from "lucide-react";

const NurseCard = ({ nurse, onClick }) => (
  <article
    onClick={onClick}
    className="rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/95 flex flex-col lg:flex-row w-full shadow-lg ring-1 ring-blue-100"
    style={{ minHeight: "140px" }}
  >
    {/* Image Section */}
    <div className="w-full lg:w-1/5 h-44 lg:h-auto flex-shrink-0 flex items-center justify-center p-2">
      <img
        src={nurse.imageUrl}
        alt={nurse.name}
        className="w-full h-full object-cover rounded-lg shadow-md ring-1 ring-blue-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60";
        }}
      />
    </div>

    {/* Text Section */}
    <div className="p-3 flex flex-col justify-between lg:flex-1">
      <div>
        <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-1">
          {nurse.name}
        </h3>
        <p className="text-blue-600 text-base font-medium mb-1">
          {nurse.specialty}
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-2 text-gray-700 text-sm">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" /> {nurse.rating}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-500" /> {nurse.distance}
          </span>
          <span className="px-2 py-0.5 bg-teal-100 rounded-full text-teal-700 text-xs">
            {nurse.gender}
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {nurse.name} is a professional nurse specializing in{" "}
          <strong>{nurse.specialty}</strong>. With trusted reviews,{" "}
          {nurse.gender === "Female" ? "she" : "he"} provides quality care and
          comfort.
        </p>
      </div>

      <div className="mt-3 lg:mt-1 flex justify-center lg:justify-end">
        <button className="w-full lg:w-auto px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-teal-500 transition text-sm">
          Book Appointment
        </button>
      </div>
    </div>
  </article>
);

export default function AllNurses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/80 to-teal-50/80 py-8 px-4 md:px-10 lg:px-14 space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft
          className="w-6 h-6 text-blue-700 cursor-pointer hover:text-blue-800"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-blue-700">All Nurses</h1>
      </div>

      <div className="flex flex-col gap-4">
        {nursesData.map((nurse) => (
          <NurseCard
            key={nurse.name}
            nurse={nurse}
            onClick={() =>
              navigate(`/nurse-book/${encodeURIComponent(nurse.name)}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
