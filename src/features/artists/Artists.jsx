import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArtistsHero from './components/ArtistsHero';
import ArtistCard from './components/ArtistCard';
import BiographyModal from './components/BiographyModal';
import { useBooking } from '../../context/BookingContext';

// Real Asset Imports
import daughtersGroupImg from '../../assets/raw/Venta-El-Gallo-15-1.jpg';
import antoniaImg from '../../assets/raw/antonia-ready.jpg';
import jaraImg from '../../assets/raw/jara-heredia-portrait.jpg';
import chonicoImg from '../../assets/raw/Antonio-el-Chonico-guitarra-Venta-el-Gallo.jpg';
import miguelImg from '../../assets/raw/Miguel-Angel-Cortes-Venta-el-Gallo-guitarra.webp';
import coralImg from '../../assets/raw/13-1.webp';
import pacoImg from '../../assets/raw/Artista-1.jpg';
import rayImg from '../../assets/raw/Raimundo.jpg';
import agustinImg from '../../assets/raw/Venta-El-Gallo-37-1.jpg';
import antonioCantaorImg from '../../assets/raw/antonio-heredia-cantaor.jpg';

const imageMap = {
  "Jara Heredia": jaraImg,
  "Antonia Heredia": antoniaImg,
  "Dinastía Heredia": daughtersGroupImg,
  "Antonio Heredia «El Chonico»": chonicoImg,
  "Miguel Ángel Cortés": miguelImg,
  "Paco Fernández": pacoImg,
  "Coral Fernández": coralImg,
  "Raimundo Benítez": rayImg,
  "Antonio Heredia": antonioCantaorImg
};

const Artists = () => {
  const { t } = useTranslation();
  const rawArtists = t('artists_page.artists', { returnObjects: true }) || [];
  const artistsData = rawArtists.map(artist => ({
    ...artist,
    imageUrl: imageMap[artist.name]
  }));

  const [selectedIdx, setSelectedIdx] = useState(null);
  const { openBooking } = useBooking();

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % artistsData.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + artistsData.length) % artistsData.length);
  };

  return (
    <div className="fade-in min-h-screen bg-deep-black pb-0">
      <ArtistsHero />
      
      <div className="container mx-auto px-6 -mt-10 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
           {artistsData.map((artist, idx) => (
             <ArtistCard 
               key={idx} 
               name={artist.name} 
               role={artist.role} 
               imageUrl={artist.imageUrl}
               description={artist.description}
               onOpenBiography={() => setSelectedIdx(idx)}
             />
           ))}
        </div>
      </div>

      <BiographyModal 
        isOpen={selectedIdx !== null}
        artist={selectedIdx !== null ? artistsData[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Brutal VIP Booking CTA */}
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
      
      {/* Immersive closer strictly tucked near footer */}
      <div className="text-center pb-8 px-6">
        <p className="text-gold-500/20 font-serif italic text-xs md:text-sm max-w-lg mx-auto">
          {t('artists_page.footer')}
        </p>
      </div>
    </div>
  );
};

export default Artists;
