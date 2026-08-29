import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, Mail, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGallo from '../../assets/raw/logoVentaelGallo.webp';

const AdminResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { requestPasswordReset, confirmPasswordReset } = useAuth();

  const [email, setEmail] = useState('info@cuevaventaelgallo.es');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. Enviar Solicitud de Recuperación
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      setMessage(res.message || 'Si el correo coincide con el administrador, se ha enviado un enlace de recuperación.');
    } catch (err) {
      setError(err.message || 'Error al solicitar el enlace.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Confirmar Nueva Contraseña con Token
  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPass) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const res = await confirmPasswordReset(token, password);
      setMessage(res.message || 'Contraseña actualizada con éxito.');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2500);
    } catch (err) {
      setError(err.message || 'El enlace de recuperación es inválido o ha expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className="w-full max-w-md bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative z-10">
        
        {/* Cabecera */}
        <div className="text-center mb-8">
          <img src={logoGallo} alt="Venta El Gallo" className="h-14 mx-auto mb-4 object-contain" />
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Seguridad Administrativa
            </span>
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
          </div>
          <h1 className="text-2xl font-serif text-[#1A1A1A] font-bold">
            {token ? 'Restablecer Contraseña' : 'Recuperar Acceso'}
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-light">
            {token 
              ? 'Introduce tu nueva contraseña segura para acceder al panel.' 
              : 'Introduce tu correo corporativo para recibir un enlace seguro de un solo uso.'}
          </p>
        </div>

        {/* Alertas */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 mb-6"
            >
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 mb-6"
            >
              <Check size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulario 1: Solicitar Enlace */}
        {!token && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5 font-semibold">
                Correo Corporativo
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all mt-4 disabled:opacity-50"
            >
              {loading ? 'Enviando enlace...' : 'Enviar Enlace de Recuperación'}
            </button>
          </form>
        )}

        {/* Formulario 2: Confirmar Nueva Contraseña */}
        {token && (
          <form onSubmit={handleConfirmReset} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5 font-semibold">
                Nueva Contraseña
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5 font-semibold">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all mt-4 disabled:opacity-50"
            >
              {loading ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
            </button>
          </form>
        )}

        {/* Enlace Volver a Login */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            <span>Volver al Inicio de Sesión</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default AdminResetPassword;
