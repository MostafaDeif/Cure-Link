import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientRegister() {
  const [phone, setPhone] = useState("");
  const [diseases, setDiseases] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const navigate = useNavigate();

  // 📍 Get user location
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
      () => {
        alert("Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      phone,
      diseases,
      address,
      location,
    });

    navigate("/landing"); 
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">Client Registration</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        <textarea
          placeholder="Do you suffer from any diseases? (Optional)"
          value={diseases}
          onChange={(e) => setDiseases(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white min-h-[100px]"
        />

        {/* 📍 Location Section */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium text-gray-700">Address / Location</label>
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

          {location.lat && location.lon && (
            <div className="mt-3 w-full h-64 rounded-lg overflow-hidden shadow-md border">
              <iframe
                src={`https://www.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                title="Client Location"
              ></iframe>
            </div>
          )}
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
