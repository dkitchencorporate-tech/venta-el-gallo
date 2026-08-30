import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Users2, 
  UtensilsCrossed, 
  Images, 
  LayoutDashboard, 
  LogOut, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../assets/raw/logoVentaelGallo.webp';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Artistas', path: '/admin/artistas', icon: Users2 },
    { name: 'Carta & Menú', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Carrusel de Fotos', path: '/admin/carrusel', icon: Images },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* 1. TOPBAR FIJA SUPERIOR (RESPONSIVA) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 z-30 flex items-center justify-between px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-600 hover:text-black hover:bg-stone-100 lg:hidden flex-shrink-0"
            title="Menú"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src={logoGallo} alt="Venta El Gallo" className="h-8 sm:h-9 w-auto drop-shadow-sm flex-shrink-0" />
            <div className="truncate">
              <span className="font-serif font-black text-xs sm:text-sm uppercase tracking-wider text-[#1A1A1A] block leading-none truncate">
                Venta El Gallo
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gold uppercase font-bold block mt-0.5 truncate">
                Panel Administrativo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href="#/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-stone-300 hover:border-gold text-stone-700 hover:text-black text-xs font-semibold transition-all bg-stone-50/50 hover:bg-gold/10"
          >
            <ExternalLink size={13} className="text-gold" />
            <span>Ver Web</span>
          </a>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-stone-100 hover:bg-sacromonte-red/10 text-stone-700 hover:text-sacromonte-red text-xs font-semibold transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* 2. CONTENEDOR PRINCIPAL */}
      <div className="flex-1 pt-16 flex relative w-full overflow-x-hidden">
        
        {/* SIDEBAR CONTINUO 100VH FIJO (Escritorio) */}
        <aside
          className={`hidden lg:flex fixed top-16 bottom-0 left-0 bg-[#0B0E14] text-white flex-col justify-between border-r border-white/10 z-20 transition-all duration-300 ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gold text-black font-bold shadow-lg shadow-gold/20'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                  title={collapsed ? item.name : undefined}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10 flex items-center justify-between">
            {!collapsed && (
              <div className="text-[11px] text-stone-400 font-light truncate">
                <span className="block text-white font-medium">Sacromonte, Granada</span>
                <span>Modo Autónomo</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-xl bg-white/5 hover:bg-gold hover:text-black text-stone-400 transition-colors mx-auto"
              title={collapsed ? 'Expandir Menú' : 'Colapsar Menú'}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTENIDO CON SCROLL FLUIDO SIN OVERFLOW */}
        <main
          className={`flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 ${
            collapsed ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          <div className="max-w-6xl mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>

      {/* 3. MENÚ MÓVIL OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-72 max-w-[85vw] h-full bg-[#0B0E14] text-white p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={logoGallo} alt="Logo" className="h-8 w-auto" />
                    <span className="font-serif text-sm uppercase tracking-widest text-gold font-bold">Venta El Gallo</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-white p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-gold text-black font-bold shadow-md'
                              : 'text-stone-300 hover:text-white hover:bg-white/10'
                          }`
                        }
                      >
                        <Icon size={18} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-xs font-semibold text-stone-200"
                >
                  <ExternalLink size={14} />
                  <span>Ver Web Pública</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sacromonte-red/20 text-sacromonte-red text-xs font-semibold"
                >
                  <LogOut size={14} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminLayout;
