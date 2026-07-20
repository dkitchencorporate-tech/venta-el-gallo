import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Legacy from './components/Legacy';
import Narrative from './components/Narrative';
import Pillars from './components/Pillars';
import Reviews from './components/Reviews';
import InstagramReels from './components/InstagramReels';
import FAQ from './components/FAQ';
import ctaBg from '../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';
import { useBooking } from '../../context/BookingContext';

const Home = () => {
  const { openBooking } = useBooking();

  return (
    <div className="bg-deep-black flex flex-col">
      <Hero />
      <Legacy />
      
      {/* Aggressive Mid-Page Interstitial CTA (No Face, Abstract Elegance) */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden bg-deep-black">
         <div className="absolute inset-0 z-0">
           {/* Abstract Premium Texture / Mesh Gradient instead of a face */}
           <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sacromonte-red/20 via-deep-black to-deep-black opacity-80 blur-[80px]"></div>
           <div className="absolute inset-0 bg-noise opacity-5 min-h-[100%] mix-blend-overlay"></div>
         </div>
         
         <div className="section-container relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl">
              El latido del Sacromonte <br className="hidden md:block"/><span className="italic text-gold">te está esperando.</span>
            </h2>
            <button 
              onClick={() => openBooking({from: 'home_mid'})}
              className="btn-primary flex items-center gap-4 bg-sacromonte-red border-none text-white px-8 py-4 text-xs md:text-sm tracking-[0.2em] font-black uppercase transition-all duration-500 shadow-[0_0_40px_rgba(153,27,27,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:bg-gold hover:text-deep-black transform hover:-translate-y-1"
            >
               Reservar <ArrowRight size={18} />
            </button>
         </div>
      </section>

      <Narrative />
      <Pillars />

      <Reviews />
      
      {/* Immersive Booking CTA */}
      <section className="relative py-16 lg:py-24 flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="Venta El Gallo Experience" className="w-full h-full object-cover opacity-30 grayscale-[50%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/50 to-deep-black"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="section-container relative z-10 text-center flex flex-col items-center"
        >
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-gold mb-8"></div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-tighter leading-none shadow-black drop-shadow-2xl">
            Tu asiento en la <br/> <span className="italic text-gold">historia.</span>
          </h2>
          <p className="text-base text-white/50 max-w-lg mb-12 font-light">
            Las plazas en la cueva son limitadas para preservar la pureza acústica y la intimidad del espectáculo. Asegura tu lugar en la Zambra.
          </p>
          
          <button 
            onClick={() => openBooking({from: 'home_bottom'})}
            className="btn-gold flex items-center gap-4 text-xs md:text-sm px-10 py-5 shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold tracking-widest uppercase">Reservar</span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-0"></div>
          </button>
        </motion.div>
      </section>

      <FAQ />

    </div>
  );
};

export default Home;
