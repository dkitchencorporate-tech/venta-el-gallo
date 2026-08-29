import React, { useState, useEffect } from 'react';
import { CalendarClock, Save, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPasesConfig, savePasesConfig } from '../../../services/adminService';

const PasesManager = () => {
  const [config, setConfig] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setConfig(getPasesConfig());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!config) return;
    savePasesConfig(config);
    setToastMsg('Horarios y tarifas guardados correctamente.');
    setTimeout(() => setToastMsg(''), 3500);
  };

  if (!config) return <div className="p-8 text-stone-700">Cargando pases...</div>;

  return (
    <div className="space-y-8 fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Espectáculos Flamencos
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Horarios & <span className="text-gold italic">Tarifas</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Ajusta los horarios de las funciones y los precios por persona (Consumición: 25€ / Cena Gastronómica: 55€).
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
        >
          <Save size={16} />
          <span>Guardar Cambios</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium shadow-sm"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Primer Pase */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">Primer Pase Flamenco</h3>
                <span className="text-xs text-stone-400">Función de tarde (~19:00)</span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase1.active} 
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Horario de Inicio</label>
              <input
                type="text"
                value={config.pase1.time}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, time: e.target.value } })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-medium focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Show + Bebida</label>
                <input
                  type="text"
                  value={config.pase1.packShow.price}
                  onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packShow: { ...config.pase1.packShow, price: e.target.value } } })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Cena + Show (VIP)</label>
                <input
                  type="text"
                  value={config.pase1.packDinner.price}
                  onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packDinner: { ...config.pase1.packDinner, price: e.target.value } } })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-bold focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Segundo Pase */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">Segundo Pase Flamenco</h3>
                <span className="text-xs text-stone-400">Función estelar (~21:00)</span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase2.active} 
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Horario de Inicio</label>
              <input
                type="text"
                value={config.pase2.time}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, time: e.target.value } })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-medium focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Show + Bebida</label>
                <input
                  type="text"
                  value={config.pase2.packShow.price}
                  onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packShow: { ...config.pase2.packShow, price: e.target.value } } })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">Cena + Show (VIP)</label>
                <input
                  type="text"
                  value={config.pase2.packDinner.price}
                  onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packDinner: { ...config.pase2.packDinner, price: e.target.value } } })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] font-bold focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PasesManager;
