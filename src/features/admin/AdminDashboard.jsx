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
      accentColor: 'bg-gold',
    },
    {
      title: 'Carta & Menús Gastronómicos',
      value: `${stats.menuItemsCount} Platos`,
      desc: 'Temporadas invierno/verano y 14 alérgenos',
      icon: UtensilsCrossed,
      path: '/admin/menu',
      tag: 'Sincronizado',
      accentColor: 'bg-sacromonte-red',
    },
    {
      title: 'Carrusel de Experiencia',
      value: `${stats.carouselCount} Imágenes`,
      desc: 'Reordenación visual y optimización <500KB',
      icon: Images,
      path: '/admin/carrusel',
      tag: '11 Destacadas',
      accentColor: 'bg-gold',
    },
    {
      title: 'Pases & Tracking Google Ads',
      value: 'GTM-T22JXC3T',
      desc: 'Horarios de espectáculo y píxeles de conversión',
      icon: CalendarClock,
      path: '/admin/pases',
      tag: 'Conectado',
      accentColor: 'bg-sacromonte-red',
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header Banner - Marco Negro con Sombra Profunda */}
      <div className="relative rounded-[2rem] p-6 md:p-8 bg-[#FBFBFA] border-2 border-black shadow-[0_15px_35px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-gold text-[10px] uppercase font-black tracking-[0.2em] mb-3 shadow-sm border border-gold/30">
              <Sparkles size={12} className="text-gold" />
              <span>Micro-SaaS Engine Activo</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-[3px] bg-sacromonte-red"></div>
              <h1 className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight font-black">
                Panel de Control <span className="text-gold">Venta El Gallo</span>
              </h1>
            </div>
            <p className="text-slate-700 text-xs md:text-sm mt-1 max-w-xl font-medium leading-relaxed">
              Sistema integral de autogestión para Cueva Flamenca Venta El Gallo. Administra artistas, carta, carrusel y tracking de Google Ads con sincronización en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-5 py-3 rounded-2xl bg-white border-2 border-black shadow-md text-right">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest block font-black">Estado del Sistema</span>
              <div className="flex items-center gap-2 mt-0.5 justify-end">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-black text-emerald-800">100% Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas con Marcos Negros Exactos y Mismo Tamaño */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="h-full"
            >
              <Link
                to={card.path}
                className="h-full min-h-[260px] p-6 rounded-[2rem] bg-white border-2 border-black shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Indicador de acento superior */}
                <div className={`absolute top-0 inset-x-0 h-1.5 ${card.accentColor}`} />

                <div>
                  <div className="flex justify-between items-start mb-4 pt-1">
                    <div className="p-3.5 rounded-2xl bg-[#0B0E14] text-gold group-hover:scale-110 transition-transform shadow-md border border-black">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-slate-800 font-mono uppercase font-bold">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xs uppercase font-black tracking-wider text-slate-600 mb-1">{card.title}</h3>
                  <p className="text-2xl font-serif font-black text-black tracking-tight mb-1.5">{card.value}</p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{card.desc}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-black font-black uppercase tracking-wider group-hover:text-gold transition-colors">
                  <span>Gestionar Módulo</span>
                  <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Monitor de Salud y Google Ads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[2rem] p-6 md:p-8 bg-white border-2 border-black shadow-[0_15px_35px_rgba(0,0,0,0.08)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-sacromonte-red"></div>
              <h3 className="text-sm md:text-base font-serif uppercase tracking-widest text-black font-black flex items-center gap-2">
                <Activity size={18} className="text-gold" />
                <span>Gobernanza de Módulos & Sincronización</span>
              </h3>
            </div>
            <span className="text-[10px] text-slate-600 font-mono bg-stone-100 border border-stone-300 px-2.5 py-1 rounded-full font-bold">React 19 + Supabase Ready</span>
          </div>

          <div className="space-y-3.5 text-xs text-slate-800">
            <div className="p-4 rounded-2xl bg-[#FBFBFA] border-2 border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-black block font-black text-sm">Sincronización Reactiva con Web Pública</strong>
                <span className="text-slate-600 text-xs">Capa desacoplada <code className="text-black bg-gold/20 px-1.5 py-0.5 rounded font-bold">adminService.js</code> lista para conexión instantánea a Supabase / Firebase.</span>
              </div>
              <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-4 rounded-2xl bg-[#FBFBFA] border-2 border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-black block font-black text-sm">Aislamiento de Producción IONOS</strong>
                <span className="text-slate-600 text-xs">El entorno en vivo permanece 100% protegido sin ningún riesgo de alteración hasta tu aprobación final.</span>
              </div>
              <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-4 rounded-2xl bg-[#FBFBFA] border-2 border-stone-200 flex items-center justify-between">
              <div>
                <strong className="text-black block font-black text-sm">Integración Oficial Google Tag Manager</strong>
                <span className="text-slate-600 text-xs">Contenedor <code className="text-black bg-gold/20 px-1.5 py-0.5 rounded font-bold">GTM-T22JXC3T</code> inyectado para medición de conversiones de Google Ads.</span>
              </div>
              <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] p-6 md:p-8 bg-[#0B0E14] text-white border-2 border-black shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-sacromonte-red" />
          <div>
            <div className="flex items-center gap-2 text-gold text-xs uppercase font-black tracking-widest mb-3">
              <Tag size={16} />
              <span>Google Ads Tracking</span>
            </div>
            <h4 className="text-lg font-serif text-white mb-2 font-black">Caso Google: 9-7847000041569</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
              El contenedor <strong>GTM-T22JXC3T</strong> está configurado en el código fuente para recolectar eventos de reserva, clics de WhatsApp y llamadas telefónicas.
            </p>
          </div>

          <Link
            to="/admin/pases"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-white hover:to-white text-black font-black uppercase tracking-wider text-xs text-center transition-all shadow-md"
          >
            Ver Detalles de Tracking
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
