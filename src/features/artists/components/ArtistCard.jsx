import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ArtistCard = ({ name, role, imageUrl, description, onOpenBiography }) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="group relative flex flex-col items-center text-center px-4"
    >
      {/* 3D Tilt Wrapper */}
      <motion.div 
        whileHover={{ 
          rotateY: 8, 
          rotateX: -5,
          scale: 1.05,
          z: 20
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] bg-deep-black group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.4)] transition-all duration-700 perspective-[1000px] mb-8 cursor-pointer"
        onClick={onOpenBiography}
      >
        <div className="w-full h-full overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms]" 
            />
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center italic text-gray-500 text-xs">
              {t('artist_card.sample')}
            </div>
          )}
        </div>
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700"></div>
        
        {/* Bio summary: Persistent on mobile, Hover-driven on desktop */}
        <div className="absolute inset-x-6 bottom-16 flex flex-col justify-end opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-6 lg:group-hover:translate-y-0">
           <p className="text-[12px] lg:text-[13px] text-gray-300 font-light leading-relaxed line-clamp-3 mb-6">
             {description}
           </p>
        </div>

        {/* VER BIOGRAFÍA Button: Persistent on mobile, Hover-driven on desktop */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 z-30">
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenBiography(); }}
            className="px-8 py-3 bg-white text-deep-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:bg-gold-500 hover:scale-105 transition-all duration-300 transform"
          >
            {t('artist_card.bio_btn')}
          </button>
        </div>
      </motion.div>

      {/* Persistent Info */}
      <h3 className="text-xl md:text-2xl font-serif text-white tracking-tight mb-2">
        {name}
      </h3>
      <div className="flex items-center gap-3">
        <div className="w-4 h-[1px] bg-sacromonte-red"></div>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-black text-gold-500/80">
          {role}
        </span>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
