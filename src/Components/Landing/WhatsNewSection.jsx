import React from "react";

const WhatsNewSection = () => {
  const cards = [
    {
      title: "المؤتمرات والمحاضرات المسجلة",
      description:
        "شاهد أحدث المؤتمرات الطبية والجلسات التخصصية المسجّلة متى شئت. تابع آخر المستجدات والأبحاث والممارسات المهنية دون الحاجة للحضور المباشر.",
      button: "مشاهدة المحاضرات",
    },
    {
      title: "المقالات والمحتوى الطبي",
      description:
        "تصفّح مقالات طبية موثوقة ومحتوى تعليمي مُعدّ بعناية للأطباء والممرضين والمستخدمين. استفد من مصادر مصنّفة حسب اهتماماتك ومستوى معرفتك.",
      button: "قراءة المقالات",
    },
    {
      title: "الفئات التعليمية",
      description:
        "استكشف المحتوى بحسب الفئة: أطباء، تمريض، أو مستخدمون. كل قسم يقدّم مواد مناسبة لتطوير المعرفة والدعم الصحي والتثقيف المستمر.",
      button: "استكشف الفئة الخاصة بك",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center pt-[100px] pb-[94px] bg-[#F5F9FA]">
      <h2
        className="font-[Alexandria] font-black text-[48px] md:text-[64px] text-[#191E15] text-center mb-[80px]"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        ما الجديد؟
      </h2>

      <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-[40px] px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group w-[370px] min-h-[520px] bg-white rounded-[24px] shadow-md flex flex-col items-center text-center overflow-hidden
                       transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                       hover:scale-[1.04] hover:shadow-2xl focus:scale-[1.04] focus:shadow-2xl
                       hover:bg-gradient-to-b hover:from-[#54BD95] hover:to-[#46b08a] focus:bg-gradient-to-b focus:from-[#54BD95] focus:to-[#46b08a]"
            data-aos="fade-up"
            data-aos-delay={index * 150 + 250}
            data-aos-duration="700"
          >
            <h3 className="font-[Alexandria] font-black text-[22px] text-[#191E15] mt-[28px] transition-colors duration-300 group-hover:text-white group-focus:text-white">
              {card.title}
            </h3>

            <div
              className="bg-[#F9FAFB] rounded-[14px] w-[330px] flex-1 mt-[22px] px-[28px] py-[30px]
                          flex flex-col items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                          group-hover:bg-[#f1fdf8] group-focus:bg-[#f1fdf8]"
            >
              <p className="font-[Alexandria] font-medium text-[18px] leading-[28px] text-[#777] text-center w-[250px] mb-[24px]">
                {card.description}
              </p>

              <button
                className="w-[240px] h-[58px] bg-white text-[#54BD95] font-[Alexandria] font-black text-[15px] leading-[30px] rounded-[18px]
                             transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                             group-hover:bg-[#54BD95] group-hover:text-white group-focus:bg-[#54BD95] group-focus:text-white"
              >
                {card.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsNewSection;
