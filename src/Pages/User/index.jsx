import React, { useState } from "react";
import "./index.css";

const User = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div
      className="flex flex-col md:flex-row bg-gray-50 p-2 md:p-4 rounded-xl"
      dir="rtl"
      style={{ minHeight: "80vh" }}
    >
      {/* القائمة الجانبية */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow mb-4 md:mb-0 md:ml-5" style={{ backgroundColor: "#EDF3F5" }}>
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
          <h2 className="font-semibold text-lg text-gray-700"> مصطفي ضيف</h2>
        </div>
        <ul className="space-y-2 flex md:block justify-between">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeSection === "profile" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            ملفي الشخصي
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeSection === "visits" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveSection("visits")}
          >
            الزيارات المنزلية
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeSection === "orders" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveSection("orders")}
          >
            طلباتي
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeSection === "settings" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveSection("settings")}
          >
            الإعدادات
          </li>
        </ul>
      </div>

      {/* المحتوى المتغير */}
      <div className="w-full md:w-3/4 theSpace p-2 md:p-6 md:ml-4 rounded-lg shadow">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "visits" && <VisitsSection />}
        {activeSection === "orders" && <OrdersSection />}
        {activeSection === "settings" && <SettingsSection />}
      </div>
    </div>
  );
};

const ProfileSection = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">المعلومات الشخصية</h3>
    <p>الاسم: مصطفي ضيف</p>
  </div>
);

const visitsData = [
  {
    id: 1,
    name: "زيارة تمريضية",
    nurse: "أحمد علي",
    date: "2024-06-01",
    description: "زيارة لمتابعة حالة المريض بعد العملية.",
    status: "pending",
  },
  {
    id: 2,
    name: "زيارة طبيب",
    nurse: "سارة محمد",
    date: "2024-05-28",
    description: "زيارة لفحص ضغط الدم.",
    status: "done",
  },
  {
    id: 3,
    name: "زيارة علاج طبيعي",
    nurse: "محمد حسن",
    date: "2024-05-20",
    description: "جلسة علاج طبيعي للظهر.",
    status: "rejected",
  },
];

const statusColors = {
  pending: "text-yellow-600 bg-yellow-100",
  done: "text-green-600 bg-green-100",
  rejected: "text-red-600 bg-red-100",
};

const statusLabels = {
  pending: "قيد الانتظار",
  done: "تمت",
  rejected: "مرفوضة",
};

const VisitsSection = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">الزيارات المنزلية</h3>
    <div className="grid gap-4">
      {visitsData.map((visit) => (
        <div
          key={visit.id}
          className="bg-white rounded-lg shadow flex flex-col md:flex-row items-start md:items-center p-4 gap-4 border border-gray-100"
        >
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <span className="font-semibold text-blue-700 text-lg">{visit.name}</span>
              <span className="text-gray-500 text-sm md:ml-4">الممرض: {visit.nurse}</span>
              <span className="text-gray-400 text-xs md:ml-4">{visit.date}</span>
            </div>
            <div className="text-gray-700 mb-2">{visit.description}</div>
          </div>
          <div>
            <span
              className={`px-4 py-1 rounded-full font-medium text-sm ${statusColors[visit.status]}`}
            >
              {statusLabels[visit.status]}
            </span>
          </div>
        </div>
      ))}
      {visitsData.length === 0 && (
        <div className="text-center text-gray-400 py-8">لا توجد زيارات منزلية بعد.</div>
      )}
    </div>
  </div>
);

const OrdersSection = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">طلباتي</h3>
    <div className="bg-white p-4 md:p-6 rounded shadow min-h-[120px] md:min-h-[220px]"></div>
  </div>
);

const SettingsSection = () => (
  <div className="SettingsSection flex flex-col gap-4">
    <div className="profileName bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4">معلومات الشخصية</h3>
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">الاسم الأول</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded shadow-sm"
            placeholder="الاسم الأول"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">اسم العائلة</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded shadow-sm"
            placeholder="اسم العائلة"
          />
        </div>
      </div>
      <button className="mt-4 w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        حفظ التغييرات
      </button>
    </div>
    <div className="profileMedicalInfo bg-white p-4 rounded shadow">
      <h4 className="text-lg font-semibold mb-2">المعلومات الصحية</h4>
      <div className="flex flex-col gap-4 md:flex-row md:gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">الطول (سم)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded shadow-sm"
            placeholder="الطول"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">الوزن (كجم)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded shadow-sm"
            placeholder="الوزن"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">فصيلة الدم</label>
        <select className="w-full p-2 border border-gray-300 rounded shadow-sm">
          <option value="">اختر فصيلة الدم</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="dont-know">لا أعرف</option>
        </select>
      </div>
      <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        حفظ التغييرات
      </button>
    </div>
  </div>
);

export default User;
