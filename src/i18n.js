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
          
          landing: {
            hero: {
              title: "Your all-in-one medical platform in one place",
              subtitle:
                "Order medicines easily, get home nursing services, and access medical content including lectures, conferences and articles tailored for doctors, nurses and users.",
              button: "Browse Services",
            },
            pharmacy: {
              partners: "We partner with over 1000 pharmacies to serve more users",
            },
            servicesSection: {
              title: "Medicines",
              paragraph:
                "Order your medicines easily with home delivery. Upload a prescription or enter the medicine name directly and consult a pharmacist when needed.",
              button: "Order Medicine Now",
            },
            nursingSection: {
              title: "Home Nursing",
              paragraph:
                "Get professional nursing care at home from certified specialists for post-op care, elderly care, injections, dressing changes and health monitoring.",
              button: "Book A Nurse",
            },
            doctorSection: {
              title: "Find Your Doctor Easily",
              paragraph:
                "Discover top nearby doctors and book appointments in seconds. Browse specialties, read reviews and choose the time that suits you.",
              button: "Find A Doctor",
            },
            whatsnew: {
              title: "What's New?",
              cards: [
                {
                  title: "Recorded Conferences & Lectures",
                  description:
                    "Watch the latest medical conferences and specialty sessions on demand. Stay updated with research and professional practices without attending in person.",
                  button: "Watch Lectures",
                  link: "/Articles",
                },
                {
                  title: "Articles & Medical Content",
                  description:
                    "Browse reliable medical articles and educational content prepared for doctors, nurses and users. Find resources based on your interests and level.",
                  button: "Read Articles",
                  link: "/Articles",
                },
                {
                  title: "Educational Categories",
                  description:
                    "Explore content by category: Doctors, Nursing, or Users. Each section offers materials for knowledge development and continuous education.",
                  button: "Explore Your Category",
                  link: "/Articles",
                },
              ],
            },
          },
          findNurse: {
            title: "Your Trusted Nurses",
            searchPlaceholder: "Search nurses by name, city...",
            allGender: "All",
            male: "Male",
            female: "Female",
            categories: {
              all: "All",
              homeInjection: "Home Injection",
              bloodPressure: "Blood Pressure",
              postnatalCare: "Postnatal Care",
              elderlyCare: "Elderly Care",
              woundDressing: "Wound Dressing",
            },
            highlight: "Early Protection for Your Family Health",
            highlightDesc: "Book a nurse now for quick and trusted care at home.",
            topNurses: "Top Nurses",
            showAll: "Show All",
            bookButton: "Book",
            noResults: "No nurses found matching your criteria",
          },
          days: {
            Friday: "Friday",
            Saturday: "Saturday",
          },
          user: {
            profile: {
              title: "Profile Information",
              nameLabel: "Name",
            },
            orders: {
              title: "My Orders",
              details: "Order details:",
              lastOrders: "Recent Orders",
              itemsLabel: "Order Items",
              status: {
                active: "Active",
                completed: "Completed",
                cancelled: "Cancelled",
              },
            },
            visits: {
              title: "Home Visits",
              nurseLabel: "Nurse:",
              status: {
                pending: "Pending",
                done: "Done",
                rejected: "Rejected",
              },
            },
            favorites: {
              title: "Favorites",
              empty: "No favorite products yet.",
              addedToCart: "{{name}} added to cart",
            },
            settings: {
              personalInfo: "Personal Information",
              firstName: "First Name",
              lastName: "Last Name",
              saveChanges: "Save Changes",
              healthInfo: "Health Information",
              height: "Height",
              weight: "Weight",
              selectBlood: "Select blood type",
              unknown: "Don't know",
            },
            sidebar: {
              profile: "Profile",
              visits: "Visits",
              orders: "Orders",
              favorites: "Favorites",
              settings: "Settings",
              logout: "Logout",
            },
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
          landing: {
            hero: {
              title: "منصتك الطبية المتكاملة في مكان واحد",
              subtitle:
                "نوفر لك طلب الأدوية بسهولة، وخدمات التمريض المنزلي، إضافةً إلى محتوى طبي وتعليمي يشمل محاضرات، مؤتمرات ومقالات مخصّصة للأطباء والممرضين والمستخدمين.",
              button: "تصفح الخدمات",
            },
            pharmacy: {
              partners: "نتعاون مع أكثر من 1000 صيدلية لخدمة أكبر عدد من المستخدمين",
            },
            servicesSection: {
              title: "الأدوية",
              paragraph:
                "اطلب أدويتك بسهولة مع خدمة التوصيل إلى المنزل. يمكنك رفع الروشتة أو إدخال اسم الدواء مباشرة، مع إمكانية التواصل مع صيدلي في حال احتجت استشارة أو بدائل",
              button: "اطلب الدواء الآن",
            },
            nursingSection: {
              title: "التمريض المنزلي",
              paragraph:
                "احصل على رعاية تمريضية مهنية في منزلك من مختصين معتمدين. سواء كنت بحاجة إلى متابعة ما بعد العمليات، رعاية كبار السن، الحقن، تغيير الضمادات أو المراقبة الصحية، نوفر زيارات آمنة وموثوقة حسب حالتك واحتياجك",
              button: "احجز ممرض منزلي",
            },
            doctorSection: {
              title: "ابحث عن دكتورك بسهولة",
              paragraph:
                "اكتشف أفضل الدكاترة القريبين منك واحجز موعدك في ثواني تصفّح التخصصات، شوف تقييمات المرضى، واختار الموعد اللي يناسبك بكل سهولة.",
              button: "ابحث عن دكتور الآن",
            },
            whatsnew: {
              title: "ما الجديد؟",
              cards: [
                {
                  title: "المؤتمرات والمحاضرات المسجلة",
                  description:
                    "شاهد أحدث المؤتمرات الطبية والجلسات التخصصية المسجّلة متى شئت. تابع آخر المستجدات والأبحاث والممارسات المهنية دون الحاجة للحضور المباشر",
                  button: "مشاهدة المحاضرات",
                  link: "/Articles",
                },
                {
                  title: "المقالات والمحتوى الطبي",
                  description:
                    "تصفّح مقالات طبية موثوقة ومحتوى تعليمي مُعدّ بعناية للأطباء والممرضين والمستخدمين. استفد من مصادر مصنّفة حسب اهتماماتك ومستوى معرفتك",
                  button: "قراءة المقالات",
                  link: "/Articles",
                },
                {
                  title: "الفئات التعليمية",
                  description:
                    "استكشف المحتوى بحسب الفئة: أطباء، تمريض، أو مستخدمون. كل قسم يقدّم مواد مناسبة لتطوير المعرفة والدعم الصحي والتثقيف المستمر",
                  button: "استكشف الفئة الخاصة بك",
                  link: "/Articles",
                },
              ],
            }
          },
          findNurse: {
            title: "ممرّضوك الموثوقون",
            searchPlaceholder: "ابحث عن الممرضين حسب الاسم أو المدينة...",
            allGender: "الكل",
            male: "ذكر",
            female: "أنثى",
            categories: {
              all: "الكل",
              homeInjection: "حقن منزلية",
              bloodPressure: "قياس ضغط الدم",
              postnatalCare: "رعاية ما بعد الولادة",
              elderlyCare: "رعاية كبار السن",
              woundDressing: "تغيير الضمادات",
            },
            highlight: "حماية مبكرة لصحة عائلتك",
            highlightDesc: "احجز ممرضة الآن للحصول على رعاية سريعة وموثوقة في المنزل.",
            topNurses: "أفضل الممرضات",
            showAll: "عرض الكل",
            bookButton: "احجز",
            noResults: "لم يتم العثور على ممرضات تطابق معايير البحث",
          },
          days: {
            Friday: "الجمعة",
            Saturday: "السبت",
          },
          user: {
            profile: {
              title: "المعلومات الشخصية",
              nameLabel: "الاسم",
            },
            orders: {
              title: "طلباتي",
              details: "تفاصيل طلب:",
              lastOrders: "آخر الطلبات",
              itemsLabel: "محتويات الطلب",
              status: {
                active: "قيد التنفيذ",
                completed: "مكتمل",
                cancelled: "ملغي",
              },
            },
            visits: {
              title: "الزيارات المنزلية",
              nurseLabel: "الممرض:",
              status: {
                pending: "قيد الانتظار",
                done: "تمت",
                rejected: "مرفوضة",
              },
            },
            favorites: {
              title: "المفضلة",
              empty: "لا توجد منتجات في المفضلة حالياً.",
              addedToCart: "{{name}} تمت إضافته إلى السلة",
            },
            settings: {
              personalInfo: "المعلومات الشخصية",
              firstName: "الاسم الأول",
              lastName: "اسم العائلة",
              saveChanges: "حفظ التغييرات",
              healthInfo: "المعلومات الصحية",
              height: "الطول",
              weight: "الوزن",
              selectBlood: "اختر فصيلة الدم",
              unknown: "لا أعرف",
            },
            sidebar: {
              profile: "الملف الشخصي",
              visits: "الزيارات المنزلية",
              orders: "طلباتي",
              favorites: "المفضلة",
              settings: "الإعدادات",
              logout: "تسجيل الخروج",
            },
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
