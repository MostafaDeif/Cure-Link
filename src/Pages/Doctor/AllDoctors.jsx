import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { doctorsData } from "../Doctor/doctorsData";

export default function AllDoctors() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 lg:px-32 py-10">
      {/* Header */}
      <header className="mb-10 flex items-center justify-between">
        <button
          className="rounded-full p-2 hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex-1 text-center">
          All Doctors
        </h1>
        <div className="w-8"></div>
      </header>

      {/* Doctors List */}
      <div className="flex flex-col gap-6">
        {doctorsData.map((doctor) => (
          <div
            key={doctor.name}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-5 sm:p-6"
          >
            {/* Doctor Image */}
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="h-32 w-32 rounded-xl object-cover mb-4 sm:mb-0 sm:mr-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=160&h=160&q=80";
              }}
            />

            {/* Doctor Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>

              <div className="mt-3 flex justify-center sm:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{doctor.distance}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/doctor-profile/${doctor.name}`)}
                className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-500 transition"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
