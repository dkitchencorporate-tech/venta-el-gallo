import React, { useState, useEffect } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Upload, 
  Check, 
  AlertTriangle, 
  X, 
  Sparkles, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCarouselImages, saveCarouselImages } from '../../../services/adminService';

const MAX_IMAGES = 25;
const MAX_SIZE_MB = 0.5; // 500KB

const CarouselManager = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setImages(getCarouselImages());
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Deseas retirar esta fotografía del carrusel?')) {
      const updated = images.filter(img => img.id !== id);
      setImages(updated);
      saveCarouselImages(updated);
      showToast('Fotografía eliminada.');
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setImages(updated);
    saveCarouselImages(updated);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    if (images.length >= MAX_IMAGES) {
      setErrorMsg(`Se ha alcanzado el límite máximo de ${MAX_IMAGES} fotografías.`);
      return;
    }

    const newImgObj = {
      id: `car-${Date.now()}`,
      url: newUrl.trim(),
      alt: newAlt.trim() || 'Experiencia Gastronómica Venta El Gallo',
      title: newAlt.trim() || 'Venta El Gallo'
    };

    const updated = [newImgObj, ...images];
    setImages(updated);
    saveCarouselImages(updated);
    showToast('Nueva fotografía añadida al carrusel.');
    setIsModalOpen(false);
    setNewUrl('');
    setNewAlt('');
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold/15">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-widest mb-1">
            <Images size={16} />
            <span>Gestor de Fotografías</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-tight">
            Carrusel de <span className="text-gold">Experiencia</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-light">
            Reordena las fotos, añade nuevas tomas de gastronomía y ambiente (Slots activos: <strong className="text-white">{images.length}/{MAX_IMAGES}</strong>).
          </p>
        </div>

        <button
          onClick={() => { setErrorMsg(''); setIsModalOpen(true); }}
          disabled={images.length >= MAX_IMAGES}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-white hover:to-white text-black font-extrabold uppercase tracking-wider text-xs shadow-lg transition-colors disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={3} />
          <span>Añadir Imagen</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
          >
            <Check size={16} className="text-emerald-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Imágenes del Carrusel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div
            key={img.id || idx}
            className="rounded-2xl bg-black/60 border border-white/10 hover:border-gold/40 transition-all overflow-hidden flex flex-col backdrop-blur-md group"
          >
            <div className="relative aspect-[16/10] bg-black overflow-hidden">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = '/src/assets/raw/placeholder.png'; }}
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 border border-gold/30 text-[9px] font-bold text-gold font-mono">
                #{idx + 1}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-white font-medium truncate">
                {img.title || img.alt || `Foto #${idx + 1}`}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-gold/20 text-slate-400 hover:text-gold disabled:opacity-30"
                    title="Mover a la izquierda / arriba"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    disabled={idx === images.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-gold/20 text-slate-400 hover:text-gold disabled:opacity-30"
                    title="Mover a la derecha / abajo"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-sacromonte-red/20 text-slate-400 hover:text-sacromonte-red"
                  title="Eliminar Fotografía"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Añadir Imagen */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0d1017] border border-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-white">Añadir Fotografía al Carrusel</h3>
                  <p className="text-xs text-slate-400">Recomendado formato WebP / JPG optimizado &lt;500KB</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-sacromonte-red/10 border border-sacromonte-red/30 text-sacromonte-red text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-1 font-medium">
                    Ruta o URL de la Imagen *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Ej: /images/carrusel/cena-espectaculo-flamenco-granada.jpeg"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-1 font-medium">
                    Título / Texto Alternativo (SEO)
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Ej: Terraza con vistas a la Alhambra"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gold hover:bg-white text-black font-extrabold uppercase tracking-wider text-xs shadow-lg transition-colors"
                  >
                    Añadir Imagen
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CarouselManager;
