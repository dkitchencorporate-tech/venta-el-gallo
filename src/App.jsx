import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './features/home/Home';
import History from './features/history/History';
import Artists from './features/artists/Artists';
import Restaurant from './features/restaurant/Restaurant';
import Booking from './features/booking/Booking';
import Agencias from './features/b2b/Agencias';
import Blog from './features/blog/Blog';
import BlogPost from './features/blog/BlogPost';
import Allergens from './features/restaurant/Allergens';
import Privacy from './features/legal/Privacy';
import Legal from './features/legal/Legal';
import Terms from './features/legal/Terms';
import { BookingProvider } from './context/BookingContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="historia" element={<History />} />
            <Route path="artistas" element={<Artists />} />
            <Route path="restaurante" element={<Restaurant />} />
            <Route path="alergenos" element={<Allergens />} />
            <Route path="privacidad" element={<Privacy />} />
            <Route path="aviso-legal" element={<Legal />} />
            <Route path="terminos-reserva" element={<Terms />} />
            <Route path="agencias" element={<Agencias />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contacto" element={<Booking />} />
          </Route>
        </Routes>
      </Router>
    </BookingProvider>
  );
}

// v2.6.2-final-push
export default App;
