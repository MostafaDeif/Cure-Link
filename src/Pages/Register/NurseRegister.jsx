import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function NurseRegister({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

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
    let cancelled = false;

    (async () => {
      if (!mapContainerRef.current) return;
      const leafletModule = await import("leaflet");
      const L = leafletModule.default || leafletModule;

      if (!mapInstanceRef.current) {
        const initialCenter =
          location.lat && location.lon ? [location.lat, location.lon] : [30.0444, 31.2357]; // Cairo fallback
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          center: initialCenter,
          zoom: 13,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstanceRef.current);

        mapInstanceRef.current.on("click", (e) => {
          const { lat, lng } = e.latlng;
          setLocation({ lat, lon: lng });
          setAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);

          if (markerRef.current) {
            markerRef.current.setLatLng(e.latlng);
          } else {
            markerRef.current = L.marker(e.latlng, { draggable: true }).addTo(mapInstanceRef.current);
            markerRef.current.on("dragend", function (ev) {
              const pos = ev.target.getLatLng();
              setLocation({ lat: pos.lat, lon: pos.lng });
              setAddress(`Latitude: ${pos.lat.toFixed(5)}, Longitude: ${pos.lng.toFixed(5)}`);
            });
          }
        });
      }

      if (location.lat && location.lon && mapInstanceRef.current && !cancelled) {
        const latlng = [location.lat, location.lon];
        mapInstanceRef.current.setView(latlng, 15);
        if (markerRef.current) {
          markerRef.current.setLatLng(latlng);
        } else {
          markerRef.current = L.marker(latlng, { draggable: true }).addTo(mapInstanceRef.current);
          markerRef.current.on("dragend", function (ev) {
            const pos = ev.target.getLatLng();
            setLocation({ lat: pos.lat, lon: pos.lng });
            setAddress(`Latitude: ${pos.lat.toFixed(5)}, Longitude: ${pos.lng.toFixed(5)}`);
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.lat, location.lon]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
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
        setAddress(`Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`);
        setLoadingLocation(false);
      },
      () => {
        alert("Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const UploadField = ({ label, file, setFile }) => (
    <div className="flex flex-col items-center w-1/2">
      <label className="text-sm font-medium mb-1">{label}</label>
      <div className="relative w-full h-28 bg-gray-100 rounded-md overflow-hidden cursor-pointer">
        {file ? (
          <img src={URL.createObjectURL(file)} alt={label} className="w-full h-full object-cover rounded-md" />
        ) : (
          <img
            src="/src/assets/camera.png"
            alt="Camera Icon"
            className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 opacity-60"
          />
        )}
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const f = e.target.files[0];
            if (f) setFile(f);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!idFront || !idBack) {
      alert("Please upload both front and back ID images before submitting.");
      return;
    }

    if (!location.lat || !location.lon) {
      alert("Please select a location on the map.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const signupData = {
        fullName: name,
        email,
        password,
        phone,
        role: "nurse",
        "location.latitude": location.lat,
        "location.longitude": location.lon,
        // Include additional nurse-specific fields if API supports them
        nationalId,
        gender,
        hospital,
        ward,
        yearsExp,
      };

      // Print data before sending to backend
      console.log("=== JSON Data being sent to backend ===");
      console.log(JSON.stringify(signupData, null, 2));
      console.log("API URL:", `${API_BASE_URL}/api/auth/signup`);
      console.log("=====================================");

      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, signupData);
      
      if (response.data) {
        // Store token if provided
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        let userObj = response.data.user;
        if (userObj) {
          localStorage.setItem('user', JSON.stringify(userObj));
          if (setUser) setUser(userObj);
          window.dispatchEvent(new Event('auth-change'));
        }
        
        // Navigate to under-review page for approval
        navigate("/under-review");
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">Nurse Registration</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />

        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="text" placeholder="National ID" value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />

        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input type="text" placeholder="Hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="text" placeholder="Ward / Unit" value={ward} onChange={(e) => setWard(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="number" placeholder="Years of Experience" value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" min="0" required />

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium text-gray-700">Address / Location</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter address or use current location" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" />
            <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
              {loadingLocation ? "Locating..." : "📍"}
            </button>
          </div>

          <div className="mt-3 w-full h-64 rounded-lg overflow-hidden shadow-md border">
            <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
            <p className="text-xs text-gray-500 mt-1">اضغط على الخريطة لتحديد موقعك أو اسحب العلامة بعد إنشائها.</p>
          </div>
        </div>

        <div className="flex flex-col w-full mt-2">
          <label className="text-sm font-medium mb-1">Nursing License (optional)</label>
          <div className="relative w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
            {nurseLicense ? (
              <p className="text-sm text-gray-700">{nurseLicense.name}</p>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <p className="text-xs text-gray-500">Click or drop file to upload</p>
              </>
            )}
            <input type="file" accept="image/*,application/pdf" onChange={(e) => {
              const f = e.target.files[0];
              if (f) setNurseLicense(f);
            }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <UploadField label="ID Card Front" file={idFront} setFile={setIdFront} />
          <UploadField label="ID Card Back" file={idBack} setFile={setIdBack} />
        </div>

        <button type="submit" disabled={loading} className="mt-6 w-full py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
