import React from "react";
const WhatsNewSection = () => {
  return (
    <section className="w-full flex flex-col items-center pt-[100px] pb-[94px] bg-[#F5F9FA]">
      <h2
        className="font-[Alexandria] font-black text-[48px] md:text-[64px] text-[#191E15] text-center mb-[80px]"
        data-aos="fade-up"
      >
        ما الجديد؟
      </h2>

      {/* Cards*/}
      <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-[40px] px-4">
        {/* Frist Card*/}
        <div
          className="group w-[374px] h-[514px] bg-white rounded-[30px] shadow-lg flex flex-col items-center text-center pt-[31px] px-[32px] transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04] hover:brightness-105 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="w-[342px] h-[58px] mb-[40px]">
            <h3 className="font-[Alexandria] font-black text-[24px] text-[#191E15]">
              المؤتمرات والمحاضرات المسجلة
            </h3>
          </div>
          <div className="w-[334px] h-[365px] bg-[#F9FAFB] rounded-[10px] flex flex-col items-center justify-between px-[32px] pt-[33px] pb-[33px] gap-[10px]">
            <p className="w-[251px] font-[Alexandria] font-medium text-[20px] leading-[27px] text-[#A6A6A6] text-center">
              شاهد أحدث المؤتمرات الطبية والجلسات التخصصية المسجّلة متى شئت.
              تابع آخر المستجدات والأبحاث والممارسات المهنية دون الحاجة للحضور
              المباشر.
            </p>
            <button className="w-[260px] h-[64px] bg-white text-[#54BD95] font-[Alexandria] font-black text-[16px] leading-[30px] rounded-[20px] transition-all duration-500 ease-in-out group-hover:bg-[#54BD95] group-hover:text-white">
              مشاهدة المحاضرات
            </button>
          </div>
        </div>

        {/* Second card*/}
        <div
          className="group relative w-[374px] h-[548px] bg-[#54BD95] rounded-[20px] flex flex-col items-center text-center shadow-md transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04] hover:brightness-105 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="font-[Alexandria] font-black text-[24px] leading-[100%] text-center text-white w-[240px] h-[58px] mt-[21px]">
            المقالات والمحتوى الطبي
          </h3>
          <div className="bg-white rounded-[10px] w-[334px] h-[369px] flex flex-col items-center text-center mt-[53px] pt-[34px] px-[32px]">
            <p className="font-[Alexandria] font-medium text-[20px] leading-[27px] text-[#A6A6A6] text-center w-[251px] mb-[50px]">
              تصفّح مقالات طبية موثوقة ومحتوى تعليمي مُعدّ بعناية للأطباء
              والممرضين والمستخدمين. استفد من مصادر مصنّفة حسب اهتماماتك ومستوى
              معرفتك.
            </p>
            <button className="w-[260px] h-[62px] bg-[#54BD95] text-white font-[Alexandria] font-black text-[16px] leading-[30px] rounded-[20px] transition-all duration-500 ease-in-out group-hover:bg-[#3ea87f]">
              قراءة المقالات
            </button>
          </div>
        </div>

        {/* Third Card */}
        <div
          className="group w-[374px] h-[514px] bg-white rounded-[20px] shadow-md flex flex-col items-center text-center transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04] hover:brightness-105 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h3 className="font-[Alexandria] font-black text-[24px] leading-[100%] text-[#191E15] text-center mt-[22px] mx-[32px]">
            الفئات التعليمية
          </h3>
          <div className="bg-[#F9FAFB] rounded-[10px] w-[334px] h-[365px] mt-[14px] mx-[20px] px-[32px] pb-[33px] flex flex-col items-center justify-between">
            <p className="font-[Alexandria] font-medium text-[20px] leading-[27px] text-[#A6A6A6] text-center w-[251px] mt-[53.5px] mb-[32px]">
              استكشف المحتوى بحسب الفئة: أطباء، تمريض، أو مستخدمون. كل قسم يقدّم
              مواد مناسبة لتطوير المعرفة والدعم الصحي والتثقيف المستمر.
            </p>
            <button className="w-[260px] h-[64px] bg-white text-[#54BD95] font-[Alexandria] font-black text-[16px] leading-[30px] rounded-[20px] transition-all duration-500 ease-in-out group-hover:bg-[#54BD95] group-hover:text-white">
              استكشف الفئة الخاصة بك
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
