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
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow mb-4 md:mb-0 md:ml-5" style={{ backgroundColor: "#EBF6FC" }}>
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

const ordersData = [
  {
    id: 101,
    title: "طلب رعاية منزلية",
    date: "2024-06-10",
    status: "active",
    total: 250,
    nurse: "أحمد علي",
    address: "شارع النيل 12، القاهرة",
    items: ["زيارة ممرضة", "أدوية موضعية"],
  },
  {
    id: 102,
    title: "أدوية ووصفات",
    date: "2024-05-30",
    status: "completed",
    total: 120,
    nurse: "—",
    address: "شارع الملك، الجيزة",
    items: ["دواء أ", "دواء ب"],
  }, 
  {
    id: 104,
    title: "متابعة منزلية",
    date: "2024-04-15",
    status: "completed",
    total: 200,
    nurse: "سارة محمد",
    address: "شارع الأزهر، القاهرة",
    items: ["فحص ضغط دم", "نصائح طبية"],
  },
];

const orderStatusColors = {
  active: "text-blue-600 bg-blue-100",
  completed: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100",
};

const orderStatusLabels = {
  active: "قيد التنفيذ",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-EG");
  } catch {
    return iso;
  }
};

const OrdersSection = () => {
  const [activeOrderId, setActiveOrderId] = useState(
    ordersData.find((o) => o.status === "active")?.id || ordersData[0].id
  );

  const activeOrder = ordersData.find((o) => o.id === activeOrderId);
  const lastOrders = ordersData
    .filter((o) => o.id !== activeOrderId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">طلباتي</h3>

      {/* Active Order */}
      {activeOrder ? (
        <div className="bg-white p-4 md:p-6 rounded shadow mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">تفاصيل طلب صيدلية: {activeOrder.title}</h4>
              <div className="text-sm text-gray-500">{formatDate(activeOrder.date)}</div>
              <div className="mt-2 text-gray-700">{activeOrder.address}</div>
              <div className="mt-2 text-sm text-gray-600">
                الصيدلية: {activeOrder.pharmacy || activeOrder.nurse || "—"}
              </div>
              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${orderStatusColors[activeOrder.status]}`}
                >
                  {orderStatusLabels[activeOrder.status]}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-gray-500 text-sm">المجموع</div>
              <div className="text-2xl font-bold text-blue-600">{activeOrder.total} ج.م</div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  عرض الفاتورة
                </button>
                <button
                  onClick={() => {
                    // demo: mark as cancelled locally
                    // In real app: call API then update state
                    alert("تم إلغاء طلب الصيدلية (تجريبي)");
                  }}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  إلغاء الطلب
                </button>
                <button className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                  تتبع التوصيل
                </button>
              </div>
            </div>
          </div>

          {/* items */}
          {activeOrder.items?.length > 0 && (
            <div className="mt-4 border-t pt-3 text-sm text-gray-700">
              <div className="font-medium mb-1">الأدوية في الطلب:</div>
              <ul className="list-disc list-inside">
                {activeOrder.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow mb-6 text-center text-gray-500">
          لا يوجد طلب نشط حالياً.
        </div>
      )}

      {/* Last Orders */}
      <div>
        <h4 className="text-lg font-semibold mb-3">آخر الطلبات</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lastOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setActiveOrderId(order.id)}
              className="bg-white p-4 rounded-lg shadow border border-gray-100 cursor-pointer hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-blue-700">{order.title}</div>
                  <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                  <div className="text-xs text-gray-600 mt-1">{order.address}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-medium">{order.total} ج.م</div>
                  <span
                    className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${orderStatusColors[order.status]}`}
                  >
                    {orderStatusLabels[order.status]}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {lastOrders.length === 0 && (
            <div className="col-span-full text-center text-gray-400 p-6 bg-white rounded shadow">
              لا توجد طلبات سابقة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
