import React, { useState, useEffect } from 'react';
import { CalendarClock, Save, Check, Tag, Clock, Sparkles } from 'lucide-react';
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
    setToastMsg('Configuración de pases y tarifas reales guardada correctamente.');
    setTimeout(() => setToastMsg(''), 3500);
  };

  if (!config) return <div className="p-8 text-slate-800">Cargando configuración...</div>;

  return (
    <div className="space-y-8 fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-widest mb-1">
            <CalendarClock size={16} />
            <span>Configuración de Espectáculos & Tracking</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-slate-900 uppercase tracking-tight font-bold">
            Pases & <span className="text-gold">Google Ads</span>
          </h1>
          <p className="text-slate-600 text-xs mt-1 font-normal">
            Ajusta los horarios y tarifas exactas de los pases de flamenco (Consumición: 25€ / Cena Gastronómica: 55€) y monitor de GTM.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-black hover:text-gold text-black font-extrabold uppercase tracking-wider text-xs shadow-md transition-colors"
        >
          <Save size={16} />
          <span>Guardar Configuración</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-medium shadow-sm"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Primer Pase */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="font-serif text-lg text-slate-900 font-bold flex items-center gap-2">
              <Clock size={18} className="text-gold" />
              <span>Primer Pase (~19:00 Zambra Flamenca)</span>
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase1.active} 
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Hora</label>
              <input
                type="text"
                value={config.pase1.time}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, time: e.target.value } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Espectáculo + Bebida</label>
              <input
                type="text"
                value={config.pase1.packShow.price}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packShow: { ...config.pase1.packShow, price: e.target.value } } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Cena + Show (VIP)</label>
              <input
                type="text"
                value={config.pase1.packDinner.price}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packDinner: { ...config.pase1.packDinner, price: e.target.value } } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
          </div>
        </div>

        {/* Segundo Pase */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="font-serif text-lg text-slate-900 font-bold flex items-center gap-2">
              <Clock size={18} className="text-gold" />
              <span>Segundo Pase (~21:00 Zambra Flamenca)</span>
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase2.active} 
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Hora</label>
              <input
                type="text"
                value={config.pase2.time}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, time: e.target.value } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Espectáculo + Bebida</label>
              <input
                type="text"
                value={config.pase2.packShow.price}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packShow: { ...config.pase2.packShow, price: e.target.value } } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Cena + Show (VIP)</label>
              <input
                type="text"
                value={config.pase2.packDinner.price}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packDinner: { ...config.pase2.packDinner, price: e.target.value } } })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-gold font-bold"
              />
            </div>
          </div>
        </div>

        {/* Google Tag Manager Status Card */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-black to-stone-900 text-white border border-gold/40 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-widest">
              <Tag size={16} />
              <span>Contenedor Google Tag Manager</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
              ACTIVO: GTM-T22JXC3T
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
            Este ID está inyectado directamente en el <code className="text-gold">&lt;head&gt;</code> y <code className="text-gold">&lt;body&gt;</code> de la web para el seguimiento de conversiones de Google Ads (Incidencia Google 9-7847000041569).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Evento Reserva WhatsApp</span>
              <span className="text-gold font-bold">conversion_booking_intent</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Evento Lead Agencias</span>
              <span className="text-gold font-bold">conversion_b2b_lead</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Evento Clic Llamada</span>
              <span className="text-gold font-bold">conversion_phone_call</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PasesManager;
