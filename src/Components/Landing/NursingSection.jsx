import React from "react";
import nursingimg from "../../assets/nursingimg.png";

const NursingSection = () => {
  return (
    <section className="w-full bg-white flex justify-center py-[53px] px-4 lg:py-[119px]">
      <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start justify-between max-w-[1262px] w-full gap-[60px] lg:gap-[89px] mx-auto">

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full lg:w-[507px]">
          <h2
            className="font-[Alexandria] font-bold text-[32px] sm:text-[40px] lg:text-[50px] leading-[61px] text-[#191E15] mt-[94px] lg:mt-[53px]"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            التمريض المنزلي
          </h2>

          <p
            className="font-[Alexandria] font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[32px] text-[#475373] mt-[40px] lg:mt-[62px] max-w-[511px]"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            احصل على رعاية تمريضية مهنية في منزلك من مختصين معتمدين. سواء كنت
            بحاجة إلى متابعة ما بعد العمليات، رعاية كبار السن، الحقن، تغيير
            الضمادات أو المراقبة الصحية، نوفر زيارات آمنة وموثوقة حسب حالتك
            واحتياجك
          </p>

          <button
            className="bg-[#16BC88] text-white font-[Alexandria] font-black text-[18px] sm:text-[20px] leading-none rounded-[40px] w-full sm:w-[400px] lg:w-[495px] h-[56px] sm:h-[60px] lg:h-[64px] mt-[40px] lg:mt-[62px]"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            احجز ممرض منزلي
          </button>
        </div>

        {/* Image */}
        <div
          className="flex justify-center lg:justify-start items-center overflow-hidden rounded-[30px] w-full lg:w-[666px] min-h-[250px] sm:min-h-[300px] lg:min-h-[369px]"
          data-aos="fade-right"
          data-aos-delay="800"
        >
          <img
            src={nursingimg}
            alt="nursing img"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 rounded-[30px]"
          />
        </div>
      </div>
    </section>
  );
};

export default NursingSection;
