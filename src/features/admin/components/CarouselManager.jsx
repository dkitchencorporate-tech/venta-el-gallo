import React, { useState, useEffect } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Check, 
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
      setErrorMsg(`Se ha alcanzado el límite de ${MAX_IMAGES} fotos.`);
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
    showToast('Fotografía añadida al carrusel.');
    setIsModalOpen(false);
    setNewUrl('');
    setNewAlt('');
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Galería Fotográfica
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Carrusel de <span className="text-gold italic">Experiencia</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Reordena las fotos o añade nuevas tomas (Activas: <strong className="text-stone-800 font-semibold">{images.length}/{MAX_IMAGES}</strong>).
          </p>
        </div>

        <button
          onClick={() => { setErrorMsg(''); setIsModalOpen(true); }}
          disabled={images.length >= MAX_IMAGES}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Añadir Imagen</span>
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

      {/* Grid de Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, idx) => {
          const imgSrc = resolveAssetUrl(img.src || img.url);
          return (
            <div
              key={img.id || idx}
              className="rounded-3xl bg-white border border-stone-200/80 hover:border-gold/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] group"
            >
              <div className="relative w-full aspect-[16/10] bg-[#0B0E14] overflow-hidden">
                <img
                  src={imgSrc}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 text-gold border border-gold/30 text-[9px] font-bold font-mono">
                  #{idx + 1}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-[#1A1A1A] font-semibold truncate">
                  {img.title || img.alt || `Foto #${idx + 1}`}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-black text-stone-600 disabled:opacity-30 transition-colors"
                      title="Mover posición"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-black text-stone-600 disabled:opacity-30 transition-colors"
                      title="Mover posición"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 rounded-full bg-stone-100 hover:bg-sacromonte-red/10 text-stone-500 hover:text-sacromonte-red transition-colors"
                    title="Eliminar Fotografía"
                  >
                    <Trash2 size={13} />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-bold">Añadir Fotografía</h3>
                  <p className="text-xs text-stone-400">Recomendado WebP / JPG optimizado &lt;500KB</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X size={20} />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-sacromonte-red/10 border border-sacromonte-red/20 text-sacromonte-red text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Ruta o URL de la Imagen *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Ej: images/carrusel/cena-espectaculo-flamenco-granada.jpeg"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Título / Texto Alternativo
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Ej: Terraza con vistas a la Alhambra"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
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
