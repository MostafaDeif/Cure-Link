import React, { useState } from "react";

export default function NursePatients() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [updateFilter, setUpdateFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [note, setNote] = useState("");

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Jane Foster",
      age: 68,
      gender: "F",
      room: "402A",
      diagnosis: "Post-Op Spinal Fusion",
      status: "Monitoring Vitals 8/10 pain.",
      acuity: "High",
      lastUpdate: "Today",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Jamir Ahmed",
      age: 52,
      gender: "M",
      room: "402B",
      diagnosis: "Community Acquired Pneumonia",
      status: "10:30 AM Discharge Orders",
      acuity: "Stable",
      lastUpdate: "Yesterday",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      age: 75,
      gender: "F",
      room: "401A",
      diagnosis: "Heart Failure Follow-Up",
      status: "Stable, monitoring O2 levels",
      acuity: "Moderate",
      lastUpdate: "2 days ago",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      name: "Ali Mansour",
      age: 60,
      gender: "M",
      room: "403A",
      diagnosis: "Diabetes Management",
      status: "Stable condition, medication ongoing",
      acuity: "Stable",
      lastUpdate: "Today",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 5,
      name: "Lara Croft",
      age: 45,
      gender: "F",
      room: "404A",
      diagnosis: "Fractured Leg",
      status: "Recovery in progress",
      acuity: "Moderate",
      lastUpdate: "Yesterday",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 6,
      name: "Tom Hanks",
      age: 63,
      gender: "M",
      room: "405B",
      diagnosis: "Appendectomy",
      status: "Stable, vitals normal",
      acuity: "High",
      lastUpdate: "Today",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "M",
    room: "",
    diagnosis: "",
    status: "",
    acuity: "Stable",
    lastUpdate: "Today",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  });

  const patientsPerPage = 3;

  const filteredPatients = patients.filter((p) => {
    const matchesStatus =
      statusFilter === "All" ||
      p.acuity.toLowerCase() === statusFilter.toLowerCase();
    const matchesUpdate =
      updateFilter === "All" ||
      p.lastUpdate.toLowerCase().includes(updateFilter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesUpdate && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openChartModal = (patient) => {
    setSelectedPatient(patient);
    setShowChartModal(true);
  };
  const openNoteModal = (patient) => {
    setSelectedPatient(patient);
    setShowNoteModal(true);
  };

  const handleAddNote = () => {
    console.log(`Note added for ${selectedPatient.name}: ${note}`);
    setNote("");
    setShowNoteModal(false);
  };

  const handleAddPatient = () => {
    if (!newPatient.name.trim()) return alert("Please enter patient name");
    const id = patients.length + 1;
    setPatients([...patients, { ...newPatient, id }]);
    setNewPatient({
      name: "",
      age: "",
      gender: "M",
      room: "",
      diagnosis: "",
      status: "",
      acuity: "Stable",
      lastUpdate: "Today",
      image: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 80
      )}.jpg`,
    });
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 bg-[#F5F9FA] p-8 overflow-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Patients</h1>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-600 text-sm mb-1">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option>All</option>
            <option>High</option>
            <option>Moderate</option>
            <option>Stable</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-600 text-sm mb-1">
            Filter by Update
          </label>
          <select
            value={updateFilter}
            onChange={(e) => {
              setUpdateFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option>All</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>2 days ago</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-600 text-sm mb-1">
            Search Patient Name
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex sm:items-end justify-start sm:justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-2 sm:mt-0"
          >
            + Add New Patient
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {currentPatients.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {p.name}, {p.age} {p.gender}
                </h2>
                <p className="text-sm text-gray-500">Room {p.room}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Diagnosis:</span> {p.diagnosis}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span> {p.status}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  p.acuity === "High"
                    ? "bg-red-100 text-red-700"
                    : p.acuity === "Stable"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                Acuity: {p.acuity}
              </span>
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => openChartModal(p)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  View Full Chart
                </button>
                <button
                  onClick={() => openNoteModal(p)}
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50"
                >
                  Add New Note
                </button>
              </div>
            </div>
          </div>
        ))}
        {currentPatients.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No patients found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <nav className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </nav>
      </div>

      {showChartModal && selectedPatient && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 text-center">
              Patient Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedPatient.name}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Age:</span>{" "}
                  {selectedPatient.age}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedPatient.gender}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Room:</span>{" "}
                  {selectedPatient.room}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Diagnosis:</span>{" "}
                  {selectedPatient.diagnosis}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedPatient.status}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Acuity:</span>{" "}
                  {selectedPatient.acuity}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p>
                  <span className="font-semibold">Last Update:</span>{" "}
                  {selectedPatient.lastUpdate}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowChartModal(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNoteModal && selectedPatient && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Add Note for {selectedPatient.name}
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-2 focus:ring-blue-400"
              placeholder="Write your note here..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Patient
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded-md"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Age"
                className="border p-2 rounded-md"
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, age: e.target.value })
                }
              />
              <select
                className="border p-2 rounded-md"
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, gender: e.target.value })
                }
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <input
                type="text"
                placeholder="Room"
                className="border p-2 rounded-md"
                value={newPatient.room}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, room: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Diagnosis"
                className="border p-2 rounded-md"
                value={newPatient.diagnosis}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, diagnosis: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Status"
                className="border p-2 rounded-md"
                value={newPatient.status}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, status: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowAddModal(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
