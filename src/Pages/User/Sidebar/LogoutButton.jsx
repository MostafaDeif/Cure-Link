import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-50 text-red-700 px-4 py-2 rounded hover:bg-red-100 transition"
    >
      {t('user.sidebar.logout')}
    </button>
  );
}
