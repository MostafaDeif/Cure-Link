import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import { useTranslation } from "react-i18next";
// const { t, i18n } = useTranslation();
// t("name")}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            about: "About",
            services: "Services",
            articles: "Articles",
            login: "Login",
            profile: "Profile",
          },

          services: {
            select: "Select Service",
            implants: "Dental Implants",
          },
          footer: {
            quickLinks: "Quick Links",
            support: "Support",
            downloadApp: "Download App",
            terms: "Terms of Use",
            conferences: "Conferences",
            healthcare: "Healthcare",
            privacy: "Privacy Policy",
            rights: "2025. All rights reserved",
            FrequentlyAskedQuestions: "Frequently Asked Questions",
            orderNowPharmacy:
              "Order all your pharmacy needs easily; get your medicines from an online pharmacy in Egypt.",
          },
          days: {
            Friday: "Friday",
            Saturday: "Saturday",
          },
        },
      },
      ar: {
        translation: {

          nav: {
            home: "الرئيسية",
            about: "من نحن",
            services: "خدمات",
            articles: "المقالات",
            login: "تسجيل الدخول",
            profile: "الصفحة الشخصية",
          },

          services: {
            select: "اختر الخدمة",
          },
          footer: {
            quickLinks: "روابط سريعة",
            support: "الدعم والمساعدة",
            downloadApp: "حمل التطبيق",
            healthcare: "رعاية صحية",
            conferences: "المؤتمرات",
            terms: "شروط الاستخدام",
            privacy: "سياسات الخصوصية",
            rights: "2025. كل الحقوق محفوظة",
            FrequentlyAskedQuestions: "الأسئلة الشائعة",
            orderNowPharmacy:
              "اطلب الآن جميع احتياجاتك من الصيدلية بسهولة، اطلب أدويتك من صيدلية أون لاين في مصر.",
          },
          days: {
            Friday: "الجمعة",
            Saturday: "السبت",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
