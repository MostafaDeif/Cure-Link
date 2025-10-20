import React from "react";
import HeroSection from "./HeroSection";
import PharmacySection from "./PharmacySection";
import ServiceSection from "./ServiceSection";
import NursingSection from "./NursingSection";
import WhatsNewSection from "./WhatsNewSection";

export default function Landing() {
  return (
    <>
      <HeroSection />
      <PharmacySection />
      <ServiceSection />
      <NursingSection />
      <WhatsNewSection />
    </>
  );
}
