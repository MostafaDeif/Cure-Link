import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileSection = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();
    const onAuth = () => loadUser();
    window.addEventListener("auth-change", onAuth);
    window.addEventListener("storage", onAuth);
    return () => {
      window.removeEventListener("auth-change", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, []);

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.full_name ||
    user?.username ||
    user?.email ||
    "";

  const avatarSrc =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || "User")}&background=426287&color=fff`;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl font-bold">{t("user.profile.title")}</h3>
        {user && (
          <button className="text-sm px-3 py-1 border rounded text-blue-600 border-blue-100 hover:bg-blue-50">
            {t("user.profile.edit") || "Edit"}
          </button>
        )}
      </div>

      {user ? (
        <div className="md:flex md:items-start md:gap-6">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">
              <img
                src={avatarSrc}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-3 font-semibold text-gray-700">
              {displayName || "-"}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
              <p>
                <strong>{t("user.profile.nameLabel")}:</strong>
                <span className="ml-2">{displayName || "-"}</span>
              </p>
              <p>
                <strong>{t("user.profile.emailLabel")}:</strong>
                <span className="ml-2">{user.email || "-"}</span>
              </p>
              <p>
                <strong>{t("user.profile.phoneLabel")}:</strong>
                <span className="ml-2">{user.phone || "-"}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">{t("user.profile.noUser")}</p>
      )}
    </div>
  );
};

export default ProfileSection;
