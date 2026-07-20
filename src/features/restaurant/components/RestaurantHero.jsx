import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import terraceImg from '../../../assets/raw/Restaurante-Venta-El-Gallo-Alhambra-de-Granada-1-1.jpg';

const RestaurantHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-deep-black border-b border-gold/10">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${terraceImg})` }}
      ></div>
      
      {/* Gradients to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/70 to-deep-black/30"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep-black to-transparent"></div>
      
      {/* Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sacromonte-red/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 border border-gold/50 text-gold text-[10px] md:text-sm uppercase tracking-[0.4em] font-black mb-8 rounded-full bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] backdrop-blur-md">
            {t('restaurant_page.hero.badge')}
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tight mb-8 drop-shadow-2xl">
            {t('restaurant_page.hero.title_1')} <br className="hidden md:block" /> <span className="italic font-light text-sacromonte-red pr-4">{t('restaurant_page.hero.title_2')}</span>
          </h1>
          
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10"></div>
          
          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            {t('restaurant_page.hero.subtitle_1')}<strong className="font-medium text-white">{t('restaurant_page.hero.subtitle_bold')}</strong>{t('restaurant_page.hero.subtitle_2')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RestaurantHero;
