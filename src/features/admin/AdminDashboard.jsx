import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users2, 
  UtensilsCrossed, 
  Images, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getArtists, getMenuData, getCarouselImages } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    artistsCount: 0,
    menuItemsCount: 0,
    carouselCount: 0,
  });

  useEffect(() => {
    const updateLocalStats = () => {
      const artists = getArtists();
      const menu = getMenuData();
      const carousel = getCarouselImages();

      let totalDishes = 0;
      if (menu?.cartaData) {
        Object.values(menu.cartaData).forEach(arr => {
          if (Array.isArray(arr)) totalDishes += arr.length;
        });
      }

      setStats({
        artistsCount: artists.length,
        menuItemsCount: totalDishes,
        carouselCount: carousel.length,
      });
    };

    updateLocalStats();
    window.addEventListener('veg_artists_updated', updateLocalStats);
    window.addEventListener('veg_menu_updated', updateLocalStats);
    window.addEventListener('veg_carousel_updated', updateLocalStats);

    return () => {
      window.removeEventListener('veg_artists_updated', updateLocalStats);
      window.removeEventListener('veg_menu_updated', updateLocalStats);
      window.removeEventListener('veg_carousel_updated', updateLocalStats);
    };
  }, []);

  const managementSections = [
    {
      title: 'Elenco de Artistas',
      subtitle: `${stats.artistsCount} Artistas`,
      description: 'Sube fotos directamente desde móvil o PC, edita biografías y actualiza el cartel flamenco en tiempo real.',
      icon: Users2,
      path: '/admin/artistas',
      btnText: 'Gestionar Artistas'
    },
    {
      title: 'Carta & Menús Gastronómicos',
      subtitle: `${stats.menuItemsCount} Platos`,
      description: 'Control estricto de platos con selector obligatorio (Carta Completa vs Menú Degustación), precios y alérgenos.',
      icon: UtensilsCrossed,
      path: '/admin/menu',
      btnText: 'Gestionar Carta'
    },
    {
      title: 'Carrusel de Fotos',
      subtitle: `${stats.carouselCount} Fotografías`,
      description: 'Sube nuevas fotografías de la cueva, cambia el orden visual y actualiza la galería de la web.',
      icon: Images,
      path: '/admin/carrusel',
      btnText: 'Gestionar Galería'
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 w-full min-w-0">
      
      {/* Header de Bienvenida Luxury */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-[1px] bg-sacromonte-red"></div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-gold">
            Gestión y Autogestión
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-tight">
          Panel de Control <span className="text-gold italic block sm:inline">Venta El Gallo</span>
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-2 max-w-2xl font-light leading-relaxed">
          Bienvenido al centro de administración. Desde aquí puedes actualizar de forma intuitiva los contenidos públicos de la web con sincronización en tiempo real.
        </p>
      </div>

      {/* Grid de Secciones de Gestión Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {managementSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="w-full"
            >
              <Link
                to={section.path}
                className="group block h-full p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                      {section.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A] font-bold group-hover:text-gold transition-colors mb-2">
                    {section.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-light mb-6">
                    {section.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-gold transition-colors">
                  <span>{section.btnText}</span>
                  <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform text-gold" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default AdminDashboard;
