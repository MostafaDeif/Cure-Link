import { useTranslation } from "react-i18next";

export default function SettingsSection() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">{t("user.settings.personalInfo")}</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder={t("user.settings.firstName")}
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder={t("user.settings.lastName")}
          />
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          {t("user.settings.saveChanges")}
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">{t("user.settings.healthInfo")}</h4>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder={t("user.settings.height")}
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder={t("user.settings.weight")}
          />
        </div>

        <select className="w-full p-2 border rounded mt-4">
          <option value="">{t("user.settings.selectBlood")}</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
          <option>{t("user.settings.unknown")}</option>
        </select>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          {t("user.settings.saveChanges")}
        </button>
      </div>
    </div>
  );
}
