import React from "react";

export default function DoctorArticles() {
  const upcomingConferences = [
    {
      id: 1,
      title: "مؤتمر الطب النفسي الحديث",
      category: "طب نفسي",
      description: "نهج شامل للصحة النفسية في العصر الحديث",
      image: "https://i.pinimg.com/736x/35/33/4d/35334dde0e2455c3a2ecf64616c4b29e.jpg",
      date: "20-22 فبراير 2026",
      location: "الرياض، السعودية",
      participants: "800 مشارك",
      duration: "3 أيام",
    },
    {
      id: 2,
      title: "ورشة التصوير بالرنين المغناطيسي المتقدم",
      category: "أشعة",
      description: "تدريب عملي على أحدث أجهزة الرنين المغناطيسي",
      image: "https://i.pinimg.com/736x/39/fa/9e/39fa9e906a2ca5854bf42769db79bb92.jpg",
      date: "5-7 يناير 2026",
      location: "القاهرة، مصر",
      participants: "300 مشارك",
      duration: "3 أيام",
    },
    {
      id: 3,
      title: "المؤتمر الدولي لجراحة القلب 2025",
      category: "جراحة",
      description: "استكشف أحدث التقنيات في جراحة القلب مع خبراء عالميين",
      image: "https://i.pinimg.com/736x/77/9a/1f/779a1fa4a564fb2f8d00da6975c29ccd.jpg",
      date: "15-18 ديسمبر 2025",
      location: "دبي، الإمارات العربية المتحدة",
      participants: "1200 مشارك",
      duration: "4 أيام",
    },
  ];

  return (
    <div className="space-y-10" dir="rtl">
      <section className="rounded-[32px] border border-[#b6f2ec]/50 bg-gradient-to-br from-[#d9faf4] to-white p-6 text-center shadow-[0_20px_45px_rgba(9,132,117,0.12)] md:p-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-[#034543]">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <h2>خريطة المؤتمرات العالمية</h2>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <p className="text-[#0a6461]">عرض تفاعلي للمؤتمرات الطبية حول العالم</p>
          <button className="mt-4 rounded-full border border-[#0d9488] px-6 py-2 text-sm font-semibold text-[#0d9488] transition hover:-translate-y-0.5 hover:bg-[#0d9488] hover:text-white">
            استكشف الخريطة
          </button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-[#034543]">المؤتمرات القادمة</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingConferences.map((conference) => (
            <div key={conference.id} className="flex flex-col overflow-hidden rounded-[26px] border border-[#d2f6f0] bg-white shadow-[0_12px_30px_rgba(9,132,117,0.12)] transition hover:-translate-y-1.5">
              <div className="relative h-48 w-full">
                <img src={conference.image} alt={conference.title} className="h-full w-full object-cover" />
                <span className="absolute right-4 top-4 rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-[#0d9488]">
                  {conference.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 text-right text-[#024443]">
                <div>
                  <h3 className="text-xl font-semibold text-[#012f2f]">{conference.title}</h3>
                  <p className="mt-1 text-sm text-[#0a6461]">{conference.description}</p>
                </div>
                <div className="space-y-3 text-sm text-[#044848]">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{conference.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{conference.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{conference.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{conference.duration}</span>
                  </div>
                </div>
                <button className="mt-auto rounded-2xl bg-[#0d9488] py-3 text-white shadow-lg shadow-[#0d9488]/30 transition hover:-translate-y-0.5">
                  التسجيل الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "الشهادات المعتمدة",
            description: "احصل على شهادات حضور معتمدة دوليا",
            action: "عرض شهاداتي",
            icon: (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            ),
          },
          {
            title: "رفع الأبحاث",
            description: "شارك أبحاثك واحصل على تقييمات من خبراء عالميين",
            action: "رفع بحث جديد",
            icon: (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            ),
          },
          {
            title: "مكتبة الأبحاث",
            description: "احصل على وصول إلى أكثر من 10,000 بحث طبي معتمد",
            action: "تصفح المكتبة",
            icon: (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            ),
          },
        ].map((feature) => (
          <div key={feature.title} className="flex flex-col rounded-[28px] border border-[#d2f6f0] bg-white p-6 text-right shadow-[0_12px_30px_rgba(9,132,117,0.1)]">
            <div className="mb-4 inline-flex rounded-2xl bg-[#e3fbf8] p-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[#023f3e]">{feature.title}</h3>
            <p className="mt-2 flex-1 text-[#0a6461]">{feature.description}</p>
            <button className="mt-4 rounded-full border border-[#0d9488] px-5 py-2 text-sm font-semibold text-[#0d9488] transition hover:-translate-y-0.5 hover:bg-[#0d9488] hover:text-white">
              {feature.action}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
