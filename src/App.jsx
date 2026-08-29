import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './features/home/Home';
import Restaurant from './features/restaurant/Restaurant';
import Artists from './features/artists/Artists';
import History from './features/history/History';
import Agencias from './features/b2b/Agencias';
import Booking from './features/booking/Booking';
import Blog from './features/blog/Blog';
import BlogPost from './features/blog/BlogPost';
import Privacy from './features/legal/Privacy';
import Terms from './features/legal/Terms';
import Legal from './features/legal/Legal';

// Admin Components
import AdminLogin from './features/admin/AdminLogin';
import AdminDashboard from './features/admin/AdminDashboard';
import ArtistManager from './features/admin/components/ArtistManager';
import MenuManager from './features/admin/components/MenuManager';
import CarouselManager from './features/admin/components/CarouselManager';
import PasesManager from './features/admin/components/PasesManager';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <ScrollToTop />
        <Routes>
          {/* Rutas Públicas Principales */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="restaurante" element={<Restaurant />} />
            <Route path="artistas" element={<Artists />} />
            <Route path="historia" element={<History />} />
            <Route path="agencias" element={<Agencias />} />
            <Route path="reservas" element={<Booking />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacidad" element={<Privacy />} />
            <Route path="terminos" element={<Terms />} />
            <Route path="aviso-legal" element={<Legal />} />
          </Route>

          {/* Rutas de Administración Micro-SaaS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="artistas" element={<ArtistManager />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="carrusel" element={<CarouselManager />} />
            <Route path="pases" element={<PasesManager />} />
          </Route>
        </Routes>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
