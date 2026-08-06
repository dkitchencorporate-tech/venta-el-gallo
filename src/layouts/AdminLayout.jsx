import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Image as ImageIcon, Menu, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Protect Admin Routes
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { name: 'Imágenes Carrusel', path: '/admin/carrusel', icon: <ImageIcon size={20} /> },
    { name: 'Gestión de Carta', path: '/admin/menu', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="h-screen w-full bg-[#0d0d0d] text-white font-sans flex overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sacromonte-red/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-96 bg-gold/10 rounded-full blur-[150px]" />
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleMobile}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-dark-charcoal/80 backdrop-blur-md rounded-xl text-gold border border-gold/20 hover:bg-gold hover:text-deep-black transition-all shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '80px',
          x: window.innerWidth < 768 ? (isMobileOpen ? 0 : '-100%') : 0
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        className={`fixed md:relative top-0 left-0 h-screen bg-[#111111]/95 backdrop-blur-3xl border-r border-white/20 z-50 flex flex-col shadow-[10px_0_50px_rgba(0,0,0,0.8)] overflow-hidden`}
        style={{ position: window.innerWidth < 768 ? 'fixed' : 'relative' }}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/20 relative">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 text-center"
              >
                <h2 className="font-serif text-2xl text-gold tracking-widest">ADMIN</h2>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-1">Venta El Gallo</p>
              </motion.div>
            ) : (
              <motion.div 
                key="short-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex justify-center"
              >
                <h2 className="font-serif text-2xl text-gold">V</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-3 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && closeMobile()}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? 'bg-sacromonte-red/10 text-white border border-sacromonte-red/30 shadow-[0_0_15px_rgba(220,38,38,0.15)]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                } ${!isSidebarOpen && 'justify-center px-0'}`}
                title={!isSidebarOpen ? item.name : ''}
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1 bg-sacromonte-red" />
                )}
                <div className={`${isActive ? 'text-sacromonte-red' : 'group-hover:text-gold transition-colors'}`}>
                  {item.icon}
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium text-sm tracking-wide whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-white/10 bg-[#0a0a0a]/50">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 px-2"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Sesión activa</p>
                <p className="text-sm text-gold truncate font-medium">{currentUser.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={logout}
            className={`w-full flex items-center justify-center gap-3 px-4 py-3 bg-sacromonte-red text-white hover:bg-red-700 border border-sacromonte-red rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] group ${!isSidebarOpen && 'px-0 bg-transparent border-transparent hover:bg-sacromonte-red/10 text-sacromonte-red hover:text-sacromonte-red shadow-none'}`}
            title="Cerrar Sesión"
          >
            <LogOut size={18} className={`transition-transform ${isSidebarOpen ? 'group-hover:-translate-x-1' : 'group-hover:scale-110'}`} />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  Salir
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Desktop Toggle Button (At the bottom) */}
        <div className="hidden md:flex border-t border-white/20 bg-[#0d0d0d]">
          <button 
            onClick={toggleSidebar}
            className="w-full py-4 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ChevronLeft size={16} /> Colapsar
              </div>
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen max-h-screen overflow-y-auto relative z-10 w-full no-scrollbar">
        <div className="p-6 md:p-12 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
