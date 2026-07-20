import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Timeline from './components/Timeline';
import heroBg from '../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';
import ctaBg from '../../assets/raw/Restaurante-Venta-El-Gallo-Alhambra-de-Granada-1-1.jpg';
import { useBooking } from '../../context/BookingContext';

const History = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { openBooking } = useBooking();

  return (
    <div className="flex flex-col bg-deep-black text-white min-h-screen">
      
      {/* Cinematic Header */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <img src={heroBg} alt="Venta El Gallo Historia" className="w-full h-[120%] object-cover opacity-60 grayscale-[30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/80 via-transparent to-deep-black/80"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="section-container relative z-10 text-center flex flex-col items-center mt-20"
        >
          <div className="w-px h-16 bg-gold drop-shadow-md mb-6"></div>
          <div className="inline-block px-4 py-1 border border-white/20 text-[10px] uppercase tracking-[0.3em] font-black mb-6 text-white/80">
            {t('history_page.badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter leading-none mb-6 drop-shadow-2xl mix-blend-screen text-white">
            {t('history_page.title')}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl drop-shadow-sm px-4">
            {t('history_page.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* The Roadmap (Light/Metallic Ecosystem) */}
      <Timeline />

      {/* Potent Final Call To Action (Dark Ecosystem) */}
      <section className="relative py-12 lg:py-16 flex items-center justify-center overflow-hidden bg-deep-black z-10 -mt-10 rounded-t-[50px] md:rounded-t-[100px]">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="Cena y Espectáculo" className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/70 to-deep-black"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-container relative z-10 text-center flex flex-col items-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-sacromonte-red mb-10"></div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl">
            {t('history_page.cta_title_1')}<br className="hidden md:block"/>
            <span className="italic text-sacromonte-red">{t('history_page.cta_title_2')}</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mb-12 font-light">
            {t('history_page.cta_subtitle')}
          </p>
          
          <button onClick={() => openBooking({from: 'history'})} className="btn-primary flex items-center gap-4 bg-sacromonte-red border-none text-white px-10 py-5 text-sm md:text-base tracking-[0.2em] font-black uppercase transition-all duration-500 shadow-[0_0_40px_rgba(153,27,27,0.4)] hover:shadow-[0_0_80px_rgba(212,175,55,0.6)] hover:bg-gold hover:text-deep-black transform hover:-translate-y-1">
             {t('history_page.cta_button')} <ArrowRight size={20} />
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default History;
