import React from "react";
import DoctorJanaImg from "../../assets/doctor2image.jpg";
import DoctorSamirImg from "../../assets/doctor3image.jpg";

// Colors for theme
const COLORS = {
  pageBg: "#F5F9FA",
  primary: "#1E88E5",
  cardBorder: "#E6EDF3",
};

// Button Component
function Button({ children, variant = "solid", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 px-4 py-2 text-sm";

  const variants = {
    solid: "bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-sm",
    outline:
      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none",
    ghost: "bg-gray-50 hover:bg-gray-100 text-gray-700",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Badge Component
function Badge({ children, tone = "green" }) {
  const map = {
    red: "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#FEECEB] text-[#C53030]",
    green:
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#DCFCE7] text-[#166534]",
  };

  return <span className={map[tone]}>{children}</span>;
}

// Custom Notification Card
function CustomNotificationCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-md relative">
          <span className="absolute text-lg font-bold">!</span>
        </div>
        <span className="font-semibold text-amber-700 text-sm">STAT Order</span>
        <span>-</span>
        <span className="text-sm text-slate-800 flex-1 min-w-[100px]">Room 402A (Jane Foster)</span>
        <svg
          className="w-5 h-5 text-slate-500 ml-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2 border-r border-gray-200 pr-0 lg:pr-4">
          <p className="text-sm font-medium">IV Push Labetalol 20mg</p>
          <p className="text-sm">20mg. Patient tstripimg, patient</p>
          <p className="text-sm">BP 190/130</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button className="bg-blue-600 text-white px-3 py-1 text-sm">
              View Order
            </Button>
            <Button className="bg-blue-600 text-white px-3 py-1 text-sm">
              Acknowledge
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 pl-0 lg:pl-4 mt-4 lg:mt-0">
          <span className="text-yellow-500 font-semibold">Patient Requests</span>
          <p className="text-sm">Patient requesting plan sxciral</p>
          <p className="text-sm">Pain medicine</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button className="bg-blue-600 text-white px-3 py-1 text-sm">
              View Request
            </Button>
            <button
              className="bg-white text-blue-700 border border-blue-600 px-3 py-1 rounded-md 
                   hover:bg-blue-700 hover:text-white transition-colors duration-200"
            >
              + Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// PatientCard Component
function PatientCard({
  avatar,
  name,
  ageGender,
  room,
  diagnosis,
  acuity,
  notes,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-md font-semibold text-slate-800">
              {name}{" "}
              <span className="text-sm text-slate-500">{ageGender}</span>
            </h5>
            <p className="text-sm text-slate-500">{room}</p>
            <p className="text-sm text-slate-600">{diagnosis}</p>
          </div>
        </div>

        <button
          className={`flex-shrink-0 px-3 py-1 min-w-[120px] text-center rounded-md text-xs font-semibold ${
            acuity === "High" ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {acuity === "High" ? "Acuity: High" : "Acuity: Stable"}
        </button>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-700">Status:</p>
          <p className="text-sm text-slate-600 leading-relaxed">{notes}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <button className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
            Administer Meds
          </button>
          <button className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
            + Add Note
          </button>
        </div>
      </div>
    </div>
  );
}

// NurseDashboard Component
export default function NurseDashboard() {
  return (
    <div className="min-h-screen font-sans text-slate-800" style={{ backgroundColor: COLORS.pageBg }}>
      <div className="max-w-7xl mx-auto p-6 relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-3 rounded-r-md hidden lg:block"
          style={{ backgroundColor: COLORS.primary }}
        />

        <header className="mb-8 pl-6 lg:pl-10">
          <h1 className="text-4xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome back, David!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Tuesday, Oct 22, 2025 <span className="mx-2">|</span> Oncology Ward{" "}
            <span className="mx-2">-</span> Shift: 7:00 AM - 7:00 PM
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Urgent Notifications
              </h2>
              <CustomNotificationCard />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                My Assigned Patients
              </h2>
              <div className="flex flex-col gap-4">
                <PatientCard
                  avatar={DoctorJanaImg}
                  name="Jane Foster"
                  ageGender="68 · F"
                  room="Room 402A"
                  diagnosis="Diagnosis: Post-Op Spinal Fusion"
                  acuity="High"
                  notes="Monitoring vitals closely; continue spinal checks and neurovascular observations."
                />
                <PatientCard
                  avatar={DoctorSamirImg}
                  name="Samir Ahmed"
                  ageGender="52 · M"
                  room="Room 403B"
                  diagnosis="Diagnosis: Community Acquired Pneumonia"
                  acuity="Stable"
                  notes="IV antibiotics complete; patient ambulating well and tolerating PO."
                />
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Upcoming Schedule</h3>
              <ul className="text-sm text-slate-600 flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="text-xs font-semibold inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700">
                    05:30 AM
                  </span>
                  <span>Med Admin — Room 402A (Jane Foster)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-semibold inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                    09:00 AM
                  </span>
                  <span>Rounds — Dr Evans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-semibold inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                    10:30 AM
                  </span>
                  <span>Vitals Check — Room 405B (Mike Foss)</span>
                </li>
              </ul>
              <button className="mt-4 w-full sm:w-[200px] py-2 rounded-md border border-gray-200 bg-white text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                View Full Schedule
              </button>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Quick Access</h3>
              <div className="flex flex-col gap-3">
                <Button className="w-full">+ Log New Incident</Button>
                <Button className="w-full">View Prescription Library</Button>
                <Button className="w-full">Shift Handover Notes</Button>
                <Button className="w-full">Request Supplies</Button>
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-10 h-8" />
      </div>
    </div>
  );
}
