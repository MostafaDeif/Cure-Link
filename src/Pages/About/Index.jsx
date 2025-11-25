import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heroOne from "../../assets/landingimg.png";
import heroTwo from "../../assets/med3.jpg";
import heroThree from "../../assets/nursingimg.png";
import {
  FiUsers,
  FiCalendar,
  FiFileText,
  FiActivity,
  FiShield,
  FiHeart,
  FiClock,
  FiStar,
} from "react-icons/fi";
import { LuPill } from "react-icons/lu";

export default function About() {
  const heroSlides = useMemo(() => [heroOne, heroTwo, heroThree], []);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const coreServices = [
    {
      title: "ربط المرضى بالأطباء",
      description: "تواصل مباشر مع الأطباء المتخصصين واستشارات فورية تدعم قرارك الصحي.",
      icon: <FiUsers />,
    },
    {
      title: "ملف طبي موحد",
      description: "جميع سجلاتك الطبية في منصة واحدة آمنة وسهلة الوصول من أي جهاز.",
      icon: <FiFileText />,
    },
    {
      title: "حجز المواعيد",
      description: "احجز موعدك مع أفضل الأطباء بكل سلاسة وفي أي وقت يناسب جدولك.",
      icon: <FiCalendar />,
    },
    {
      title: "الطلب من الصيدليات",
      description: "اطلب أدويتك من أقرب صيدلية وسيصل الدواء إلى باب منزلك في أسرع وقت.",
      icon: <LuPill />,
    },
    {
      title: "تتبع الأدوية",
      description: "تذكير بمواعيد الدواء ومتابعة خطط العلاج لضمان التزامك بالجرعات.",
      icon: <FiActivity />,
    },
    {
      title: "دعم شركات الدواء",
      description: "شراكات استراتيجية مع كبرى شركات الأدوية لتقديم خدمات أكثر جودة.",
      icon: <FiStar />,
    },
  ];

  const whyUs = [
    { title: "رعاية شاملة", description: "كل ما تحتاجه من خدمات صحية في مكان واحد متكامل.", icon: <FiHeart /> },
    { title: "سرعة وكفاءة", description: "خدمات فورية بدون انتظار أو إجراءات معقدة.", icon: <FiActivity /> },
    { title: "أمان وخصوصية", description: "نحمي بياناتك الطبية بأعلى معايير الأمان والتشفير.", icon: <FiShield /> },
    { title: "سهولة الاستخدام", description: "واجهة عربية بسيطة ومهيأة للجميع.", icon: <FiFileText /> },
    { title: "متاح 24/7", description: "خدماتنا ترافقك طوال اليوم وفي أي وقت.", icon: <FiClock /> },
    { title: "جودة مضمونة", description: "نتعاون مع أفضل الأطباء والمؤسسات الصحية.", icon: <FiStar /> },
  ];

  const testimonials = [
    {
      quote: "المنصة متكاملة وتوفر لنا الوقت والجهد في إدارة الطلبات والتواصل مع المرضى.",
      name: "نورا عبدالرحمن",
      role: "صيدلانية",
      rating: 5,
    },
    {
      quote: "التطبيق ممتاز ويساعدني في التواصل مع مرضاي بشكل أفضل ومتابعة حالاتهم بسهولة.",
      name: "د. خالد سعيد",
      role: "طبيب باطنة",
      rating: 5,
    },
    {
      quote: "منصة رائعة سهلت عليّ حجز المواعيد ومتابعة حالتي الصحية. أنصح بها الجميع!",
      name: "فاطمة أحمد",
      role: "مريضة",
      rating: 5,
    },
  ];

  const stats = [
    { value: "+250", label: "طبيب متخصص" },
    { value: "+120", label: "صيدلية معتمدة" },
    { value: "+45K", label: "مستخدم نشط" },
    { value: "24/7", label: "دعم فوري" },
  ];

  return (
    <main dir="rtl" className="bg-gradient-to-b from-sky-50 via-white to-white text-[#0f2940]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d4e78]">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundImage: `url(${heroSlides[activeSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/50 via-sky-800/40 to-sky-600/30" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl px-6 md:px-10 lg:px-14 text-white text-center">
          <p className="text-2xl md:text-3xl font-semibold tracking-wide mb-6">منصة Cure Link</p>
          <h1 className="text-4xl md:text-6xl font-black leading-snug mb-6">
            حيث تلتقي الرعاية الصحية بالذكاء
          </h1>
          <p className="text-lg md:text-xl text-sky-50/90 leading-relaxed mb-10">
            نربط بين المرضى والأطباء والصيدليات  في منصة ذكية تقدم تجربة صحية شاملة ومتكاملة
            بكل سهولة وأمان.
          </p>
          <Link
            to="/services"
            className="inline-block px-10 py-3 rounded-full text-lg font-semibold bg-white/90 text-sky-700 shadow-lg hover:bg-white transition"
          >
            ابدأ الآن
          </Link>

          <div className="mt-10 flex items-center justify-center gap-3">
            {heroSlides.map((_, idx) => (
              <button
                type="button"
                key={`hero-dot-${idx}`}
                className={`h-3 w-3 rounded-full transition-all ${activeSlide === idx ? "bg-white scale-110" : "bg-white/50"}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-16 lg:px-28 py-20 bg-sky-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">من نحن</h2>
          <p className="text-lg text-slate-600 leading-9">
            <span className="text-sky-700 font-semibold">Cure Link</span> هي منصة رعاية صحية ذكية ومتكاملة نسعى
            من خلالها لإحداث نقلة نوعية في طريقة الحصول على الخدمات الطبية في العالم العربي. نوفر تجربة صحية
            سهلة، سريعة وآمنة تجمع جميع الأطراف المعنية بالصحة في مكان واحد لتقليل التشتت وتحسين التنسيق.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-3xl p-8 shadow-lg shadow-sky-100 border border-sky-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl">
                👁️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sky-900">رؤيتنا</h3>
                <span className="block w-14 h-1 bg-sky-400 rounded-full mt-2" />
              </div>
            </div>
            <p className="text-slate-600 leading-8">
              أن نصبح المنصة الرائدة في مجال الرعاية الصحية الرقمية في العالم العربي، حيث يمكن لكل شخص الوصول إلى خدمات طبية
              عالية الجودة بكل سهولة ويسر في أي وقت ومن أي مكان.
            </p>
          </article>

          <article className="bg-white rounded-3xl p-8 shadow-lg shadow-sky-100 border border-sky-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl">
                🎯
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sky-900">مهمتنا</h3>
                <span className="block w-14 h-1 bg-sky-400 rounded-full mt-2" />
              </div>
            </div>
            <p className="text-slate-600 leading-8">
              تسهيل الوصول إلى الرعاية الصحية للجميع عبر منصة ذكية تجمع الأطباء والمرضى والصيدليات وشركات الأدوية في نظام
              متكامل يوفر الوقت والجهد ويضمن جودة الخدمة.
            </p>
          </article>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl py-6 px-4 text-center border border-sky-100 shadow-inner shadow-white"
            >
              <p className="text-3xl font-extrabold text-sky-700 mb-2">{item.value}</p>
              <p className="text-slate-500 text-sm tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-3">خدماتنا الرئيسية</h2>
          <p className="text-slate-600 text-lg">نقدم مجموعة متكاملة من الخدمات الصحية الذكية لتلبية جميع احتياجاتك الطبية.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <article
              key={service.title}
              className="group bg-gradient-to-b from-sky-50 to-white rounded-3xl p-7 border border-sky-100 shadow-lg shadow-sky-50 hover:-translate-y-1 hover:shadow-2xl transition"
            >
              <div className="h-14 w-14 rounded-2xl bg-white text-sky-600 text-2xl flex items-center justify-center shadow-md shadow-sky-100 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-sky-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-7">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-20 bg-sky-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-3">لماذا نحن؟</h2>
          <p className="text-slate-600 text-lg">نقدم لك تجربة صحية فريدة تجمع بين التكنولوجيا والرعاية الإنسانية.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {whyUs.map((item) => (
            <article key={item.title} className="bg-white rounded-3xl p-6 shadow-lg shadow-sky-100 border border-sky-100">
              <div className="flex items-center gap-3 mb-4 text-sky-600 text-2xl">
                <span className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center">{item.icon}</span>
                <h3 className="text-xl font-semibold text-sky-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 leading-7">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-20 bg-[#128ADD]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">آراء المستخدمين</h2>
          <div className="w-20 h-1 bg-white/80 mx-auto mb-4 rounded-full"></div>
          <p className="text-white/90 text-lg">اكتشف تجارب مستخدمينا مع Cure Link</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((item) => (
            <article key={item.name} className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl text-[#128ADD]/20 font-serif leading-none">"</span>
              </div>
              <p className="text-slate-700 leading-8 mb-6 text-center min-h-[120px] flex items-center">{item.quote}</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                ))}
              </div>
              <div className="text-center border-t border-sky-100 pt-4">
                <p className="font-bold text-[#128ADD] text-lg mb-1">{item.name}</p>
                <p className="text-sm text-[#128ADD]/70 font-medium">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
