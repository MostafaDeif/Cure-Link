import React from "react";
import medicineimg from "../../assets/medecineimg.png";

const ServicesSection = () => {
  return (
    <section className="w-full bg-[#F5F9FA] flex flex-col items-center pt-20 sm:pt-24 lg:pt-32">
      
      {/* Title and Curve */}
      <div className="text-center mb-16 w-full flex flex-col items-center max-w-[1445px]">
        <h2
          className="font-[Alexandria] font-black text-[64px] leading-[90px] text-[#0D6EFD] tracking-normal w-[265px] h-[90px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          خدماتنا
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="380"
          height="21"
          viewBox="0 0 380 21"
          fill="none"
          className="mt-[14px]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <path
            d="M0 18 C95 0, 285 0, 380 18"
            stroke="#0D6EFD"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </div>

      {/* White Section */}
      <div className="bg-white w-full flex justify-center min-h-[537px]">
        <div className="flex flex-col lg:flex-row items-start w-full max-w-[1445px] min-h-[537px] px-4 sm:px-8">

          {/* Image */}
          <div
            className="flex-1 lg:flex-[666px] w-full min-h-[250px] lg:min-h-[369px] rounded-[30px] overflow-hidden mt-[53px] hover:scale-105 transition-transform duration-500"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <img
              src={medicineimg}
              alt="medicines"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div
            className="flex flex-col justify-start w-full lg:w-[458px] text-center lg:text-right mt-[53px] lg:mt-[53px] lg:ml-[137px] lg:mr-[101px]"
          >
            <h3
              className="font-[Alexandria] font-bold text-[50px] leading-[61px] text-black"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              الأدوية
            </h3>
            <p
              className="font-[Alexandria] font-normal text-[24px] leading-[32px] text-[#475373] mt-[40px]"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              اطلب أدويتك بسهولة مع خدمة التوصيل إلى المنزل. يمكنك رفع الروشتة أو إدخال اسم الدواء مباشرة، مع إمكانية التواصل مع صيدلي في حال احتجت استشارة أو بدائل
            </p>
            <button
              className="bg-[#0D6EFD] text-white font-[Alexandria] font-black text-[20px] leading-none rounded-[40px] w-full lg:w-[476px] h-[64px] mt-[40px] hover:bg-[#2563EB] hover:scale-105 transition-transform duration-300 mx-auto lg:mx-0"
              data-aos="fade-left"
              data-aos-delay="700"
            >
              اطلب الدواء الآن
            </button>
          </div>
        </div>
      </div>
{/* Colored Spacer */}
<div
  className="
    w-full bg-[#F5F9FA]
    mt-10 sm:mt-14 lg:mt-[60px]
    h-[40px] sm:h-[60px] md:h-[70px] lg:h-[80px]
  "
></div>

    </section>
  );
};

export default ServicesSection;
