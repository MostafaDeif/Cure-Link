import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { patients } from "./PatientData";

export default function NursePatients() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPatients = patients
    .filter((p) => p.nurseId === Number(id))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const patientsPerPage = 3;
  const startIndex = (currentPage - 1) * patientsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + patientsPerPage
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const acuityStyle = {
    High: "bg-rose-100 text-rose-700",
    Moderate: "bg-amber-100 text-amber-700",
    Stable: "bg-emerald-100 text-emerald-700",
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-8 py-6 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center break-words">
        Home Care Patients
      </h1>
      {/* Search */}
      <div className="flex justify-center mb-8 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search patient..."
          className="w-full sm:max-w-md px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
        />
      </div>
      {/* Patients List */}
      <div className="flex flex-col gap-6 w-full">
        {currentPatients.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            className="bg-white rounded-3xl shadow border border-slate-200 p-5 cursor-pointer transition
                       hover:shadow-xl flex flex-col sm:flex-row gap-5 items-center sm:items-start w-full"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-slate-200 object-cover"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 w-full">
                <div className="text-center sm:text-left break-words">
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    {p.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {p.age} yrs • {p.gender}
                  </p>
                </div>
                <span
                  className={`self-center sm:self-start px-4 py-1 rounded-full text-sm font-semibold ${
                    acuityStyle[p.acuity]
                  }`}
                >
                  {p.acuity}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-slate-700">
                <p>
                  <b>Diagnosis:</b> {p.diagnosis}
                </p>
                <p>
                  <b>Condition:</b> {p.condition}
                </p>
                <p>
                  <b>Last visit:</b> {p.lastVisit}
                </p>
                <p>
                  <b>Care plan:</b> {p.carePlan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-6 py-2 rounded-xl bg-slate-200 text-slate-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-slate-500 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-6 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
      {/* Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 break-words text-slate-800">
              {selectedPatient.name}
            </h2>
            <div className="space-y-3 text-slate-700 text-sm sm:text-base divide-y divide-slate-200">
              <p>
                <b>Age:</b> {selectedPatient.age}
              </p>
              <p>
                <b>Gender:</b> {selectedPatient.gender}
              </p>
              <p>
                <b>Diagnosis:</b> {selectedPatient.diagnosis}
              </p>
              <p>
                <b>Condition:</b> {selectedPatient.condition}
              </p>
              <p>
                <b>Acuity:</b> {selectedPatient.acuity}
              </p>
              <p>
                <b>Last visit:</b> {selectedPatient.lastVisit}
              </p>
              <p>
                <b>Vital notes:</b> {selectedPatient.vitalNotes}
              </p>
              <p>
                <b>Medications:</b> {selectedPatient.medications}
              </p>
              <p>
                <b>Care plan:</b> {selectedPatient.carePlan}
              </p>
            </div>
            <button
              onClick={() => setSelectedPatient(null)}
              className="mt-6 w-full bg-slate-700 text-white py-2 rounded-xl hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
