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

  if (!config) return <div className="p-8 text-slate-800 font-bold">Cargando configuración...</div>;

  return (
    <div className="space-y-8 fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-black text-xs uppercase font-black tracking-widest mb-1">
            <div className="w-2 h-2 rounded-full bg-sacromonte-red"></div>
            <CalendarClock size={16} className="text-gold" />
            <span>Configuración de Espectáculos & Tracking</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight font-black">
            Pases & <span className="text-gold">Google Ads</span>
          </h1>
          <p className="text-slate-700 text-xs md:text-sm mt-1 font-medium">
            Ajusta los horarios y tarifas exactas de los pases de flamenco (Consumición: 25€ / Cena Gastronómica: 55€) y monitor de GTM.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all border border-black"
        >
          <Save size={18} />
          <span>Guardar Configuración</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs flex items-center gap-2 font-bold shadow-md"
          >
            <Check size={18} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Primer Pase */}
        <div className="p-6 md:p-8 rounded-[2rem] bg-white border-2 border-black shadow-[0_12px_30px_rgba(0,0,0,0.08)] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-sacromonte-red"></div>
              <h3 className="font-serif text-xl text-black font-black flex items-center gap-2">
                <Clock size={20} className="text-gold" />
                <span>Primer Pase (~19:00 Zambra)</span>
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase1.active} 
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Hora</label>
              <input
                type="text"
                value={config.pase1.time}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, time: e.target.value } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Espectáculo + Bebida</label>
              <input
                type="text"
                value={config.pase1.packShow.price}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packShow: { ...config.pase1.packShow, price: e.target.value } } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Cena + Show (VIP)</label>
              <input
                type="text"
                value={config.pase1.packDinner.price}
                onChange={(e) => setConfig({ ...config, pase1: { ...config.pase1, packDinner: { ...config.pase1.packDinner, price: e.target.value } } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
          </div>
        </div>

        {/* Segundo Pase */}
        <div className="p-6 md:p-8 rounded-[2rem] bg-white border-2 border-black shadow-[0_12px_30px_rgba(0,0,0,0.08)] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-sacromonte-red"></div>
              <h3 className="font-serif text-xl text-black font-black flex items-center gap-2">
                <Clock size={20} className="text-gold" />
                <span>Segundo Pase (~21:00 Zambra)</span>
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.pase2.active} 
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, active: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Hora</label>
              <input
                type="text"
                value={config.pase2.time}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, time: e.target.value } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Espectáculo + Bebida</label>
              <input
                type="text"
                value={config.pase2.packShow.price}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packShow: { ...config.pase2.packShow, price: e.target.value } } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black mb-1.5 font-black">Cena + Show (VIP)</label>
              <input
                type="text"
                value={config.pase2.packDinner.price}
                onChange={(e) => setConfig({ ...config, pase2: { ...config.pase2, packDinner: { ...config.pase2.packDinner, price: e.target.value } } })}
                className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-black"
              />
            </div>
          </div>
        </div>

        {/* Google Tag Manager Status Card */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-[2rem] bg-[#0B0E14] text-white border-2 border-black shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-sacromonte-red" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gold text-xs uppercase font-black tracking-widest">
              <Tag size={18} />
              <span>Contenedor Google Tag Manager</span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black font-mono border border-emerald-500/30">
              ACTIVO: GTM-T22JXC3T
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
            Este ID está inyectado directamente en el <code className="text-gold font-bold">&lt;head&gt;</code> y <code className="text-gold font-bold">&lt;body&gt;</code> de la web para el seguimiento de conversiones de Google Ads (Incidencia Google 9-7847000041569).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-black/70 border border-white/10">
              <span className="text-slate-400 text-[10px] block font-bold">Evento Reserva WhatsApp</span>
              <span className="text-gold font-black text-sm">conversion_booking_intent</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/70 border border-white/10">
              <span className="text-slate-400 text-[10px] block font-bold">Evento Lead Agencias</span>
              <span className="text-gold font-black text-sm">conversion_b2b_lead</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/70 border border-white/10">
              <span className="text-slate-400 text-[10px] block font-bold">Evento Clic Llamada</span>
              <span className="text-gold font-black text-sm">conversion_phone_call</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PasesManager;
