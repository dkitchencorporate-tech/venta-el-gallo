import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../../context/BookingContext';
import ctaBg from '../../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-2-1280x914-2.jpg';

// Passes moved inside component

const PasesPricing = () => {
  const { t } = useTranslation();
  const { openBooking } = useBooking();

  const passes = [
    {
      id: 'consumicion',
      title: t('restaurant_page.pricing.passes.consumicion.title'),
      price: '25€',
      subtitle: t('restaurant_page.pricing.passes.consumicion.subtitle'),
      features: t('restaurant_page.pricing.passes.consumicion.features', { returnObjects: true }),
      children: t('restaurant_page.pricing.passes.consumicion.children'),
      highlighted: false,
      delay: 0
    },
    {
      id: 'cena',
      title: t('restaurant_page.pricing.passes.cena.title'),
      price: '55€',
      subtitle: t('restaurant_page.pricing.passes.cena.subtitle'),
      features: t('restaurant_page.pricing.passes.cena.features', { returnObjects: true }),
      children: t('restaurant_page.pricing.passes.cena.children'),
      highlighted: true, // The core product
      delay: 0.15
    }
  ];

  return (
    <section className="relative z-20 -mt-10 md:-mt-16 lg:-mt-20 px-4 md:px-6 mb-16 lg:mb-20">
      <div className="container mx-auto">
        <div className="text-center mb-8 hidden md:block">
          <h2 className="text-xl lg:text-2xl font-serif text-white opacity-90 tracking-widest uppercase">{t('restaurant_page.pricing.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
          {passes.map((pass) => (
            <motion.div 
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: pass.delay }}
              className={`relative bg-[#FAFAFA] rounded-[1.5rem] p-6 lg:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col border transition-all duration-500 hover:-translate-y-1
                ${pass.highlighted 
                  ? 'border-gold shadow-[0_30px_60px_rgba(212,175,55,0.2)] md:-mt-4 md:mb-4 scale-[1.02] lg:scale-[1.05] z-10' 
                  : 'border-white/10 opacity-95 hover:opacity-100'}`}
            >
              {pass.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white text-[8px] lg:text-[9px] uppercase font-black tracking-widest py-1.5 px-4 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
                  {t('restaurant_page.pricing.recommended')}
                </div>
              )}
              
              <div className="text-center border-b border-gray-200 pb-5 mb-5 mt-2">
                <h3 className="text-lg lg:text-xl font-serif text-deep-black mb-2 flex items-center justify-center leading-tight">{pass.title}</h3>
                <p className="text-gray-500 font-light text-[11px] lg:text-xs mb-3">{pass.subtitle}</p>
                <div className="flex items-center justify-center items-baseline gap-1.5 text-deep-black">
                  <span className="text-4xl lg:text-5xl font-light tracking-tighter">{pass.price}</span>
                  <span className="text-gray-400 font-medium text-[10px] lg:text-xs">{t('restaurant_page.pricing.per_person')}</span>
                </div>
              </div>
              
              <ul className="flex-1 space-y-3 mb-6">
                {pass.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                     <span className="text-gold mt-1 text-[10px]">✦</span>
                     <span className="text-gray-700 font-medium text-[11px] lg:text-xs leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-gray-100 rounded-lg p-3 mb-6 text-center border border-gray-200">
                <p className="text-[9px] lg:text-[10px] text-gray-600 font-medium">{pass.children}</p>
              </div>
              
              <button 
                onClick={() => openBooking({ pack: pass.id })}
                className={`mt-auto w-full text-center py-3.5 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 border
                ${pass.highlighted 
                  ? 'bg-deep-black text-gold border-deep-black hover:bg-gold hover:text-deep-black hover:border-gold shadow-md' 
                  : 'bg-white text-deep-black border-gray-300 hover:border-deep-black hover:bg-deep-black hover:text-white'}`}
              >
                {t('restaurant_page.pricing.btn_book')}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="mt-20 md:mt-32 relative max-w-5xl mx-auto w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] group border border-white/10">
          <div className="absolute inset-0 bg-deep-black z-0">
             <img src={ctaBg} alt="Espectáculo Flamenco" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale-[30%]" />
             <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="max-w-xl text-left text-white">
              <div className="w-12 h-px bg-gold mb-6"></div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 tracking-tighter">
                {t('restaurant_page.pricing.cta_title_1')}<span className="italic text-gold">{t('restaurant_page.pricing.cta_title_2')}</span>
              </h3>
              <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                {t('restaurant_page.pricing.cta_subtitle')}
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <button 
                onClick={() => openBooking({ pack: 'direct' })}
                className="w-full md:w-auto btn-gold flex items-center justify-center gap-4 text-[10px] md:text-xs px-10 py-4 shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all"
              >
                <span className="font-bold tracking-widest uppercase">{t('restaurant_page.pricing.cta_button')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasesPricing;
