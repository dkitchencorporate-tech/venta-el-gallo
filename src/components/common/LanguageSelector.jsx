import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FlagES = ({ className = "w-4 h-3" }) => (
  <svg className={`${className} rounded-[2px] shadow-sm inline-block shrink-0`} viewBox="0 0 750 500" aria-hidden="true">
    <rect width="750" height="500" fill="#c60b1e"/>
    <rect width="750" height="250" y="125" fill="#ffc400"/>
  </svg>
);

export const FlagUK = ({ className = "w-4 h-3" }) => (
  <svg className={`${className} rounded-[2px] shadow-sm inline-block shrink-0`} viewBox="0 0 60 30" aria-hidden="true">
    <clipPath id="uk-clip-ls"><path d="M0,0v30h60v-30z"/></clipPath>
    <clipPath id="uk-diag-ls"><path d="M30,15h30v15zM0,0h30v15zM30,15h-30v15zM60,0h-30v15z"/></clipPath>
    <g clipPath="url(#uk-clip-ls)">
      <path d="M0,0v30h60v-30z" fill="#012169"/>
      <path d="M0,0l60,30m0,-30l-60,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0l60,30m0,-30l-60,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag-ls)"/>
      <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export const FlagFR = ({ className = "w-4 h-3" }) => (
  <svg className={`${className} rounded-[2px] shadow-sm inline-block shrink-0`} viewBox="0 0 900 600" aria-hidden="true">
    <rect width="300" height="600" fill="#002395"/>
    <rect width="300" height="600" x="300" fill="#fff"/>
    <rect width="300" height="600" x="600" fill="#ed2939"/>
  </svg>
);

export const languages = [
  { code: 'es', label: 'ES', title: 'Español', Flag: FlagES },
  { code: 'en', label: 'EN', title: 'English', Flag: FlagUK },
  { code: 'fr', label: 'FR', title: 'Français', Flag: FlagFR }
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
      <div className="flex items-center justify-center gap-3 mb-6 mt-2 border-t border-gold/30 pt-4 w-3/4">
        {languages.map((lang) => {
          const FlagComponent = lang.Flag;
          return (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 text-xs font-serif tracking-widest transition-all duration-300 px-3.5 py-1.5 rounded-full ${
                activeLang === lang.code 
                  ? 'text-gold font-bold scale-105 border border-gold/50 bg-gold/10 shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                  : 'text-white/60 hover:text-white border border-white/10 bg-white/5'
              }`}
            >
              <FlagComponent className="w-4 h-3" />
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop/Default version (floating below the main nav)
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-[45] transition-all duration-700 pointer-events-auto flex justify-center 
      bg-deep-black/85 backdrop-blur-2xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-white/5 border-t-gold/50 rounded-b-2xl
      ${scrolled ? 'top-[95px] md:top-[105px] py-1.5 px-4' : 'top-[110px] md:top-[125px] py-2 px-6'}
    `}>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {languages.map((lang) => {
          const FlagComponent = lang.Flag;
          return (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-1.5 text-[10px] md:text-xs font-serif tracking-widest uppercase transition-all duration-300 px-3 py-1 rounded-full ${
                activeLang === lang.code 
                  ? 'text-gold font-bold scale-105 border border-gold/50 bg-gold/10 shadow-[0_0_8px_rgba(212,175,55,0.4)]' 
                  : 'text-white/60 hover:text-white hover:scale-105 border border-transparent'
              }`}
            >
              <FlagComponent className="w-3.5 h-2.5 md:w-4 md:h-3" />
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;
