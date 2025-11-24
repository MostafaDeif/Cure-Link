import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const WhatsNewSection = () => {
  const { t } = useTranslation()
  const cards = t('landing.whatsnew.cards', { returnObjects: true }) || []

  const delayOrder = [1, 0, 2];

  return (
    <section className="w-full flex flex-col items-center pt-[100px] pb-[94px] bg-[#F5F9FA]">
      <h2
        className="font-[Alexandria] font-black text-[48px] md:text-[64px] text-[#191E15] text-center mb-[80px]"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        {t('landing.whatsnew.title')}
      </h2>

      <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-[40px] px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group w-[374px] h-[514px] bg-white rounded-[30px] shadow-lg flex flex-col items-center text-center pt-[31px] px-[32px] pb-[40px]
                       transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                       hover:scale-[1.04] hover:shadow-2xl
                       hover:bg-gradient-to-b hover:from-[#54BD95] hover:to-[#46b08a]"
            data-aos="fade-up"
            data-aos-delay={delayOrder[index] * 200 + 250}
            data-aos-duration="700"
          >
            <h3
              className="font-[Alexandria] font-black text-[24px] text-[#191E15] mt-[0] mb-[20px] 
                           transition-colors duration-300 group-hover:text-white"
            >
              {card.title}
            </h3>

            <div
              className="bg-[#F9FAFB] rounded-[10px] w-[334px] h-[365px] flex flex-col items-center justify-between px-[32px] pt-[33px] pb-[33px]
                         transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                         group-hover:bg-white"
            >
              <p className="font-[Alexandria] font-medium text-[20px] leading-[27px] text-[#A6A6A6] text-center w-[251px] mb-[20px]">
                {card.description}
              </p>

              <Link
                to={card.link ? card.link : "/articles"}
                className="w-[240px] h-[58px] rounded-[18px] bg-white text-[15px] font-[Alexandria] font-black leading-[30px]
                           flex justify-center items-center
                           transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                           group-hover:bg-[#54BD95] group-hover:text-white group-focus:bg-[#54BD95] group-focus:text-white cursor-pointer"
              >
                {card.button}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsNewSection;
