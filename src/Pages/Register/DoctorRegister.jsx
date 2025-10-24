import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");
  const [hospital, setHospital] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

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
          location.lat && location.lon ? [location.lat, location.lon] : [30.033, 31.233]; // Cairo fallback
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
            markerRef.current.on("dragend", (ev) => {
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
          markerRef.current.on("dragend", (ev) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!idFront || !idBack) {
      alert("Please upload both front and back ID images before submitting.");
      return;
    }

    console.log({
      fullName,
      email,
      password,
      phone,
      nationalId,
      gender,
      hospital,
      clinic,
      specialization,
      address,
      location,
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
          <img src={URL.createObjectURL(file)} alt={label} className="w-full h-full object-cover rounded-md" />
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
      <h2 className="text-2xl font-semibold text-indigo-500 mb-6">Doctor Registration</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
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
        <input type="text" placeholder="Clinic" value={clinic} onChange={(e) => setClinic(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />
        <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" required />

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium text-gray-700">Clinic / Hospital Location</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter address or use current location" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white" />
            <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
              {loadingLocation ? "Locating..." : "📍"}
            </button>
          </div>

          <div className="mt-3 w-full h-64 rounded-lg overflow-hidden shadow-md border">
            <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
            <p className="text-xs text-gray-500 mt-1">اضغط على الخريطة لتحديد مكان العيادة أو اسحب العلامة لتغييره.</p>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <UploadField label="ID Card Front" file={idFront} setFile={setIdFront} />
          <UploadField label="ID Card Back" file={idBack} setFile={setIdBack} />
        </div>

        <button type="submit" className="mt-6 w-full py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition">
          Register
        </button>
      </form>
    </div>
  );
}
