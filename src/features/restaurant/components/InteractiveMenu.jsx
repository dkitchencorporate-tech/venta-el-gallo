import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import GastronomyCarousel from './GastronomyCarousel';
import { getMenuData } from '../../../services/adminService';
import i18next from 'i18next';

const MenuHeader = ({ type }) => {
  const { t } = useTranslation();
  return (
  <div className="text-center mb-6 md:mb-10 pt-2 md:pt-4">
    <div className="inline-flex flex-col items-center max-w-full px-4">
      <h2 className="font-serif italic text-sacromonte-red text-xl md:text-3xl mb-1">Venta el Gallo</h2>
      <p className="text-gray-500 font-serif text-[10px] md:text-sm tracking-[0.2em] uppercase mb-4 text-center">{t('restaurant_page.interactive_menu.header.restaurant')}</p>
      <div className="w-10 h-px bg-gold mb-4 md:mb-6"></div>
      <h1 className="font-serif text-3xl md:text-6xl tracking-[0.15em] text-deep-black uppercase">
        {type === 'menu' ? t('restaurant_page.interactive_menu.header.menu') : t('restaurant_page.interactive_menu.header.carta')}
      </h1>
    </div>
  </div>
  );
};

const SectionTitle = ({ title, sub = false }) => (
  <div className="flex items-center justify-center gap-2 md:gap-4 mb-5 md:mb-8 mt-4">
    <div className="h-[2px] bg-gold/40 flex-1 min-w-[0.5rem] max-w-[4rem] sm:max-w-none"></div>
    <h3 className={`font-serif text-sacromonte-red uppercase text-center px-1 md:px-3 shrink-0 leading-relaxed ${sub ? 'text-sm md:text-lg font-medium tracking-[0.1em] sm:tracking-[0.15em]' : 'text-lg md:text-2xl font-bold tracking-[0.15em] sm:tracking-[0.2em]'}`}>
      {title}
    </h3>
    <div className="h-[2px] bg-gold/40 flex-1 min-w-[0.5rem] max-w-[4rem] sm:max-w-none"></div>
  </div>
);

const MenuItem = ({ title, desc, price, name, description }) => {
  const itemTitle = title || name || '';
  const itemDesc = desc || description || '';

  if (!price) {
    return (
      <div className="mb-5 group w-full text-center flex flex-col items-center">
        <h4 className="font-serif text-deep-black text-lg md:text-xl font-medium tracking-wide leading-snug">{itemTitle}</h4>
        {itemDesc && (
          <p className="text-xs md:text-sm text-gray-500/80 font-serif italic mt-1 tracking-wide max-w-md leading-relaxed">
            {itemDesc}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 group w-full">
      <div className="flex justify-between items-end gap-2 md:gap-4 w-full">
        <h4 className="font-serif text-deep-black text-base md:text-lg font-medium tracking-wide flex-1 leading-snug pr-2 pb-0.5">{itemTitle}</h4>
        <div className="flex-1 border-b-[2px] border-dotted border-gray-300/60 relative top-[-6px] min-w-[1rem] hidden sm:block"></div>
        <span className="font-serif text-sacromonte-red text-lg md:text-xl font-bold whitespace-nowrap pb-0.5">{price}</span>
      </div>
      {itemDesc && <p className="text-xs md:text-sm text-gray-500/80 font-serif italic mt-0.5">{itemDesc}</p>}
    </div>
  );
};

const MenuLayout = ({ liveMenu }) => {
  const { t } = useTranslation();
  const menuData = liveMenu?.menuData || t('restaurant_page.interactive_menu.menuData', { returnObjects: true });
  return (
  <div className="w-full bg-[#fcfbf9] min-h-full p-2 sm:p-6 md:p-10 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pb-24">
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100 p-5 sm:p-8 md:p-12 mb-6 flex flex-col gap-8 md:gap-10">
      <MenuHeader type="menu" />
      
      {/* 1. ENTRANTE */}
      {menuData.entrantes && menuData.entrantes.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.entrante')} />
        <div className="max-w-xl mx-auto mt-4">
          {menuData.entrantes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}

      {/* 2. PRIMER PLATO */}
      {(menuData.primerPlato?.length > 0 || menuData.invierno?.length > 0 || menuData.verano?.length > 0) && (
      <div className="w-full">
        {menuData.primerPlato?.length > 0 && (
          <>
            <SectionTitle title={t('restaurant_page.interactive_menu.sections.primer_plato')} />
            <div className="max-w-xl mx-auto mb-8 mt-4">
              {menuData.primerPlato.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </>
        )}
        
        {(menuData.invierno?.length > 0 || menuData.verano?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
          {menuData.invierno?.length > 0 && (
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">❅</span>
            </div>
            <SectionTitle title={t('restaurant_page.interactive_menu.sections.invierno')} sub={true} />
            <div className="mt-4">
              {menuData.invierno.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          )}
          {menuData.verano?.length > 0 && (
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">☼</span>
            </div>
            <SectionTitle title={t('restaurant_page.interactive_menu.sections.verano')} sub={true} />
            <div className="mt-4">
              {menuData.verano.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          )}
        </div>
        )}
      </div>
      )}

      {/* 3. PRINCIPAL */}
      {menuData.principal && menuData.principal.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.principal')} />
        <div className="max-w-xl mx-auto mt-4">
          {menuData.principal.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}
      
      {/* 4. POSTRES CASEROS */}
      {menuData.postres && menuData.postres.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.postres')} />
        <div className="max-w-xl mx-auto mt-4">
          {menuData.postres.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}
    </div>
  </div>
  );
};

const CartaLayout = ({ liveMenu }) => {
  const { t } = useTranslation();
  const cartaData = liveMenu?.cartaData || t('restaurant_page.interactive_menu.cartaData', { returnObjects: true });
  return (
  <div className="w-full bg-[#fcfbf9] min-h-full p-2 sm:p-6 md:p-10 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pb-24">
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100 p-5 sm:p-8 md:p-12 mb-6 flex flex-col gap-8 md:gap-10">
      <MenuHeader type="carta" />
      
      {/* 1. ENTRANTES */}
      {cartaData.entrantes && cartaData.entrantes.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.entrantes')} />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.entrantes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}

      {/* SUB-SECCIONES DE TEMPORADA */}
      {(cartaData.invierno?.length > 0 || cartaData.verano?.length > 0) && (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {cartaData.invierno?.length > 0 && (
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">❅</span>
            </div>
            <SectionTitle title={t('restaurant_page.interactive_menu.sections.invierno')} sub={true} />
            <div className="mt-4">
              {cartaData.invierno.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          )}
          {cartaData.verano?.length > 0 && (
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">☼</span>
            </div>
            <SectionTitle title={t('restaurant_page.interactive_menu.sections.verano')} sub={true} />
            <div className="mt-4">
              {cartaData.verano.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          )}
        </div>
      </div>
      )}

      {/* 2. PESCADOS */}
      {cartaData.pescados && cartaData.pescados.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.pescados')} />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.pescados.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}

      {/* 3. CARNES */}
      {cartaData.carnes && cartaData.carnes.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.carnes')} />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.carnes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}

      {/* 4. POSTRES CASEROS */}
      {cartaData.postres && cartaData.postres.length > 0 && (
      <div className="w-full">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.postres')} />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.postres.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      )}

      {/* 5. BODEGA Y BEBIDAS */}
      <div className="w-full mt-4 pt-8 border-t-[2px] border-gold/30">
        <SectionTitle title={t('restaurant_page.interactive_menu.sections.bodega')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-8 max-w-3xl mx-auto">
          <div className="min-w-0">
            {cartaData.bebidas1?.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>
          <div className="min-w-0">
            {cartaData.bebidas2?.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const ModalPortal = ({ activeModal, onClose, onReserve, liveMenu }) => {
  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-deep-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
      style={{ zIndex: 999999 }} 
      onClick={onClose}
    >
      <button 
        className="fixed top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-deep-black text-white hover:bg-sacromonte-red hover:scale-110 transition-all z-[9999999] shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={24} className="md:w-7 md:h-7" />
      </button>
      
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-full md:h-[95vh] md:rounded-3xl bg-[#fcfbf9] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex-1 w-full relative overflow-y-auto custom-scrollbar">
          {activeModal === 'menu' ? <MenuLayout liveMenu={liveMenu} /> : <CartaLayout liveMenu={liveMenu} />}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-center items-center shadow-[0_-20px_40px_rgba(0,0,0,0.08)] z-[90]">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onReserve();
              }}
              className="bg-gold text-deep-black hover:bg-deep-black hover:text-white px-8 sm:px-12 md:px-24 py-3 md:py-4 rounded-full font-black text-sm md:text-base uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center"
            >
              {i18next.t('restaurant_page.interactive_menu.modal.hacer_reserva')}
            </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

const InteractiveMenu = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState(null); 
  const [liveMenu, setLiveMenu] = useState(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    setLiveMenu(getMenuData());
    const handleUpdate = (e) => setLiveMenu(e.detail || getMenuData());
    window.addEventListener('veg_menu_updated', handleUpdate);
    return () => window.removeEventListener('veg_menu_updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  const cards = [
    {
      id: 'menu',
      title: t('restaurant_page.interactive_menu.section.cards.menu_title'),
      subtitle: t('restaurant_page.interactive_menu.section.cards.menu_desc'),
    },
    {
      id: 'carta',
      title: t('restaurant_page.interactive_menu.section.cards.carta_title'),
      subtitle: t('restaurant_page.interactive_menu.section.cards.carta_desc'),
    }
  ];

  const handleReserve = () => {
    setActiveModal(null);
    setTimeout(() => {
      openBooking({ from: 'menu_modal' });
    }, 150);
  };

  return (
    <section className="py-20 bg-metallic-white relative z-10 -mt-10" id="menus">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-deep-black mb-6">
            {t('restaurant_page.interactive_menu.section.title_1')}<span className="text-gold italic">{t('restaurant_page.interactive_menu.section.title_2')}</span>
          </h2>
          <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto mb-8">
            {t('restaurant_page.interactive_menu.section.desc')}
          </p>
          <Link 
            to="/alergenos" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sacromonte-red hover:text-gold transition-colors font-bold"
          >
            <Info size={14} /> {t('restaurant_page.interactive_menu.section.allergens')}
          </Link>
        </div>

        <GastronomyCarousel />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveModal(card.id)}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gold/10 hover:border-gold/30 cursor-pointer transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                <ExternalLink size={24} />
              </div>
              <h3 className="text-2xl font-serif text-deep-black mb-3">{card.title}</h3>
              <p className="text-gray-600 font-light text-base mb-8 max-w-sm">{card.subtitle}</p>
              <span className="text-xs uppercase tracking-[0.2em] font-black text-gold border-b border-transparent group-hover:border-gold transition-colors mt-auto">
                {card.id === 'menu' ? t('restaurant_page.interactive_menu.section.cards.menu_link') : t('restaurant_page.interactive_menu.section.cards.carta_link')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <ModalPortal 
            activeModal={activeModal} 
            onClose={() => setActiveModal(null)} 
            onReserve={handleReserve}
            liveMenu={liveMenu}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveMenu;
