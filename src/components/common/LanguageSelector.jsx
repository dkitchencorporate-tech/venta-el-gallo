import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' }
];

const LanguageSelector = ({ scrolled, isMobileMenu = false }) => {
  const { i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(i18n.language || 'es');

  // Sync state with actual i18n language
  useEffect(() => {
    setActiveLang(i18n.language?.split('-')[0] || 'es');
  }, [i18n.language]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  // Mobile menu version (inside the full screen overlay)
  if (isMobileMenu) {
    return (
      <div className="flex items-center justify-center gap-4 mb-8 mt-4 border-t border-gold/30 pt-4 w-1/2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-sm font-serif tracking-widest transition-all duration-300 px-4 py-1.5 rounded-full ${
              activeLang === lang.code 
                ? 'text-gold font-bold scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] border border-gold/50 bg-gold/10' 
                : 'text-white/50 hover:text-white border border-transparent'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  // Desktop/Default version (floating below the main nav)
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-[45] transition-all duration-700 pointer-events-auto flex justify-center 
      bg-deep-black/85 backdrop-blur-2xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-white/5 border-t-gold/50 rounded-b-2xl
      ${scrolled ? 'top-[95px] md:top-[105px] py-1.5 px-4' : 'top-[110px] md:top-[125px] py-2 px-6'}
    `}>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-[10px] md:text-xs font-serif tracking-widest uppercase transition-all duration-300 px-3 py-1 rounded-full ${
              activeLang === lang.code 
                ? 'text-gold font-bold scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] border border-gold/50 bg-gold/10' 
                : 'text-white/60 hover:text-white hover:scale-105 border border-transparent'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
