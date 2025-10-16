import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorRegister() {
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");
  const [hospital, setHospital] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق إن فيه صور فعلاً
    if (!idFront || !idBack) {
      alert("Please upload both front and back ID images before submitting.");
      return;
    }

    console.log({
      phone,
      nationalId,
      gender,
      hospital,
      clinic,
      specialization,
      idFront,
      idBack,
    });

    navigate("/under-review");
  };

  const UploadField = ({ label, file, setFile }) => (
    <div className="flex flex-col items-center w-1/2">
      <label className="text-sm font-medium mb-1">{label}</label>
      <div className="relative w-full h-28 bg-gray-100 rounded-md overflow-hidden cursor-pointer">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={label}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <img
            src="/src/assets/camera.png" // اتأكدي إن المسار ده صح
            alt="Camera Icon"
            className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setFile(file);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">
        Doctor Registration
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="Clinic"
          value={clinic}
          onChange={(e) => setClinic(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        <div className="flex gap-4 mt-4">
          <UploadField label="ID Card Front" file={idFront} setFile={setIdFront} />
          <UploadField label="ID Card Back" file={idBack} setFile={setIdBack} />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
