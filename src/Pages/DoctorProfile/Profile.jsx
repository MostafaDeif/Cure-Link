import { useNavigate } from "react-router-dom";

// ========== ICONS ==========
const IconLayoutDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const IconCalendarCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);
const IconUserCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);
// -------- SIDEBAR ----------
const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, path: "/doctor-dashboard" },
    { name: "Appointments", icon: <IconCalendarCheck />, path: "/doctor-appointments" },
    { name: "Patients", icon: <IconUsers />, path: "/doctor-patients" },
    { name: "Profile", icon: <IconUser />, path: "/doctor-profile" },
  ];
  return (
    <div className="w-64 bg-white shadow-lg flex-col hidden lg:flex">
      <div
        onClick={() => navigate("/doctor-dashboard")}
        className="p-6 text-3xl font-bold text-[#006d77] cursor-pointer"
      >
        CureLink
      </div>
      <div className="p-6 text-center border-b">
        <img
          src="https://placehold.co/96x96/E0E7FF/4F46E5?text=DR"
          alt="Doctor Profile"
          className="w-24 h-24 rounded-full mx-auto mb-3 cursor-pointer"
          onClick={() => navigate("/doctor-profile")}
        />
        <h2 className="text-lg font-semibold">Dr. Mohamed Ahmad</h2>
        <p className="text-sm text-gray-500">Cairo University Hospital</p>
      </div>
      <nav className="flex-1 mt-6 px-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center w-full text-left px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-[#E0F2F1] hover:text-[#006d77] ${
              item.name === "Profile" ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
// -------- HEADER ----------
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700">
          <IconSearch />
        </button>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/doctor-profile")}
        >
          <IconUserCircle />
        </button>
      </div>
    </header>
  );
};
// -------- PROFILE PAGE ----------
const Profile = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Doctor Image */}
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
              {/* Profile Form */}
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-semibold text-[#006d77] mb-6">Doctor Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Dr. Mohamed Ahmad"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="info@cu-hospital.com"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                    <input
                      type="text"
                      defaultValue="(02) 35676105"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Specialization</label>
                    <input
                      type="text"
                      defaultValue="Cardiology"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Hospital</label>
                    <input
                      type="text"
                      defaultValue="Cairo University Hospital"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Years of Experience</label>
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
