import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ArtistsHero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-deep-black">
      {/* Dynamic Background Gradients to avoid total darkness */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sacromonte-red/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.4em] font-black mb-6 rounded-full bg-gold/5 shadow-sm">
            {t('artists_page.hero.tag')}
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight tracking-tight mb-8">
            {t('artists_page.hero.title_1')}<span className="italic font-light text-sacromonte-red">{t('artists_page.hero.title_2')}</span>
          </h1>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-8"></div>
          
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t('artists_page.hero.desc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtistsHero;
