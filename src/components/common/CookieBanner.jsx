import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the basic cookies
    const hasAccepted = localStorage.getItem('vg_cookies_accepted');
    if (!hasAccepted) {
      // Small delay so it doesn't jump immediately on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('vg_cookies_accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-deep-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-white font-serif text-xl mb-2">Aviso de Cookies</h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed max-w-4xl">
                Utilizamos cookies propias estrictamente necesarias para el correcto funcionamiento técnico de la página web. Las cookies analíticas o de terceros relativas a reservas son gestionadas directamente por la pasarela de venta de entradas (Regiondo). Al pulsar "Aceptar", asume la configuración técnica básica para seguir navegando. Para más detalles, visite nuestra{' '}
                <Link to="/privacidad" onClick={() => setIsVisible(false)} className="text-gold hover:underline">
                  Política de Privacidad
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/aviso-legal"
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 text-xs uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors"
              >
                Aviso Legal
              </Link>
              <button
                onClick={acceptCookies}
                className="w-full sm:w-auto bg-gold hover:bg-gold-600 text-deep-black px-8 py-3 rounded-full text-xs uppercase font-black tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                Aceptar Todo
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
