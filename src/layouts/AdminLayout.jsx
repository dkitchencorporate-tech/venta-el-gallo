import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../assets/raw/logoVentaelGallo.webp';

const navItems = [
  { name: 'Panel Principal', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Gestor de Artistas', path: '/admin/artistas', icon: Users2 },
  { name: 'Carta y Menú', path: '/admin/menu', icon: UtensilsCrossed },
  { name: 'Carrusel de Fotos', path: '/admin/carrusel', icon: Images },
  { name: 'Pases & Tarifas', path: '/admin/pases', icon: CalendarClock },
];

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-gold/30 selection:text-black">
      
      {/* Topbar Fija y Limpia */}
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <img src={logoGallo} alt="Logo" className="h-9 w-auto object-contain" />
            <div>
              <span className="font-serif text-sm uppercase tracking-widest text-[#1A1A1A] font-bold">Venta El Gallo</span>
              <span className="text-[10px] text-stone-400 block font-light">Panel de Administración</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#/"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-gold transition-colors px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200"
          >
            <ExternalLink size={14} />
            <span>Ver Web Pública</span>
          </a>

          <div className="flex items-center gap-3 pl-3 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-xs">
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="p-2 rounded-lg text-stone-400 hover:text-sacromonte-red transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Fijo Compacto en Desktop (Sin Scroll - Todo Visible) */}
        <aside className={`hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 bg-[#0B0E14] text-white border-r border-gold/20 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} justify-between p-4`}>
          
          {/* Navegación Superior */}
          <div className="flex flex-col gap-1.5">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-[0.2em] text-gold/80 flex items-center gap-2">
              <div className="w-2 h-[1px] bg-sacromonte-red"></div>
              {!sidebarCollapsed && <span>Menú de Gestión</span>}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gold text-black font-bold shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {!sidebarCollapsed && <span className="truncate tracking-wide">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          {/* Botón Plegar / Desplegar en la Base */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2.5 px-3 rounded-xl text-xs text-stone-400 hover:text-gold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
              className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-72 h-full bg-[#0B0E14] text-white p-6 flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <img src={logoGallo} alt="Logo" className="h-8 w-auto" />
                      <span className="font-serif text-sm uppercase tracking-widest text-gold font-bold">Venta El Gallo</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-white">
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

        {/* Contenido Principal con Fondo Aperlado y Tarjetas de Alto Lujo */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
