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
    // set lang attribute for accessibility (do NOT change layout direction)
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
