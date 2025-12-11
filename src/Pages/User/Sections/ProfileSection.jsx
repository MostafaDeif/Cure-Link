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
    user?.name || user?.fullName || user?.full_name || user?.username || user?.email || "-";

 
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t("user.profile.title")}</h3>

      {user ? (
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <strong>{t("user.profile.nameLabel")}:</strong> {displayName}
          </p>
          <p>
            <strong>{t("user.profile.emailLabel")}:</strong> {user.email || "-"}
          </p>
          <p>
            <strong>{t("user.profile.phoneLabel")}:</strong> {user.phone || "-"}
          </p>
          
        </div>
      ) : (
        <p className="text-sm text-gray-500">{t("user.profile.noUser")}</p>
      )}
    </div>
  );
};

export default ProfileSection;
