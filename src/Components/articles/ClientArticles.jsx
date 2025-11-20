import { useEffect, useMemo, useState } from "react";
import { getArticles } from "../../Service/articlesApi";
import ArticleCard from "../ui/ArticleCard";
import { useRole } from "../../Context/RoleContext";

const tipsData = [
  { id: "cpr", icon: "❤️", title: "الإنعاش القلبي الرئوي (CPR)", description: "تعلم المهارة التي قد تنقذ حياة خلال دقائق معدودة.", cta: "شاهد الفيديو" },
  { id: "choking", icon: "🫁", title: "التعامل مع الاختناق", description: "مناورة هيملِك خطوة بخطوة لمنح الأمان لعائلتك.", cta: "شاهد الفيديو" },
  { id: "bleeding", icon: "🩹", title: "إسعاف الجروح والنزيف", description: "كيفية إيقاف النزيف بشكل صحيح قبل وصول المساعدة.", cta: "شاهد الدليل" },
  { id: "burns", icon: "🔥", title: "كيفية التعامل مع الحروق البسيطة", description: "خطوات سريعة وفعّالة لتخفيف الألم وتسريع التعافي.", cta: "اطلع على النصائح" },
];

const videoLibrary = [
  { id: 1, title: "فيديو تعليمي 1", duration: "6 دقائق" },
  { id: 2, title: "فيديو تعليمي 2", duration: "8 دقائق" },
  { id: 3, title: "فيديو تعليمي 3", duration: "5 دقائق" },
];

const workshopsData = [
  { id: 1, title: "دورة الإسعافات الأولية الأساسية", schedule: "كل سبت | 5:00 مساءً", duration: "المدة: 3 ساعات", seats: 8, seatStatus: "limited" },
  { id: 2, title: "ورشة الإنعاش القلبي للعائلات", schedule: "كل أحد | 4:00 مساءً", duration: "المدة: ساعتان", seats: 12, seatStatus: "available" },
  { id: 3, title: "التوعية الصحية للأطفال", schedule: "الأربعاء والخميس | 6:00 مساءً", duration: "المدة: 1.5 ساعة", seats: 5, seatStatus: "urgent" },
];

const guideData = [
  {
    id: "burns",
    title: "الحروق",
    summary: "خطوات فورية لتخفيف الألم وتقليل أثر الحروق البسيطة.",
    steps: ["إبعاد مصدر الحرارة فوراً وغسل المنطقة بماء فاتر لمدة 10 دقائق.", "إزالة الإكسسوارات الضيقة قبل تورّم الجلد.", "تغطية الحرق بشاش معقم وتجنب المراهم الدهنية."],
  },
  {
    id: "bleeding",
    title: "النزيف",
    summary: "كيفية السيطرة على النزيف قبل وصول الطوارئ.",
    steps: ["استخدام قفازات أو قطعة قماش نظيفة لحماية نفسك.", "الضغط المباشر على الجرح ورفع الطرف المصاب إن أمكن.", "الاستمرار بالضغط حتى يتوقف النزيف أو يصل المسعفون."],
  },
  {
    id: "fractures",
    title: "الكسور",
    summary: "ثبت الطرف وامنع أي حركة لغاية وصول الرعاية الطبية.",
    steps: ["تثبيت الطرف المصاب باستخدام جبيرة مؤقتة أو لوح خشبي.", "استخدام الثلج فوق قطعة قماش لتخفيف التورم.", "الاتصال بالطوارئ فوراً إذا وُجد نزيف أو تشوه ظاهر."],
  },
  {
    id: "choking",
    title: "الاختناق",
    summary: "نصائح لإنقاذ الأطفال والبالغين عند انسداد مجرى الهواء.",
    steps: ["تشجيع المصاب على السعال إذا كان قادراً.", "إجراء خمس ضربات بين لوحي الكتف ثم مناورة هيملِك.", "الاتصال بالطوارئ إن فقد المصاب الوعي وابدأ بالإنعاش القلبي."],
  },
  {
    id: "wounds",
    title: "الجروح",
    summary: "تنظيف الجرح وتغطيته يقلّل الالتهاب ويسرّع التعافي.",
    steps: ["غسل اليدين جيداً ثم تنظيف الجرح بمحلول معقم.", "استخدام شاش معقم وتثبيته بلطف دون ضغط مفرط.", "مراقبة العلامات الحيوية والبحث عن أعراض العدوى."],
  },
  {
    id: "shock",
    title: "الصدمة",
    summary: "حافظ على تدفق الدم إلى الأعضاء الحيوية.",
    steps: ["إبقاء المصاب مستلقياً ورفع القدمين إن لم يكن هناك كسر.", "تدفئة الجسم ببطانية خفيفة.", "الاتصال بالطوارئ وعدم إعطاء المصاب شيئاً للأكل أو الشرب."],
  },
  {
    id: "fainting",
    title: "الإغماء",
    summary: "تأكد من التنفس، وارفع القدمين قليلاً، وراقب الوعي.",
    steps: ["وضع المصاب على ظهره ورفع الساقين بزاوية 30 درجة.", "التأكد من عدم وجود انسداد في مجرى الهواء.", "طلب المساعدة الطبية إذا تكرر الإغماء أو استمر طويلاً."],
  },
  {
    id: "bites",
    title: "اللدغات",
    summary: "حدد نوع اللدغة وتعامل مع التورم بسرعة.",
    steps: ["غسل المنطقة بالماء والصابون ووضع كمادة باردة.", "عدم شفط السم أو فتح الجرح بآلة حادة.", "الاتصال بالطوارئ إذا ظهرت أعراض حساسية خطيرة."],
  },
];

const seatBadgeClasses = {
  available: "bg-emerald-100 text-emerald-700",
  limited: "bg-amber-200 text-amber-900",
  urgent: "bg-rose-200 text-rose-700",
};

export default function ClientArticles() {
  const { role } = useRole();
  const [articles, setArticles] = useState([]);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [activeGuide, setActiveGuide] = useState(guideData[0].id);

  useEffect(() => {
    getArticles(role || "client").then(setArticles).catch(console.error);
  }, [role]);

  const currentTip = tipsData[activeTipIndex];
  const activeGuideContent = useMemo(() => guideData.find((guide) => guide.id === activeGuide), [activeGuide]);

  const handleNextTip = () => setActiveTipIndex((prev) => (prev + 1) % tipsData.length);
  const handlePrevTip = () => setActiveTipIndex((prev) => (prev - 1 + tipsData.length) % tipsData.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTipIndex((prev) => (prev + 1) % tipsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8" dir="rtl">
      <section className="rounded-[32px] bg-gradient-to-br from-[#a8ede5] via-[#7cded6] to-[#58c6be] p-6 text-white shadow-[0_30px_60px_rgba(13,148,136,0.25)] md:p-10">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">💡</div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/80">نصيحة اليوم</p>
            <h3 className="text-2xl font-bold text-white">تعلم مهارة إسعافات أولية في دقائق</h3>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[26px] bg-white/10 px-4 py-10 text-center backdrop-blur">
          <button
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-[#0f766e] shadow-lg transition hover:scale-110"
            onClick={handlePrevTip}
            aria-label="النصيحة السابقة"
          >
            ‹
          </button>
          <button
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-[#0f766e] shadow-lg transition hover:scale-110"
            onClick={handleNextTip}
            aria-label="النصيحة التالية"
          >
            ›
          </button>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
            <div className="text-5xl md:text-6xl">{currentTip.icon}</div>
            <h4 className="text-3xl font-bold leading-snug">{currentTip.title}</h4>
            <p className="text-lg text-white/90">{currentTip.description}</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/90 px-8 py-3 text-lg font-semibold text-[#0d9488] shadow-lg shadow-white/30 transition hover:-translate-y-0.5">
              {currentTip.cta}
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {tipsData.map((tip, index) => (
              <button
                key={tip.id}
                className={`h-3 rounded-full transition-all ${index === activeTipIndex ? "w-8 bg-white" : "w-3 bg-white/60"}`}
                onClick={() => setActiveTipIndex(index)}
                aria-label={`اعرض ${tip.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#a8ede5]/40 bg-white/70 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.12)] backdrop-blur md:p-8">
        <div className="mb-6 flex items-center gap-3 text-[#035a5a]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0fbf8] text-2xl">🎬</div>
          <div>
            <p className="text-sm text-[#05817d]">مكتبة الفيديوهات التعليمية</p>
            <h3 className="text-2xl font-semibold">شاهد أهم الشروحات العملية المختصرة</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {videoLibrary.map((video) => (
            <button
              key={video.id}
              className="group flex items-center gap-3 rounded-2xl border border-[#9adfd7] bg-white/90 p-4 text-right text-[#035a5a] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-2xl">🎥</span>
              <div>
                <h4 className="font-semibold">{video.title}</h4>
                <p className="text-sm text-[#0b5a59ad]">{video.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#b3f1eb]/40 bg-gradient-to-br from-white via-[#e9fbf8] to-white p-6 shadow-[0_20px_45px_rgba(9,132,117,0.15)] md:p-8">
        <div className="mb-6 flex items-center gap-3 text-[#035a5a]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c6f5ee] text-2xl">📅</div>
          <div>
            <p className="text-sm text-[#05817d]">جدول ورش الإسعافات الأولية</p>
            <h3 className="text-2xl font-semibold">اختر الدورة الأنسب واحجز مقعدك</h3>
          </div>
        </div>
        <div className="space-y-4">
          {workshopsData.map((workshop) => (
            <div key={workshop.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#bdeee9] bg-white px-5 py-4 shadow-sm">
              <div>
                <h4 className="text-lg font-semibold text-[#023f3e]">{workshop.title}</h4>
                <p className="text-[#0b5a59]">{workshop.schedule}</p>
                <p className="text-sm text-[#0b5a59]/70">{workshop.duration}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className={`rounded-full px-4 py-1 text-sm font-semibold ${seatBadgeClasses[workshop.seatStatus]}`}>
                  {workshop.seats} مقعد متبقي
                </span>
                <button className="rounded-full border border-[#0d9488] px-6 py-2 font-semibold text-[#0d9488] transition hover:-translate-y-0.5 hover:bg-[#0d9488] hover:text-white">
                  احجز الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#b3f1eb]/40 bg-white/80 p-6 shadow-[0_20px_45px_rgba(9,132,117,0.12)] backdrop-blur md:p-8">
        <div className="mb-6 flex items-center gap-3 text-[#035a5a]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d1f6f1] text-2xl">📘</div>
          <div>
            <p className="text-sm text-[#05817d]">الدليل التفاعلي للإسعافات الأولية</p>
            <h3 className="text-2xl font-semibold">اختر الحالة لمعرفة الخطوات الصحيحة</h3>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {guideData.map((guide) => (
            <button
              key={guide.id}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                guide.id === activeGuide
                  ? "border-[#0d9488] bg-[#0d9488]/5 text-[#0d9488]"
                  : "border-transparent bg-[#eaf9f7] text-[#035a5a] hover:border-[#0d9488]/30"
              }`}
              onClick={() => setActiveGuide(guide.id)}
            >
              <span>{guide.title}</span>
              <span className="text-lg text-rose-400">♡</span>
            </button>
          ))}
        </div>
        {activeGuideContent && (
          <div className="rounded-3xl border border-[#c5f4ef] bg-white p-6 shadow-sm">
            <h4 className="text-xl font-semibold text-[#035a5a]">{activeGuideContent.title}</h4>
            <p className="mt-2 text-[#066360]">{activeGuideContent.summary}</p>
            <ul className="mt-4 list-disc space-y-2 pr-5 text-[#024443]">
              {activeGuideContent.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="rounded-[32px] border border-[#b3f1eb]/40 bg-white/80 p-6 shadow-[0_20px_45px_rgba(9,132,117,0.12)] backdrop-blur md:p-8">
        <div className="mb-6 flex items-center gap-3 text-[#035a5a]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9f4ef] text-2xl">📰</div>
          <div>
            <p className="text-sm text-[#05817d]">مقالات مخصصة لك</p>
            <h3 className="text-2xl font-semibold">اطلع على أحدث المقالات من الخبراء</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

