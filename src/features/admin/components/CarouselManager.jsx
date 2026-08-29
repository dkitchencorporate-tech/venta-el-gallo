import React, { useState, useEffect } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Check, 
  AlertTriangle, 
  X, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCarouselImages, saveCarouselImages, resolveAssetUrl } from '../../../services/adminService';

const MAX_IMAGES = 25;

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
      src: newUrl.trim(),
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-black text-xs uppercase font-black tracking-widest mb-1">
            <div className="w-2 h-2 rounded-full bg-sacromonte-red"></div>
            <Images size={16} className="text-gold" />
            <span>Gestor de Fotografías</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight font-black">
            Carrusel de <span className="text-gold">Experiencia</span>
          </h1>
          <p className="text-slate-700 text-xs md:text-sm mt-1 font-medium">
            Reordena las fotos, añade nuevas tomas de gastronomía y ambiente (Slots activos: <strong className="text-black font-black">{images.length}/{MAX_IMAGES}</strong>).
          </p>
        </div>

        <button
          onClick={() => { setErrorMsg(''); setIsModalOpen(true); }}
          disabled={images.length >= MAX_IMAGES}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all disabled:opacity-50 border border-black"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Añadir Imagen</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs flex items-center gap-2 shadow-md font-bold"
          >
            <Check size={18} className="text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Imágenes con Medidas Exactas y Marco Negro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, idx) => {
          const imgSrc = resolveAssetUrl(img.src || img.url);
          return (
            <div
              key={img.id || idx}
              className="rounded-[2rem] bg-white border-2 border-black hover:border-gold transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 group h-full min-h-[300px]"
            >
              <div className="relative w-full aspect-[16/10] bg-[#0B0E14] overflow-hidden border-b-2 border-black">
                <img
                  src={imgSrc}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black text-gold border border-gold/50 text-[10px] font-black font-mono shadow-md">
                  #{idx + 1}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-black font-black truncate">
                  {img.title || img.alt || `Foto #${idx + 1}`}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-gold hover:text-black text-slate-800 disabled:opacity-30 border border-stone-300"
                      title="Mover a la izquierda / arriba"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-gold hover:text-black text-slate-800 disabled:opacity-30 border border-stone-300"
                      title="Mover a la derecha / abajo"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-sacromonte-red hover:text-white text-slate-800 border border-stone-300"
                    title="Eliminar Fotografía"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Añadir Imagen */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border-2 border-black rounded-[2.5rem] p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-stone-200 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-black font-black">Añadir Fotografía al Carrusel</h3>
                  <p className="text-xs text-slate-600 font-medium">Recomendado formato WebP / JPG optimizado &lt;500KB</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black p-1">
                  <X size={22} />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-2xl bg-sacromonte-red/15 border-2 border-sacromonte-red text-sacromonte-red text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    Ruta o URL de la Imagen *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Ej: images/carrusel/cena-espectaculo-flamenco-granada.jpeg"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black mb-1.5 font-black">
                    Título / Texto Alternativo (SEO)
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Ej: Terraza con vistas a la Alhambra"
                    className="w-full bg-[#FBFBFA] border-2 border-stone-300 rounded-xl px-4 py-3 text-sm text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="pt-4 border-t-2 border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-black text-xs font-black uppercase tracking-wider"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold via-[#e8cd6e] to-gold hover:from-black hover:to-black hover:text-gold text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all border border-black"
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
