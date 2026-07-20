import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BiographyModal = ({ artist, isOpen, onClose, onNext, onPrev }) => {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !artist) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12"
        >
          {/* Fondo Cristalino/Desenfocado */}
          <div 
            className="absolute inset-0 bg-deep-black/80 backdrop-blur-[10px]"
            onClick={onClose}
          />

          {/* Botones Laterales Sutiles (Escritorio) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 items-center justify-center text-white/50 hover:text-gold transition-all duration-300 z-[110] group"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 items-center justify-center text-white/50 hover:text-gold transition-all duration-300 z-[110] group"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Botón de Cierre General (Top Right Flotante) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 w-12 h-12 rounded-full bg-white/5 hover:bg-sacromonte-red backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 z-[110]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-6xl h-[100dvh] md:h-[85vh] max-h-screen md:max-h-[900px] bg-[#0a0a0a] md:rounded-3xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row z-10 border-0 md:border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar CERRAR PARA MÓVIL (Solo visible < md) */}
            <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between md:hidden z-[60]">
               <div className="flex-1"></div>
               <button 
                 onClick={onClose} 
                 className="flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full text-white/90 border border-white/10 shadow-lg active:scale-95"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
               </button>
            </div>

            {/* SECCIÓN IZQUIERDA: Imagen */}
            <div className="relative h-[45vh] md:h-full md:w-5/12 lg:w-1/2 shrink-0 flex items-center justify-center bg-black overflow-hidden border-b md:border-b-0 md:border-r border-white/10 z-10">
              {/* Fondo desenfocado dinámico */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 saturate-150"
                style={{ backgroundImage: `url(${artist.imageUrl})` }}
              />
              
              <img 
                src={artist.imageUrl} 
                alt={artist.name} 
                className="relative z-20 w-full h-full object-cover md:object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent md:hidden z-30 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent hidden md:block z-30 pointer-events-none" />

              {/* CONTROLES DE NAVEGACIÓN MÓVIL (dentro de la imagen) */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 md:hidden z-[70]">
                <button 
                  onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all shadow-2xl"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all shadow-2xl"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>

            {/* SECCIÓN DERECHA: Texto con Scroll Independiente */}
            <div className="flex-1 md:w-7/12 lg:w-1/2 flex flex-col bg-[#0a0a0a] overflow-y-auto custom-scrollbar z-20 relative">
              
              {/* Aquí estaba el error: justify-center empujaba el contenido largo fuera del área visible hacia arriba. */}
              {/* Cambiado a justify-start y agregado mt-auto mb-auto a un contenedor interior si se desea centrado sutil, pero para textos largos el justify-start es el único correcto. */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col min-h-full justify-start">
                
                {/* Usamos margin auto solo si el texto es corto para centrarlo, pero no fuerza el overflow-upwards */}
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                  className="my-auto"
                >
                  <div className="flex items-center gap-4 mb-6 pt-4 md:pt-0">
                    <div className="w-12 h-[1px] bg-sacromonte-red"></div>
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold">
                      {artist.role}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
                    {artist.name}
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed whitespace-pre-line text-justify">
                      {artist.description}
                    </p>
                  </div>

                  <div className="mt-16 border-t border-white/10 pt-8 text-gold/20 font-serif italic text-2xl md:text-3xl tracking-[0.1em] select-none text-right">
                    Venta el Gallo
                  </div>
                  
                  {/* Espacio extra abajo en móvil */}
                  <div className="h-8 md:h-0"></div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BiographyModal;
