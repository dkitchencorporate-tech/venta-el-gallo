import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ArtistsHero from './components/ArtistsHero';
import ArtistCard from './components/ArtistCard';
import BiographyModal from './components/BiographyModal';
import { useBooking } from '../../context/BookingContext';
import { getArtists, resolveAssetUrl } from '../../services/adminService';

const Artists = () => {
  const { t } = useTranslation();
  const [artistsData, setArtistsData] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const { openBooking } = useBooking();

  const loadArtists = () => {
    const list = getArtists();
    setArtistsData(list);
  };

  useEffect(() => {
    loadArtists();
    const handleUpdate = () => loadArtists();
    window.addEventListener('veg_artists_updated', handleUpdate);
    return () => window.removeEventListener('veg_artists_updated', handleUpdate);
  }, []);

  const handleNext = () => {
    if (artistsData.length === 0) return;
    setSelectedIdx((prev) => (prev + 1) % artistsData.length);
  };

  const handlePrev = () => {
    if (artistsData.length === 0) return;
    setSelectedIdx((prev) => (prev - 1 + artistsData.length) % artistsData.length);
  };

  return (
    <div className="fade-in min-h-screen bg-deep-black pb-0">
      
      {/* 1. Header Hero Oficial de Producción */}
      <ArtistsHero />
      
      {/* 2. Grid de Artistas Dinámico con Transiciones de Autor */}
      <div className="container mx-auto px-6 -mt-10 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
           {artistsData.map((artist, idx) => (
             <ArtistCard 
               key={artist.id || idx} 
               name={artist.name} 
               role={artist.role} 
               imageUrl={resolveAssetUrl(artist.imageUrl)}
               objectFit={artist.name === "Dinastía Heredia" ? "object-contain scale-100 py-2" : "object-cover"}
               description={artist.description}
               onOpenBiography={() => setSelectedIdx(idx)}
             />
           ))}
        </div>
      </div>

      {/* 3. Modal de Biografía con Navegación Continua */}
      <BiographyModal 
        isOpen={selectedIdx !== null}
        artist={selectedIdx !== null ? {
          ...artistsData[selectedIdx],
          imageUrl: resolveAssetUrl(artistsData[selectedIdx].imageUrl)
        } : null}
        onClose={() => setSelectedIdx(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* 4. Tarjeta VIP Booking CTA Oficial de Producción */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 mt-16 md:mt-24 mb-12">
        <div className="relative bg-[#FAFAFA] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden text-center border border-gold/20 group hover:border-gold/50 transition-colors duration-1000">
          
          {/* Fondo Radial Sutil para Efecto Volumen */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-[#F0EBE1] opacity-70"></div>
          
          {/* Esquinas Doradas (VIP Card Feel) */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold/50 rounded-tl-[3rem] opacity-50 m-4 md:m-8"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold/50 rounded-br-[3rem] opacity-50 m-4 md:m-8"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="mb-6 md:mb-8 flex items-center justify-center gap-4">
              <div className="h-[2px] w-8 md:w-16 bg-gold/50"></div>
              <span className="text-gold text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">{t('artists_page.cta.tag')}</span>
              <div className="h-[2px] w-8 md:w-16 bg-gold/50"></div>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-deep-black mb-6 md:mb-8 tracking-tighter leading-[0.9]">
              {t('artists_page.cta.title_1')}<span className="text-sacromonte-red italic pr-2">{t('artists_page.cta.title_2')}</span><br className="hidden md:block"/> {t('artists_page.cta.title_3')}
            </h2>
            
            <p className="text-base md:text-xl text-gray-700 mb-10 md:mb-12 font-light max-w-2xl leading-relaxed">
              {t('artists_page.cta.desc_1')}<strong className="font-bold text-deep-black">{t('artists_page.cta.desc_2')}</strong>{t('artists_page.cta.desc_3')}
            </p>
            
            {/* Botón CTA con Estilo Oro Puro y Transición Suave */}
            <button onClick={() => openBooking({from: 'artists'})} className="group relative inline-flex items-center justify-center px-12 md:px-16 py-5 md:py-6 bg-deep-black border border-gold/50 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] hover:border-gold hover:-translate-y-1 transition-all duration-500">
              <span className="relative z-10 text-gold font-extrabold uppercase tracking-[0.3em] text-[10px] md:text-sm drop-shadow-md group-hover:text-gold/80 group-hover:scale-105 transition-all duration-500">
                {t('artists_page.cta.button')}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Cierre Sutil junto al Footer */}
      <div className="text-center pb-8 px-6">
        <p className="text-gold-500/20 font-serif italic text-xs md:text-sm max-w-lg mx-auto">
          {t('artists_page.footer')}
        </p>
      </div>
    </div>
  );
};

export default Artists;
