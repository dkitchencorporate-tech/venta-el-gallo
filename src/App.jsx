import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Vistas Públicas
import Home from './features/home/Home';
import Artists from './features/artists/Artists';
import Restaurant from './features/restaurant/Restaurant';
import History from './features/history/History';
import Agencias from './features/b2b/Agencias';
import Booking from './features/booking/Booking';
import Blog from './features/blog/Blog';
import Legal from './features/legal/Legal';
import Privacy from './features/legal/Privacy';
import Terms from './features/legal/Terms';
import Allergens from './features/restaurant/Allergens';

// Vistas del Admin
import AdminLogin from './features/admin/AdminLogin';
import AdminResetPassword from './features/admin/AdminResetPassword';
import AdminDashboard from './features/admin/AdminDashboard';
import ArtistManager from './features/admin/components/ArtistManager';
import MenuManager from './features/admin/components/MenuManager';
import CarouselManager from './features/admin/components/CarouselManager';

import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 1. Rutas Públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="artistas" element={<Artists />} />
          <Route path="restaurante" element={<Restaurant />} />
          <Route path="historia" element={<History />} />
          <Route path="agencias" element={<Agencias />} />
          <Route path="reservas" element={<Booking />} />
          <Route path="blog" element={<Blog />} />
          <Route path="aviso-legal" element={<Legal />} />
          <Route path="privacidad" element={<Privacy />} />
          <Route path="terminos" element={<Terms />} />
          <Route path="alergenos" element={<Allergens />} />
        </Route>

        {/* 2. Autenticación y Seguridad del Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        {/* 3. Panel de Administración Protegido */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="artistas" element={<ArtistManager />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="carrusel" element={<CarouselManager />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
