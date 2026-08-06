import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ------------------------------------------------------------------
// 🗄️ FIREBASE MOCK DATA (Preparado para el Backend)
// Esta estructura se conectará a Firebase en el futuro.
// ------------------------------------------------------------------
export const carouselImagesData = [
  { id: 1, src: '/images/carrusel/restaurante-sacromonte-granada-vistas.jpeg', alt: 'Vistas del Sacromonte desde la terraza' },
  { id: 2, src: '/images/carrusel/cena-espectaculo-flamenco-granada.jpeg', alt: 'Cena y espectáculo flamenco en Granada' },
  { id: 3, src: '/images/carrusel/terraza-venta-el-gallo-alhambra.jpeg', alt: 'Terraza Venta el Gallo con vistas a la Alhambra' },
  { id: 4, src: '/images/carrusel/gastronomia-andaluza-sacromonte.jpeg', alt: 'Platos de gastronomía andaluza' },
  { id: 5, src: '/images/carrusel/platos-tradicionales-flamenco.jpeg', alt: 'Platos tradicionales y tablao flamenco' },
  { id: 6, src: '/images/carrusel/experiencia-culinaria-granada.jpeg', alt: 'Experiencia culinaria única en Granada' },
  { id: 7, src: '/images/carrusel/tapas-premium-venta-el-gallo.jpeg', alt: 'Tapas premium en Venta el Gallo' },
  { id: 8, src: '/images/carrusel/cenar-en-cueva-flamenca.jpeg', alt: 'Cenar dentro de una auténtica cueva flamenca' },
  { id: 9, src: '/images/carrusel/menu-degustacion-sacromonte.jpeg', alt: 'Menú degustación en el Sacromonte' },
  { id: 10, src: '/images/carrusel/terraza-con-encanto-granada.jpeg', alt: 'Terraza con encanto para cenar en Granada' },
  { id: 11, src: '/images/carrusel/restaurante-flamenco-andaluz.jpeg', alt: 'El mejor restaurante flamenco andaluz' },
];

const GastronomyCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  // Auto-play feature
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000); 
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === carouselImagesData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselImagesData.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-16 relative px-4 group">
      
      {/* Etiqueta Premium Flotante */}
      <div className="absolute -top-4 left-8 md:left-12 z-20 bg-deep-black/90 backdrop-blur-md border border-gold/30 px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
        <Camera size={14} className="text-gold" />
        <span className="text-white font-serif text-xs tracking-widest uppercase">{t('restaurant_page.interactive_menu.carousel_tag', 'Nuestra Experiencia')}</span>
      </div>

      {/* Main Carousel Container (Glassmorphism & Fixed Height for mixed Aspect Ratios) */}
      <div 
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden bg-deep-black/5 backdrop-blur-sm border border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={carouselRef}
      >
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={`${import.meta.env.BASE_URL}${carouselImagesData[currentIndex].src.replace(/^\//, '')}`}
            alt={carouselImagesData[currentIndex].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            // object-cover solves the horizontal/vertical mixed ratios perfectly
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>

        {/* Gradient Overlay for Elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent pointer-events-none"></div>

        {/* Custom Navigation Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-gold backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:text-deep-black transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-gold backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:text-deep-black transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators (Dots) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:gap-3 z-10">
          {carouselImagesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar Timer */}
        {!isHovered && (
          <motion.div
            key={currentIndex} // Reset animation on index change
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-gold z-20"
          />
        )}
      </div>
    </div>
  );
};

export default GastronomyCarousel;
