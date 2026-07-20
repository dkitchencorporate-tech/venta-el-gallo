import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';

// Data from PDF
const menuData = {
  entrantes: [
    { title: "Tabla de embutido", desc: "Queso, jamón, chorizo, etc" }
  ],
  primerPlato: [
    { title: "Tortilla sacromonte", desc: "Con sesos de cordero" },
    { title: "Ensalada Gallo", desc: "Ensalada mixta con huevo" },
    { title: "Habas con jamón y huevo", desc: "" }
  ],
  invierno: [
    { title: "Sopa de cebolla y queso", desc: "Con pan tostado" },
    { title: "Sopa de marisco", desc: "Con pan tostado" },
    { title: "Sopa de picadillo", desc: "Con pollo, jamón y huevo" }
  ],
  verano: [
    { title: "Salmorejo", desc: "Sopa de tomate con pan, jamón y huevo" },
    { title: "Gazpacho", desc: "Sopa de tomate y pepino" },
    { title: "Melón con jamón", desc: "" },
    { title: "Ajoblanco", desc: "" }
  ],
  principal: [
    { title: "Bacalao frito con tomate", desc: "" },
    { title: "Merluza en salsa verde", desc: "Con patatas a lo pobre" },
    { title: "Lomo de cerdo en salsa mozárabe", desc: "Con patatas a lo pobre" },
    { title: "Ternera en salsa jardinera", desc: "Con patatas a lo pobre" },
    { title: "Pollo al ajillo", desc: "Con patatas a lo pobre" }
  ],
  postres: [
    "Natillas de vainilla", "Tarta de chocolate", "Arroz con leche", "Helado", "Tarta de queso"
  ]
};

const cartaData = {
  entrantes: [
    { title: "Ensalada Gallo", desc: "Ensalada mixta con huevo", price: "14€" },
    { title: "Ensalada de pimientos", desc: "Con huevo", price: "11€" },
    { title: "Ensalada de gambas y aguacate", desc: "", price: "16.5€" },
    { title: "Tomate aliñao", desc: "", price: "10€" },
    { title: "Tabla de jamón ibérico", desc: "", price: "20€" },
    { title: "Tabla de queso curado", desc: "", price: "20€" },
    { title: "Tabla de ibéricos", desc: "", price: "20€" },
    { title: "Tortilla de Sacromonte", desc: "", price: "12€" },
    { title: "Tortilla de espárragos", desc: "", price: "11€" },
    { title: "Berenjenas con miel de caña", desc: "", price: "10€" },
    { title: "Wok de verduras", desc: "", price: "14€" },
    { title: "Gambas al ajillo", desc: "", price: "16€" },
    { title: "Croquetas de pollo", desc: "", price: "14€" },
    { title: "Surtido de croquetas de ibéricos", desc: "", price: "14€" },
    { title: "Habas con jamón y huevo", desc: "", price: "14€" }
  ],
  invierno: [
    { title: "Sopa de cebolla", desc: "Con pan tostado y queso", price: "8€" },
    { title: "Sopa de marisco", desc: "Con pan tostado", price: "8€" },
    { title: "Sopa de picadillo", desc: "Con pollo, jamón y huevo", price: "8€" }
  ],
  verano: [
    { title: "Salmorejo", desc: "Sopa de tomate con pan, jamón y huevo", price: "9€" },
    { title: "Gazpacho", desc: "Sopa de tomate y pepino", price: "9€" },
    { title: "Melón con jamón", desc: "", price: "9€" }
  ],
  pescados: [
    { title: "Bacalao frito con tomate", desc: "", price: "17€" },
    { title: "Merluza en salsa verde", desc: "Con patatas a lo pobre", price: "16.5€" },
    { title: "Dorada a la plancha", desc: "Con patatas a lo pobre", price: "18€" }
  ],
  carnes: [
    { title: "Solomillo de cerdo", desc: "Con patatas a lo pobre", price: "18€" },
    { title: "Lomo de cerdo en salsa mozárabe", desc: "Con patatas a lo pobre", price: "16.5€" },
    { title: "Ternera en salsa jardinera", desc: "Con patatas a lo pobre", price: "17€" },
    { title: "Pollo al ajillo", desc: "Con patatas a lo pobre", price: "15€" },
    { title: "Entrecot de ternera", desc: "Con patatas a lo pobre", price: "24€" },
    { title: "Chuletillas de cordero", desc: "Con patatas a lo pobre", price: "19€" }
  ],
  postres: [
    { title: "Natillas de vainilla", price: "3.5€" },
    { title: "Tarta de chocolate", price: "5€" },
    { title: "Arroz con leche", price: "3.5€" },
    { title: "Helado", price: "3.5€" },
    { title: "Tarta de queso", price: "5€" }
  ],
  bebidas1: [
    { title: "Sangría", price: "3.5€" },
    { title: "Jarra de sangría", price: "16€" },
    { title: "Cerveza barril", price: "3€" },
    { title: "Jarra de cerveza", price: "15€" },
    { title: "Agua pequeña", desc: "Con o sin gas", price: "1.5€" },
    { title: "Botella de agua grande", desc: "(750ml)", price: "3€" },
    { title: "Refrescos o zumos", price: "3€" },
  ],
  bebidas2: [
    { title: "Botella de vino tinto o blanco de la casa", price: "18€" },
    { title: "Vino blanco, tinto o rosado", price: "3.5€" },
    { title: "Botella de vino tinto Rioja", price: "22€" },
    { title: "Botella de vino tinto Protos", price: "22€" }
  ]
};

const MenuHeader = ({ type }) => (
  <div className="text-center mb-6 md:mb-10 pt-2 md:pt-4">
    <div className="inline-flex flex-col items-center max-w-full px-4">
      <h2 className="font-serif italic text-sacromonte-red text-xl md:text-3xl mb-1">Venta el Gallo</h2>
      <p className="text-gray-500 font-serif text-[10px] md:text-sm tracking-[0.2em] uppercase mb-4 text-center">Restaurante flamenco</p>
      <div className="w-10 h-px bg-gold mb-4 md:mb-6"></div>
      <h1 className="font-serif text-3xl md:text-6xl tracking-[0.15em] text-deep-black uppercase">
        {type === 'menu' ? 'MENÚ' : 'CARTA'}
      </h1>
    </div>
  </div>
);

const SectionTitle = ({ title, sub = false }) => (
  <div className="flex items-center justify-center gap-2 md:gap-4 mb-5 md:mb-8 mt-4">
    <div className="h-[2px] bg-gold/40 flex-1 min-w-[0.5rem] max-w-[4rem] sm:max-w-none"></div>
    <h3 className={`font-serif text-sacromonte-red uppercase text-center px-1 md:px-3 shrink-0 leading-relaxed ${sub ? 'text-sm md:text-lg font-medium tracking-[0.1em] sm:tracking-[0.15em]' : 'text-lg md:text-2xl font-bold tracking-[0.15em] sm:tracking-[0.2em]'}`}>
      {title}
    </h3>
    <div className="h-[2px] bg-gold/40 flex-1 min-w-[0.5rem] max-w-[4rem] sm:max-w-none"></div>
  </div>
);

const MenuItem = ({ title, desc, price }) => {
  if (!price) {
    // Si no hay precio (Menú Cerrado), centramos todo y damos jerarquía a la descripción
    return (
      <div className="mb-5 group w-full text-center flex flex-col items-center">
        <h4 className="font-serif text-deep-black text-lg md:text-xl font-medium tracking-wide leading-snug">{title}</h4>
        {desc && (
          <p className="text-xs md:text-sm text-gray-500/80 font-serif italic mt-1 tracking-wide max-w-md leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    );
  }

  // Layout para Carta (Con Precios) - Justificado
  return (
    <div className="mb-4 group w-full">
      <div className="flex justify-between items-end gap-2 md:gap-4 w-full">
        <h4 className="font-serif text-deep-black text-base md:text-lg font-medium tracking-wide flex-1 leading-snug pr-2 pb-0.5">{title}</h4>
        <div className="flex-1 border-b-[2px] border-dotted border-gray-300/60 relative top-[-6px] min-w-[1rem] hidden sm:block"></div>
        <span className="font-serif text-sacromonte-red text-lg md:text-xl font-bold whitespace-nowrap pb-0.5">{price}</span>
      </div>
      {desc && <p className="text-xs md:text-sm text-gray-500/80 font-serif italic mt-0.5">{desc}</p>}
    </div>
  );
};

const MenuLayout = () => (
  <div className="w-full bg-[#fcfbf9] min-h-full p-2 sm:p-6 md:p-10 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pb-24">
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100 p-5 sm:p-8 md:p-12 mb-6 flex flex-col gap-8 md:gap-10">
      <MenuHeader type="menu" />
      
      {/* 1. ENTRANTE */}
      <div className="w-full">
        <SectionTitle title="ENTRANTE" />
        <div className="max-w-xl mx-auto mt-4">
          {menuData.entrantes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>

      {/* 2. PRIMER PLATO */}
      <div className="w-full">
        <SectionTitle title="PRIMER PLATO" />
        <div className="max-w-xl mx-auto mb-8 mt-4">
          {menuData.primerPlato.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
        
        {/* Sub-secciones de Temporada dentro de Primer Plato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">❅</span>
            </div>
            <SectionTitle title="Temporada de invierno" sub={true} />
            <div className="mt-4">
              {menuData.invierno.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">☼</span>
            </div>
            <SectionTitle title="Temporada de verano" sub={true} />
            <div className="mt-4">
              {menuData.verano.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRINCIPAL */}
      <div className="w-full">
        <SectionTitle title="PRINCIPAL" />
        <div className="max-w-xl mx-auto mt-4">
          {menuData.principal.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>
      
      {/* 4. POSTRES CASEROS */}
      <div className="w-full">
        <SectionTitle title="POSTRES CASEROS" />
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 max-w-2xl mx-auto">
          {menuData.postres.map((item, i) => (
            <span key={i} className="font-serif text-deep-black text-sm md:text-base border border-gold/30 px-5 py-2 rounded-full bg-[#faf9f6] shadow-sm text-center hover:border-gold hover:bg-gold/5 transition-colors">{item}</span>
          ))}
        </div>
      </div>

      {/* 5. BEBIDAS INCLUIDAS - DISEÑO PREMIUM */}
      <div className="bg-[#0a0a0a] border border-gold/30 text-white rounded-[2rem] p-6 sm:p-10 relative overflow-hidden w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] mt-2">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sacromonte-red/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gold/40 w-8 md:w-16"></div>
            <h3 className="font-serif text-gold text-lg md:text-2xl tracking-[0.2em] uppercase text-center font-bold">BEBIDAS INCLUIDAS</h3>
            <div className="h-px bg-gold/40 w-8 md:w-16"></div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 mb-8 text-center backdrop-blur-sm">
            <p className="font-serif text-white text-base md:text-xl tracking-wide mb-2">
              1 bebida de bienvenida espectáculo
            </p>
            <p className="font-serif text-gold/80 italic text-sm md:text-base mb-3">
              (sangría o cerveza)
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-white/20 w-6"></div>
              <span className="text-white/50 text-lg">+</span>
              <div className="h-px bg-white/20 w-6"></div>
            </div>
            <p className="font-serif text-white text-base md:text-lg tracking-wide mt-3">
              2 bebidas del menú
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 text-center max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Sangría</h4>
              <div className="w-6 h-px bg-gold/30 mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Cerveza</h4>
              <div className="w-6 h-px bg-gold/30 mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Agua</h4>
              <span className="text-[9px] md:text-[10px] text-white/50 font-sans mt-1 uppercase tracking-[0.2em]">Con o sin gas</span>
              <div className="w-6 h-px bg-gold/30 mt-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Zumo</h4>
              <span className="text-[9px] md:text-[10px] text-white/50 font-sans mt-1 uppercase tracking-[0.2em]">Melocotón, piña, naranja</span>
              <div className="w-6 h-px bg-gold/30 mt-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Refrescos</h4>
              <span className="text-[9px] md:text-[10px] text-white/50 font-sans mt-1 uppercase tracking-[0.2em]">Menta y jengibre</span>
              <div className="w-6 h-px bg-gold/30 mt-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-white text-base md:text-xl tracking-wider mb-1">Vino</h4>
              <span className="text-[9px] md:text-[10px] text-white/50 font-sans mt-1 uppercase tracking-[0.2em]">Blanco o tinto</span>
              <div className="w-6 h-px bg-gold/30 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CartaLayout = () => (
  <div className="w-full bg-[#fcfbf9] min-h-full p-2 sm:p-6 md:p-10 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pb-24">
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100 p-5 sm:p-8 md:p-12 mb-6 flex flex-col gap-8 md:gap-10">
      <MenuHeader type="carta" />
      
      {/* 1. ENTRANTES */}
      <div className="w-full">
        <SectionTitle title="ENTRANTES" />
        <div className="max-w-xl mx-auto mb-8 mt-4">
          {cartaData.entrantes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>

        {/* Sub-secciones de Temporada como Parte de Entrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">❅</span>
            </div>
            <SectionTitle title="Temporada de invierno" sub={true} />
            <div className="mt-4">
              {cartaData.invierno.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          <div className="bg-[#faf9f6] p-6 rounded-3xl border border-gray-200/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.01)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf9f6] px-3">
              <span className="text-gold text-xl">☼</span>
            </div>
            <SectionTitle title="Temporada de verano" sub={true} />
            <div className="mt-4">
              {cartaData.verano.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
        </div>
      </div>

      {/* 2. PESCADOS */}
      <div className="w-full">
        <SectionTitle title="PESCADOS" />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.pescados.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>

      {/* 3. CARNES */}
      <div className="w-full">
        <SectionTitle title="CARNES" />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.carnes.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>

      {/* 4. POSTRES CASEROS */}
      <div className="w-full">
        <SectionTitle title="POSTRES CASEROS" />
        <div className="max-w-xl mx-auto mt-4">
          {cartaData.postres.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      </div>

      {/* 5. BODEGA Y BEBIDAS */}
      <div className="w-full mt-4 pt-8 border-t-[2px] border-gold/30">
        <SectionTitle title="BODEGA Y BEBIDAS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-8 max-w-3xl mx-auto">
          <div className="min-w-0">
            {cartaData.bebidas1.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>
          <div className="min-w-0">
            {cartaData.bebidas2.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ModalPortal = ({ activeModal, onClose, onReserve }) => {
  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-deep-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
      style={{ zIndex: 999999 }} 
      onClick={onClose}
    >
      {/* Botón de cierre superior (flotante) */}
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
        {/* Menu Content Area - Scrollable */}
        <div className="flex-1 w-full relative overflow-y-auto custom-scrollbar">
          {activeModal === 'menu' ? <MenuLayout /> : <CartaLayout />}
        </div>
        
        {/* Fixed Footer with Reserve Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-center items-center shadow-[0_-20px_40px_rgba(0,0,0,0.08)] z-[90]">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onReserve();
              }}
              className="bg-gold text-deep-black hover:bg-deep-black hover:text-white px-8 sm:px-12 md:px-24 py-3 md:py-4 rounded-full font-black text-sm md:text-base uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Hacer Reserva
            </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};


const InteractiveMenu = () => {
  const { i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState(null); 
  const lang = i18n.language || 'es';
  const { openBooking } = useBooking();

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
      title: lang === 'en' ? 'Set Menus' : lang === 'fr' ? 'Menus' : 'Nuestros Menús',
      subtitle: lang === 'en' ? 'Discover our special tasting menus included in the show passes.' : lang === 'fr' ? 'Découvrez nos menus dégustation spéciaux.' : 'Descubre nuestros menús degustación especiales incluidos en los pases.',
    },
    {
      id: 'carta',
      title: lang === 'en' ? 'A La Carte' : lang === 'fr' ? 'À La Carte' : 'Carta del Restaurante',
      subtitle: lang === 'en' ? 'Explore our full selection of traditional dishes and tapas.' : lang === 'fr' ? 'Explorez notre sélection complète de plats traditionnels.' : 'Explora nuestra selección completa de platos tradicionales y tapas.',
    }
  ];

  const handleReserve = () => {
    setActiveModal(null);
    // Añadimos un pequeño retraso para que el modal del menú se cierre antes de abrir el de reservas
    setTimeout(() => {
      openBooking('menu_modal');
    }, 150);
  };

  return (
    <section className="py-20 bg-metallic-white relative z-10 -mt-10" id="menus">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-deep-black mb-6">
            Nuestra <span className="text-gold italic">Gastronomía</span>
          </h2>
          <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto mb-8">
            Nuestra propuesta gastronómica está diseñada para complementar el arte flamenco. 
            Elige tu menú ideal o disfruta de nuestra carta completa.
          </p>
          <Link 
            to="/alergenos" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sacromonte-red hover:text-gold transition-colors font-bold"
          >
            <Info size={14} /> Información de Alérgenos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveModal(card.id)}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gold/10 hover:border-gold/30 cursor-pointer transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                <ExternalLink size={24} />
              </div>
              <h3 className="text-2xl font-serif text-deep-black mb-4">{card.title}</h3>
              <p className="text-gray-600 font-light mb-8">{card.subtitle}</p>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold border-b border-transparent group-hover:border-gold transition-colors">
                {card.id === 'menu' ? 'Ver Menú' : 'Ver Carta'}
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
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveMenu;
