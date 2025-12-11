import { useTranslation } from "react-i18next";

const ProfileSection = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t("user.profile.title")}</h3>
      <p>{t("user.profile.nameLabel")}: مصطفى ضيف</p>
    </div>
  );
};

export default ProfileSection;
