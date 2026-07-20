import React, { useEffect, useRef, useState } from 'react';
import { Play, Heart, ExternalLink, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import img1 from '../../../assets/raw/antonia-heredia-dancing.jpg';
import img2 from '../../../assets/raw/Antonio-el-Chonico-guitarra-Venta-el-Gallo.jpg';
import img3 from '../../../assets/raw/13-1.webp';
import img4 from '../../../assets/raw/antonio-heredia-cantaor.jpg';
import img5 from '../../../assets/raw/ray-1280x852-2.jpg';
import img6 from '../../../assets/raw/jara-heredia-portrait.jpg';
import img7 from '../../../assets/raw/Venta-El-Gallo-15-1.jpg';
import img8 from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';

const reelsData = [
  { id: 1, url: "https://www.instagram.com/reel/DHa_xJuoN9p/", cover: img1, likes: "856" },
  { id: 2, url: "https://www.instagram.com/reel/DZx0ikUtOdh/", cover: img2, likes: "642" },
  { id: 3, url: "https://www.instagram.com/reel/DWTQEkeDU8i/", cover: img3, likes: "1,204" },
  { id: 4, url: "https://www.instagram.com/reel/DXPin5jDSQQ/", cover: img4, likes: "432" },
  { id: 5, url: "https://www.instagram.com/reel/DPdkMfMjYzc/", cover: img5, likes: "951" },
  { id: 6, url: "https://www.instagram.com/reel/DPTT4geDa1k/", cover: img6, likes: "1,420" },
  { id: 7, url: "https://www.instagram.com/reel/DOV2E2ZDf5T/", cover: img7, likes: "784" },
  { id: 8, url: "https://www.instagram.com/reel/DJqmDlZIS5k/", cover: img8, likes: "1,105" },
];

const InstagramReels = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicamos los datos 3 veces para asegurar un scroll infinito suave y continuo sin saltos feos
  const duplicatedReels = [...reelsData, ...reelsData, ...reelsData];

  useEffect(() => {
    // Observer para detectar la tarjeta que está en el CENTRO de la pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scale-110', 'z-30', 'shadow-[0_30px_60px_rgba(212,175,55,0.3)]', 'border-gold/50');
            entry.target.classList.remove('scale-90', 'opacity-50', 'z-10', 'border-white/10');
            entry.target.classList.add('opacity-100');
          } else {
            entry.target.classList.remove('scale-110', 'z-30', 'shadow-[0_30px_60px_rgba(212,175,55,0.3)]', 'border-gold/50');
            entry.target.classList.add('scale-90', 'opacity-50', 'z-10', 'border-white/10');
          }
        });
      },
      {
        root: null,
        // Configuración crítica: Solo el 20% central de la pantalla cuenta como intersección
        // Margen negativo achica la caja de intersección
        rootMargin: '0px -40% 0px -40%', 
        threshold: 0
      }
    );

    const elements = document.querySelectorAll('.reel-card-anim');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#050505] overflow-hidden relative">
      <div className="section-container relative z-20 text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tighter">
          {t('reels.title_1')}<span className="italic text-sacromonte-red">{t('reels.title_2')}</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
          {t('reels.subtitle')}
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col items-center">
        
        {/* Degradados laterales para ocultar la entrada/salida y centrar la atención */}
        <div className="absolute left-0 top-0 bottom-0 w-[15%] md:w-[25%] bg-gradient-to-r from-[#050505] to-transparent z-40 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-[15%] md:w-[25%] bg-gradient-to-l from-[#050505] to-transparent z-40 pointer-events-none"></div>

        {/* CSS Personalizado para la animación continua */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); } /* Porque triplicamos el array */
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div 
          className="animate-marquee gap-6 md:gap-10 py-10 px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedReels.map((reel, index) => (
            <a 
              key={`${reel.id}-${index}`}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card-anim relative shrink-0 w-[240px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 transition-all duration-700 ease-out group cursor-pointer"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Etiqueta Instagram Top */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Instagram size={14} className="text-white" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">{t('reels.reel')}</span>
              </div>

              {/* Cover Image */}
              <img 
                src={reel.cover} 
                alt="Instagram Reel Venta El Gallo" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Gradiente Oscuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Botón Play (Visible siempre pero más grande en hover) */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transform transition-all duration-500 group-hover:bg-sacromonte-red/90 group-hover:border-sacromonte-red group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Likes & Info Bottom */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white z-30">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-white fill-transparent group-hover:fill-sacromonte-red group-hover:text-sacromonte-red transition-all duration-300" />
                  <span className="text-sm font-bold tracking-wider">{reel.likes}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-gold transition-colors">
                  {t('reels.view')}
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Mensaje de interacción */}
        <div className={`transition-opacity duration-500 mt-4 text-xs font-light tracking-[0.3em] uppercase text-gold/50 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {t('reels.interaction')}
        </div>

      </div>
    </section>
  );
};

export default InstagramReels;
