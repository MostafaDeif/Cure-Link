import React, { useState } from "react";
export default function NursePatients() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const patients = [
    {
      id: 1,
      name: "Sara Mohamed",
      age: 68,
      gender: "Female",
      diagnosis: "Post-surgery recovery",
      condition: "Severe back pain (8/10)",
      acuity: "High",
      lastVisit: "Today",
      vitalNotes: "BP slightly elevated",
      medications: "Pain killers twice daily",
      carePlan: "Daily visit + exercises",
      image:
        "https://media.istockphoto.com/id/518016973/photo/she-loves-her-heritage.jpg?s=612x612&w=0&k=20&c=v-qqbY7_bARcu-fQ7Ce8YZv4H2qWJo2nkoaeTnJx52E=",
    },
    {
      id: 2,
      name: "Samir Ahmed",
      age: 52,
      gender: "Male",
      diagnosis: "Pneumonia recovery",
      condition: "Breathing improving",
      acuity: "Moderate",
      lastVisit: "Yesterday",
      vitalNotes: "O2 saturation 95%",
      medications: "Antibiotics",
      carePlan: "Visit every 2 days",
      image:
        "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      name: "Samira Ahmed",
      age: 75,
      gender: "Female",
      diagnosis: "Heart failure follow-up",
      condition: "Low energy",
      acuity: "High",
      lastVisit: "2 days ago",
      vitalNotes: "Low BP reported",
      medications: "Beta blockers",
      carePlan: "Strict monitoring",
      image:
        "https://www.shutterstock.com/image-photo/smiling-happy-cheerful-old-woman-260nw-1910899612.jpg",
    },
    {
      id: 4,
      name: "Ali Mansour",
      age: 60,
      gender: "Male",
      diagnosis: "Diabetes management",
      condition: "Blood sugar stable",
      acuity: "Stable",
      lastVisit: "Today",
      vitalNotes: "Normal glucose level",
      medications: "Insulin",
      carePlan: "Weekly follow-up",
      image:
        "https://img.freepik.com/free-photo/portrait-wise-person_52683-100915.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 5,
      name: "Lara Mohamed",
      age: 45,
      gender: "Female",
      diagnosis: "Leg fracture recovery",
      condition: "Mobility improving",
      acuity: "Moderate",
      lastVisit: "Yesterday",
      vitalNotes: "Mild swelling",
      medications: "Pain relief",
      carePlan: "Physio exercises",
      image:
        "https://us.images.westend61.de/0000905148pw/portrait-of-confident-young-woman-wearing-hijab-standing-with-mobile-phone-on-sidewalk-in-city-MASF00449.jpg",
    },
    {
      id: 6,
      name: "Omar Khaled",
      age: 50,
      gender: "Male",
      diagnosis: "Hypertension",
      condition: "BP controlled",
      acuity: "Stable",
      lastVisit: "Today",
      vitalNotes: "BP 120/80",
      medications: "ACE inhibitors",
      carePlan: "Monthly monitoring",
      image:
        "https://img.freepik.com/free-photo/modern-elderly-man-outdoors_23-2148956470.jpg",
    },
  ];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const patientsPerPage = 3;
  const startIndex = (currentPage - 1) * patientsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + patientsPerPage
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const acuityStyle = {
    High: "bg-red-100 text-red-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Stable: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 sm:px-8 py-6 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center break-words">
        Home Care Patients
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-8 w-full max-w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search patient..."
          className="w-full sm:max-w-md px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Patients List */}
      <div className="flex flex-col gap-6 w-full max-w-full">
        {currentPatients.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            className="bg-white rounded-3xl shadow-md p-5 cursor-pointer transition hover:shadow-xl
                       flex flex-col sm:flex-row gap-5 items-center sm:items-start w-full max-w-full"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border object-cover max-w-full"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 w-full max-w-full">
                <div className="text-center sm:text-left break-words">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-500">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
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
          className="px-6 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-xl overflow-x-hidden">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 break-words">
              {selectedPatient.name}
            </h2>

            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
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
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
