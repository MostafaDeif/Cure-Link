import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import nursesData from "./nurseData";
import nursepicture from "../../assets/nurse_p.png";
import "./FindNurse.css";

const CategoryIcon = ({ label, Icon, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 text-xs font-medium
      ${
        selected
          ? "bg-blue-200 text-blue-800 shadow-lg scale-105"
          : "bg-white/90 text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
      } w-full`}
    aria-pressed={selected}
  >
    {Icon && <Icon className="h-8 w-8 transition-colors duration-200" />}
    <span className="truncate">{label}</span>
  </button>
);

const NurseCard = ({ name, specialty, gender, rating, imageUrl, onBook }) => (
  <article className="rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md shadow-md flex flex-col transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="h-44 w-full overflow-hidden rounded-t-3xl relative">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover object-top transition-transform duration-500"
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
          {name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {specialty} • {gender}
        </p>
        <div className="mt-3 text-yellow-500 font-medium flex items-center gap-1 cursor-pointer transition transform hover:scale-110">
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 transition-colors duration-300 hover:text-yellow-500"
          />{" "}
          {rating}
        </div>
      </div>
      <button
        onClick={onBook}
        className="mt-4 w-full text-sm md:text-base px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition transform duration-200 shadow-md"
      >
        Book
      </button>
    </div>
  </article>
);

export default function FindNurse() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const categories = [
    { label: "All", Icon: Users },
    { label: "Home Injection", Icon: Stethoscope },
    { label: "Blood Pressure", Icon: Thermometer },
    { label: "Postnatal Care", Icon: Smile },
    { label: "Elderly Care", Icon: Users },
    { label: "Wound Dressing", Icon: Clipboard },
  ];

  const genders = [
    { label: "All", icon: Users },
    {
      label: "Male",
      icon: () => (
        <FontAwesomeIcon
          icon={faUserDoctor}
          className="w-5 h-5 text-gray-700"
        />
      ),
    },
    {
      label: "Female",
      icon: () => (
        <FontAwesomeIcon icon={faUserNurse} className="w-5 h-5 text-gray-700" />
      ),
    },
  ];

  const filteredNurses = nursesData.filter((n) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      n.name.toLowerCase().includes(term) ||
      n.distance.toLowerCase().includes(term);
    const matchesGender =
      selectedGender === "All" || n.gender === selectedGender;
    const matchesCategory =
      selectedCategory === "All" ||
      n.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesGender && matchesCategory;
  });

  const topNurses = [...filteredNurses]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 5);

  return (
    <div className="min-h-screen w-full bg-blue-50">
      <div className="w-full px-4 lg:px-10 py-14">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center md:text-left mb-4">
            Your <span className="text-blue-600">Trusted Nurses</span>
          </h1>
        </header>

        {/* Search + Gender Buttons */}
        <div className="bg-white/90 rounded-3xl shadow-lg p-6 mb-12 backdrop-blur-sm w-full">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search nurses by name, city..."
              className="rounded-2xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm w-full bg-white"
            />
            <div className="flex justify-between gap-2 flex-wrap w-full">
              {genders.map((g) => {
                const Icon = g.icon;
                const isFn = typeof Icon === "function";
                return (
                  <button
                    key={g.label}
                    onClick={() => setSelectedGender(g.label)}
                    className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl transition text-sm font-medium
                      ${
                        selectedGender === g.label
                          ? "bg-blue-200 text-blue-800 shadow-lg scale-105"
                          : "bg-white/90 text-gray-700 border border-transparent hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
                      }`}
                  >
                    {isFn ? (
                      <Icon />
                    ) : (
                      <Icon className="w-5 h-5 text-gray-600" />
                    )}
                    <span>{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-12 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 w-full">
            {categories.map((cat) => (
              <CategoryIcon
                key={cat.label}
                label={cat.label}
                Icon={cat.Icon}
                selected={selectedCategory === cat.label}
                onClick={() => setSelectedCategory(cat.label)}
              />
            ))}
          </div>
        </section>

        {/* Highlight Section */}
        <section className="mb-16 bg-blue-50/70 rounded-3xl p-8 shadow-lg w-full flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[200px] flex justify-center sm:justify-start">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Early Protection for Your Family Health
              </h2>
              <p className="text-gray-700 mt-4 text-lg">
                Book a nurse now for quick and trusted care at home.
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[400px] flex justify-center sm:justify-end">
            <img
              src={nursepicture}
              alt="highlight"
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>
        </section>
        {/* Top Nurses Slider */}
        <section className="mb-16 w-full">
          <div className="flex items-center justify-between mb-6 w-full">
            <h2 className="text-3xl font-semibold text-gray-900">Top Nurses</h2>
            <button
              onClick={() => navigate("/all-nurses")}
              className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:scale-105 transition transform duration-200 shadow-md text-sm"
            >
              Show All
            </button>
          </div>
          <div className="relative overflow-hidden w-full">
            <div className="flex gap-6 whitespace-nowrap animate-slide">
              {[...topNurses, ...topNurses].map((n, index) => (
                <div
                  key={index}
                  className="inline-block min-w-[240px] w-[240px]"
                >
                  <NurseCard
                    {...n}
                    onBook={() =>
                      navigate(`/nurse-book/${encodeURIComponent(n.name)}`)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
