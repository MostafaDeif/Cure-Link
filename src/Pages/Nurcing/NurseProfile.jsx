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
    <div className="w-full bg-gray-50 min-h-screen p-4 sm:p-8 overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="bg-blue-600 text-white px-4 sm:px-8 py-5 sm:py-6 rounded-xl mb-8 max-w-full overflow-hidden">
        <h1 className="text-2xl font-semibold truncate">Profile</h1>
        <p className="text-sm opacity-90 truncate">
          Shift Performance & Information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 overflow-hidden max-w-full flex-wrap">
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 overflow-hidden">
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0 overflow-hidden">
            <h2 className="text-xl font-semibold truncate break-words">
              {formData.name}
            </h2>
            <p className="text-gray-500 truncate break-words">
              {formData.specialty}
            </p>
            <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium truncate break-words">
              ON SHIFT
            </span>
          </div>
        </div>

        {!isEditing && (
          <div className="mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
            <button
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 max-w-full overflow-hidden">
        <StatCard
          icon={<FaHeartbeat />}
          value="52"
          label="Today's Actions"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<FaCheckCircle />}
          value="38"
          label="Tasks Completed"
          color="bg-blue-200 text-blue-700"
        />
        <StatCard
          icon={<FaClock />}
          value="6.5h"
          label="Hours Worked"
          color="bg-blue-50 text-blue-500"
        />
        <StatCard
          icon={<FaHeart />}
          value="98%"
          label="Satisfaction Rate"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-hidden max-w-full">
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
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Components ===== */
const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200 overflow-hidden max-w-full">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 ${color}`}
    >
      {icon}
    </div>
    <div className="min-w-0 overflow-hidden">
      <h3 className="text-xl font-semibold truncate break-words">{value}</h3>
      <p className="text-sm text-gray-500 truncate break-words">{label}</p>
    </div>
  </div>
);

const InfoItem = ({
  icon,
  title,
  value,
  iconBg = "bg-blue-100 text-blue-600",
  isEditing,
  onChange,
  name,
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 transition-all duration-300 transform hover:scale-105 overflow-hidden max-w-full">
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}
    >
      {icon}
    </div>
    <div className="w-full min-w-0 overflow-hidden">
      <p className="text-sm text-gray-500 truncate break-words">{title}</p>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p className="font-medium text-gray-800 truncate break-words">
          {value}
        </p>
      )}
    </div>
  </div>
);
