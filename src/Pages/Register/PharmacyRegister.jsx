import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../../assets/camera.png"; 

export default function PharmacyRegister() {
  const [pharmacyName, setPharmacyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [licenseFile, setLicenseFile] = useState(null);
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

    if (!licenseFile || !idFront || !idBack) {
      alert("Please upload the pharmacy license and both ID images before submitting.");
      return;
    }

    console.log({
      pharmacyName,
      ownerName,
      licenseNumber,
      phone,
      address,
      location,
      licenseFile,
      idFront,
      idBack,
    });

    navigate("/under-review");
  };

  const UploadField = ({ label, file, setFile, isLicense }) => (
    <div className={`flex flex-col items-center ${isLicense ? "w-full" : "w-[48%]"}`}>
      <label className="text-sm font-medium mb-1">{label}</label>

      <div
        className={`relative w-full h-28 bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition`}
      >
        {file ? (
          file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-700">{file.name}</p>
          )
        ) : isLicense ? (
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
        ) : (
          <img
            src={cameraIcon}
            alt="camera upload"
            className="w-10 h-10 opacity-60"
          />
        )}
        <input
          type="file"
          accept={isLicense ? "image/*,application/pdf" : "image/*"}
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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">
        Pharmacy Registration
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Pharmacy Name"
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        {/* 📍 Location Section */}
        <div className="flex flex-col gap-2">
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
                title="Pharmacy Location"
              ></iframe>
            </div>
          )}
        </div>

        {/* 📎 Upload Section */}
        <div className="flex flex-col gap-4 mt-4">
          <UploadField
            label="Pharmacy License"
            file={licenseFile}
            setFile={setLicenseFile}
            isLicense
          />

          <div className="flex gap-4 w-full">
            <UploadField label="Owner ID Front" file={idFront} setFile={setIdFront} />
            <UploadField label="Owner ID Back" file={idBack} setFile={setIdBack} />
          </div>
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
