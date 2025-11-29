import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { nursesData } from "../Nurse/nurseData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHeartbeat,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function NurseProfile() {
  const { id } = useParams();
  const nurse = nursesData.find((n) => n.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    location: "",
    email: "",
    phone: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (nurse) {
      setFormData({
        name: nurse.name || "",
        specialty: nurse.specialty || "",
        location: nurse.distance || "",
        email: nurse.name
          ? `${nurse.name.toLowerCase().replace(" ", ".")}@hospital.com`
          : "",
        phone: "(+20) 123-456-7890",
        imageUrl: nurse.imageUrl || "",
      });
      setIsEditing(false);
    }
  }, [nurse?.id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    if (nurse) {
      setFormData({
        name: nurse.name || "",
        specialty: nurse.specialty || "",
        location: nurse.distance || "",
        email: nurse.name
          ? `${nurse.name.toLowerCase().replace(" ", ".")}@hospital.com`
          : "",
        phone: "(+20) 123-456-7890",
        imageUrl: nurse.imageUrl || "",
      });
      setIsEditing(false);
    }
  };

  if (!nurse) {
    return <div className="p-8">Nurse not found</div>;
  }

  return (
    <div className="w-full bg-[#F5F7FA] min-h-screen p-4 sm:p-8 overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="bg-[#EDF2FF] text-blue-900 px-4 sm:px-8 py-5 sm:py-6 rounded-xl mb-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm opacity-90">Shift Performance & Information</p>
      </div>

      {/* Profile Card */}
      <div
        className="
        bg-white shadow-md rounded-xl p-4 sm:p-6 mb-8
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-4 sm:gap-6
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{formData.name}</h2>
            <p className="text-gray-500">{formData.specialty}</p>
            <span className="inline-block mt-1 px-2 py-1 bg-[#E0E7FF] text-[#4C6FFF] text-xs rounded-full font-medium">
              ON SHIFT
            </span>
          </div>
        </div>

        {!isEditing && (
          <button
            className="px-4 py-2 bg-[#4C6FFF] text-white rounded hover:bg-[#3B50D5] transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<FaHeartbeat />}
          value="52"
          label="Today's Actions"
          color="bg-[#E0E7FF] text-[#4C6FFF]"
        />
        <StatCard
          icon={<FaCheckCircle />}
          value="38"
          label="Tasks Completed"
          color="bg-[#D0DBFF] text-[#3B50D5]"
        />
        <StatCard
          icon={<FaClock />}
          value="6.5h"
          label="Hours Worked"
          color="bg-[#F0F3FF] text-[#4C6FFF]"
        />
        <StatCard
          icon={<FaHeart />}
          value="98%"
          label="Satisfaction Rate"
          color="bg-[#E0E7FF] text-[#4C6FFF]"
        />
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-5">Personal Information</h3>

        <InfoItem
          icon={<FaUserMd />}
          title="Department"
          value={formData.specialty}
          isEditing={isEditing}
          name="specialty"
          onChange={handleChange}
        />
        <InfoItem
          icon={<FaEnvelope />}
          title="Email"
          value={formData.email}
          isEditing={isEditing}
          name="email"
          onChange={handleChange}
        />
        <InfoItem
          icon={<FaPhoneAlt />}
          title="Phone"
          value={formData.phone}
          isEditing={isEditing}
          name="phone"
          onChange={handleChange}
        />
        <InfoItem
          icon={<FaMapMarkerAlt />}
          title="Location"
          value={formData.location}
          isEditing={isEditing}
          name="location"
          onChange={handleChange}
        />

        {isEditing && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#4C6FFF] text-white rounded-lg hover:bg-[#3B50D5]"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/*  Components */

const StatCard = ({ icon, value, label, color }) => (
  <div
    className="
    bg-white rounded-xl shadow-md p-5 flex items-center gap-4
    transition-all duration-300
    hover:shadow-xl hover:-translate-y-1
  "
  >
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-lg ${color}`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const InfoItem = ({ icon, title, value, isEditing, onChange, name }) => (
  <div
    className="
    flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4
    p-2 rounded-lg
    transition-all duration-300
    hover:bg-[#F0F3FF] hover:translate-x-1
  "
  >
    <div className="w-10 h-10 rounded-lg bg-[#E0E7FF] text-[#4C6FFF] flex items-center justify-center">
      {icon}
    </div>
    <div className="w-full">
      <p className="text-sm text-gray-500">{title}</p>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-[#4C6FFF]"
        />
      ) : (
        <p className="font-medium text-gray-800">{value}</p>
      )}
    </div>
  </div>
);
