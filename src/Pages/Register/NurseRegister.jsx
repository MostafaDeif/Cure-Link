import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NurseRegister() {
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");
  const [hospital, setHospital] = useState("");
  const [ward, setWard] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [nurseLicense, setNurseLicense] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

  const navigate = useNavigate();

  // 📍 Get location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location access.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setAddress(`Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`);
        setLoadingLocation(false);
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        alert("Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idFront || !idBack) {
      alert("Please upload both front and back ID images before submitting.");
      return;
    }

    console.log({
      phone,
      nationalId,
      gender,
      hospital,
      ward,
      yearsExp,
      address,
      location,
      nurseLicense,
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
            src="/src/assets/camera.png"
            alt="Camera Icon"
            className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            if (f) setFile(f);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">Nurse Registration</h2>

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
          <option value="" disabled>
            Select Gender
          </option>
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
          placeholder="Ward / Unit"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsExp}
          onChange={(e) => setYearsExp(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          min="0"
          required
        />

        {/* 📍 Location Section */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium text-gray-700">
            Address / Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter address or use current location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              {loadingLocation ? "Locating..." : "📍"}
            </button>
          </div>

          {/* ✅ Google Maps Embed */}
          {location.lat && location.lon && (
            <div className="mt-3 w-full h-64 rounded-lg overflow-hidden shadow-md border">
              <iframe
                src={`https://www.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                title="Nurse Location"
              ></iframe>
            </div>
          )}
        </div>

        {/* Nursing License  */}
        <div className="flex flex-col w-full mt-2">
          <label className="text-sm font-medium mb-1">Nursing License (optional)</label>
          <div className="relative w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
            {nurseLicense ? (
              <p className="text-sm text-gray-700">{nurseLicense.name}</p>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-400 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <p className="text-xs text-gray-500">Click or drop file to upload</p>
              </>
            )}
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) setNurseLicense(f);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* ID Front & Back  */}
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
