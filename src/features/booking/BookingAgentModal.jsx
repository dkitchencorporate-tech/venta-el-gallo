import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import BookingAgent from './components/BookingAgent';
import logoGallo from '../../assets/raw/logoVentaelGallo.webp';
import { useTranslation } from 'react-i18next';

const BookingAgentModal = () => {
  const { isBookingOpen, closeBooking } = useBooking();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12"
        >
          {/* Glassmorphism Backdrop */}
          <div 
            className="absolute inset-0 bg-deep-black/80 backdrop-blur-md transition-opacity"
            onClick={closeBooking}
          ></div>

          {/* Modal Container - Split Design */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full md:w-auto md:max-w-6xl md:h-[85vh] md:max-h-[800px] bg-deep-black md:rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-0 md:border border-gold/30 overflow-hidden flex flex-col md:flex-row z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeBooking}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[120] w-10 h-10 md:w-12 md:h-12 rounded-full bg-deep-black/50 backdrop-blur-md text-white border border-white/20 md:border-gold/50 flex items-center justify-center hover:bg-sacromonte-red transition-all hover:rotate-90 shadow-2xl"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {/* Left Side - Premium Branding (Hidden on Mobile) */}
            <div className="hidden md:flex flex-1 relative bg-deep-black p-12 flex-col justify-between overflow-hidden border-r border-gold/20">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1533558661603-9d2983b620c3?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-transparent"></div>
              
              <div className="relative z-10">
                <img src={logoGallo} alt="Venta El Gallo" className="w-16 h-16 opacity-90 mb-8" />
                <h2 className="text-4xl font-serif text-white leading-tight mb-4">
                  {t('booking_modal.title_1')} <span className="text-gold block">{t('booking_modal.title_2')}</span>
                </h2>
                <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
                  {t('booking_modal.desc')}
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gold text-[9px] uppercase tracking-widest font-bold mb-2">{t('booking_modal.guarantee_title')}</h4>
                  <p className="text-white text-sm font-light">{t('booking_modal.guarantee_desc')}</p>
                </div>
                <div>
                  <h4 className="text-gold text-[9px] uppercase tracking-widest font-bold mb-2">{t('booking_modal.location_title')}</h4>
                  <p className="text-white text-sm font-light">{t('booking_modal.location_desc')}</p>
                </div>
              </div>
            </div>

            {/* Right Side / Mobile Full - The Regiondo Widget Container */}
            {/* Wider container to accommodate the multi-month calendar without horizontal overflow */}
            <div className="w-full md:w-[550px] lg:w-[750px] shrink-0 bg-white relative h-full flex flex-col overflow-y-auto overflow-x-hidden">
              <BookingAgent />
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingAgentModal;
