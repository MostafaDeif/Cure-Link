import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../Context/LanguageContext";

import LogoBadge from '../../assets/ourLogo.jpeg';
import GooglePlayBadge from '../../assets/Group.png';
import AppStoreBadge from '../../assets/katman2.png';
import AppGalleryBadge from '../../assets/Badges.png';

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaAmbulance } from 'react-icons/fa';
import './index.css';

const Footer = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  return (
    <footer
      className="bg-[#128ADD] text-white pt-16 pb-6 font-sans"
      dir={language === "ar" ? "rtl" : "ltr"}
    >

      {/* المحتوى الداخلي */}
      <div className={`max-w-[1200px] mx-auto grid md:grid-cols-4 grid-cols-1 gap-10 px-6`}>

        {/* 1. شعار وتفاصيل */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-xl font-bold tracking-wide">CureLink</span>
            <img src={LogoBadge} alt="CureLink logo" className="w-8 h-8 object-contain" />
          </div>

          <p className="text-sm opacity-90 mb-4 leading-relaxed max-w-[260px]">
            {t("footer.orderNowPharmacy")}
          </p>

          {/* سوشيال */}
          <div className="flex gap-3 mt-2 items-center">
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaFacebookF size={15} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaInstagram size={15} />
            </a>
            <a href="https://www.linkedin.com/groups/16200018" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaLinkedinIn size={15} />
            </a>
            <a
              href="tel:123"
              className="w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md transition-transform duration-300 transform animate-pulse-hover"
            >
              <FaAmbulance size={15} />
            </a>
          </div>
        </div>

        {/* 2. روابط سريعة */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-3 border-b border-white/40 pb-1 w-fit">
            {t("footer.quickLinks")}
          </h4>

          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">{t("nav.services")}</a></li>
            <li><a href="#" className="hover:underline">{t("footer.healthcare")}</a></li>
            <li><a href="#" className="hover:underline">{t("footer.conferences")}</a></li>
            <li><a href="#" className="hover:underline">{t("nav.about")}</a></li>
          </ul>
        </div>

        {/* 3. الدعم والمساعدة */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-3 border-b border-white/40 pb-1 w-fit">
            {t("footer.support")}
          </h4>

          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">{t("footer.support")}</a></li>
            <li><a href="#" className="hover:underline">{t("footer.FrequentlyAskedQuestions")}</a></li>
          </ul>
        </div>

        {/* 4. تحميل التطبيق */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-3 border-b border-white/40 pb-1 w-fit">
            {t("footer.downloadApp")}
          </h4>

          <div className="flex flex-col gap-3">
            <img src={AppStoreBadge} alt="App Store" className="w-32 cursor-pointer" />
            <img src={AppGalleryBadge} alt="App Gallery" className="w-32 cursor-pointer" />
            <img src={GooglePlayBadge} alt="Google Play" className="w-32 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* البار السفلي */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-5 border-t border-white/30 flex flex-col md:flex-row justify-between items-center text-sm px-6 gap-y-3">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
          <span>{t("footer.rights")}</span>
        </div>

        <div className="flex items-center gap-2">
          <a href="#" className="hover:underline">{t("footer.terms")}</a>
          <span>|</span>
          <a href="#" className="hover:underline">{t("footer.privacy")}</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
