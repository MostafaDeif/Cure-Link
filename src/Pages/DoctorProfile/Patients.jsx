import React, { useState } from "react";
import HeaderDoctor from "../../Components/HeaderDoctor";
import DoctorSidebar from "../../Components/DoctorSidebar";

// ===== PATIENTS PAGE =====
const Patients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const patients = [ { name: "John Smith", id: "ID-00123", lastVisit: "Oct 22, 2025", status: "Inactive" },
     { name: "Ms. Sarah Lee", id: "ID-00245", lastVisit: "Oct 22, 2025", status: "Active" }, 
     { name: "L. Smith Lee", id: "ID-00312", lastVisit: "Oct 22, 2025", status: "Inactive" }, 
     { name: "David Brown", id: "ID-00456", lastVisit: "Oct 22, 2025", status: "Active" }, 
     { name: "Mr. Ahmed Nabil", id: "ID-00459", lastVisit: "Oct 26, 2025", status: "Active" }, 
     { name: "Mrs. Mona Saad ", id: "ID-00561", lastVisit: "Nov 22, 2025", status: "Active" }, 
     { name: "John Adel", id: "ID-00256", lastVisit: "Oct 26, 2025", status: "Active" }, 
    ];
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex bg-gray-100 min-h-screen transition-all duration-500">
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} activeName="Patients" />
      <div className={`flex-1 flex flex-col transition-all duration-500 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
      <HeaderDoctor toggleSidebar={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Patients</h1>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                />
                <button className="bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#004f52]">
                  + Add New Patient
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-[#E0F2F1] text-[#006d77]">
                  <tr>
                    <th className="text-left py-3 px-4">Patient Name</th>
                    <th className="text-left py-3 px-4">Patient ID</th>
                    <th className="text-left py-3 px-4">Last Visit</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition duration-200">
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4">{p.id}</td>
                      <td className="py-3 px-4">{p.lastVisit}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            p.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-[#006d77] hover:underline">View Record</button>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                        No patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Patients;
