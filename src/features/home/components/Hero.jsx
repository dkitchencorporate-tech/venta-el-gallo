import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
            <span className="text-[10px] uppercase tracking-wide-5 text-gold font-bold drop-shadow-md">Patrimonio Vivo - Sacromonte, Granada</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] mb-6 leading-[0.85] tracking-tighter font-serif text-white drop-shadow-2xl">
            Donde la roca <br />
            <span className="italic text-sacromonte-red font-light">se hace quejío.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-md">
            Una cueva milenaria donde el flamenco no se actúa, se vive. Siente el latido de la zambra en el origen del Sacromonte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <button 
              onClick={() => openBooking({from: 'hero'})}
              className="btn-primary flex items-center gap-4 hover:bg-gold hover:text-white transition-colors duration-500 shadow-xl"
            >
               Reservar <ArrowRight size={16} />
            </button>
            <div className="flex flex-col border-l border-white/30 pl-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2">Coordenadas de Origen</span>
              <span className="text-[13px] font-mono text-gold tracking-tighter drop-shadow-sm">37.1818° N, 3.5855° W</span>
            </div>
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
