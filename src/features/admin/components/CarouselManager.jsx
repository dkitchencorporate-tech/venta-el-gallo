import React, { useState, useEffect, useRef } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getCarouselImages, 
  saveCarouselImages, 
  resolveAssetUrl 
} from '../../../services/adminService';
import LuxuryConfirmModal from './LuxuryConfirmModal';

const MAX_IMAGES = 12;

const optimizeCarouselFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const CarouselManager = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger'
  });

  const loadCarousel = () => {
    setImages(getCarouselImages());
  };

  useEffect(() => {
    loadCarousel();
    const handleUpdate = () => loadCarousel();
    window.addEventListener('veg_carousel_updated', handleUpdate);
    return () => window.removeEventListener('veg_carousel_updated', handleUpdate);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleMove = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newArr = [...images];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);

    setImages(newArr);
    saveCarouselImages(newArr);
    showToast('Orden del carrusel actualizado.');
  };

  const handleDeletePrompt = (id) => {
    if (images.length <= 3) {
      setConfirmModal({
        isOpen: true,
        title: 'Límite de Galería',
        message: 'Se recomienda mantener un mínimo de 3 fotografías activas en el carrusel para preservar la fluidez visual de la web pública.',
        type: 'warning',
        onConfirm: null
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Fotografía',
      message: '¿Estás seguro de que deseas eliminar esta fotografía del carrusel de inicio? Esta acción retirará la imagen de la galería pública.',
      confirmText: 'Eliminar Foto',
      type: 'danger',
      onConfirm: () => {
        const updated = images.filter((img) => img.id !== id);
        setImages(updated);
        saveCarouselImages(updated);
        showToast('Fotografía eliminada con éxito.');
      }
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setConfirmModal({
        isOpen: true,
        title: 'Formato no compatible',
        message: 'Por favor selecciona una imagen válida en formato JPG, PNG o WEBP.',
        type: 'warning',
        onConfirm: null
      });
      return;
    }

    try {
      setIsUploading(true);
      const optimized = await optimizeCarouselFile(file);
      setNewUrl(optimized);
      if (!newAlt) {
        setNewAlt(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '));
      }
      showToast('Fotografía cargada y optimizada.');
    } catch (err) {
      console.error(err);
      setConfirmModal({
        isOpen: true,
        title: 'Error al procesar',
        message: 'No se pudo optimizar la fotografía seleccionada.',
        type: 'warning',
        onConfirm: null
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) {
      setConfirmModal({
        isOpen: true,
        title: 'Fotografía requerida',
        message: 'Debes seleccionar una fotografía desde tu dispositivo antes de añadirla.',
        type: 'warning',
        onConfirm: null
      });
      return;
    }

    const newImageItem = {
      id: `car-${Date.now()}`,
      src: newUrl.trim(),
      alt: newAlt.trim() || 'Fotografía Venta El Gallo',
      title: newAlt.trim() || 'Cueva Flamenca Venta El Gallo'
    };

    const updated = [...images, newImageItem];
    setImages(updated);
    saveCarouselImages(updated);

    setNewUrl('');
    setNewAlt('');
    setIsModalOpen(false);
    showToast('Nueva fotografía añadida al carrusel.');
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Header Luxury */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Galería Visual
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Carrusel de <span className="text-gold italic">Fotografías</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Sube nuevas fotos directamente desde tu dispositivo y reordénalas (Activas: <strong className="text-stone-800 font-semibold">{images.length}/{MAX_IMAGES}</strong>).
          </p>
        </div>

        <button
          onClick={() => { setNewUrl(''); setNewAlt(''); setIsModalOpen(true); }}
          disabled={images.length >= MAX_IMAGES}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all disabled:opacity-50 self-start sm:self-auto"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full min-w-0">
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
                    onClick={() => handleDeletePrompt(img.id)}
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

      {/* Modal Añadir Imagen con File Picker */}
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
                  <p className="text-xs text-stone-400">Sube directamente desde tu dispositivo</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-semibold flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-gold" />
                    <span>Seleccionar Archivo de Fotografía *</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {newUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 flex items-center gap-4">
                      <img
                        src={resolveAssetUrl(newUrl)}
                        alt="Preview"
                        className="w-24 h-16 object-cover rounded-xl border border-stone-300"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-stone-800 block">Fotografía seleccionada</span>
                        <span className="text-[10px] text-stone-500 block mb-2">Comprimida a máxima calidad</span>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1 rounded-full bg-stone-200 hover:bg-gold hover:text-black text-stone-700 text-[11px] font-semibold transition-colors"
                        >
                          Cambiar Foto
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewUrl('')}
                        className="p-1.5 rounded-full bg-stone-200 hover:bg-sacromonte-red/10 text-stone-500 hover:text-sacromonte-red transition-colors mr-2"
                        title="Quitar foto"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-stone-300 hover:border-gold rounded-2xl p-6 text-center cursor-pointer transition-all bg-stone-50/50 hover:bg-stone-50 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={20} />
                      </div>
                      <span className="text-xs font-bold text-stone-700 block">
                        {isUploading ? 'Procesando imagen...' : 'Subir Fotografía desde este Dispositivo'}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        Haz clic para seleccionar desde tu galería o fotos (JPG, PNG, WEBP)
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Título / Descripción de la Fotografía
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Ej: Vista panorámica de la Cueva y la Alhambra"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
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
                    Añadir al Carrusel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Confirmación de Autor */}
      <LuxuryConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        type={confirmModal.type}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />

    </div>
  );
};

export default CarouselManager;
