import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../Context/LanguageContext.jsx";
import "./index.css";
import {
  Users,
  Stethoscope,
  Thermometer,
  Smile,
  Clipboard,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import nursesData from "../../Data/nurseData";
import nursepicture from "../../assets/nurse_p.png";
import "./FindNurse.css";

const CategoryIcon = ({ label, Icon, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-2xl transition-all duration-300 text-xs font-medium
      ${
        selected
          ? "bg-blue-200 text-blue-800 shadow-lg"
          : "bg-white/90 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
      } w-full`}
    aria-pressed={selected}
  >
    {Icon && (
      <Icon className="h-5 sm:h-8 w-5 sm:w-8 transition-colors duration-200" />
    )}
    <span className="truncate text-xs sm:text-xs">{label}</span>
  </button>
);

const NurseCard = ({
  name,
  nameEn,
  specialty,
  specialtyAr,
  gender,
  rating,
  imageUrl,
  onBook,
  t,
  language,
}) => (
  <article className="rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md shadow-md flex flex-col transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="h-60 w-full overflow-hidden rounded-t-3xl relative">
      <img
        src={imageUrl}
        alt={language === "ar" ? name : nameEn}
        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl"></div>
    </div>
    <div className="p-5 flex flex-col justify-between flex-1">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg md:text-xl">
          {language === "ar" ? name : nameEn}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {language === "ar" ? specialtyAr : specialty} • {gender}
        </p>
        <div className="mt-3 text-yellow-500 font-medium flex items-center gap-1 cursor-pointer transition transform hover:scale-110">
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 transition-colors duration-300 hover:text-yellow-500"
          />{" "}
          <span>{rating}</span>
        </div>
      </div>
      <button
        onClick={onBook}
        className="mt-4 w-full text-sm md:text-base px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition transform duration-200 shadow-md"
      >
        {t("findNurse.bookButton")}
      </button>
    </div>
  </article>
);

export default function FindNurse() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  useEffect(() => {
    setSelectedCategory("All");
    setSelectedGender("All");
    setSearchTerm("");
  }, [language]);

  const categories = [
    { label: t("findNurse.categories.all"), key: "All", Icon: Users },
    {
      label: t("findNurse.categories.homeInjection"),
      key: "Home Injection",
      Icon: Stethoscope,
    },
    {
      label: t("findNurse.categories.bloodPressure"),
      key: "Blood Pressure",
      Icon: Thermometer,
    },
    {
      label: t("findNurse.categories.postnatalCare"),
      key: "Postnatal Care",
      Icon: Smile,
    },
    {
      label: t("findNurse.categories.elderlyCare"),
      key: "Elderly Care",
      Icon: Users,
    },
    {
      label: t("findNurse.categories.woundDressing"),
      key: "Wound Dressing",
      Icon: Clipboard,
    },
  ];

  const genders = [
    { label: t("findNurse.allGender"), key: "All", icon: Users },
    {
      label: t("findNurse.male"),
      key: "Male",
      icon: () => (
        <FontAwesomeIcon
          icon={faUserDoctor}
          className="w-5 h-5 text-gray-700"
        />
      ),
    },
    {
      label: t("findNurse.female"),
      key: "Female",
      icon: () => (
        <FontAwesomeIcon icon={faUserNurse} className="w-5 h-5 text-gray-700" />
      ),
    },
  ];

  const filteredNurses = useMemo(
    () =>
      nursesData.filter((n) => {
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch =
          n.nameEn.toLowerCase().includes(term) ||
          n.distance.toLowerCase().includes(term);
        const matchesGender =
          selectedGender === "All" || n.gender === selectedGender;
        const matchesCategory =
          selectedCategory === "All" ||
          n.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesGender && matchesCategory;
      }),
    [searchTerm, selectedGender, selectedCategory],
  );

  // إعداد السلايدر محسّن للتكرار ودعم اللغة
  const repeatedNurses = useMemo(() => {
    const top = filteredNurses.slice(0, 5);
    const repeated = [];
    for (let i = 0; i < 10; i++) {
      repeated.push(...top);
    }
    return repeated;
  }, [filteredNurses]);

  return (
    <div
      className="min-h-screen w-full bg-blue-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-14">
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center md:text-left mb-2 sm:mb-4">
            {t("findNurse.title")}
          </h1>
        </header>

        {/* Search + Gender Buttons */}
        <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-10 lg:mb-12 backdrop-blur-sm w-full">
          <div className="flex flex-col gap-3 sm:gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("findNurse.searchPlaceholder")}
              className="rounded-xl sm:rounded-2xl border border-gray-300 p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm w-full bg-white text-sm sm:text-base"
            />
            <div className="flex justify-between gap-2 flex-wrap w-full">
              {genders.map((g) => {
                const Icon = g.icon;
                const isFn = typeof Icon === "function";
                return (
                  <button
                    key={g.key}
                    onClick={() => setSelectedGender(g.key)}
                    className={`flex-1 min-w-fit flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-2xl transition text-xs sm:text-sm font-medium
                      ${
                        selectedGender === g.key
                          ? "bg-blue-200 text-blue-800 shadow-lg"
                          : "bg-white/90 text-gray-700 border border-transparent hover:bg-blue-100 hover:text-blue-700"
                      }`}
                  >
                    {isFn ? (
                      <Icon />
                    ) : (
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                    )}
                    <span>{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-8 sm:mb-10 lg:mb-12 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full">
            {categories.map((cat) => (
              <CategoryIcon
                key={cat.key}
                label={cat.label}
                Icon={cat.Icon}
                selected={selectedCategory === cat.key}
                onClick={() => setSelectedCategory(cat.key)}
              />
            ))}
          </div>
        </section>

        {/* Highlight Section */}
        <section
          className="mb-8 sm:mb-12 lg:mb-16 bg-blue-50/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6
  shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.1)]"
        >
          <div className="flex-1 min-w-[200px] flex justify-center sm:justify-start order-2 sm:order-1">
            <div className="flex flex-col justify-center">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {t("findNurse.highlight")}
              </h2>
              <p className="text-gray-700 mt-2 sm:mt-4 text-base sm:text-lg">
                {t("findNurse.highlightDesc")}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px] sm:max-w-[400px] flex justify-center order-1 sm:order-2">
            <img
              src={nursepicture}
              alt="highlight"
              className="w-full h-auto object-cover rounded-xl sm:rounded-3xl"
            />
          </div>
        </section>

        {/* All Nurses Slider */}
        <section className="mb-8 sm:mb-12 lg:mb-16 w-full">
          <div className="flex items-center justify-between mb-6 sm:mb-8 w-full">
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-900">
              {filteredNurses.length > 0
                ? t("findNurse.topNurses")
                : t("findNurse.noResults")}
            </h2>
            {filteredNurses.length > 0 && (
              <button
                onClick={() => navigate("/all-nurses")}
                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg sm:rounded-2xl hover:bg-blue-700 transition transform duration-200 shadow-md text-xs sm:text-sm"
              >
                {t("findNurse.showAll")}
              </button>
            )}
          </div>

          {filteredNurses.length > 0 ? (
            <div className="relative overflow-hidden w-full">
              <div
                className={`flex gap-6 whitespace-nowrap animate-slide ${
                  language === "ar" ? "rtl-slide" : ""
                }`}
                style={{ animationDuration: `${repeatedNurses.length * 1.5}s` }}
              >
                {repeatedNurses.map((n, index) => (
                  <div
                    key={index}
                    className="inline-block min-w-[240px] w-[240px] flex-shrink-0"
                  >
                    <NurseCard
                      {...n}
                      t={t}
                      language={language}
                      onBook={() =>
                        navigate(
                          `/nurse-book/${encodeURIComponent(
                            language === "ar" ? n.name : n.nameEn,
                          )}`,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t("findNurse.noResults")}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
