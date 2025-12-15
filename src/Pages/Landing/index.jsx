import React from "react";
import HeroSection from "./HeroSection";
import PharmacySection from "./PharmacySection";
import ServiceSection from "./ServiceSection";
import NursingSection from "./NursingSection";
import DoctorSection from "./DoctorSection";
import WhatsNewSection from "./WhatsNewSection";
import "./index.css";

export default function Landing() {
  return (
    <div className="overflow-x-hidden max-w-full no-scrollbar">
      <HeroSection />
      <PharmacySection />
      <ServiceSection />
      <div className="w-full bg-[#F5F9FA] mt-10 sm:mt-14 lg:mt-[60px] h-[40px] sm:h-[60px] md:h-[70px] lg:h-[80px]"></div>
      <NursingSection />
      <div className="w-full bg-[#F5F9FA] mt-10 sm:mt-14 lg:mt-[60px] h-[40px] sm:h-[60px] md:h-[70px] lg:h-[80px]"></div>
      <DoctorSection />
      <WhatsNewSection />
    </div>
  );
}
