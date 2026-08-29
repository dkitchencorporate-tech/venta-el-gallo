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
  ShieldCheck, 
  Sparkles,
  ChevronRight
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

  const getPageTitle = () => {
    const current = navItems.find(item => item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path));
    return current ? current.name : 'Administración';
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-gold/30 selection:text-white">
      
      {/* Topbar Fija Micro-SaaS */}
      <header className="h-16 border-b border-gold/15 bg-black/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gold hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <img src={logoGallo} alt="Logo" className="h-9 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm uppercase tracking-widest text-gold font-bold">Venta El Gallo</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/10 border border-gold/30 text-gold uppercase font-mono font-bold">Admin Engine</span>
              </div>
              <p className="text-[10px] text-slate-400 font-light">Panel de Control & Autogestión</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-gold transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-gold/30"
          >
            <ExternalLink size={13} />
            <span>Ver Sitio Web</span>
          </a>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-xs">
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-white truncate max-w-[140px]">{currentUser?.email || 'admin@ventaelgallo.com'}</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-semibold">Sesión Activa</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="p-2 rounded-lg text-slate-400 hover:text-sacromonte-red hover:bg-sacromonte-red/10 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className={`hidden md:flex flex-col border-r border-gold/15 bg-black/60 backdrop-blur-md transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="p-4 flex flex-col gap-1.5 flex-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {!sidebarCollapsed ? 'Navegación del Sistema' : '•••'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  <Icon size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2 px-3 rounded-lg text-[11px] text-slate-400 hover:text-gold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 border border-white/5"
            >
              <ChevronRight size={14} className={`transform transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
              {!sidebarCollapsed && <span>Plegar Menú</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-72 h-full bg-[#0d0f15] border-r border-gold/20 p-5 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <img src={logoGallo} alt="Logo" className="h-8 w-auto" />
                    <span className="font-serif text-xs uppercase tracking-widest text-gold font-bold">Admin Venta El Gallo</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-gold/20 text-gold border border-gold/30'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                    href="/"
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 text-xs text-slate-300"
                  >
                    <ExternalLink size={14} />
                    <span>Ver Web Pública</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sacromonte-red/10 text-sacromonte-red text-xs font-medium"
                  >
                    <LogOut size={14} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido Principal */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-10 bg-gradient-to-b from-[#07090E] via-[#090C12] to-[#07090E]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
