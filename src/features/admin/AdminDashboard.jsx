import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users2, 
  UtensilsCrossed, 
  Images, 
  CalendarClock, 
  Activity, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2,
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getArtists, getMenuData, getCarouselImages, getPasesConfig } from '../../services/adminService';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    artistsCount: 0,
    menuItemsCount: 0,
    carouselCount: 0,
    pasesActive: 2
  });

  useEffect(() => {
    const artists = getArtists();
    const menu = getMenuData();
    const carousel = getCarouselImages();
    const pases = getPasesConfig();

    let totalDishes = 0;
    if (menu?.cartaData) {
      Object.values(menu.cartaData).forEach(arr => totalDishes += arr.length);
    }

    setStats({
      artistsCount: artists.length,
      menuItemsCount: totalDishes,
      carouselCount: carousel.length,
      pasesActive: (pases.pase1.active ? 1 : 0) + (pases.pase2.active ? 1 : 0)
    });
  }, []);

  const cards = [
    {
      title: 'Elenco de Artistas',
      value: `${stats.artistsCount} Artistas`,
      desc: 'Gestión de biografías, fotos y roles',
      icon: Users2,
      path: '/admin/artistas',
      tag: 'Activo',
      color: 'bg-white text-slate-900 border-gold/40 shadow-[0_10px_30px_rgba(212,175,55,0.1)]',
      iconBg: 'bg-gold/15 text-gold',
    },
    {
      title: 'Carta & Menús Gastronómicos',
      value: `${stats.menuItemsCount} Platos`,
      desc: 'Temporadas invierno/verano y 14 alérgenos',
      icon: UtensilsCrossed,
      path: '/admin/menu',
      tag: 'Sincronizado',
      color: 'bg-white text-slate-900 border-stone-300 shadow-sm',
      iconBg: 'bg-orange-500/10 text-orange-600',
    },
    {
      title: 'Carrusel de Experiencia',
      value: `${stats.carouselCount} Imágenes`,
      desc: 'Reordenación visual y optimización <500KB',
      icon: Images,
      path: '/admin/carrusel',
      tag: '11 Destacadas',
      color: 'bg-white text-slate-900 border-stone-300 shadow-sm',
      iconBg: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Pases & Tracking Google Ads',
      value: 'GTM-T22JXC3T',
      desc: 'Horarios de espectáculo y píxeles de conversión',
      icon: CalendarClock,
      path: '/admin/pases',
      tag: 'Conectado',
      color: 'bg-white text-slate-900 border-emerald-500/40 shadow-sm',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header Banner - Fondo Claro de Alto Lujo con Acento Oro */}
      <div className="relative rounded-3xl p-6 md:p-8 bg-white border border-gold/30 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-black text-[10px] uppercase font-bold tracking-[0.2em] mb-3">
              <Sparkles size={12} className="text-gold" />
              <span>Micro-SaaS Engine Activo</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif text-slate-900 uppercase tracking-tight font-bold">
              Panel de Control <span className="text-gold">Venta El Gallo</span>
            </h1>
            <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl font-normal">
              Sistema integral de autogestión para Cueva Flamenca Venta El Gallo. Administra artistas, carta, carrusel y tracking de Google Ads con sincronización en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Estado del Sistema</span>
              <div className="flex items-center gap-2 mt-0.5 justify-end">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-emerald-700">100% Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <Link
                to={card.path}
                className={`block h-full p-6 rounded-2xl ${card.color} hover:border-gold hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-300 text-slate-700 font-mono uppercase font-bold">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-600 mb-1">{card.title}</h3>
                  <p className="text-2xl font-serif font-bold text-slate-900 tracking-tight mb-1">{card.value}</p>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{card.desc}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-gold font-bold">
                  <span>Gestionar Módulo</span>
                  <ArrowUpRight size={15} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-gold" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Monitor de Salud y Google Ads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl p-6 bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif uppercase tracking-widest text-slate-900 font-bold flex items-center gap-2">
              <Activity size={18} className="text-gold" />
              <span>Gobernanza de Módulos & Sincronización</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono bg-stone-100 px-2 py-0.5 rounded">React 19 + Supabase Ready</span>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block font-bold">Sincronización Reactiva con Web Pública</strong>
                <span className="text-slate-500 text-[11px]">Capa desacoplada <code className="text-gold font-bold">adminService.js</code> lista para conexión instantánea a Supabase / Firebase.</span>
              </div>
              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block font-bold">Aislamiento de Producción IONOS</strong>
                <span className="text-slate-500 text-[11px]">El entorno en vivo permanece protegido sin ningún riesgo de alteración hasta tu aprobación final.</span>
              </div>
              <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block font-bold">Integración Oficial Google Tag Manager</strong>
                <span className="text-slate-500 text-[11px]">Contenedor <code className="text-gold font-bold">GTM-T22JXC3T</code> inyectado para medición de conversiones de Google Ads.</span>
              </div>
              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-gradient-to-b from-stone-900 via-black to-stone-900 text-white border border-gold/40 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-widest mb-3">
              <Tag size={16} />
              <span>Google Ads Tracking</span>
            </div>
            <h4 className="text-lg font-serif text-white mb-2">Caso Google: 9-7847000041569</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
              El contenedor <strong>GTM-T22JXC3T</strong> está configurado en el código fuente para recolectar eventos de reserva, clics de WhatsApp y llamadas telefónicas.
            </p>
          </div>

          <Link
            to="/admin/pases"
            className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-white text-black font-extrabold uppercase tracking-wider text-[11px] text-center transition-colors shadow-lg"
          >
            Ver Detalles de Tracking
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
