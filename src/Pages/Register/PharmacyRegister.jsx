import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../../assets/camera.png";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function PharmacyRegister() {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [licenseFile, setLicenseFile] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const id = "leaflet-css";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!mapContainerRef.current) return;

      const leafletModule = await import("leaflet");
      const L = leafletModule.default || leafletModule;

      if (!mapInstanceRef.current) {
        const initialCenter =
          location.lat && location.lon
            ? [location.lat, location.lon]
            : [30.0444, 31.2357]; // Cairo default

        mapInstanceRef.current = L.map(mapContainerRef.current, {
          center: initialCenter,
          zoom: 13,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);

        mapInstanceRef.current.on("click", (e) => {
          const { lat, lng } = e.latlng;
          setLocation({ lat, lon: lng });
          setAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);

          if (markerRef.current) {
            markerRef.current.setLatLng(e.latlng);
          } else {
            markerRef.current = L.marker(e.latlng, { draggable: true }).addTo(
              mapInstanceRef.current
            );
            markerRef.current.on("dragend", (ev) => {
              const pos = ev.target.getLatLng();
              setLocation({ lat: pos.lat, lon: pos.lng });
              setAddress(
                `Latitude: ${pos.lat.toFixed(5)}, Longitude: ${pos.lng.toFixed(5)}`
              );
            });
          }
        });
      }
    })();
  }, [location.lat, location.lon]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!licenseFile || !idFront || !idBack) {
      alert("Please upload the required files.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!location.lat || !location.lon) {
      alert("Please choose a location on the map.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("fullName", ownerName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("role", "pharmacy");
      formData.append("pharmacyName", pharmacyName);
      formData.append("licenseNumber", licenseNumber);
      formData.append("location", JSON.stringify({
        latitude: location.lat,
        longitude: location.lon,
      }));
      formData.append("pharmacyLicensePhoto", licenseFile);
      formData.append("ownerIdFront", idFront);
      formData.append("ownerIdBack", idBack);

      // Print data before sending to backend
      console.log("=== FormData being sent to backend ===");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], ":", pair[1].name, `(${pair[1].size} bytes)`, `type: ${pair[1].type}`);
        } else {
          console.log(pair[0], ":", pair[1]);
        }
      }
      console.log("API URL:", `${API_BASE_URL}/api/auth/signup`);
      console.log("=====================================");

      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData, {
        timeout: 30000,
      });

      if (response.data) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        navigate("/under-review");
      }
    } catch (error) {
      const err = error.response?.data?.message || "Registration failed.";
      setError(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const UploadField = ({ label, file, setFile, isLicense }) => (
    <div className={`flex flex-col items-center ${isLicense ? "w-full" : "w-[48%]"}`}>
      <label className="text-sm font-medium mb-1">{label}</label>
      <div className="relative w-full h-28 bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
        {file ? (
          file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <p className="text-sm">{file.name}</p>
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
            <p className="text-xs text-gray-500">Click or drop file</p>
          </>
        ) : (
          <img src={cameraIcon} alt="camera" className="w-10 h-10 opacity-60" />
        )}

        <input
          type="file"
          accept={isLicense ? "image/*,application/pdf" : "image/*"}
          onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
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
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Pharmacy Name"
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="text"
          placeholder="License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        <div>
          <label className="text-sm font-medium text-gray-700">Address / Location</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Enter address or click 📍"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md"
            >
              {loadingLocation ? "..." : "📍"}
            </button>
          </div>

          <div className="mt-3 w-full h-64 border rounded-lg shadow-md overflow-hidden">
            <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
            <p className="text-xs text-gray-500 mt-1">اضغط على الخريطة لتحديد موقعك.</p>
          </div>
        </div>

        <UploadField label="Pharmacy License" file={licenseFile} setFile={setLicenseFile} isLicense />

        <div className="flex gap-4">
          <UploadField label="ID Front" file={idFront} setFile={setIdFront} />
          <UploadField label="ID Back" file={idBack} setFile={setIdBack} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 bg-indigo-500 text-white rounded-md"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
