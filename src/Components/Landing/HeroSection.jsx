import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import landingimg from "../../assets/landingimg.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section
      className="w-full flex flex-col md:flex-row-reverse items-center md:items-start justify-between 
                 px-6 md:px-[64px] pt-[100px] md:pt-[147px] bg-[#F5F9FA] overflow-hidden"
      data-aos="fade-up"
    >
      {/* Text Content */}
      <div
        className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-[723px] 
                   mt-0 md:mt-0 mb-[50px] md:mb-[0]"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        <h1 className="font-[Alexandria] font-black text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[120%] text-[#0F172A]">
          منصتك الطبية المتكاملة في مكان واحد
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="18"
          viewBox="0 0 479 26"
          fill="none"
          className="mt-[16px] md:mt-[21px] w-[250px] md:w-[479px]"
        >
          <path
            d="M0 20 C120 0, 360 0, 479 20"
            stroke="#128ADD"
            strokeWidth="8"
            fill="none"
          />
        </svg>

        <p className="font-[Alexandria] font-medium text-[16px] sm:text-[18px] md:text-[20px] leading-[180%] text-[#334155] mt-[30px] md:mt-[51px] w-full md:w-[723px] h-[120px] px-2 md:px-0">
          نوفر لك طلب الأدوية بسهولة، وخدمات التمريض المنزلي، إضافةً إلى محتوى
          طبي وتعليمي يشمل محاضرات، مؤتمرات ومقالات مخصّصة للأطباء والممرضين
          والمستخدمين. كل ما تحتاجه في مجال الرعاية الصحية بين يديك.
        </p>

        <Link
          to="/services"
          className="
    mt-[40px] md:mt-[49px]
    w-[240px] md:w-[317px]
    h-[56px] md:h-[62px]
    px-[24px] py-[16px]
    bg-[#128ADD] text-white
    font-[Alexandria] font-black
    text-[16px] md:text-[18px]
    rounded-[40px]
    flex justify-center items-center
    shadow-md
    cursor-pointer
    transition-transform duration-500
    hover:opacity-90 hover:scale-105
  "
        >
          تصفح الخدمات
        </Link>
      </div>

      {/* Image */}
      <div
        className="flex justify-center items-center md:items-start md:mr-[96px] md:ml-0 w-full md:w-[529px] h-auto"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <img
          src={landingimg}
          alt="Doctors"
          className="w-full h-auto rounded-[20px] object-cover 
                     transform transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.05]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
