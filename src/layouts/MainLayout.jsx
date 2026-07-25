import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Instagram, Facebook, MapPin, Phone, Mail, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../assets/raw/logoVentaelGallo.webp';
import FloatingActions from '../components/layout/FloatingActions';
import CookieBanner from '../components/common/CookieBanner';
import LanguageSelector, { languages } from '../components/common/LanguageSelector';
import ShareModal from '../components/ShareModal';
import { useBooking } from '../context/BookingContext';

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(() => i18n.language?.split('-')[0] || 'es');
  const location = useLocation();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = 'https://dkitchencorporate-tech.github.io/venta-el-gallo/#/';

  // Keep activeLang in sync with i18n regardless of which component triggered the change
  useEffect(() => {
    const handleLangChange = (lng) => {
      setActiveLang(lng.split('-')[0]);
    };
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'history', path: 'historia' },
    { key: 'artists', path: 'artistas' },
    { key: 'restaurant', path: 'restaurante' },
    { key: 'b2b', path: 'agencias' },
    { key: 'blog', path: 'blog' },
    { key: 'contact', path: 'contacto' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-deep-black">
      {/* Structural Navbar - Nuclear Standard (Glassmorphism) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'} px-6 lg:px-12 pointer-events-none`}>
        <div className={`w-full max-w-7xl mx-auto rounded-full px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-700 pointer-events-auto ${scrolled ? 'bg-deep-black/85 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent border border-transparent'}`}>
          <div className="flex items-center gap-4 lg:gap-6 xl:gap-12">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 md:gap-4 group">
              <img src={logoGallo} alt="Venta El Gallo Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className={`text-xs md:text-xl font-serif font-black tracking-widest uppercase transition-colors duration-500 whitespace-nowrap ${scrolled ? 'text-white' : 'text-white'}`}>
                  Venta El Gallo
                </span>
                {/* Mobile Menu Label - Premium Pulse */}
                <div className="lg:hidden flex items-center gap-2 w-full mt-0.5">
                  <div className="h-[0.5px] flex-grow bg-gold/30"></div>
                  <span className="text-[7px] font-black tracking-[0.4em] uppercase text-gold/80 animate-pulse-gold">MENU</span>
                  <div className="h-[0.5px] flex-grow bg-gold/30"></div>
                </div>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-6 ml-2 lg:ml-4 xl:ml-6">
               {navLinks.map((link) => {
                 const isActive = location.pathname.includes(link.path);
                 return (
                   <Link 
                     key={link.key} 
                     to={`/${link.path}`} 
                     className={`relative text-[8px] lg:text-[9px] xl:text-[10px] uppercase font-black tracking-widest whitespace-nowrap transition-all duration-500 hover:text-gold ${isActive ? 'text-gold' : 'text-gray-300'}`}
                   >
                     {t(`nav.${link.key}`) || link.key}
                     {isActive && (
                       <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-gold rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
                     )}
                   </Link>
                 );
               })}
            </div>
          </div>
          {/* CTA - Fixed Spacing and Rounding */}
          <button onClick={() => openBooking({from: 'header'})} className="hidden lg:block btn-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] whitespace-nowrap px-4 xl:px-6 py-2.5 xl:py-3.5 ml-auto text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-widest font-bold">
            {t('hero.cta') || 'Reservar'}
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col items-center gap-1 group relative z-50 p-2"
          >
            <div className={`w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : ''}`}></div>
            <div className={`w-4 h-px bg-gold transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[1px]' : ''}`}></div>
          </button>
        </div>
        {/* Mobile second row: Language selector with flags, below logo/hamburger, inside fixed nav */}
        <div className={`lg:hidden flex items-center justify-center gap-2 px-4 pb-2.5 pointer-events-auto ${isMenuOpen ? 'hidden' : ''}`}>
          {languages.map((lang) => {
            const FlagComponent = lang.Flag;
            return (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setActiveLang(lang.code); localStorage.setItem('i18nextLng', lang.code); }}
                className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                  activeLang === lang.code
                    ? 'text-deep-black bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                    : 'text-white/70 border border-white/20 bg-deep-black/60 backdrop-blur-md hover:text-white hover:border-white/50'
                }`}
              >
                <FlagComponent className="w-3.5 h-2.5" />
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Global Language Selector (Floating) - Desktop only */}
      <div className="hidden lg:block relative z-50">
        <LanguageSelector scrolled={scrolled} />
      </div>

      {/* Full Screen Mobile Menu - Premium 10k Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-deep-black/97 backdrop-blur-3xl flex flex-col items-center lg:hidden overflow-y-auto"
          >
            {/* Decorative glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-sacromonte-red/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Header row inside overlay: Logo + Close button */}
            <div className="relative z-10 w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img src={logoGallo} alt="Venta El Gallo" className="w-10 h-10 object-contain opacity-90" />
                <span className="text-sm font-serif font-black tracking-widest uppercase text-white">Venta El Gallo</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-sacromonte-red hover:border-sacromonte-red transition-all duration-300"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language selector - now fully visible, below header */}
            <div className="relative z-10 w-full flex justify-center py-4 border-b border-white/5">
              <LanguageSelector isMobileMenu={true} />
            </div>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-8 md:gap-10 relative z-10 w-full px-8 py-10 text-center">
               {navLinks.map((link, idx) => (
                 <motion.div
                   key={link.key}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.05 + idx * 0.08 }}
                 >
                   <Link 
                     to={`/${link.path}`} 
                     onClick={() => setIsMenuOpen(false)}
                     className="text-4xl font-serif text-white hover:text-gold transition-colors duration-500 tracking-tighter"
                   >
                     {t(`nav.${link.key}`) || link.key}
                   </Link>
                 </motion.div>
               ))}
               
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-4"
               >
                 <button 
                   onClick={() => { setIsMenuOpen(false); openBooking({from: 'mobile_menu'}); }}
                   className="btn-gold rounded-full px-12 py-5 shadow-[0_0_40px_rgba(212,175,55,0.2)] font-bold tracking-widest uppercase text-sm"
                 >
                   {t('hero.cta') || 'Reservar'}
                 </button>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Actions (WhatsApp/ScrollTop) */}
      <FloatingActions />
      <CookieBanner />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} shareUrl={shareUrl} />

      {/* Footer - High End Professional */}
      <footer className="bg-gradient-to-b from-deep-black to-[#0a0a0a] pt-24 pb-12 text-white/70 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
           
           {/* Column 1: Brand & Desc */}
           <div className="flex flex-col">
             <Link to="/" className="flex items-center gap-4 mb-8">
                <img src={logoGallo} alt="Venta El Gallo" className="w-16 h-16 opacity-80" />
                <span className="text-xl font-serif font-black tracking-widest uppercase text-white">Venta El Gallo</span>
             </Link>
             <p className="text-sm font-light leading-relaxed mb-6">
               {t('footer.desc')}
             </p>
             <div className="flex items-center gap-4">
               <a href="https://instagram.com/ventaelgalloficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-deep-black hover:border-gold transition-all duration-300"><Instagram size={18} /></a>
               <a href="https://www.facebook.com/ventaelgalloficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-deep-black hover:border-gold transition-all duration-300"><Facebook size={18} /></a>
               <button onClick={() => setIsShareOpen(true)} title="Compartir" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-deep-black hover:border-gold transition-all duration-300"><Share2 size={18} /></button>
             </div>
           </div>

           {/* Column 2: Navigation */}
           <div className="flex flex-col">
             <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-8">{t('footer.cols.exp.title')}</h4>
             <ul className="space-y-4">
               <li><Link to="/historia" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.exp.links.history')}</Link></li>
               <li><Link to="/artistas" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.exp.links.artists')}</Link></li>
               <li><Link to="/restaurante" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.exp.links.restaurant')}</Link></li>
               <li><Link to="/contacto" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.exp.links.contact')}</Link></li>
             </ul>
           </div>

           {/* Column 3: Legal */}
           <div className="flex flex-col">
             <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-8">{t('footer.cols.legal.title')}</h4>
             <ul className="space-y-4">
               <li><Link to="/aviso-legal" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.legal.links.legal')}</Link></li>
               <li><Link to="/privacidad" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.legal.links.privacy')}</Link></li>
               <li><Link to="/alergenos" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.legal.links.allergens')}</Link></li>
               <li><Link to="/terminos-reserva" className="text-sm font-light hover:text-gold transition-colors">{t('footer.cols.legal.links.terms')}</Link></li>
             </ul>
           </div>

           {/* Column 4: Contact */}
           <div className="flex flex-col">
             <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-8">{t('footer.cols.contact.title')}</h4>
             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <a href="https://maps.app.goo.gl/bqhxdVnUyf8Zvud2A" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                   <MapPin size={18} className="text-gold shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                   <span className="text-sm font-light leading-relaxed group-hover:text-gold transition-colors">Barranco de los Negros, 5<br/> 18010 Sacromonte, Granada</span>
                 </a>
               </li>
               <li className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-4">
                   <Phone size={18} className="text-gold shrink-0" />
                   <a href="tel:+34640147985" className="text-sm font-light hover:text-gold transition-colors">+34 640 14 79 85</a>
                 </div>
                 <div className="flex items-center gap-4 pl-8">
                   <a href="tel:+34858950315" className="text-sm font-light hover:text-gold transition-colors">+34 858 95 03 15</a>
                 </div>
               </li>
               <li className="flex items-center gap-4">
                 <Mail size={18} className="text-gold shrink-0" />
                 <a href="mailto:info@cuevaventaelgallo.es" className="text-sm font-light hover:text-gold transition-colors">info@cuevaventaelgallo.es</a>
               </li>
             </ul>
           </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col items-center">
           <div className="w-full h-px bg-white/5 mb-8"></div>
           <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-2">{t('footer.bottom.patrimony')}</p>
           <p className="text-[10px] uppercase tracking-wider text-white/20 mb-4">{t('footer.bottom.rights')}</p>
           <p className="text-[10px] uppercase tracking-wider text-white/20">
             {t('footer.bottom.designed_by')} <a href="https://hosteleria.architectsys.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Architect Sys</a>
           </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
