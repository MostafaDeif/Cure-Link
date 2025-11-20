import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoctorArticles from "../Components/articles/DoctorArticles";
import PharmacistArticles from "../Components/articles/PharmacistArticles";
import ClientArticles from "../Components/articles/ClientArticles";
import { useRole } from "../Context/RoleContext";

// Banner images with text - يمكن استبدالها بصور حقيقية
const bannerData = [
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=400&fit=crop",
    title: "كن جزءا من أكبر المؤتمرات الطبية العالمية",
    subtitle: "تابع الجديد أولا بأول مع Cure Link",
  },
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=400&fit=crop",
    title: "تطوير مستمر للأطباء والممرضين",
    subtitle: "احصل على شهادات معتمدة من مؤسسات عالمية",
  },
  {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
    title: "آخر أخبار الأدوية والابتكارات الصيدلانية",
    subtitle: "ابق على اطلاع بأحدث التحديثات الطبية",
  },
  {
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=400&fit=crop",
    title: "تعلم تنقذ حياة",
    subtitle: "ورش الإسعافات الأولية والتوعية الصحية للجميع",
  },
];

export default function ArticlesPage() {
  const { setRole } = useRole();
  const [activeTab, setActiveTab] = useState("doctor");
  const [bannerIndex, setBannerIndex] = useState(0);

  // Update role context when tab changes
  useEffect(() => {
    if (activeTab === "doctor") {
      setRole("doctor");
    } else if (activeTab === "pharmacist") {
      setRole("pharmacist");
    } else {
      setRole("client");
    }
  }, [activeTab, setRole]);

  // Auto-rotate banner images
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerData.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "doctor":
        return <DoctorArticles />;
      case "pharmacist":
        return <PharmacistArticles />;
      case "client":
        return <ClientArticles />;
      default:
        return <DoctorArticles />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--turquoise-50)] font-['Alexandria',sans-serif]" dir="rtl">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 md:px-6 lg:px-0">
        {/* Banner Carousel */}
        <div className="relative mb-8 h-[360px] w-full overflow-hidden rounded-[32px] shadow-[0_35px_90px_rgba(15,118,110,0.28)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={bannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <img
                src={bannerData[bannerIndex].image}
                alt={`Banner ${bannerIndex + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/70 via-[#0f766e]/65 to-[#0b4c4c]/70" />
              <div
                className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.3), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.25), transparent 45%)",
                }}
              />
              <div className="relative z-10 flex h-full w-full flex-col items-end justify-center px-6 py-8 text-white md:px-12">
                <div className="max-w-2xl space-y-4 text-right">
                  <h2 className="text-3xl font-bold leading-snug drop-shadow-md md:text-4xl lg:text-[42px]">
                    {bannerData[bannerIndex].title}
                  </h2>
                  <p className="text-lg text-white/90 md:text-xl">{bannerData[bannerIndex].subtitle}</p>
                  <div className="flex items-center justify-end gap-3 text-sm text-white/80">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-lime-300" />
                      بث مباشر
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-200" />
                      شهادات معتمدة
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Banner Navigation Arrows */}
          <button
            className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0f766e] shadow-lg transition hover:scale-110"
            onClick={() => setBannerIndex((prev) => (prev - 1 + bannerData.length) % bannerData.length)}
            aria-label="الشريحة السابقة"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0f766e] shadow-lg transition hover:scale-110"
            onClick={() => setBannerIndex((prev) => (prev + 1) % bannerData.length)}
            aria-label="الشريحة التالية"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Banner Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {bannerData.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index === bannerIndex ? "w-8 bg-white" : "w-3 bg-white/60"
                }`}
                onClick={() => setBannerIndex(index)}
                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="sticky top-0 z-30 w-full bg-[var(--turquoise-50)] shadow-[0_12px_30px_rgba(16,112,105,0.12)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch md:flex-row">
          <button
            className={`flex flex-1 items-center justify-center gap-2 border-b-4 px-6 py-4 text-sm font-semibold transition md:text-base ${
              activeTab === "doctor"
                ? "border-[#0d9488] bg-white text-[#0d9488]"
                : "border-transparent text-[#0f5f5f]/70 hover:text-[#0d9488]"
            }`}
            onClick={() => setActiveTab("doctor")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>الأطباء والممرضين</span>
          </button>

          <button
            className={`flex flex-1 items-center justify-center gap-2 border-b-4 px-6 py-4 text-sm font-semibold transition md:text-base ${
              activeTab === "pharmacist"
                ? "border-[#0d9488] bg-white text-[#0d9488]"
                : "border-transparent text-[#0f5f5f]/70 hover:text-[#0d9488]"
            }`}
            onClick={() => setActiveTab("pharmacist")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
            <span>الصيادلة</span>
          </button>

          <button
            className={`flex flex-1 items-center justify-center gap-2 border-b-4 px-6 py-4 text-sm font-semibold transition md:text-base ${
              activeTab === "client"
                ? "border-[#0d9488] bg-white text-[#0d9488]"
                : "border-transparent text-[#0f5f5f]/70 hover:text-[#0d9488]"
            }`}
            onClick={() => setActiveTab("client")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>العملاء</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
