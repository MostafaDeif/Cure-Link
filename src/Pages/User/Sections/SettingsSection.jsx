export default function SettingsSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">المعلومات الشخصية</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="الاسم الأول"
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="اسم العائلة"
          />
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          حفظ التغييرات
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">المعلومات الصحية</h4>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="الطول"
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="الوزن"
          />
        </div>

        <select className="w-full p-2 border rounded mt-4">
          <option value="">اختر فصيلة الدم</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
          <option>لا أعرف</option>
        </select>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}
