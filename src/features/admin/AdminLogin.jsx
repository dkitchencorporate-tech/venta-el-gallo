import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import logoGallo from '../../assets/raw/logoVentaelGallo.webp';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Credenciales incorrectas. Acceso exclusivo para administradores autorizados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090E] relative overflow-hidden px-4 selection:bg-gold/30 selection:text-white">
      
      {/* Background Decorativo Dinámico */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#8B0000]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,14,0.85)_100%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/70 backdrop-blur-2xl border border-gold/30 p-8 md:p-10 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          
          {/* Resplandor superior dorado */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block mb-4"
            >
              <img 
                src={logoGallo} 
                alt="Venta El Gallo" 
                className="h-16 w-auto mx-auto object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
              />
            </motion.div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-2">
              <ShieldCheck size={12} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Acceso Seguro</span>
            </div>
            
            <h1 className="font-serif text-2xl md:text-3xl text-white tracking-wide uppercase mt-1">
              Panel de Control
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Cueva Flamenca Venta El Gallo (Sacromonte)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 font-medium">
                Usuario / Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d1017]/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  placeholder="admin@ventaelgallo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 font-medium">
                Clave de Seguridad
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d1017]/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sacromonte-red text-xs bg-sacromonte-red/10 border border-sacromonte-red/30 p-3 rounded-xl text-center leading-relaxed"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold via-[#e6ca65] to-gold hover:from-white hover:to-white text-black font-extrabold uppercase tracking-[0.2em] text-xs py-4 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-gold transition-colors">
              ← Volver al Sitio Web Principal
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
