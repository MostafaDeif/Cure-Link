import { useState } from "react";
import HeaderDoctor from "../../Components/HeaderDoctor";
import DoctorSidebar from "../../Components/DoctorSidebar";
// -------- PROFILE PAGE ----------
const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex bg-gray-100 overflow-hidden">
      <DoctorSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeName="Profile"
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <HeaderDoctor
          toggleSidebar={toggleSidebar}
          sidebarOpen={isSidebarOpen}
          className={`fixed top-0 left-0 right-0 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        />
        <main className="flex-1 p-10 mt-16 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="https://placehold.co/96x96/E0E7FF/4F46E5?text=DR"
                  alt="Doctor"
                  className="w-40 h-40 rounded-full border-4 border-[#006d77]"
                />
                <button className="mt-4 px-4 py-2 bg-[#006d77] text-white rounded-lg hover:bg-[#005a63] transition">
                  Change Photo
                </button>
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-semibold text-[#006d77] mb-6">
                  Doctor Information
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Dr. Mohamed Ahmad"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@cu-hospital.com"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      defaultValue="(02) 35676105"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      defaultValue="Cardiology"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Hospital
                    </label>
                    <input
                      type="text"
                      defaultValue="Cairo University Hospital"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                </form>
                <div className="flex justify-end mt-8 space-x-4">
                  <button className="px-6 py-2 rounded-lg bg-[#006d77] text-white hover:bg-[#005a63] transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Profile;
