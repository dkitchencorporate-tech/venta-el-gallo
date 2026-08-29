import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users2, 
  UtensilsCrossed, 
  Images, 
  CalendarClock, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../assets/raw/logoVentaelGallo.webp';

const navItems = [
  { name: 'Panel Principal', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Gestor de Artistas', path: '/admin/artistas', icon: Users2 },
  { name: 'Carta y Menú', path: '/admin/menu', icon: UtensilsCrossed },
  { name: 'Carrusel de Fotos', path: '/admin/carrusel', icon: Images },
  { name: 'Pases & Tracking', path: '/admin/pases', icon: CalendarClock },
];

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-slate-900 flex flex-col font-sans selection:bg-gold/30 selection:text-black">
      
      {/* Topbar Flotante Isla de Lujo */}
      <div className="pt-3 px-3 md:pt-4 md:px-6 z-40 sticky top-0">
        <header className="h-16 md:h-18 rounded-[2rem] border-2 border-black/90 bg-[#0B0E14]/95 text-white backdrop-blur-2xl px-5 md:px-8 flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.35)] relative overflow-hidden">
          
          {/* Línea sutil superior de acento oro */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-gold hover:bg-white/20 transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <img src={logoGallo} alt="Logo" className="h-10 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm uppercase tracking-widest text-gold font-black">Venta El Gallo</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-sacromonte-red"></div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold/15 border border-gold/40 text-gold uppercase font-mono font-bold">Admin Engine</span>
                </div>
                <p className="text-[10px] text-slate-400 font-light">Panel de Control & Autogestión</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="#/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-gold transition-colors px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:border-gold/50 shadow-sm"
            >
              <ExternalLink size={14} />
              <span>Ver Sitio Web</span>
            </a>

            <div className="flex items-center gap-3 pl-3 border-l border-white/15">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold/30 to-gold/10 border-2 border-gold/50 flex items-center justify-center text-gold font-black text-xs shadow-md">
                {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white truncate max-w-[140px]">{currentUser?.email || 'admin@ventaelgallo.com'}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold">Sesión Activa</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Cerrar Sesión"
                className="p-2.5 rounded-xl text-slate-400 hover:text-sacromonte-red hover:bg-sacromonte-red/15 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="flex-1 flex overflow-hidden p-3 md:p-6 gap-4 md:gap-6">
        
        {/* Sidebar Flotante Isla Redondeada en Desktop */}
        <aside className={`hidden md:flex flex-col rounded-[2.2rem] border-2 border-black/90 bg-[#0B0E14]/95 text-white backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="p-4 flex flex-col gap-2 flex-1">
            <div className="px-3 py-2 text-[10px] uppercase font-black tracking-widest text-gold/80 flex items-center gap-2">
              <div className="w-2 h-[2px] bg-sacromonte-red"></div>
              {!sidebarCollapsed ? 'Módulos de Gestión' : '•••'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-gold via-[#e8cd6e] to-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] font-black'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon size={19} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {!sidebarCollapsed && <span className="truncate tracking-wide">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2.5 px-3 rounded-xl text-[11px] font-bold text-slate-400 hover:text-gold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <ChevronRight size={15} className={`transform transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
              {!sidebarCollapsed && <span>Plegar Menú</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Drawer Flotante */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-md p-4 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -280, scale: 0.95 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: -280, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-72 h-[90vh] bg-[#0B0E14] border-2 border-black rounded-[2.5rem] p-6 flex flex-col text-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <img src={logoGallo} alt="Logo" className="h-9 w-auto" />
                    <span className="font-serif text-xs uppercase tracking-widest text-gold font-bold">Admin Venta El Gallo</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-gold text-black font-black shadow-md'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`
                        }
                      >
                        <Icon size={18} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href="#/"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-xs font-bold text-slate-200"
                  >
                    <ExternalLink size={14} />
                    <span>Ver Web Pública</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sacromonte-red/20 text-sacromonte-red text-xs font-bold"
                  >
                    <LogOut size={14} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido Principal con Fondo Aperlado y Tarjetas con Marcos Negros de Autor */}
        <main className="flex-1 overflow-y-auto custom-scrollbar rounded-[2.2rem] bg-white border-2 border-black/90 p-6 md:p-8 lg:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
