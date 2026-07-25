import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import juanilloImg from '../../../assets/raw/juanillo-solo.jpeg';
import zambraImg from '../../../assets/raw/Venta-El-Gallo-1-1280x961-2.jpg';
import galardonImg from '../../../assets/raw/Galardon-de-prestigio.jpeg';
import pasilloCuevaImg from '../../../assets/raw/Pasillo-cueva.jpeg';
import cuevaImg from '../../../assets/raw/Cueva-interior.jpeg';
import laSangreImg from '../../../assets/raw/La-sangre.jpeg';

const MuseumCard = ({ event, index }) => {
  const isImageLeft = event.align === 'left';
  const images = event.images || (event.img ? [event.img] : []);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Viewport Observer: activate timer ONLY when user is looking at this card
  useEffect(() => {
    if (images.length <= 1) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [images.length]);

  // Auto-play timer: advances every 4s only when card is visible
  useEffect(() => {
    if (!isInView || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isInView, images.length, currentImgIdx]);

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentItem = images[currentImgIdx];
  const activeSrc = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const activeFit = typeof currentItem === 'string' ? 'object-cover' : (currentItem.fit || 'object-cover');
  const isContain = activeFit.includes('object-contain');

  return (
    <div ref={cardRef} className={`relative flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto mb-20 md:mb-32 group`}>
       
       {/* Central Subtle Track for Desktop */}
       <div className="hidden md:block absolute left-1/2 top-0 bottom-[-8rem] w-[1px] bg-gradient-to-b from-gray-200 via-gray-300 to-transparent transform -translate-x-1/2 z-0"></div>
       
       {/* Dot on the track */}
       <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10 items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-1.5 h-1.5 rounded-full bg-gold/50"
          />
       </div>

       {/* Subdued Elegant Image / Carousel */}
       <div className={`w-full md:w-1/2 flex justify-center items-center relative z-10 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.08)] bg-gray-50 flex items-center justify-center ${
              event.isCircle 
                ? 'w-56 h-56 md:w-64 md:h-64 rounded-full border border-gray-100 p-2 bg-white' 
                : 'w-[85%] md:w-80 h-[400px] md:h-96 rounded-2xl'
            }`}
          >
            <div className={`w-full h-full relative overflow-hidden flex items-center justify-center bg-deep-black ${event.isCircle ? 'rounded-full' : 'rounded-2xl'}`}>
              {isContain && (
                <img 
                  src={activeSrc} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-60 pointer-events-none" 
                />
              )}
              <img 
                src={activeSrc} 
                alt={event.title} 
                className={`relative z-10 w-full h-full ${activeFit} transition-all duration-700 ease-out group-hover:scale-105 ${event.filter} ${event.objectPosition || 'object-center'}`} 
              />
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-deep-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-gold hover:border-gold transition-all duration-300 z-20 shadow-lg"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-deep-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-gold hover:border-gold transition-all duration-300 z-20 shadow-lg"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(i); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImgIdx ? 'w-5 bg-gold' : 'w-1.5 bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
       </div>

       {/* Extremely Clean, Reduced Typography Block */}
       <div className={`w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 mt-10 md:mt-0 relative z-10 ${isImageLeft ? 'md:order-2 md:justify-start' : 'md:order-1 md:justify-end'}`}>
          <motion.div 
            initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`max-w-sm flex flex-col ${isImageLeft ? 'md:items-start text-center md:text-left' : 'md:items-end text-center md:text-right'}`}
          >
             <span className="text-sacromonte-red font-bold tracking-[0.25em] text-[10px] uppercase mb-4 inline-block">
                {event.year}
             </span>
             
             {/* The title size is strictly controlled here (text-2xl to 3xl max) */}
             <h3 className="text-2xl md:text-3xl font-serif text-deep-black leading-tight tracking-tight mb-5">
                {event.title}
             </h3>
             
             <p className="text-[13px] md:text-sm text-gray-500 font-light leading-[1.8] max-w-xs">
                {event.desc}
             </p>
          </motion.div>
       </div>

    </div>
  );
};

const Timeline = () => {
  const { t } = useTranslation();

  const events = [
    { 
      year: t('history_page.timeline.events.e1.year'), 
      title: t('history_page.timeline.events.e1.title'), 
      desc: t('history_page.timeline.events.e1.desc'),
      img: juanilloImg,
      isCircle: true,
      filter: "contrast-[1.1] saturate-[1.2]",
      objectPosition: "object-top",
      align: "left"
    },
    { 
      year: t('history_page.timeline.events.e2.year'), 
      title: t('history_page.timeline.events.e2.title'), 
      desc: t('history_page.timeline.events.e2.desc'),
      img: zambraImg,
      isCircle: false,
      filter: "contrast-100",
      align: "right"
    },
    { 
      year: t('history_page.timeline.events.e3.year'), 
      title: t('history_page.timeline.events.e3.title'), 
      desc: t('history_page.timeline.events.e3.desc'),
      images: [
        { src: galardonImg, fit: "object-contain p-2" },
        { src: pasilloCuevaImg, fit: "object-cover" },
        { src: cuevaImg, fit: "object-cover" }
      ],
      isCircle: false,
      filter: "contrast-[1.05]",
      align: "left"
    },
    { 
      year: t('history_page.timeline.events.e4.year'), 
      title: t('history_page.timeline.events.e4.title'), 
      desc: t('history_page.timeline.events.e4.desc'),
      img: laSangreImg,
      isCircle: false,
      filter: "contrast-100",
      align: "right"
    }
  ];

  return (
    <div className="relative z-20 mt-4 lg:mt-8 mx-4 sm:mx-8 lg:mx-20 rounded-[40px] lg:rounded-[60px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-gray-100/50 mb-8 lg:mb-12 overflow-hidden">
        
        {/* Gallery Intro */}
        <div className="max-w-2xl mx-auto text-center py-24 md:py-32 px-6">
           <div className="inline-block px-4 py-1.5 border border-sacromonte-red/20 text-sacromonte-red bg-transparent text-[9px] uppercase tracking-[0.3em] font-bold mb-6 rounded-sm">
             {t('history_page.timeline.badge')}
           </div>
           
           {/* Greatly reduced Intro Header */}
           <h2 className="text-3xl md:text-4xl font-serif text-deep-black leading-[1.2] tracking-tight">
             {t('history_page.timeline.title_1')}<br className="hidden md:block"/>
             <span className="italic text-sacromonte-red font-light">{t('history_page.timeline.title_2')}</span>
           </h2>
        </div>

        {/* Minimalist Cards Flow */}
        <div className="w-full px-4 md:px-8 pb-32">
           {events.map((evt, idx) => (
             <MuseumCard key={idx} event={evt} index={idx} />
           ))}
        </div>
        
    </div>
  );
};

export default Timeline;
