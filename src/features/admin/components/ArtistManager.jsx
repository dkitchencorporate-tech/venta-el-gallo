import React, { useState, useEffect, useRef } from 'react';
import { 
  Users2, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getArtists, 
  addArtist, 
  updateArtist, 
  deleteArtist, 
  resolveAssetUrl 
} from '../../../services/adminService';
import LuxuryConfirmModal from './LuxuryConfirmModal';

const ROLES = [
  "Bailaora", "Bailaor", "Cantaor", "Cantaora", 
  "Guitarrista", "Percusión", "Familia Flamenca", "Elenco Principal"
];

const optimizeImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
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

const ArtistManager = () => {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  
  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger'
  });

  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState(ROLES[0]);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadData = () => {
    setArtists(getArtists());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('veg_artists_updated', handleUpdate);
    return () => window.removeEventListener('veg_artists_updated', handleUpdate);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenCreate = () => {
    setEditingArtist(null);
    setFormName('');
    setFormRole(ROLES[0]);
    setFormImageUrl('');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (artist) => {
    setEditingArtist(artist);
    setFormName(artist.name);
    setFormRole(artist.role);
    setFormImageUrl(artist.imageUrl || '');
    setFormDescription(artist.description || '');
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (id, name) => {
    setConfirmModal({
      isOpen: true,
      title: `Eliminar a ${name}`,
      message: `¿Estás seguro de que deseas retirar a ${name} del elenco? Esta acción eliminará permanentemente su biografía y fotografía de la web pública.`,
      confirmText: 'Eliminar Artista',
      type: 'danger',
      onConfirm: () => {
        deleteArtist(id);
        showToast(`Artista ${name} eliminado con éxito.`);
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
        message: 'Por favor selecciona un archivo de imagen válido en formato JPG, PNG o WEBP.',
        type: 'warning',
        onConfirm: null
      });
      return;
    }

    try {
      setIsUploading(true);
      const optimizedBase64 = await optimizeImageFile(file);
      setFormImageUrl(optimizedBase64);
      showToast('Imagen cargada y optimizada.');
    } catch (err) {
      console.error('Error optimizando imagen:', err);
      setConfirmModal({
        isOpen: true,
        title: 'Error al procesar',
        message: 'No se pudo procesar la fotografía seleccionada. Intenta con otra imagen.',
        type: 'warning',
        onConfirm: null
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload = {
      name: formName.trim(),
      role: formRole,
      imageUrl: formImageUrl || '',
      description: formDescription.trim()
    };

    if (editingArtist) {
      updateArtist(editingArtist.id, payload);
      showToast(`Artista ${formName} actualizado.`);
    } else {
      addArtist(payload);
      showToast(`Artista ${formName} incorporado al elenco.`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 fade-in">
      
      {/* Cabecera Luxury */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-[1px] bg-sacromonte-red"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold">
              Patrimonio Flamenco
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] font-bold">
            Elenco de <span className="text-gold italic">Artistas</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-light">
            Sube fotos directamente desde tu móvil o PC, edita biografías y actualiza el cartel de la cueva en tiempo real.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-[#1A1A1A] hover:text-white text-black font-bold uppercase tracking-wider text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Añadir Artista</span>
        </button>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium shadow-sm"
          >
            <Check size={16} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Artistas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-3xl bg-white border border-stone-200/80 hover:border-gold/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] group"
          >
            <div className="relative w-full aspect-[4/3] bg-[#0B0E14] overflow-hidden">
              <img
                src={resolveAssetUrl(artist.imageUrl)}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-gold border border-gold/30 text-[9px] font-bold uppercase tracking-widest">
                {artist.role}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">{artist.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-relaxed">
                  {artist.description || 'Sin biografía detallada.'}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(artist)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-black text-stone-700 transition-colors text-xs flex items-center gap-1 font-medium"
                >
                  <Edit3 size={13} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDeletePrompt(artist.id, artist.name)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-sacromonte-red/10 text-stone-600 hover:text-sacromonte-red transition-colors text-xs flex items-center gap-1 font-medium"
                >
                  <Trash2 size={13} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Creación / Edición */}
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
              className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-bold">
                    {editingArtist ? 'Editar Artista' : 'Nuevo Artista'}
                  </h3>
                  <p className="text-xs text-stone-400">Actualiza los datos y fotografía visibles en la web</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* ZONA DE SUBIDA DIRECTA DE FOTOGRAFÍA */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-semibold flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-gold" />
                    <span>Fotografía del Artista *</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {formImageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 flex items-center gap-4">
                      <img
                        src={resolveAssetUrl(formImageUrl)}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-xl border border-stone-300"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-stone-800 block">Fotografía cargada</span>
                        <span className="text-[10px] text-stone-500 block mb-2">Optimizada para alta velocidad</span>
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
                        onClick={() => setFormImageUrl('')}
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
                        Haz clic para seleccionar desde tu galería o archivos (JPG, PNG, WEBP)
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Nombre Artístico *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Curro Heredia"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Rol / Disciplina *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold font-medium"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    Biografía / Trayectoria
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Escriba la biografía flamenca del artista..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-gold"
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
                    {editingArtist ? 'Guardar Cambios' : 'Crear Artista'}
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

export default ArtistManager;
