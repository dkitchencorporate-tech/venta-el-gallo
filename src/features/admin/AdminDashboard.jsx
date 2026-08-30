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
    const artists = getArtists();
    const menu = getMenuData();
    const carousel = getCarouselImages();

    let totalDishes = 0;
    if (menu?.cartaData) {
      Object.values(menu.cartaData).forEach(arr => totalDishes += arr.length);
    }

    setStats({
      artistsCount: artists.length,
      menuItemsCount: totalDishes,
      carouselCount: carousel.length,
    });
  }, []);

  const managementSections = [
    {
      title: 'Elenco de Artistas',
      subtitle: `${stats.artistsCount} Artistas en Cartelera`,
      description: 'Sube fotos directamente desde tu móvil o PC, edita biografías y actualiza el cartel flamenco en tiempo real.',
      icon: Users2,
      path: '/admin/artistas',
      btnText: 'Gestionar Artistas'
    },
    {
      title: 'Carta & Menús Gastronómicos',
      subtitle: `${stats.menuItemsCount} Platos Registrados`,
      description: 'Control estricto de platos con asignación a Carta Completa o Menú Degustación, precios y alérgenos.',
      icon: UtensilsCrossed,
      path: '/admin/menu',
      btnText: 'Gestionar Carta'
    },
    {
      title: 'Carrusel de Fotos',
      subtitle: `${stats.carouselCount} Fotografías Activas`,
      description: 'Sube nuevas fotografías de la cueva, cambia el orden visual y actualiza la galería de la web.',
      icon: Images,
      path: '/admin/carrusel',
      btnText: 'Gestionar Galería'
    }
  ];

  return (
    <div className="space-y-10 fade-in">
      
      {/* Header de Bienvenida Luxury */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-[1px] bg-sacromonte-red"></div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gold">
            Gestión y Autogestión
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-tight">
          Panel de Control <span className="text-gold italic">Venta El Gallo</span>
        </h1>
        <p className="text-stone-500 text-sm mt-2 max-w-2xl font-light leading-relaxed">
          Bienvenido al centro de administración. Desde aquí puedes actualizar de forma intuitiva los contenidos públicos de la web.
        </p>
      </div>

      {/* Grid de Secciones de Gestión */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {managementSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              <Link
                to={section.path}
                className="group block h-full p-8 rounded-3xl bg-white border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                      {section.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-[#1A1A1A] font-bold group-hover:text-gold transition-colors mb-2">
                    {section.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-light mb-6">
                    {section.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-gold transition-colors">
                  <span>{section.btnText}</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform text-gold" />
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
