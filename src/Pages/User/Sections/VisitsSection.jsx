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

import { useTranslation } from "react-i18next";

const statusColors = {
  pending: "text-yellow-600 bg-yellow-100",
  done: "text-green-600 bg-green-100",
  rejected: "text-red-600 bg-red-100",
};

export default function VisitsSection() {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t("user.visits.title")}</h3>
      <div className="grid gap-4">
        {visitsData.map((visit) => (
          <div
            key={visit.id}
            className="bg-white rounded-lg shadow flex flex-col md:flex-row items-start md:items-center p-4 gap-4 border border-gray-100"
          >
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <span className="font-semibold text-blue-700 text-lg">
                  {visit.name}
                </span>
                <span className="text-gray-500 text-sm md:ml-4">
                  {t("user.visits.nurseLabel")} {visit.nurse}
                </span>
                <span className="text-gray-400 text-xs md:ml-4">
                  {visit.date}
                </span>
              </div>
              <div className="text-gray-700 mb-2">{visit.description}</div>
            </div>
            <div>
              <span
                className={`px-4 py-1 rounded-full font-medium text-sm ${statusColors[visit.status]}`}
              >
                {t(`user.visits.status.${visit.status}`) || visit.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
