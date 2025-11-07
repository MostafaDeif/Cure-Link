import React, { useState } from 'react';
import {
  Users, ArrowLeft, Search, Stethoscope, AirVent, Smile, Brain, HeartPulse, MapPin, Star, ChevronRight, Bone, Eye, Ear, Thermometer, Activity,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
const CategoryIcon = ({ icon: Icon, label, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-2 cursor-pointer transition ${
      selected ? 'text-blue-600' : 'text-gray-700'
    }`}
  >
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
        selected ? 'bg-blue-100' : 'bg-blue-50'
      }`}
    >
      {Icon && <Icon className="h-8 w-8" />}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);
const RecommendedDoctorCard = ({ name, specialty, rating, distance, imageUrl, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition cursor-pointer"
  >
    <img
      src={imageUrl}
      alt={name}
      className="h-24 w-24 rounded-lg object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=96&h=96&q=80';
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
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </div>
);
const DoctorCard = ({ name, imageUrl, specialty, onClick }) => (
  <div
    onClick={onClick}
    className="rounded-xl bg-white shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer"
  >
    <img
      src={imageUrl}
      alt={name}
      className="h-40 w-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=160&h=160&q=80';
      }}
    />
    <div className="p-3 text-center">
      <h3 className="text-base font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{specialty}</p>
    </div>
  </div>
);
export default function FindDoctors({ doctorsData }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [
    { label: 'All', icon: Users },
    { label: 'General', icon: Stethoscope },
    { label: 'Lungs', icon: AirVent },
    { label: 'Dentist', icon: Smile },
    { label: 'Psychiatrist', icon: Brain },
    { label: 'Surgeon', icon: Stethoscope },
    { label: 'Cardiologist', icon: HeartPulse },
    { label: 'Orthopedic', icon: Bone },
    { label: 'Eye Specialist', icon: Eye },
    { label: 'ENT', icon: Ear },
    { label: 'Neurologist', icon: Activity },
    { label: 'Therapist', icon: Thermometer },
  ];
  const filteredDoctors =
    selectedCategory === 'All'
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
  const filteredRecommended = filteredDoctors.slice(0, 4);
  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans px-6 md:px-20 lg:px-32 py-8">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <button className="rounded-full p-2 hover:bg-gray-100" onClick={() => navigate(-1)}>
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
      <section className="mb-10">
        <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-900">Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryIcon
              key={category.label}
              icon={category.icon}
              label={category.label}
              selected={selectedCategory === category.label}
              onClick={() => setSelectedCategory(category.label)}
            />
          ))}
        </div>
      </section>
      {/* Recommended */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-900">
          Recommended Doctors
        </h2>
        <div className="space-y-4">
          {filteredRecommended.map((doc) => (
            <RecommendedDoctorCard
              key={doc.name}
              {...doc}
              onClick={() => navigate(`/doctor-profile/${doc.name}`)}
            />
          ))}
        </div>
      </section>
      {/* All Doctors */}
      <section>
        <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-900">All Doctors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.name}
              {...doctor}
              onClick={() => navigate(`/doctor-profile/${doctor.name}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
