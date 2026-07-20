import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import cavePic from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-7-1.jpg';

const Narrative = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden text-deep-black bg-gradient-to-br from-white via-metallic-white to-gray-200 rounded-[40px] md:rounded-[60px] mx-4 md:mx-10 shadow-[0_0_80px_rgba(255,255,255,0.08)] z-20 my-8">
      
      {/* Massive Background Watermark for Wow Factor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 font-serif font-black text-[15rem] md:text-[25rem] lg:text-[40rem] text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none mix-blend-multiply">
        1996
      </div>

      <div className="section-container relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          
          {/* Narrative Content (High Density, 1:1 Scale) */}
          <div className="flex-1 order-2 lg:order-1 relative z-10">
            <div className="inline-block px-4 py-2 border border-gold/40 text-gold-700 bg-gold/5 text-[8px] uppercase tracking-widest font-black mb-8 rounded-sm shadow-sm">
              El Origen de la Zambra
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-deep-black mb-10 leading-[1.1] tracking-tight">
              Una acústica <br/> 
              <span className="italic text-sacromonte-red">tallada a mano.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed mb-10 max-w-lg drop-shadow-sm">
              Desde 1996, nuestras paredes de cal vibran con la pura verdad del flamenco. Un escenario íntimo donde la soleá y la seguiriya te alcanzan a centímetros de distancia, fundiendo al espectador con el artista.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 pb-10 border-t border-gray-300">
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 text-deep-black">Geología Acústica</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">El eco reverbera con una fidelidad perfecta, amplificando el zapateo sin distorsión alguna.</p>
              </div>
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 text-deep-black">Aforo Exclusivo</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">No hay barreras. El calor del baile y la fuerza del cante se sienten directamente en el alma.</p>
              </div>
            </div>

            <Link to="/artistas" className="inline-flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-deep-black px-8 py-4 shadow-xl hover:bg-gold hover:text-white transition-all duration-300 group rounded-full">
               Descubrir el Escenario
               <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Asymmetric Imagery */}
          <div className="flex-1 order-1 lg:order-2 relative w-full pb-16 lg:pb-0">
            
            {/* Soft Ambient Glow replacing the box border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[100px] rounded-full -z-10"></div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10 w-full max-w-[350px] md:max-w-md mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-tl-[60px] rounded-br-[60px] overflow-hidden group"
            >
              <img src={cavePic} className="w-full aspect-[4/5] object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Cueva Venta El Gallo Interior" />
              
              {/* Glassmorphic Data Card overlaying the image directly */}
              <div className="absolute -bottom-1 -left-1 bg-white/95 backdrop-blur-xl p-8 shadow-[20px_-20px_40px_rgba(0,0,0,0.05)] rounded-tr-[50px] border-r border-t border-gray-100 max-w-[240px] transform transition-transform duration-500 z-20">
                <p className="text-5xl font-serif text-sacromonte-red font-bold mb-2 leading-none">1996</p>
                <div className="w-10 h-px bg-gold mb-3"></div>
                <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-black">Fundación de la Cueva</p>
                <p className="text-[10px] text-gray-500 font-light mt-2">Patrimonio del Sacromonte</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Narrative;
