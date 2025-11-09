import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocalAvatar from "../../assets/doctor image.jpg";

export default function NurseProfile() {
  const [form, setForm] = useState({
    fullName: "Nurse David Lee",
    email: "david.lee@example.com",
    employeeId: "NL-1293",
    phone: "(555) 123-4567",
    unitId: "Unit 7B",
    certifications: "BLS, ACLS",
    password: "",
    notificationPreferences: "Daily summary",
    department: "Med-Surg",
    demNote: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(LocalAvatar);
  const [saving, setSaving] = useState(false);

  const fileRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function handleRemoveAvatar() {
    setAvatarPreview(LocalAvatar);
    if (fileRef.current) fileRef.current.value = "";
  }

  function validate() {
    const errors = [];
    if (!form.fullName.trim()) errors.push("Full name is required.");
    if (!form.email.includes("@")) errors.push("Valid email required.");
    return errors;
  }

  async function handleSave(e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
      toast.error(errors.join(" "));
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Profile saved successfully!");
  }

  function handleCancel() {
    toast.info("Changes canceled.");
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-[#F5F9FA] to-[#E8F0F5] p-8 font-sans overflow-auto min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => fileRef.current && fileRef.current.click()}
              className="bg-blue-600 text-white text-sm rounded-full px-4 py-2 hover:bg-blue-700 transition"
            >
              Change Photo
            </button>
            <button
              onClick={handleRemoveAvatar}
              className="bg-red-600 text-white text-sm rounded-full px-4 py-2 hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Form Section */}
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Edit Profile
          </h1>

          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-gray-800 font-semibold text-lg">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "fullName",
                "phone",
                "email",
                "unitId",
                "employeeId",
                "certifications",
                "password",
                "department",
                "notificationPreferences",
                "demNote",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-4 justify-center md:justify-start">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition w-full md:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-300 px-4 py-2 rounded-full bg-white hover:bg-gray-50 w-full md:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
}
