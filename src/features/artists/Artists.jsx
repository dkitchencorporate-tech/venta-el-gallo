import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../context/BookingContext';
import { getArtists, resolveAssetUrl } from '../../services/adminService';
import ArtistCard from './components/ArtistCard';
import BiographyModal from './components/BiographyModal';

const Artists = () => {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistsList, setArtistsList] = useState([]);

  const loadArtists = () => {
    setArtistsList(getArtists());
  };

  useEffect(() => {
    loadArtists();
    const handleUpdate = (e) => setArtistsList(e.detail || getArtists());
    window.addEventListener('veg_artists_updated', handleUpdate);
    return () => window.removeEventListener('veg_artists_updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-deep-black text-white relative">
      
      {/* 1. HERO SECTION CINEMATOGRÁFICA */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533558661603-9d2983b620c3?q=80&w=2070" 
            alt="Cueva Flamenca Sacromonte"
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-deep-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold/30 bg-deep-black/60 backdrop-blur-md mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-sacromonte-red animate-ping"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-gold">
              {t('artists_page.hero.badge')}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none mb-6"
          >
            {t('artists_page.hero.title_1')} <span className="italic text-gold">{t('artists_page.hero.title_2')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t('artists_page.hero.desc')}
          </motion.p>
        </div>
      </section>

      {/* 2. GRID PRINCIPAL DE ARTISTAS */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {artistsList.map((artist) => (
            <ArtistCard 
              key={artist.id}
              name={artist.name}
              role={artist.role}
              imageUrl={resolveAssetUrl(artist.imageUrl)}
              description={artist.description}
              onOpenBiography={() => setSelectedArtist({
                ...artist,
                imageUrl: resolveAssetUrl(artist.imageUrl)
              })}
            />
          ))}
        </div>
      </section>

      {/* 3. CTA DINÁMICO DE RESERVA */}
      <section className="relative py-20 bg-gradient-to-b from-deep-black via-[#0c0d12] to-deep-black border-t border-gold/15">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            {t('artists_page.cta.title_1')} <span className="text-gold italic">{t('artists_page.cta.title_2')}</span>
          </h2>
          <p className="text-gray-400 font-light text-sm md:text-base mb-8 max-w-xl mx-auto">
            {t('artists_page.cta.desc')}
          </p>
          <button 
            onClick={() => openBooking({ from: 'artists_cta' })}
            className="px-10 py-4 rounded-full bg-gold text-deep-black font-black uppercase text-xs tracking-[0.25em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300"
          >
            {t('artists_page.cta.button')}
          </button>
        </div>
      </section>

      {/* 4. MODAL DETALLADO DE BIOGRAFÍA */}
      <AnimatePresence>
        {selectedArtist && (
          <BiographyModal 
            artist={selectedArtist} 
            onClose={() => setSelectedArtist(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Artists;
