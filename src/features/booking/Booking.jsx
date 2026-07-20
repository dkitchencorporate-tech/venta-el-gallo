import React, { useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/raw/Venta-El-Gallo-1-1280x961-2.jpg';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';

const Booking = () => {
  const { t } = useTranslation();
  const { openBooking } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in min-h-screen bg-deep-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 filter grayscale"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/60 to-deep-black"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <header className="max-w-4xl mx-auto text-center mb-16 mt-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white mb-6"
            >
              {t('contact_page.hero.title_1')}<span className="text-gold">{t('contact_page.hero.title_2')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light text-lg max-w-2xl mx-auto"
            >
              {t('contact_page.hero.desc')}
            </motion.p>
          </header>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto mb-20"
          >
            {/* Phone Button */}
            <a 
              href="tel:+34958049461"
              className="w-full sm:w-1/2 flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md border border-white/20 px-8 py-6 rounded-2xl hover:bg-white/10 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div className="text-left flex-grow">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">{t('contact_page.buttons.call_title')}</p>
                <p className="text-xl font-serif text-white group-hover:text-gold transition-colors">+34 958 049 461</p>
              </div>
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/34606739990"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 flex items-center justify-between gap-4 bg-[#25D366]/10 backdrop-blur-md border border-[#25D366]/30 px-8 py-6 rounded-2xl hover:bg-[#25D366]/20 transition-all duration-300 group"
            >
              <div className="text-left flex-grow">
                <p className="text-[10px] text-[#25D366] uppercase tracking-widest font-black mb-1">{t('contact_page.buttons.chat_title')}</p>
                <p className="text-xl font-serif text-white group-hover:text-[#25D366] transition-colors">+34 606 739 990</p>
              </div>
              {/* TODO: Add specific WhatsApp logo provided by Germán */}
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
            </a>
          </motion.div>

          {/* Map and Email Section */}
          <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 p-2 md:p-4 rounded-3xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Interactive Google Map */}
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.1627883907577!2d-3.5855074843997576!3d37.17260515437812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcb9e6f21221%3A0xd9f6b92a4e9bd33c!2sCueva%20Venta%20El%20Gallo!5e0!3m2!1sen!2ses!4v1689849547849!5m2!1sen!2ses" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0 opacity-100 transition-transform duration-700 group-hover:scale-105"
                ></iframe>
                
                {/* Overlay Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 via-transparent to-transparent pointer-events-none z-10 flex flex-col justify-end p-6">
                  <a 
                    href="https://maps.app.goo.gl/EENmvH26tV34ZXDHA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-2 bg-white text-deep-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-colors w-fit shadow-xl"
                  >
                    <Navigation size={16} />
                    {t('contact_page.map.button')}
                  </a>
                </div>
              </div>

              {/* Email Block */}
              <div className="bg-deep-black/60 rounded-2xl p-8 md:p-12 flex flex-col justify-center border border-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white mb-8">
                  <Mail size={32} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">{t('contact_page.email.title')}</h3>
                <p className="text-gray-400 font-light mb-8">
                  {t('contact_page.email.desc')}
                </p>
                <a 
                  href="mailto:info@cuevaventaelgallo.es"
                  className="inline-flex items-center justify-center bg-gold text-deep-black px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-colors"
                >
                  {t('contact_page.email.button')}
                </a>
              </div>

            </div>

            {/* Reservation Button Section */}
            <div className="mt-4 bg-deep-black/60 rounded-2xl p-8 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
              <div>
                <h3 className="text-2xl font-serif text-white mb-2">{t('contact_page.cta.title')}</h3>
                <p className="text-gray-400 font-light text-sm">{t('contact_page.cta.desc')}</p>
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); openBooking({ from: 'contact_page' }); }}
                className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center bg-sacromonte-red text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-deep-black transition-all duration-300 shadow-xl hover:shadow-gold/20"
              >
                {t('contact_page.cta.button')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
