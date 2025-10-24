import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

export default function ClientRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ Confirm Password
  const [phone, setPhone] = useState("");
  const [diseases, setDiseases] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: 30.0444, lon: 31.2357 }); // Default Cairo
  const [loadingLocation, setLoadingLocation] = useState(false);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLeaflet = async () => {
      const leafletModule = await import("leaflet");
      const L =
        leafletModule && leafletModule.default
          ? leafletModule.default
          : leafletModule;

      if (!mapRef.current) {
        const map = L.map("map").setView([location.lat, location.lon], 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([location.lat, location.lon], {
          draggable: true,
        }).addTo(map);
        markerRef.current = marker;

        marker.on("dragend", function () {
          const pos = marker.getLatLng();
          setLocation({ lat: pos.lat, lon: pos.lng });
          setAddress(
            `Latitude: ${pos.lat.toFixed(5)}, Longitude: ${pos.lng.toFixed(5)}`
          );
        });

        map.on("click", function (e) {
          const { lat, lng } = e.latlng;
          marker.setLatLng(e.latlng);
          setLocation({ lat, lon: lng });
          setAddress(
            `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`
          );
        });
      }
    };

    loadLeaflet();
  }, []);

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
        setAddress(
          `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`
        );
        setLoadingLocation(false);

        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
          markerRef.current.setLatLng([latitude, longitude]);
        }
      },
      () => {
        alert("Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      fullName,
      email,
      password,
      phone,
      diseases,
      address,
      location,
    });

    navigate("/landing");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">
        Client Registration
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <textarea
          placeholder="Do you suffer from any diseases? (Optional)"
          value={diseases}
          onChange={(e) => setDiseases(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white min-h-[100px]"
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

          {/* Leaflet Map */}
          <div
            id="map"
            className="mt-3 w-full h-64 rounded-lg overflow-hidden shadow-md border"
          ></div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
