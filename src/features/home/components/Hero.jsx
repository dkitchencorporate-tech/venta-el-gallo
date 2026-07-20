import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import heroBg from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';
import { useBooking } from '../../../context/BookingContext';

const Hero = () => {
  const { t } = useTranslation();
  const { openBooking } = useBooking();

  return (
    <section className="relative min-h-[85vh] md:min-h-[95vh] pt-32 lg:pt-40 pb-24 flex items-center overflow-hidden bg-deep-black text-white">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <video 
           autoPlay 
           loop 
           muted 
           playsInline
           poster={heroBg}
           className="w-full h-full object-cover opacity-70"
        >
          {/* TODO: Add final video src here. Placeholders for now. */}
          <source src="/assets/raw/hero-video.webm" type="video/webm" />
          <source src="/assets/raw/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Lighter Gradient Mask for better Background Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/80 via-deep-black/30 to-transparent"></div>
      </div>

      <div className="section-container relative z-10 w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, delay: 0.2 }}
           className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
            <span className="text-[10px] uppercase tracking-wide-5 text-gold font-bold drop-shadow-md">{t('hero.badge')}</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] mb-6 leading-[0.85] tracking-tighter font-serif text-white drop-shadow-2xl">
            {t('hero.title_1')} <br />
            <span className="italic text-sacromonte-red font-light">{t('hero.title_2')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <button 
              onClick={() => openBooking({from: 'hero'})}
              className="btn-primary flex items-center gap-4 hover:bg-gold hover:text-white transition-colors duration-500 shadow-xl"
            >
               {t('hero.cta')} <ArrowRight size={16} />
            </button>
            <a 
              href="https://share.google/orfW0MLIF6oV3R4YL"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border-l border-white/30 pl-6 cursor-pointer hover:border-gold transition-colors duration-300"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2 group-hover:text-gold/80 transition-colors">{t('hero.location')}</span>
              <span className="flex items-center gap-2 text-[12px] font-serif text-white tracking-wider drop-shadow-sm group-hover:text-gold transition-colors">
                <MapPin size={14} className="text-gold group-hover:scale-110 transition-transform" />
                {t('hero.map')}
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute right-[-5%] bottom-[-5%] pointer-events-none select-none z-0"
      >
        <h2 className="text-[25rem] font-serif font-black uppercase tracking-tighter leading-none text-white mix-blend-overlay">ZAMBRA</h2>
      </motion.div>
    </section>
  );
};

export default Hero;
