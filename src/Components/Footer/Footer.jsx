import React from 'react';
import LogoBadge from '../../assets/ourLogo.jpeg';        
import GooglePlayBadge from '../../assets/Group.png'; 
import AppStoreBadge from '../../assets/Katman2.png'; 
import AppGalleryBadge from '../../assets/Badges.png'; 
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaAmbulance } from 'react-icons/fa';
import './index.css'; // ملف CSS مخصص للحركة

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-[#128ADD] text-white pt-16 pb-6 font-sans">

      {/* المحتوى الداخلي: الترتيب من اليمين لليسار: الشعار - روابط سريعة - دعم ومساعدة - تحميل التطبيق */}
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-x-10 gap-y-12 px-6">

        {/* 1. شعار وتفاصيل + سوشيال (أقصى اليمين) */}
        <div className="flex flex-col flex-1 min-w-[250px] text-right">
          <div className="flex items-center justify-end gap-2 mb-4 ml-7">
            <img src={LogoBadge} alt="CureLink logo" className="w-8 h-8 object-contain"/>
            <span className="text-xl font-bold tracking-wide">CureLink</span>
          </div>

          <p className="text-sm opacity-90 mb-4 leading-relaxed">
            اطلب الآن جميع احتياجاتك من الصيدلية بسهولة، اطلب أدويتك من صيدلية أون لاين في مصر.
          </p>

          {/* أيقونات السوشيال تحت الشعار + أيقونة الإسعاف */}
          <div className="flex gap-3 mt-2 ml-5 justify-end items-center">
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaFacebookF size={15} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaInstagram size={15} />
            </a>
            <a href="https://www.linkedin.com/groups/16200018" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-white text-[#128ADD] rounded-full shadow-md hover:scale-110 transition-transform duration-200">
              <FaLinkedinIn size={15} />
            </a>
            <a
              href="tel:123"
              className="w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md transition-transform duration-300 transform ml-4 animate-pulse-hover"
            >
              <FaAmbulance size={15} />
            </a>
          </div>
        </div>

        {/* 2. روابط سريعة */}
        <div className="flex flex-col flex-1 min-w-[200px] text-right md:mr-6">
          <h4 className="text-lg font-semibold mb-4 border-b border-white/40 pb-1 w-fit ml-auto">
            روابط سريعة
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">أدوية</a></li>
            <li><a href="#" className="hover:underline">رعاية صحية</a></li>
            <li><a href="#" className="hover:underline">المؤتمرات</a></li>
            <li><a href="#" className="hover:underline">عن المنصة</a></li>
          </ul>
        </div>

        {/* 3. الدعم والمساعدة */}
        <div className="flex flex-col flex-1 min-w-[200px] text-right">
          <h4 className="text-lg font-semibold mb-4 border-b border-white/40 pb-1 w-fit ml-auto">
            الدعم والمساعدة
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">مركز المساعدة</a></li>
            <li><a href="#" className="hover:underline">الأسئلة الشائعة</a></li>
          </ul>
        </div>

        {/* 4. حمل التطبيق (أقصى اليسار) */}
        <div className="flex flex-col text-right">
          <h4 className="text-lg font-semibold mb-4">
            حمل التطبيق
          </h4>
          <div className="flex flex-col items-start gap-3">
            <a href="#">
              <img src={GooglePlayBadge} alt="Google Play" className="w-28 h-auto object-contain" />
            </a>
            <a href="#">
              <img src={AppStoreBadge} alt="App Store" className="w-28 h-auto object-contain" />
            </a>
            <a href="#">
              <img src={AppGalleryBadge} alt="App Gallery" className="w-28 h-auto object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* البار السفلي */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-5 border-t border-white/30 flex flex-col md:flex-row justify-between items-center text-sm px-6 gap-y-3 md:gap-y-0">
        
        {/* حقوق النشر */}
        <div className="flex items-center gap-1 justify-center md:justify-end order-2 md:order-1">
          <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
          <span>2025. كل الحقوق محفوظة</span>
        </div>

        {/* الشروط والخصوصية */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start order-1 md:order-2">
          <a href="#" className="hover:underline">شروط الاستخدام</a>
          <span className="opacity-0 md:opacity-100">|</span> 
          <a href="#" className="hover:underline">سياسات الخصوصية</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;