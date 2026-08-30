import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ExternalLink, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../../assets/raw/logoVentaelGallo.webp';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className="w-full max-w-md bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img src={logoGallo} alt="Venta El Gallo" className="h-14 mx-auto mb-4 object-contain" />
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Panel Administrativo
            </span>
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
          </div>
          <h1 className="text-2xl font-serif text-[#1A1A1A] font-bold">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-light">
            Gestión interna de Cueva Flamenca Venta El Gallo
          </p>
        </div>

        {/* Alerta de Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 mb-6 font-medium"
            >
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5 font-semibold">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@dominio.es"
                autoComplete="email"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                Contraseña
              </label>
              <Link
                to="/admin/reset-password"
                className="text-[11px] text-gold hover:underline font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all mt-4 disabled:opacity-50"
          >
            {loading ? 'Accediendo...' : 'Entrar al Panel'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-gold transition-colors">
            <ExternalLink size={13} />
            <span>Volver a la Web</span>
          </Link>
          <span className="text-[10px] text-stone-400 font-mono">v2.0 Luxury</span>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
