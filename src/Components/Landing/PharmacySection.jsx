import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";

const PharmacySection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center w-full px-4 lg:px-32 pt-24 overflow-hidden bg-[#f5f7fa]"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <p className="font-[Alexandria] font-bold text-2xl sm:text-3xl lg:text-[36px] leading-snug text-[#10204D] max-w-[1200px]">
        نتعاون مع أكثر من 1000 صيدلية لخدمة أكبر عدد من المستخدمين
      </p>

      {/* logos && Slider */}
      <div className="relative w-full lg:w-[503px] h-12 mt-12 overflow-hidden opacity-80 mx-auto">
        <div className="flex justify-center animate-slide gap-8">
          {[logo4, logo3, logo2, logo1, logo4, logo3, logo2, logo1].map(
            (logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-12 hover:scale-110 transition-transform duration-300"
              />
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PharmacySection;
