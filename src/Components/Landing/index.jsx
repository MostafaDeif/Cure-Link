import React from "react";
import HeroSection from "./HeroSection";
import PharmacySection from "./PharmacySection";
import ServiceSection from "./ServiceSection";
import NursingSection from "./NursingSection";
import WhatsNewSection from "./WhatsNewSection";
import "./index.css";

export default function Landing() {
  return (
    <div className="overflow-x-hidden max-w-full no-scrollbar">
      <HeroSection />
      <PharmacySection />
      <ServiceSection />
      <NursingSection />
      <WhatsNewSection />
    </div>
  );
}
