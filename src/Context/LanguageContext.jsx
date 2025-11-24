import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('i18nextLng') || i18n.language || 'en';
    } catch {
      return i18n.language || 'en';
    }
  });

  useEffect(() => {
    if (!language) return;
    i18n.changeLanguage(language);
    try {
      localStorage.setItem('i18nextLng', language);
    } catch {}
    document.documentElement.lang = language;    
    // Set text direction based on language
    // document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
