import React from "react";
import doctorimg from "../../assets/Doctorsection.png";
import { Link } from 'react-router-dom';

const DoctorSection = () => {
  return (
    <section className="w-full bg-white flex justify-center py-[53px] px-4 lg:py-[119px]">
      <div
        className="flex flex-col lg:flex-row-reverse items-center lg:items-start justify-between max-w-[1262px] w-full gap-[60px] lg:gap-[89px] mx-auto"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-easing="ease-out-sine"
      >
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full lg:w-[507px]">
          <h2
            className="font-[Alexandria] font-bold text-[32px] sm:text-[40px] lg:text-[50px] leading-[61px] text-[#191E15] mt-[94px] lg:mt-[53px]"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="600"
            data-aos-easing="ease-out-sine"
          >
            ابحث عن دكتورك بسهولة
          </h2>

          <p
            className="font-[Alexandria] font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[32px] text-[#475373] mt-[40px] lg:mt-[62px] max-w-[511px]"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="700"
            data-aos-easing="ease-out-sine"
          >
            اكتشف أفضل الدكاترة القريبين منك واحجز موعدك في ثواني.
            تصفّح التخصصات، شوف تقييمات المرضى، واختار الموعد اللي يناسبك بكل سهولة.
            كل الخدمات الطبية في مكان واحد — بسرعة وأمان.
          </p>
          <Link
            to="/find_doctor"
            className="
    bg-[#16BC88] text-white
    font-[Alexandria] font-black text-[18px] sm:text-[20px] leading-none
    rounded-[40px]
    w-full sm:w-[400px] lg:w-[495px]
    h-[56px] sm:h-[60px] lg:h-[64px]
    mt-[40px] lg:mt-[62px]
    flex justify-center items-center
    cursor-pointer
    transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
    hover:opacity-95 hover:scale-[1.04] hover:shadow-lg
    mx-auto
  "
            data-aos="fade-left"
            data-aos-delay="250"
            data-aos-duration="750"
            data-aos-easing="ease-out-sine"
          >
            اعثر على دكتور الآن
          </Link>

        </div>

        {/* Image */}
        <div
          className="flex justify-center lg:justify-start items-center rounded-[30px] w-full lg:w-[666px] min-h-[250px] sm:min-h-[300px] lg:min-h-[369px]"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-duration="750"
          data-aos-easing="ease-out-sine"
        >
          <img
            src={doctorimg}
            alt="doctor img"
            className="w-full h-full object-cover rounded-[30px]
              transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:scale-[1.04] hover:-translate-x-[0.5%] hover:-translate-y-[0.5%]"
          />
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;