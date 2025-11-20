import React from "react";

const statusStyles = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-200 text-amber-900",
};

export default function PharmacistArticles() {
  const drugApprovals = [
    { id: 1, title: "علاج مناعي جديد للسرطان", authority: "FDA 2025", status: "approved", statusText: "معتمد" },
    { id: 2, title: "دواء لعلاج الزهايمر المبكر", authority: "EMA 2025", status: "pending", statusText: "قيد المراجعة" },
    { id: 3, title: "مضاد حيوي واسع الطيف", authority: "SFDA 2025", status: "approved", statusText: "معتمد" },
  ];

  const upcomingConferences = [
    {
      id: 1,
      title: "ورشة الصيدلة الإكلينيكية المتقدمة",
      category: "صيدلة إكلينيكية",
      description: "تدريب عملي على أحدث البروتوكولات الصيدلانية",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop",
      date: "25-27 أبريل 2026",
      location: "أبوظبي، الإمارات",
      participants: "400 مشارك",
      duration: "3 أيام",
    },
    {
      id: 2,
      title: "المؤتمر العربي للعلوم الصيدلانية",
      category: "صيدلة سريرية",
      description: "آخر التطورات في العلوم الصيدلانية والابتكارات الدوائية",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "10-12 مارس 2026",
      location: "عمان، الأردن",
      participants: "600 مشارك",
      duration: "3 أيام",
    },
  ];

  const features = [
    {
      title: "مكتبة الأدوية",
      description: "قاعدة بيانات شاملة لآلاف الأدوية والتركيبات",
      action: "استكشف المكتبة",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: "التقارير الأسبوعية",
      description: "تحديثات أسبوعية عن أحدث الأبحاث والتطورات",
      action: "اشترك الآن",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: "تحليلات السوق",
      description: "تقارير تحليلية عن سوق الأدوية والاتجاهات",
      action: "عرض التحليلات",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-10" dir="rtl">
      <section className="rounded-[32px] border border-[#e5f8f4] bg-gradient-to-br from-[#f6fffd] via-[#ecfbf7] to-[#def6f1] p-6 text-[#045453] shadow-[0_20px_50px_rgba(11,94,91,0.15)] md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#3d8a85]">المحدث الآن</p>
            <h2 className="text-3xl font-bold text-[#045453]">آخر الموافقات الدوائية</h2>
          </div>
        </div>
        <div className="space-y-4">
          {drugApprovals.map((drug) => (
            <div key={drug.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#d7f5ef] bg-white px-5 py-4 text-right text-[#024443] shadow">
              <div>
                <h3 className="text-lg font-semibold text-[#012f2f]">{drug.title}</h3>
                <p className="text-sm text-[#0a6461]">{drug.authority}</p>
              </div>
              <span className={`rounded-full px-4 py-1 text-sm font-semibold ${statusStyles[drug.status] || "bg-slate-200 text-slate-700"}`}>
                {drug.statusText}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-[#034543]">المؤتمرات الصيدلانية القادمة</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingConferences.map((conference) => (
            <div key={conference.id} className="flex flex-col overflow-hidden rounded-[26px] border border-[#d2f6f0] bg-white shadow-[0_12px_30px_rgba(9,132,117,0.12)] transition hover:-translate-y-1.5">
              <div className="relative h-48 w-full">
                <img src={conference.image} alt={conference.title} className="h-full w-full object-cover" />
                <span className="absolute right-4 top-4 rounded-full bg-white/85 px-4 py-1 text-sm font-semibold text-[#0d9488]">
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
        {features.map((feature) => (
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
