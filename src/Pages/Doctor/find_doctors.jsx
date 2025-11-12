import React, { useState } from "react";
import { doctorsData } from "../Doctor/doctorsData";
import {
  Users, ArrowLeft, Search, Stethoscope, AirVent, Smile, Brain,
  HeartPulse, MapPin, Star, ChevronRight, Bone, Eye, Ear,
  Thermometer, Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// Component for Category Icon
const CategoryIcon = ({ icon: Icon, label, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-2 cursor-pointer transition ${
      selected ? "text-blue-600" : "text-gray-700"
    }`}
  >
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
        selected ? "bg-blue-100" : "bg-blue-50"
      }`}
    >
      {Icon && <Icon className="h-8 w-8" />}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);
// Component for Recommended Doctor Card
const RecommendedDoctorCard = ({ name, specialty, rating, distance, imageUrl }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={name}
        className="h-24 w-24 rounded-lg object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=96&h=96&q=80";
        }}
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{specialty}</p>
        <div className="mt-3 flex items-center space-x-4">
          <div className="flex items-center space-x-1 rounded-full bg-blue-100 px-2 py-0.5">
            <Star className="h-4 w-4 text-blue-600" fill="#3B82F6" />
            <span className="text-sm font-semibold text-blue-700">{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{distance}</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/doctor-profile/${name}`)}
          className="mt-3 px-4 py-1 bg-blue-600 rounded-full text-sm font-semibold text-white hover:bg-blue-500 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
// Component for Doctor Card
const DoctorCard = ({ name, imageUrl, specialty, rating, distance }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 group relative bg-white">
      {/* Doctor Image */}
      <img
        src={imageUrl}
        alt={name}
        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=160&h=160&q=80";
        }}
      />
      {/* Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white px-4 bg-gradient-to-t from-black/50 via-black/25 to-transparent">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm">{specialty}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/doctor-profile/${name}`);
          }}
          className="mt-2 px-4 py-1 bg-blue-600 rounded-full text-sm font-semibold hover:bg-blue-500 transition"
        >
          View Profile
        </button>
      </div>
      {/* Rating & Distance */}
      <div className="bg-white px-3 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-blue-600" fill="#3B82F6" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{distance}</span>
        </div>
      </div>
    </div>
  );
};
// Main Component
export default function FindDoctors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    { label: "All", icon: Users },
    { label: "General", icon: Stethoscope },
    { label: "Lungs", icon: AirVent },
    { label: "Dentist", icon: Smile },
    { label: "Psychiatrist", icon: Brain },
    { label: "Surgeon", icon: Stethoscope },
    { label: "Cardiologist", icon: HeartPulse },
    { label: "Orthopedic", icon: Bone },
    { label: "Eye Specialist", icon: Eye },
    { label: "ENT", icon: Ear },
    { label: "Neurologist", icon: Activity },
    { label: "Therapist", icon: Thermometer },
  ];
  const filteredDoctors =
    selectedCategory === "All"
      ? doctorsData.filter(
          (doc) =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : doctorsData.filter(
          (doc) =>
            doc.specialty === selectedCategory &&
            (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
        );
  const filteredRecommended = filteredDoctors.slice(0, 3);
  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans px-6 md:px-20 lg:px-32 py-8">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <button
          className="rounded-full p-2 hover:bg-gray-100"
          onClick={() => navigate("/Services")}
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex-1">
          Find Doctors
        </h1>
        <div className="w-8"></div>
      </header>
      {/* Search */}
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search for doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white p-4 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-900">Categories</h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 whitespace-nowrap animate-marquee">
            {[...categories, ...categories].map((cat, index) => (
              <div key={index} className="inline-block min-w-[120px]">
                <CategoryIcon
                  icon={cat.icon}
                  label={cat.label}
                  selected={selectedCategory === cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 15s linear infinite;
          }
          @media (min-width: 768px) {
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          }
        `}</style>
      </section>
      {/* Recommended Doctors */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-900">Recommended Doctors</h2>
        <div className="space-y-4">
          {filteredRecommended.map((doc) => (
            <RecommendedDoctorCard key={doc.name} {...doc} />
          ))}
        </div>
      </section>
    {/* All Doctors */}
<section className="mt-10">
  <h2 className="mb-6 text-xl md:text-2xl font-semibold text-gray-900 text-center">
    All Doctors
  </h2>

  {/* Limited Doctors Preview */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {filteredDoctors.slice(0, 4).map((doctor) => (
      <div
        key={doctor.name}
        className="rounded-2xl bg-white shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-gray-100"
      >
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80';
          }}
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{doctor.specialty}</p>
          <div className="flex justify-center items-center gap-3 text-sm text-gray-600">
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

  {/* Show More Button */}
  {filteredDoctors.length > 4 && (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => navigate("/all-doctors")}
        className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-300 transition-all duration-300"
      >
        Show More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )}
</section>

    </div>
  );
}
